/** Shared chrome for Video 3: persistent mockup disclaimer, slide counter,
 *  music bed, and dynamic-motion helpers used across deck scenes. */
import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { C, FONT } from "../theme";
import { ramp, EASE } from "./motion";

/** Small persistent disclaimer — UI shown is an illustrative mockup. */
export const MockupDisclaimer: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const frame = useCurrentFrame();
  const op = ramp(frame, 8, 24) * 0.62;
  return (
    <div
      style={{
        position: "absolute",
        right: 26,
        bottom: 20,
        fontFamily: FONT.sans,
        fontSize: 12.5,
        letterSpacing: "0.03em",
        color: dark ? "rgba(255,255,255,0.6)" : "rgba(19,33,60,0.55)",
        opacity: op,
        maxWidth: 520,
        textAlign: "right",
        fontStyle: "italic",
      }}
    >
      Illustrative mockup for visualization — the production interface may differ and improve.
    </div>
  );
};

/** Deck slide counter (top-right) — subtle "where am I". */
export const SlideTag: React.FC<{ index: number; total: number; label: string; dark?: boolean }> = ({ index, total, label, dark }) => {
  const frame = useCurrentFrame();
  const op = ramp(frame, 4, 18);
  const col = dark ? "rgba(255,255,255,0.7)" : "rgba(19,33,60,0.6)";
  return (
    <div style={{ position: "absolute", top: 30, right: 40, display: "flex", alignItems: "center", gap: 12, opacity: op }}>
      <span style={{ fontFamily: FONT.sans, fontSize: 13, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.gold }}>{label}</span>
      <span style={{ fontFamily: FONT.sans, fontSize: 13, fontWeight: 600, color: col, fontVariantNumeric: "tabular-nums" }}>
        {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
};

/** Global soft music bed — very mild, sits under the VO. */
export const MusicBed: React.FC<{ volume?: number }> = ({ volume = 0.14 }) => (
  <Audio src={staticFile("vo3/music-bed.mp3")} volume={volume} />
);

/* ---------- dynamic-motion helpers (energy, not slideshow) ---------- */

/** Continuous horizontal drift for parallax background layers. */
export const useDrift = (pxPerSec: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (frame / fps) * pxPerSec;
};

/** A flowing particle stream between two points (animated dashes traveling). */
export const FlowLine: React.FC<{
  x1: number; y1: number; x2: number; y2: number; delay?: number; color?: string; width?: number; dots?: number;
}> = ({ x1, y1, x2, y2, delay = 0, color = C.gold, width = 2, dots = 4 }) => {
  const frame = useCurrentFrame();
  const draw = ramp(frame, delay, delay + 18);
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const travel = ((frame - delay) * 3) % 60;
  return (
    <>
      <line x1={x1} y1={y1} x2={x1 + (x2 - x1) * draw} y2={y1 + (y2 - y1) * draw} stroke={color} strokeOpacity={0.28} strokeWidth={width} />
      {draw > 0.9 &&
        Array.from({ length: dots }).map((_, i) => {
          const d = ((travel + i * (len / dots)) % len) / len;
          return <circle key={i} cx={x1 + (x2 - x1) * d} cy={y1 + (y2 - y1) * d} r={width + 1.5} fill={color} opacity={0.9} />;
        })}
    </>
  );
};

/** Kinetic word-by-word headline: each word rises + fades on a stagger. */
export const KineticLine: React.FC<{
  text: string; goldFrom?: number; size?: number; delay?: number; stagger?: number; style?: React.CSSProperties;
}> = ({ text, goldFrom = 999, size = 88, delay = 0, stagger = 3, style }) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0 0.28em", fontFamily: FONT.display, fontSize: size, lineHeight: 0.98, ...style }}>
      {words.map((w, i) => {
        const p = ramp(frame, delay + i * stagger, delay + i * stagger + 14);
        return (
          <span key={i} style={{ display: "inline-block", opacity: p, transform: `translateY(${(1 - p) * 26}px)`, color: i >= goldFrom ? C.gold : C.ink }}>
            {w}
          </span>
        );
      })}
    </div>
  );
};

/** Eyebrow that wipes in with a gold rule. */
export const DeckEyebrow: React.FC<{ children: React.ReactNode; delay?: number; dark?: boolean }> = ({ children, delay = 0, dark }) => {
  const frame = useCurrentFrame();
  const w = ramp(frame, delay, delay + 16);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 40 * w, height: 2, background: C.gold }} />
      <span style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, opacity: w }}>
        {children}
      </span>
    </div>
  );
};

export { ramp, EASE };
