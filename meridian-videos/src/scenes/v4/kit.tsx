/** Confident kinetic-type kit for the rebuilt Video 4 (MBB sizzle energy). */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { C, FONT } from "../../theme";
import { rmp } from "../../lib/interact";

export const NAVY = C.ink;
export const PAPER = C.paper;

/** Full-frame stage with a subtle animated glow (navy or paper). */
export const Stage: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg = NAVY }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const t = frame / 30;
  const gx = width * (0.5 + 0.16 * Math.sin(t * 0.14));
  const gy = height * (0.42 + 0.12 * Math.cos(t * 0.11));
  const light = bg === PAPER;
  return (
    <AbsoluteFill style={{ backgroundColor: bg, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(1200px 820px at ${gx}px ${gy}px, rgba(160,138,79,${light ? 0.08 : 0.11}), transparent 70%)` }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(1000px 700px at ${width - gx}px ${height - gy}px, rgba(150,207,212,${light ? 0.05 : 0.05}), transparent 70%)` }} />
      {children}
    </AbsoluteFill>
  );
};

/** Confident headline — words SNAP in with weight (spring), second half gold. */
export const Snap: React.FC<{ white: string; gold?: string; size?: number; delay?: number; light?: boolean; align?: string }> = ({ white, gold, size = 100, delay = 0, light, align = "flex-start" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = [...white.split(" ").map((w) => ({ w, g: false })), ...(gold ? gold.split(" ").map((w) => ({ w, g: true })) : [])];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0 0.24em", justifyContent: align as any, fontFamily: FONT.display, fontSize: size, lineHeight: 0.94 }}>
      {words.map((o, i) => {
        const s = spring({ frame: frame - delay - i * 3, fps, config: { damping: 190, stiffness: 210 } });
        return (
          <span key={i} style={{ display: "inline-block", opacity: rmp(frame, delay + i * 3 - 4, delay + i * 3 + 8), transform: `translateY(${(1 - s) * 40}px) scale(${0.9 + 0.1 * s})`, color: o.g ? C.gold : light ? C.ink : "#fff" }}>
            {o.w}
          </span>
        );
      })}
    </div>
  );
};

/** Small confident kicker (letterspaced caps, gold). */
export const Kicker: React.FC<{ children: React.ReactNode; delay?: number; light?: boolean }> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  const w = rmp(frame, delay, delay + 14);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
      <div style={{ width: 40 * w, height: 2, background: C.gold }} />
      <span style={{ fontFamily: FONT.sans, fontSize: 19, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, opacity: w }}>{children}</span>
    </div>
  );
};

export { C, FONT, rmp };
