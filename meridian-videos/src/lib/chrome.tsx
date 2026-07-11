/**
 * Recurring "catch-up" chrome so a viewer who missed a scene still follows:
 *  - ChapterCard: full-frame section divider ("THE STAKES")
 *  - LowerThird: persistent caption strip summarizing the current point
 *  - ProgressDots / ChapterRail: where-am-I indicator
 *  - Kicker/Headline/Eyebrow: shared typographic system
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { C, FONT, SHADOW } from "../theme";
import { FadeUp, ramp, Counter } from "./motion";

export const Eyebrow: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, ...style }}>
    — {children}
  </div>
);

/** Condensed headline; wrap the gold second half in <G>…</G>. */
export const Headline: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ children, size = 88, style }) => (
  <div style={{ fontFamily: FONT.display, fontSize: size, lineHeight: 0.94, color: C.ink, letterSpacing: "-0.01em", ...style }}>{children}</div>
);
export const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.gold }}>{children}</span>;

/** Full-frame chapter divider. */
export const ChapterCard: React.FC<{ index: number; total: number; chapter: string; kicker?: string }> = ({ index, total, chapter, kicker }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const inP = ramp(frame, 2, 20);
  const outP = ramp(frame, durationInFrames - 12, durationInFrames);
  const line = ramp(frame, 8, 32);
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper, justifyContent: "center", alignItems: "center", opacity: inP * (1 - outP) }}>
      <div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 700, letterSpacing: "0.32em", color: C.gold, textTransform: "uppercase" }}>
        Chapter {index} / {total}
      </div>
      <div style={{ width: 320, height: 2, background: C.gold, margin: "26px 0", transform: `scaleX(${line})`, transformOrigin: "50% 50%" }} />
      <Headline size={104} style={{ textAlign: "center" }}>{chapter}</Headline>
      {kicker && <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 30, color: C.inkSoft, marginTop: 24 }}>{kicker}</div>}
    </AbsoluteFill>
  );
};

/** Persistent lower-third caption strip — appears on every narrated scene. */
export const LowerThird: React.FC<{ chapter: string; caption: string; index: number; total: number }> = ({ chapter, caption, index, total }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const inP = ramp(frame, 6, 22);
  const outP = ramp(frame, durationInFrames - 14, durationInFrames - 2);
  const op = inP * (1 - outP);
  return (
    <div style={{ position: "absolute", left: 64, bottom: 56, display: "flex", alignItems: "center", gap: 18, opacity: op, transform: `translateY(${(1 - inP) * 16}px)` }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, background: C.surface, boxShadow: SHADOW.card, border: `1px solid ${C.ring}`, borderRadius: 14, padding: "12px 20px", maxWidth: 900 }}>
        <div style={{ fontFamily: FONT.sans, fontSize: 14, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold }}>{chapter}</div>
        <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 600, color: C.ink }}>{caption}</div>
      </div>
    </div>
  );
};

/** Chapter progress rail (top of frame) — where am I. */
export const ProgressRail: React.FC<{ chapters: string[]; active: number }> = ({ chapters, active }) => (
  <div style={{ position: "absolute", top: 22, left: 64, right: 64, display: "flex", gap: 10, alignItems: "center" }}>
    {chapters.map((ch, i) => (
      <div key={ch + i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ height: 3, borderRadius: 3, background: i <= active ? C.gold : "rgba(19,33,60,0.12)" }} />
        <div style={{ fontFamily: FONT.sans, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: i === active ? C.ink : C.mist }}>{ch}</div>
      </div>
    ))}
  </div>
);

/** Meridian wordmark — typographic, with gold meridian line. */
export const Wordmark: React.FC<{ size?: number; byline?: boolean; drawFrom?: number }> = ({ size = 120, byline, drawFrom = 0 }) => {
  const frame = useCurrentFrame();
  const line = ramp(frame, drawFrom, drawFrom + 24);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: size * 0.06 }}>
      <div style={{ fontFamily: FONT.display, fontSize: size, letterSpacing: "0.22em", color: C.ink, lineHeight: 1 }}>MERIDIAN</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, width: size * 5.2 }}>
        <div style={{ flex: line, height: Math.max(2, size * 0.03), background: C.gold }} />
        <div style={{ width: Math.max(6, size * 0.05), height: Math.max(6, size * 0.05), background: C.gold, transform: "rotate(45deg)", opacity: line }} />
        <div style={{ flex: line, height: Math.max(2, size * 0.03), background: C.gold }} />
      </div>
      {byline && <div style={{ fontFamily: FONT.sans, fontSize: size * 0.13, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: C.inkSoft, marginTop: size * 0.05 }}>by Minor Hotels</div>}
    </div>
  );
};

export { Counter };
