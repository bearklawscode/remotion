/**
 * VIDEO 4 · Opening group (ColdOpen · Thesis · Problem · TheMove).
 * Confident MBB/McKinsey sizzle energy — declarative kinetic type, everything MOVES:
 * words snap in on spring, stats race up, system chips scatter/drift then converge into
 * one ordered surface. Fast, premium, never a static hold.
 */
import React from "react";
import {
  AbsoluteFill,
  Img,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Stage, Snap, Kicker, C, FONT } from "./kit";
import { Counter } from "../../lib/motion";
import { rmp } from "../../lib/interact";

/* ---------------------------------------------------------------- */
/* Shared: the 11 real Meridian systems (asset manifest tech-stack)  */
/* ---------------------------------------------------------------- */
const LOGOS = [
  "oracle.svg", "sap.svg", "salesforce.svg", "jira.svg", "sharepoint.svg",
  "teams.svg", "mews.svg", "shiji.svg", "hubos-icon.png", "messagebox.png", "okami.png",
];

/** A crisp white rounded chip carrying a system logo. */
const Chip: React.FC<{ src: string; size?: number; connectedAt?: number }> = ({ src, size = 64, connectedAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const g = connectedAt != null ? spring({ frame: frame - connectedAt, fps, config: { damping: 12, stiffness: 220, mass: 0.6 } }) : 0;
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.26, background: "#fff", boxShadow: "0 12px 30px rgba(0,0,0,0.34), 0 2px 6px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <Img src={staticFile("assets/tech-stack/" + src)} style={{ maxWidth: size * 0.6, maxHeight: size * 0.48, objectFit: "contain" }} />
      {connectedAt != null && (
        <div style={{ position: "absolute", right: -5, top: -5, width: 18, height: 18, borderRadius: 999, background: C.success, border: "2.5px solid " + C.ink, transform: `scale(${g})`, boxShadow: "0 0 10px rgba(62,124,89,0.7)" }} />
      )}
    </div>
  );
};

/* ================================================================ */
/* 1 · COLD OPEN — cinematic logo hit (180f)                         */
/* ================================================================ */
const COLD_WORD = "MERIDIAN";
const PARTICLES = Array.from({ length: 34 }, (_, i) => ({
  x: (i * 61.8) % 100,
  y: (i * 37.7 + 13) % 100,
  r: 1 + (i % 3),
  ph: (i * 29) % 100,
}));

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // full-width gold "snap" across center — the hit
  const sweep = rmp(frame, 2, 16);
  const sweepOp = rmp(frame, 2, 8) * (1 - rmp(frame, 18, 40));

  // meridian underline draws outward from center
  const line = rmp(frame, 34, 58);
  const byline = rmp(frame, 62, 82);

  // alive breathe once assembled
  const breathe = 1 + 0.008 * Math.sin(Math.max(0, frame - 92) / 22);

  return (
    <Stage>
      {/* particle shimmer */}
      <AbsoluteFill>
        {PARTICLES.map((p, i) => {
          const tw = 0.15 + 0.55 * Math.abs(Math.sin((frame + p.ph * 3) / 16));
          const rise = rmp(frame, 10 + i, 40 + i);
          return (
            <div key={i} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.r, height: p.r, borderRadius: 999, background: C.gold, opacity: tw * rise * 0.9, boxShadow: `0 0 ${p.r * 3}px rgba(160,138,79,0.8)` }} />
          );
        })}
      </AbsoluteFill>

      {/* center hit line */}
      <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 2, transform: `translateY(-1px) scaleX(${sweep})`, background: `linear-gradient(90deg, transparent, ${C.gold} 20%, ${C.goldSoft} 50%, ${C.gold} 80%, transparent)`, opacity: sweepOp }} />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `scale(${breathe})` }}>
          {/* wordmark — letters snap up */}
          <div style={{ display: "flex", fontFamily: FONT.display, fontSize: 152, letterSpacing: "0.16em", lineHeight: 1 }}>
            {COLD_WORD.split("").map((ch, i) => {
              const s = spring({ frame: frame - 18 - i * 3.5, fps, config: { damping: 15, stiffness: 180, mass: 0.7 } });
              return (
                <span key={i} style={{ display: "inline-block", color: "#fff", opacity: rmp(frame, 18 + i * 3.5 - 2, 18 + i * 3.5 + 8), transform: `translateY(${(1 - s) * 54}px) scale(${0.7 + 0.3 * s})` }}>
                  {ch}
                </span>
              );
            })}
          </div>
          {/* gold underline + diamond drawing from center */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 860, height: 22, marginTop: 26 }}>
            <div style={{ flex: line, height: 4, background: C.gold, transformOrigin: "right center" }} />
            <div style={{ width: 14, height: 14, background: C.gold, transform: "rotate(45deg)", margin: "0 10px", opacity: line, boxShadow: "0 0 16px rgba(160,138,79,0.7)" }} />
            <div style={{ flex: line, height: 4, background: C.gold, transformOrigin: "left center" }} />
          </div>
          {/* byline — the tagline (must match the End Card exactly) */}
          <div style={{ marginTop: 30, fontFamily: FONT.sans, fontSize: 21, fontWeight: 700, letterSpacing: "0.30em", color: C.goldSoft, opacity: byline, transform: `translateY(${(1 - byline) * 12}px)`, paddingLeft: "0.30em", textAlign: "center" }}>
            THE INTELLIGENCE LAYER OF MINOR HOTELS
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ================================================================ */
/* 2 · THESIS — the mandate, stats race up (300f)                    */
/* ================================================================ */
type Stat = { to: number; suffix?: string; comma?: boolean; label: string; gold?: boolean };
const STATS: Stat[] = [
  { to: 590, suffix: "+", label: "HOTELS" },
  { to: 1000, comma: true, label: "BY 2029", gold: true },
  { to: 63, label: "COUNTRIES" },
  { to: 80, suffix: "%", label: "ASSET-LIGHT" },
];

