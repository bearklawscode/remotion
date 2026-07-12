/**
 * VIDEO 4 v3 — confident product sizzle reel. Matilda VO + upbeat 120bpm music
 * (cuts snap to the 60-frame bar grid). Many fast scenes, heavy animated UI,
 * MECE capability + persona + big-picture coverage. Quick wipe transitions on cuts.
 */
import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame, interpolate, Easing } from "remotion";
import { C } from "./theme";
import { MockupNote } from "./lib/v4ui";
import * as V4 from "./scenes/v4";

const EOUT = Easing.bezier(0.16, 1, 0.3, 1);
const rmp = (f: number, a: number, b: number, e = EOUT) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });

/**
 * CutIn — varied, music-synced entrance per scene + a gold bloom flash on the
 * cut. Applying the Remotion motion skill: interpolate + Easing.bezier for an
 * organic settle, transform variety (push / slide / scale / wipe) so cuts feel
 * MrBeast-fast without ever reading as one repeated effect.
 */
const CutIn: React.FC<{ i: number; children: React.ReactNode }> = ({ i, children }) => {
  const frame = useCurrentFrame();
  const p = rmp(frame, 0, 10);
  const kind = i % 4;

  // entrance transform variety
  let transform = "";
  if (kind === 0) transform = `translateY(${(1 - p) * 46}px) scale(${0.985 + 0.015 * p})`;
  else if (kind === 1) transform = `translateX(${(1 - p) * 70}px)`;
  else if (kind === 2) transform = `scale(${1.05 - 0.05 * p})`;
  else transform = `scale(${0.985 + 0.015 * p})`;

  // opacity: quick fade-up from the navy backdrop (no cross-scene overlap → audio stays locked)
  const op = rmp(frame, 0, 7);

  // gold bloom flash on the cut (radial), decays fast — the beat "hit"
  const bloom = 1 - rmp(frame, 0, 12);
  // gold wipe only on kind 3, for rhythmic variety
  const wipe = kind === 3 ? 1 - p : 0;

  return (
    <AbsoluteFill style={{ transform, opacity: op }}>
      {children}
      {kind === 3 && (
        <AbsoluteFill style={{ background: C.gold, transform: `scaleX(${wipe})`, transformOrigin: "right", opacity: wipe, pointerEvents: "none" }} />
      )}
      <AbsoluteFill style={{ background: `radial-gradient(1400px 900px at 50% 46%, rgba(200,179,126,${0.28 * bloom}), transparent 60%)`, opacity: bloom, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};

type Cut = { name: string; dur: number; C: React.FC; vo?: string; mockup?: boolean };
const S = (name: string, dur: number, Comp: React.FC, vo?: string, mockup = false): Cut => ({ name, dur, C: Comp, vo, mockup });

// durations are multiples of 30f (beats) so cuts land on the music grid.
const CUTS: Cut[] = [
  S("ColdOpen", 150, V4.ColdOpen, "o01"),
  S("Thesis", 330, V4.Thesis, "o02"),
  S("Problem", 240, V4.Problem, "o03"),
  S("TheMove", 210, V4.TheMove, "o04"),
  S("WhatIs", 210, V4.WhatIs, "o05"),
  S("Dashboard", 330, V4.Dashboard, "o06", true),
  S("AIAction", 390, V4.AIAction, "o07", true),
  S("Knowledge", 270, V4.Knowledge, "o08", true),
  S("Mobile", 300, V4.Mobile, "o09", true),
  S("FrontDesk", 270, V4.FrontDesk, "o10", true),
  S("Booking", 240, V4.Booking, "o11", true),
  S("Finance", 270, V4.Finance, "o12", true),
  S("Loyalty", 240, V4.Loyalty, "o13", true),
  S("MontageOps", 360, V4.MontageOps, undefined, true),
  S("MontageCommercial", 300, V4.MontageCommercial, undefined, true),
  S("OMFA", 390, V4.OMFA, "o14"),
  S("Connected", 270, V4.Connected, "o15"),
  S("Personas", 240, V4.Personas, "o16"),
  S("BigPicture", 300, V4.BigPicture, "o17"),
  S("Close", 300, V4.Close),
  S("EndCard", 180, V4.EndCard, "o18"),
];
export const VIDEO4_FRAMES = CUTS.reduce((n, c) => n + c.dur, 0);

const VO_LEAD = 9;

export const Video4_Product: React.FC = () => {
  let from = 0;
  const placed = CUTS.map((c) => { const p = { ...c, from }; from += c.dur; return p; });
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <Sequence durationInFrames={VIDEO4_FRAMES} name="music">
        <Audio src={staticFile("vo4/music-upbeat.mp3")} volume={0.26} />
      </Sequence>
      {placed.map((c, i) => {
        const { C: Comp } = c;
        return (
          <Sequence key={i} from={c.from} durationInFrames={c.dur} name={c.name} premountFor={20}>
            <CutIn i={i}>
              <Comp />
              {c.mockup && <MockupNote />}
            </CutIn>
          </Sequence>
        );
      })}
      {placed.filter((c) => c.vo).map((c) => (
        <Sequence key={`vo-${c.name}`} from={c.from + VO_LEAD} name={`vo-${c.vo}`}>
          <Audio src={staticFile(`vo4b/${c.vo}.mp3`)} volume={1} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
