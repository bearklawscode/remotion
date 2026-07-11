/** Shared narrative building blocks for custom (non-ported-screen) scenes. */
import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT, SHADOW } from "../theme";
import { Eyebrow, Headline, G } from "../lib/chrome";
import { FadeUp, ScaleIn, ramp, Drift } from "../lib/motion";

/** Centered narrative frame with paper bg + optional eyebrow/headline. */
export const Stage: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <AbsoluteFill style={{ backgroundColor: C.paper, justifyContent: "center", alignItems: "center", padding: 120, ...style }}>
    {children}
  </AbsoluteFill>
);

/** Big editorial stat: huge condensed number + label. */
export const BigStat: React.FC<{ value: React.ReactNode; label: string; delay?: number; gold?: boolean }> = ({ value, label, delay = 0, gold }) => (
  <ScaleIn delay={delay} from={0.86}>
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: FONT.display, fontSize: 150, lineHeight: 0.9, color: gold ? C.gold : C.ink, fontVariantNumeric: "tabular-nums" }}>{value}</div>
      <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: C.mist, marginTop: 18 }}>{label}</div>
    </div>
  </ScaleIn>
);

/** A property photo card with soft Ken Burns drift. */
export const PhotoCard: React.FC<{ src: string; w?: number; h?: number; delay?: number; rotate?: number; style?: React.CSSProperties }> = ({ src, w = 420, h = 300, delay = 0, rotate = 0, style }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + 20);
  return (
    <div style={{ width: w, height: h, borderRadius: 20, overflow: "hidden", boxShadow: SHADOW.cardLg, opacity: p, transform: `translateY(${(1 - p) * 30}px) rotate(${rotate}deg) scale(${0.94 + p * 0.06})`, ...style }}>
      <Drift scaleFrom={1.05} scaleTo={1.14}>
        <Img src={staticFile(src.replace(/^\//, ""))} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Drift>
    </div>
  );
};

/** Sequential title lines (for closing/ask beats). */
export const TitleLines: React.FC<{ lines: { text: React.ReactNode; sub?: string }[]; delayEach?: number; size?: number }> = ({ lines, delayEach = 18, size = 74 }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 34, alignItems: "center" }}>
    {lines.map((l, i) => (
      <FadeUp key={i} delay={10 + i * delayEach} y={26}>
        <div style={{ textAlign: "center" }}>
          <Headline size={size}>{l.text}</Headline>
          {l.sub && <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 26, color: C.inkSoft, marginTop: 10 }}>{l.sub}</div>}
        </div>
      </FadeUp>
    ))}
  </div>
);

export { Eyebrow, Headline, G };
