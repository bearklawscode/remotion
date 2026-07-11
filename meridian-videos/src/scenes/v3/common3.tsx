/** Shared navy-deck primitives for Video 3 (matches the Technical Deck aesthetic). */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { C, FONT } from "../../theme";
import { ramp, EASE } from "../../lib/motion";

export const NAVY = C.ink;
export const PAPER = C.paper;

/** Animated navy backdrop — slow drifting radial glows so the frame is never static. */
export const DeckStage: React.FC<{ children: React.ReactNode; bg?: string; pad?: number }> = ({ children, bg = NAVY, pad = 110 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const t = frame / 30;
  const gx = width * (0.5 + 0.18 * Math.sin(t * 0.12));
  const gy = height * (0.4 + 0.14 * Math.cos(t * 0.1));
  const light = bg === PAPER;
  return (
    <AbsoluteFill style={{ backgroundColor: bg, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: light
            ? `radial-gradient(1200px 800px at ${gx}px ${gy}px, rgba(160,138,79,0.08), transparent 70%)`
            : `radial-gradient(1200px 800px at ${gx}px ${gy}px, rgba(160,138,79,0.10), transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: light
            ? `radial-gradient(1000px 700px at ${width - gx}px ${height - gy}px, rgba(150,207,212,0.06), transparent 70%)`
            : `radial-gradient(1000px 700px at ${width - gx}px ${height - gy}px, rgba(150,207,212,0.05), transparent 70%)`,
        }}
      />
      <AbsoluteFill style={{ padding: pad, justifyContent: "center" }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Deck eyebrow: gold rule + letterspaced caps (top-left of a slide). */
export const Eyebrow3: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  const w = ramp(frame, delay, delay + 16);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26 }}>
      <div style={{ width: 44 * w, height: 2, background: C.gold }} />
      <span style={{ fontFamily: FONT.sans, fontSize: 21, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: C.gold, opacity: w }}>
        {children}
      </span>
    </div>
  );
};

/** Deck headline — condensed caps, second half gold; word-stagger kinetic entrance. */
export const Headline3: React.FC<{ white: string; gold?: string; size?: number; delay?: number; light?: boolean }> = ({ white, gold, size = 92, delay = 0, light }) => {
  const frame = useCurrentFrame();
  const words = [...white.split(" ").map((w) => ({ w, gold: false })), ...(gold ? gold.split(" ").map((w) => ({ w, gold: true })) : [])];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0 0.26em", fontFamily: FONT.display, fontSize: size, lineHeight: 0.96 }}>
      {words.map((o, i) => {
        const p = ramp(frame, delay + i * 3, delay + i * 3 + 14);
        return (
          <span key={i} style={{ display: "inline-block", opacity: p, transform: `translateY(${(1 - p) * 24}px)`, color: o.gold ? C.gold : light ? C.ink : "#fff" }}>
            {o.w}
          </span>
        );
      })}
    </div>
  );
};

/** Supporting sub-line (serif, muted). */
export const SubLine: React.FC<{ children: React.ReactNode; delay?: number; light?: boolean; max?: number }> = ({ children, delay = 0, light, max = 1400 }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + 18);
  return (
    <div style={{ fontFamily: FONT.serif, fontSize: 30, lineHeight: 1.4, color: light ? C.inkSoft : "rgba(255,255,255,0.72)", maxWidth: max, marginTop: 22, opacity: p, transform: `translateY(${(1 - p) * 14}px)` }}>
      {children}
    </div>
  );
};

/** Italic takeaway bar (gold left-rule) — the deck's signature bottom strip. */
export const Takeaway3: React.FC<{ children: React.ReactNode; delay?: number; light?: boolean }> = ({ children, delay = 0, light }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + 20);
  return (
    <div style={{ position: "absolute", left: 110, right: 110, bottom: 70, opacity: p, transform: `translateY(${(1 - p) * 12}px)` }}>
      <div style={{ borderLeft: `3px solid ${C.gold}`, background: light ? "rgba(19,33,60,0.04)" : "rgba(255,255,255,0.04)", padding: "18px 28px" }}>
        <span style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 26, color: light ? C.ink : "rgba(255,255,255,0.86)" }}>{children}</span>
      </div>
    </div>
  );
};

/** Big animated stat — counter + label, deck style. */
export const Stat3: React.FC<{ value: React.ReactNode; label: string; delay?: number; light?: boolean }> = ({ value, label, delay = 0, light }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + 16);
  return (
    <div style={{ opacity: p, transform: `translateY(${(1 - p) * 20}px)` }}>
      <div style={{ fontFamily: FONT.display, fontSize: 92, lineHeight: 0.9, color: light ? C.ink : "#fff", fontVariantNumeric: "tabular-nums" }}>{value}</div>
      <div style={{ fontFamily: FONT.sans, fontSize: 17, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: light ? C.mist : "rgba(255,255,255,0.55)", marginTop: 10 }}>{label}</div>
    </div>
  );
};

/** A vendor "chip" — text treatment (no external logos; on-brand, avoids wrong-logo risk). */
export const VendorChip: React.FC<{ name: string; tag?: string; delay?: number; light?: boolean; accent?: boolean }> = ({ name, tag, delay = 0, light, accent }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + 14);
  return (
    <div style={{ opacity: p, transform: `translateY(${(1 - p) * 18}px) scale(${0.96 + p * 0.04})`, background: light ? "#fff" : "rgba(255,255,255,0.04)", border: `1px solid ${accent ? C.gold : light ? C.hairline : "rgba(255,255,255,0.12)"}`, borderRadius: 14, padding: "18px 22px", minWidth: 220 }}>
      <div style={{ fontFamily: FONT.display, fontSize: 30, color: accent ? C.gold : light ? C.ink : "#fff" }}>{name}</div>
      {tag && <div style={{ fontFamily: FONT.sans, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: light ? C.mist : "rgba(255,255,255,0.5)", marginTop: 6 }}>{tag}</div>}
    </div>
  );
};

export { ramp, EASE, C, FONT };
