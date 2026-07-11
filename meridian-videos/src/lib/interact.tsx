/**
 * Animated UI "interaction" kit — makes static mockups feel alive: a cursor that
 * moves and taps, ripples, incoming notifications, highlight rings, typewriter,
 * toggles flipping, checklists completing, bars/charts drawing. Confident, snappy.
 * Built on spring physics + eased ramps (Remotion best practice).
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { C, FONT } from "../theme";

const EOUT = Easing.bezier(0.16, 1, 0.3, 1);
export const rmp = (f: number, a: number, b: number, e = EOUT) =>
  interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });

/** A cursor that springs from `from` to `to`, then taps (scale dip + ripple) at `tapAt`. */
export const Cursor: React.FC<{
  from: [number, number]; to: [number, number]; moveAt?: number; tapAt?: number; color?: string;
}> = ({ from, to, moveAt = 0, tapAt = 20, color = C.ink }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - moveAt, fps, config: { damping: 200, stiffness: 120 } });
  const x = from[0] + (to[0] - from[0]) * s;
  const y = from[1] + (to[1] - from[1]) * s;
  const tap = frame >= tapAt ? Math.max(0, 1 - Math.abs(frame - tapAt) / 6) : 0;
  const ripple = rmp(frame, tapAt, tapAt + 20);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${x}px, ${y}px)`, zIndex: 50 }}>
      {frame >= tapAt && frame < tapAt + 22 && (
        <div style={{ position: "absolute", left: 2, top: 2, width: 44 * ripple, height: 44 * ripple, borderRadius: 999, border: `2px solid ${C.gold}`, opacity: 1 - ripple, transform: "translate(-50%,-50%)" }} />
      )}
      <svg width="34" height="34" viewBox="0 0 24 24" style={{ transform: `scale(${1 - tap * 0.18})`, filter: "drop-shadow(0 4px 8px rgba(19,33,60,0.35))" }}>
        <path d="M4 2 L20 12 L13 13 L17 21 L14 22 L10 14 L4 18 Z" fill="#fff" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

/** Notification card that slides in from the top-right with a spring, then holds. */
export const Notification: React.FC<{
  title: string; body: string; at?: number; icon?: React.ReactNode; x?: number; y?: number; w?: number;
}> = ({ title, body, at = 0, icon, x = 0, y = 0, w = 360 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 180, stiffness: 140 } });
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, transform: `translateY(${(1 - s) * -40}px)`, opacity: s, background: "#fff", borderRadius: 16, boxShadow: "0 18px 50px rgba(19,33,60,0.18)", padding: "14px 18px", display: "flex", gap: 12, alignItems: "center", zIndex: 40 }}>
      {icon && <div style={{ width: 38, height: 38, borderRadius: 10, background: C.wash, display: "flex", alignItems: "center", justifyContent: "center", color: C.gold }}>{icon}</div>}
      <div>
        <div style={{ fontFamily: FONT.sans, fontSize: 15, fontWeight: 700, color: C.ink }}>{title}</div>
        <div style={{ fontFamily: FONT.sans, fontSize: 13, color: C.inkSoft, marginTop: 2 }}>{body}</div>
      </div>
    </div>
  );
};

/** Pulsing highlight ring around a UI region — draws attention to a feature. */
export const HighlightRing: React.FC<{ x: number; y: number; w: number; h: number; at?: number; label?: string }> = ({ x, y, w, h, at = 0, label }) => {
  const frame = useCurrentFrame();
  const p = rmp(frame, at, at + 14);
  const pulse = 0.5 + 0.5 * Math.sin((frame - at) / 8);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 16, border: `2.5px solid ${C.gold}`, opacity: p * (0.55 + 0.45 * pulse), boxShadow: `0 0 ${16 + pulse * 16}px rgba(160,138,79,0.4)`, zIndex: 30 }}>
      {label && <div style={{ position: "absolute", left: 0, top: -34, background: C.gold, color: "#fff", fontFamily: FONT.sans, fontSize: 13, fontWeight: 700, padding: "4px 10px", borderRadius: 8, whiteSpace: "nowrap", opacity: p }}>{label}</div>}
    </div>
  );
};

/** Typewriter text — reveals characters over time. */
export const TypeText: React.FC<{ text: string; at?: number; cps?: number; style?: React.CSSProperties; caret?: boolean }> = ({ text, at = 0, cps = 32, style, caret = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = Math.max(0, Math.floor(((frame - at) / fps) * cps));
  const shown = text.slice(0, n);
  const done = n >= text.length;
  return (
    <span style={style}>
      {shown}
      {caret && !done && <span style={{ opacity: Math.floor(frame / 8) % 2 ? 1 : 0.2 }}>|</span>}
    </span>
  );
};

/** A toggle that flips on at `at`. */
export const Toggle: React.FC<{ at?: number; size?: number }> = ({ at = 0, size = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 160, stiffness: 200 } });
  const w = 52 * size, h = 30 * size, k = 22 * size;
  return (
    <div style={{ width: w, height: h, borderRadius: h, background: interpolateColor(s), position: "relative" }}>
      <div style={{ position: "absolute", top: (h - k) / 2, left: (h - k) / 2 + (w - k - (h - k)) * s, width: k, height: k, borderRadius: 999, background: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }} />
    </div>
  );
};
function interpolateColor(t: number) {
  // ink/10 -> success
  const a = [19, 33, 60], b = [62, 124, 89];
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return t < 0.5 ? "rgba(19,33,60,0.15)" : `rgb(${c[0]},${c[1]},${c[2]})`;
}

/** Checklist rows that complete (check pops) one by one. */
export const Checklist: React.FC<{ items: string[]; at?: number; stagger?: number; light?: boolean }> = ({ items, at = 0, stagger = 12, light = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {items.map((it, i) => {
        const s = spring({ frame: frame - at - i * stagger, fps, config: { damping: 200, stiffness: 180 } });
        return (
          <div key={it} style={{ display: "flex", alignItems: "center", gap: 12, opacity: rmp(frame, at + i * stagger - 6, at + i * stagger + 8) }}>
            <div style={{ width: 26, height: 26, borderRadius: 999, background: `rgba(62,124,89,${0.12 + 0.88 * s})`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${0.7 + 0.3 * s})` }}>
              <svg width="14" height="14" viewBox="0 0 24 24"><path d="M5 12 l5 5 l9 -11" fill="none" stroke={s > 0.5 ? "#fff" : C.success} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30" strokeDashoffset={30 * (1 - s)} /></svg>
            </div>
            <span style={{ fontFamily: FONT.sans, fontSize: 18, fontWeight: 600, color: light ? C.ink : "#fff" }}>{it}</span>
          </div>
        );
      })}
    </div>
  );
};

/** A bar that grows to `pct` width. */
export const GrowBar: React.FC<{ pct: number; at?: number; w?: number; color?: string }> = ({ pct, at = 0, w = 300, color = C.gold }) => {
  const frame = useCurrentFrame();
  const p = rmp(frame, at, at + 24);
  return (
    <div style={{ width: w, height: 8, borderRadius: 8, background: "rgba(19,33,60,0.1)", overflow: "hidden" }}>
      <div style={{ width: `${pct * p}%`, height: "100%", borderRadius: 8, background: color }} />
    </div>
  );
};

export { C, FONT, EOUT };
