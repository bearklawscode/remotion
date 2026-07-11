/** Video 4 — product-film shared UI. Warm, light, cinematic; humble captions. */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Audio, staticFile } from "remotion";
import { C, FONT, SHADOW } from "../theme";
import { ramp, EASE } from "./motion";

/** Warm paper stage with a soft drifting light — the product-film backdrop. */
export const WarmStage: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg = "#FBF6F0" }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const t = frame / 30;
  const gx = width * (0.5 + 0.16 * Math.sin(t * 0.1));
  const gy = height * (0.42 + 0.12 * Math.cos(t * 0.08));
  return (
    <AbsoluteFill style={{ backgroundColor: bg, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(1300px 900px at ${gx}px ${gy}px, rgba(160,138,79,0.07), transparent 72%)` }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(1000px 700px at ${width - gx}px ${height - gy}px, rgba(150,207,212,0.06), transparent 72%)` }} />
      {children}
    </AbsoluteFill>
  );
};

/** Humble kinetic caption — soft serif, fades in/holds/out. Optional small "label". */
export const Caption: React.FC<{
  text: string;
  sub?: string;
  label?: string;
  start?: number;
  hold?: number;
  x?: string;
  y?: string;
  align?: "left" | "center";
  dark?: boolean;
  size?: number;
}> = ({ text, sub, label, start = 0, hold = 90, x = "50%", y = "50%", align = "center", dark = false, size = 46 }) => {
  const frame = useCurrentFrame();
  const inP = ramp(frame, start, start + 16);
  const outP = ramp(frame, start + hold, start + hold + 16);
  const op = inP * (1 - outP);
  const ink = dark ? "#fff" : C.ink;
  const soft = dark ? "rgba(255,255,255,0.72)" : C.inkSoft;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(${align === "center" ? "-50%" : "0"}, -50%) translateY(${(1 - inP) * 14}px)`,
        textAlign: align,
        opacity: op,
        maxWidth: 1100,
      }}
    >
      {label && (
        <div style={{ fontFamily: FONT.sans, fontSize: 15, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 14 }}>
          {label}
        </div>
      )}
      <div style={{ fontFamily: FONT.serif, fontSize: size, lineHeight: 1.2, color: ink, fontStyle: "italic" }}>{text}</div>
      {sub && <div style={{ fontFamily: FONT.sans, fontSize: 20, color: soft, marginTop: 14, fontWeight: 500 }}>{sub}</div>}
    </div>
  );
};

/** Small floating scenario tag (who / where) — grounds each mockup in a real moment. */
export const ScenarioTag: React.FC<{ who: string; where: string; start?: number; dark?: boolean }> = ({ who, where, start = 0, dark }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, start, start + 18);
  return (
    <div style={{ position: "absolute", left: 64, top: 60, display: "flex", alignItems: "center", gap: 14, opacity: p, transform: `translateY(${(1 - p) * 12}px)` }}>
      <div style={{ width: 8, height: 8, borderRadius: 999, background: C.gold }} />
      <div>
        <div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 700, color: dark ? "#fff" : C.ink }}>{who}</div>
        <div style={{ fontFamily: FONT.sans, fontSize: 14, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.6)" : C.mist }}>{where}</div>
      </div>
    </div>
  );
};

/** Device shells for showcasing mockups cinematically. */
export const LaptopFrame: React.FC<{ children: React.ReactNode; w?: number }> = ({ children, w = 1280 }) => {
  const h = w * (1080 / 1920);
  return (
    <div style={{ width: w }}>
      <div style={{ background: "#0d1526", borderRadius: 18, padding: 10, boxShadow: SHADOW.pop }}>
        <div style={{ height: 22, display: "flex", alignItems: "center", gap: 7, paddingLeft: 6 }}>
          {["#e0605a", "#e8b44a", "#5aa96a"].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: 999, background: c }} />
          ))}
        </div>
        <div style={{ width: "100%", height: h, borderRadius: 8, overflow: "hidden", background: "#fff" }}>
          <div style={{ width: 1920, height: 1080, transform: `scale(${w / 1920})`, transformOrigin: "top left" }}>{children}</div>
        </div>
      </div>
      <div style={{ width: w * 1.08, height: 14, margin: "0 auto", background: "linear-gradient(#c9c4bb,#a8a49c)", borderRadius: "0 0 12px 12px" }} />
    </div>
  );
};

export const MockupNote: React.FC = () => {
  const frame = useCurrentFrame();
  const op = ramp(frame, 10, 26) * 0.6;
  return (
    <div style={{ position: "absolute", right: 26, bottom: 20, fontFamily: FONT.sans, fontSize: 12.5, fontStyle: "italic", color: "rgba(19,33,60,0.5)", opacity: op }}>
      Illustrative mockup — a rough sketch, open to change.
    </div>
  );
};

export const MusicBed4: React.FC<{ volume?: number }> = ({ volume = 0.16 }) => (
  <Audio src={staticFile("vo4/music-bed.mp3")} volume={volume} />
);

export { ramp, EASE, C, FONT, SHADOW };
