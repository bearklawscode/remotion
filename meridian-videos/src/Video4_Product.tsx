/**
 * VIDEO 4 (rebuilt) — "Meridian, in motion" — a confident, fast-paced product
 * sizzle reel. MBB energy: declarative kinetic type, heavily-animated UI (cursors
 * tapping, cards cascading, charts drawing, toggles, counters, notifications),
 * snappy cuts, music-driven. Matilda VO drops in on the `VO` hook (Aug 10 budget).
 */
import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { C } from "./theme";
import { MusicBed4 } from "./lib/v4ui";
import { MockupNote } from "./lib/v4ui";
import * as V4 from "./scenes/v4";

type Cut = { from: number; dur: number; C: React.FC; mockup?: boolean };
const cut = (from: number, dur: number, Comp: React.FC, mockup = false): Cut => ({ from, dur, C: Comp, mockup });

// 14 fast scenes, ~2:48 total (music bed 3:15 covers).
const CUTS: Cut[] = [
  cut(0, 180, V4.ColdOpen),
  cut(180, 300, V4.Thesis),
  cut(480, 300, V4.Problem),
  cut(780, 240, V4.TheMove),
  cut(1020, 540, V4.Dashboard, true),
  cut(1560, 540, V4.AIAction, true),
  cut(2100, 420, V4.Mobile, true),
  cut(2520, 360, V4.FrontDesk, true),
  cut(2880, 360, V4.Booking, true),
  cut(3240, 480, V4.OMFA, true),
  cut(3720, 300, V4.Connected),
  cut(4020, 360, V4.SixDomains),
  cut(4380, 420, V4.Close),
  cut(4800, 240, V4.EndCard),
];
export const VIDEO4_FRAMES = 5040;

// VO hook — populate with Matilda clips (vo4b/*.mp3) once EL budget resets (Aug 10).
const VO: { id: string; at: number }[] = [];

export const Video4_Product: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <Sequence durationInFrames={VIDEO4_FRAMES} name="music">
        <MusicBed4 volume={0.22} />
      </Sequence>
      {CUTS.map((c, i) => {
        const { C: Comp } = c;
        return (
          <Sequence key={i} from={c.from} durationInFrames={c.dur} name={Comp.name || `s${i}`}>
            <Comp />
            {c.mockup && <MockupNote />}
          </Sequence>
        );
      })}
      {VO.map((v) => (
        <Sequence key={v.id} from={v.at} name={`vo-${v.id}`}>
          <Audio src={staticFile(`vo4b/${v.id}.mp3`)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