export const Thesis: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fill = rmp(frame, 118, 150); // gold dot-row fill

  return (
    <Stage>
      <div style={{ position: "absolute", inset: 0, padding: "120px 130px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Kicker delay={4}>THE MANDATE</Kicker>
        <Snap white="THE STRATEGY IS SET." size={104} delay={10} />

        {/* stats race up */}
        <div style={{ display: "flex", gap: 74, marginTop: 90 }}>
          {STATS.map((st, i) => {
            const d = 56 + i * 13;
            const s = spring({ frame: frame - d, fps, config: { damping: 18, stiffness: 160, mass: 0.7 } });
            return (
              <div key={st.label} style={{ opacity: rmp(frame, d - 4, d + 10), transform: `translateY(${(1 - s) * 46}px)` }}>
                <div style={{ fontFamily: FONT.display, fontSize: 116, lineHeight: 0.9, color: st.gold ? C.gold : "#fff", letterSpacing: "-0.01em" }}>
                  <Counter to={st.to} delay={d} durationFrames={30} suffix={st.suffix} format={st.comma ? (n) => Math.round(n).toLocaleString("en-US") : undefined} />
                </div>
                <div style={{ marginTop: 14, fontFamily: FONT.sans, fontSize: 20, fontWeight: 700, letterSpacing: "0.22em", color: st.gold ? C.goldSoft : "rgba(255,255,255,0.62)" }}>
                  {st.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* gold meridian dot-row fills beneath */}
        <div style={{ display: "flex", gap: 9, marginTop: 46 }}>
          {Array.from({ length: 44 }).map((_, i) => {
            const lit = i / 44 < fill;
            return <div key={i} style={{ width: 8, height: 8, background: C.gold, transform: "rotate(45deg)", opacity: lit ? 0.5 + 0.5 * Math.min(1, (fill - i / 44) * 10) : 0.08 }} />;
          })}
        </div>

        {/* the turn */}
        <div style={{ marginTop: 74 }}>
          <Snap white="THE TECHNOLOGY HAS TO" gold="MATCH." size={84} delay={198} />
        </div>
      </div>
    </Stage>
  );
};

/* ================================================================ */
/* 3 · PROBLEM — great people, tools scatter & drift (300f)          */
/* ================================================================ */
// deterministic scatter — a CONTAINED central cluster (golden-angle spiral).
// Tighter radius + smaller multipliers keep chips in the middle band, clear of
// the top headline and the bottom turn (user note: less chaotic, don't overlap text).
const scatterPos = (i: number, cy = 560) => {
  const a = (i * 137.5 * Math.PI) / 180;
  const r = 150 + (i % 4) * 54; // 150..312, contained
  return {
    x: 960 + Math.cos(a) * r * 1.15,
    y: cy + Math.sin(a) * r * 0.7,
  };
};

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Stage>
      {/* chips fly in to a contained central cluster + gentle contained drift */}
      {LOGOS.map((src, i) => {
        const base = scatterPos(i, 560);
        const d = 18 + i * 4;
        const s = spring({ frame: frame - d, fps, config: { damping: 15, stiffness: 120, mass: 0.8 } });
        // fly inward from just outside the cluster (not from far off-screen)
        const fromX = 960 + (base.x - 960) * 1.35;
        const fromY = 560 + (base.y - 560) * 1.35;
        const x = fromX + (base.x - fromX) * s;
        const y = fromY + (base.y - fromY) * s;
        // small contained drift (floaty, not chaotic)
        const jx = Math.sin((frame + i * 33) / 24) * 6 + Math.cos((frame + i * 17) / 19) * 3;
        const jy = Math.cos((frame + i * 23) / 21) * 6 + Math.sin((frame + i * 11) / 28) * 3;
        const rot = Math.sin((frame + i * 40) / 30) * 3;
        return (
          <div key={src} style={{ position: "absolute", left: x + jx - 32, top: y + jy - 32, transform: `rotate(${rot}deg)`, opacity: rmp(frame, d - 4, d + 8) }}>
            <Chip src={src} size={64} />
          </div>
        );
      })}

      {/* top scrim keeps the headline crisp above the drifting cluster */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 340, background: "linear-gradient(180deg, rgba(19,33,60,0.96), rgba(19,33,60,0.72) 55%, transparent)", pointerEvents: "none" }} />
      {/* top headline */}
      <div style={{ position: "absolute", left: 130, top: 96, right: 130 }}>
        <Kicker delay={4}>THE FRICTION</Kicker>
        <Snap white="GREAT HOTELS RUN ON" gold="GREAT PEOPLE." size={82} delay={10} />
      </div>

      {/* bottom turn — scrim so it stays readable over drifting chips */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 300, background: "linear-gradient(0deg, rgba(19,33,60,0.96), rgba(19,33,60,0.7) 55%, transparent)", opacity: rmp(frame, 150, 168) }} />
      <div style={{ position: "absolute", left: 130, bottom: 104, right: 130 }}>
        <Snap white="THEIR TOOLS SHOULDN'T" gold="SLOW THEM DOWN." size={78} delay={162} />
      </div>
    </Stage>
  );
};

/* ================================================================ */
/* 4 · THE MOVE — chaos converges to one surface (240f)              */
/* ================================================================ */
export const TheMove: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const N = LOGOS.length;
  const chipSize = 74;
  const gap = 22;
  const rowW = N * chipSize + (N - 1) * gap;
  const rowStart = 960 - rowW / 2;
  const rowY = 668;

  const bar = rmp(frame, 52, 88); // gold MERIDIAN bar draws across
  const barTextOp = rmp(frame, 78, 96);

  return (
    <Stage>
      {/* headline */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 150, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Kicker delay={4}>THE ANSWER</Kicker>
        <Snap white="SO WE BUILT" gold="ONE SURFACE." size={100} delay={10} align="center" />
      </div>

      {/* the gold MERIDIAN bar the chips line up beneath */}
      <div style={{ position: "absolute", left: 960 - 560, top: 556, width: 1120, height: 66, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${C.gold}, ${C.goldSoft} 50%, ${C.gold})`, borderRadius: 14, transform: `scaleX(${bar})`, boxShadow: "0 14px 40px rgba(160,138,79,0.35)" }} />
        <span style={{ position: "relative", fontFamily: FONT.display, fontSize: 34, letterSpacing: "0.42em", color: C.ink, opacity: barTextOp, paddingLeft: "0.42em" }}>MERIDIAN</span>
      </div>

      {/* chips converge from scatter into a tidy connected row */}
      {LOGOS.map((src, i) => {
        const scat = scatterPos(i, 640);
        // appear scattered
        const appear = spring({ frame: frame - (4 + i * 3), fps, config: { damping: 14, stiffness: 120, mass: 0.8 } });
        // drift before converge
        const jx = Math.sin((frame + i * 33) / 20) * 10;
        const jy = Math.cos((frame + i * 23) / 17) * 9;
        const sx = scat.x + jx;
        const sy = scat.y + jy;
        // converge to row
        const cAt = 60 + i * 3;
        const conv = spring({ frame: frame - cAt, fps, config: { damping: 20, stiffness: 150, mass: 0.7 } });
        const tx = rowStart + i * (chipSize + gap) + chipSize / 2;
        const x = (sx + (tx - sx) * conv) * appear + tx * (1 - appear);
        const y = sy + (rowY - sy) * conv;
        const rot = (1 - conv) * Math.sin((frame + i * 40) / 24) * 6;
        return (
          <div key={src} style={{ position: "absolute", left: x - chipSize / 2, top: y - chipSize / 2, transform: `rotate(${rot}deg) scale(${0.4 + 0.6 * appear})`, opacity: appear }}>
            <Chip src={src} size={chipSize} connectedAt={conv > 0.01 ? cAt + 24 : undefined} />
          </div>
        );
      })}

      {/* "connected" caption under the settled row */}
      <div style={{ position: "absolute", left: 0, right: 0, top: rowY + 90, textAlign: "center", fontFamily: FONT.sans, fontSize: 22, fontWeight: 700, letterSpacing: "0.3em", color: C.goldSoft, opacity: rmp(frame, 150, 170) }}>
        EVERY SYSTEM · ONE ENTRY POINT
      </div>
    </Stage>
  );
};
