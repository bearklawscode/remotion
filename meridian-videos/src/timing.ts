/**
 * Audio-locked scene timing. The single source of truth for how long every scene
 * runs — derived from the MEASURED ElevenLabs VO durations in vo-manifest.json.
 *
 * Rule (matches minor-os docs/05-voiceover sync contract):
 *   sceneFrames = round( (lead + speech_s + tail) * fps )
 * The VO clip is placed `lead` seconds into the scene, so the visual establishes
 * first, the narration plays, and there's a `tail` of breathing room before the
 * cut. Camera moves / zooms happen WITHIN this fixed window, so sync never breaks.
 *
 * Chapter cards and any silent beats declare an explicit `seconds` instead.
 */
import manifest from "./vo-manifest.json";
import { FPS } from "./theme";

type Clip = { file: string; speech_s: number; budget_s: number; fit: string; text: string };
const CLIPS: Record<string, Clip> = manifest.clips as Record<string, Clip>;

export const DEFAULT_LEAD = 0.45; // s of visual before narration starts
export const DEFAULT_TAIL = 0.85; // s of breathing room after narration ends

export type SceneTiming = {
  id: string;
  frames: number;
  voFile?: string; // public path to VO clip, if narrated
  voStartFrame: number; // when the clip starts within the scene
  voFrames: number; // clip length in frames
  text?: string;
};

/** A narrated scene: duration comes from its VO clip. */
export function narrated(
  id: string,
  opts: { lead?: number; tail?: number; extra?: number } = {},
): SceneTiming {
  const clip = CLIPS[id];
  if (!clip) throw new Error(`No VO clip for scene "${id}" in manifest`);
  const lead = opts.lead ?? DEFAULT_LEAD;
  const tail = opts.tail ?? DEFAULT_TAIL;
  const extra = opts.extra ?? 0; // extra silent seconds (e.g. a reveal beat)
  const frames = Math.round((lead + clip.speech_s + tail + extra) * FPS);
  return {
    id,
    frames,
    voFile: clip.file, // e.g. "vo/v1-01.mp3"
    voStartFrame: Math.round(lead * FPS),
    voFrames: Math.round(clip.speech_s * FPS),
    text: clip.text,
  };
}

/** A silent scene (chapter card, pure-visual beat) with an explicit duration. */
export function silent(id: string, seconds: number): SceneTiming {
  return { id, frames: Math.round(seconds * FPS), voStartFrame: 0, voFrames: 0 };
}

/** Lay scenes back-to-back; returns each with its absolute `from` offset. */
export function sequence(scenes: SceneTiming[]): (SceneTiming & { from: number })[] {
  let from = 0;
  return scenes.map((s) => {
    const withFrom = { ...s, from };
    from += s.frames;
    return withFrom;
  });
}

export function totalFrames(scenes: SceneTiming[]): number {
  return scenes.reduce((n, s) => n + s.frames, 0);
}

export { CLIPS };
