/** Audio-locked timing for Video 3 (deck walkthrough). Same contract as timing.ts
 *  but reads the Matilda vo3 manifest and uses tighter padding for a flowing pace. */
import manifest from "./vo3-manifest.json";
import { FPS } from "./theme";

type Clip = { file: string; speech_s: number; slide: string };
const CLIPS: Record<string, Clip> = manifest.clips as Record<string, Clip>;

export const LEAD = 0.35;
export const TAIL = 0.7;

export type Timing3 = {
  id: string;
  slide: string;
  frames: number;
  voFile: string;
  voStartFrame: number;
  speechFrames: number;
};

export function scene3(id: string, extra = 0): Timing3 {
  const c = CLIPS[id];
  if (!c) throw new Error(`No vo3 clip ${id}`);
  return {
    id,
    slide: c.slide,
    frames: Math.round((LEAD + c.speech_s + TAIL + extra) * FPS),
    voFile: c.file,
    voStartFrame: Math.round(LEAD * FPS),
    speechFrames: Math.round(c.speech_s * FPS),
  };
}

export function card3(id: string, seconds: number): Timing3 {
  return { id, slide: "", frames: Math.round(seconds * FPS), voFile: "", voStartFrame: 0, speechFrames: 0 };
}

export function totalFrames3(list: Timing3[]): number {
  return list.reduce((n, s) => n + s.frames, 0);
}
export { CLIPS };
