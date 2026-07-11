/**
 * Cinematic motion helpers — dynamic camera (zoom/pan), spring/eased reveals,
 * counters, stagger. Camera moves live inside a scene's audio-locked window so
 * VO sync is never affected (see timing.ts).
 */
import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

/* ---------- easing ---------- */
export const EASE = {
  out: Easing.bezier(0.16, 1, 0.3, 1), // strong ease-out (premium settle)
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  in: Easing.bezier(0.4, 0, 1, 1),
} as const;

/** 0→1 ramp between [start,end] frames with ease-out by default. */
export function ramp(frame: number, start: number, end: number, ease = EASE.out) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
}

/** Damped premium spring 0→1. */
export function useSpringIn(delay = 0, damping = 200, stiffness = 120) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, stiffness, mass: 1 } });
}

/* ---------- Camera: continuous zoom + pan across a scene ---------- */
export const Camera: React.FC<{
  children: React.ReactNode;
  from?: { scale?: number; x?: number; y?: number };
  to?: { scale?: number; x?: number; y?: number };
  start?: number;
  end?: number;
  ease?: (n: number) => number;
  origin?: string;
}> = ({ children, from = {}, to = {}, start = 0, end, ease = EASE.inOut, origin = "50% 50%" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const e = end ?? durationInFrames;
  const t = interpolate(frame, [start, e], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const s0 = from.scale ?? 1, s1 = to.scale ?? s0;
  const x0 = from.x ?? 0, x1 = to.x ?? x0;
  const y0 = from.y ?? 0, y1 = to.y ?? y0;
  const scale = s0 + (s1 - s0) * t;
  const x = x0 + (x1 - x0) * t;
  const y = y0 + (y1 - y0) * t;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        transformOrigin: origin,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

/** Slow continuous drift (Ken Burns) — subtle life on otherwise still frames. */
export const Drift: React.FC<{
  children: React.ReactNode;
  scaleFrom?: number;
  scaleTo?: number;
  x?: number;
  y?: number;
}> = ({ children, scaleFrom = 1.04, scaleTo = 1.12, x = 0, y = 0 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;
  const scale = scaleFrom + (scaleTo - scaleFrom) * t;
  return (
    <div style={{ width: "100%", height: "100%", transform: `scale(${scale}) translate(${x * t}px, ${y * t}px)`, transformOrigin: "50% 50%" }}>
      {children}
    </div>
  );
};

/* ---------- Reveal wrappers ---------- */
export const FadeUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
  durationFrames?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, y = 28, durationFrames = 22, style }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + durationFrames);
  return (
    <div style={{ opacity: p, transform: `translateY(${(1 - p) * y}px)`, ...style }}>
      {children}
    </div>
  );
};

export const ScaleIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  from?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, from = 0.9, style }) => {
  const s = useSpringIn(delay);
  const scale = from + (1 - from) * s;
  return <div style={{ opacity: s, transform: `scale(${scale})`, ...style }}>{children}</div>;
};

/** Staggered children: each child fades-up offset by `stagger` frames. */
export const Stagger: React.FC<{
  children: React.ReactNode;
  delay?: number;
  stagger?: number;
  y?: number;
  style?: React.CSSProperties;
  childStyle?: React.CSSProperties;
}> = ({ children, delay = 0, stagger = 4, y = 22, style, childStyle }) => {
  return (
    <div style={style}>
      {React.Children.map(children, (child, i) => (
        <FadeUp delay={delay + i * stagger} y={y} style={childStyle}>
          {child}
        </FadeUp>
      ))}
    </div>
  );
};

/* ---------- Animated number counter ---------- */
export const Counter: React.FC<{
  to: number;
  from?: number;
  delay?: number;
  durationFrames?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  format?: (n: number) => string;
  style?: React.CSSProperties;
}> = ({ to, from = 0, delay = 0, durationFrames = 34, prefix = "", suffix = "", decimals = 0, format, style }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + durationFrames);
  const val = from + (to - from) * p;
  const body = format ? format(val) : val.toFixed(decimals);
  return (
    <span style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {prefix}
      {body}
      {suffix}
    </span>
  );
};

/** SVG path draw-on (stroke) 0→1. */
export function useDraw(delay = 0, durationFrames = 30) {
  const frame = useCurrentFrame();
  return ramp(frame, delay, delay + durationFrames);
}
