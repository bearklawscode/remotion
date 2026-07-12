/**
 * VIDEO 4 — Group 7 (v4 ending crescendo). Psychology of a high-impact close:
 * raise the stakes (first-mover urgency / FOMO), name the locked value, hand over
 * the key, then a rallying call to action. Builds to the single brand lockup.
 *   WhyNow  — "THE ADVANTAGE WON'T WAIT."   the field is moving (bar race)
 *   Unlock  — "THE VALUE IS LOCKED IN."     a padlock springs open, light bursts
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { Stage, Snap, Kicker } from "./kit";
import { C, FONT } from "../../theme";
import { rmp } from "../../lib/interact";

/* ═══════════════════════════════════════════════════════════════════════
   1) WHY NOW — navy — first-mover urgency (a bar race the gold lane wins)
   VO o19: The technology is here. The strategy is set. And the advantage won't
   wait — whoever moves first will define the decade.
   ═══════════════════════════════════════════════════════════════════════ */
const LANES = [
  { label: "MINOR — first mover", pct: 96, at: 40, dur: 60, gold: true },
  { label: "The field", pct: 72, at: 58, dur: 96 },
  { label: "The field", pct: 63, at: 66, dur: 104 },
  { label: "The field", pct: 78, at: 74, dur: 90 },
];

export const WhyNow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const panelS = spring({ frame: frame - 26, fps, config: { damping: 200, stiffness: 140 } });

  return (
    <Stage bg={C.ink}>
      {/* headline band (top-left, protected) */}
      <div style={{ position: "absolute", left: 110, top: 96, width: 1300 }}>
        <Kicker delay={2}>Why now</Kicker>
        <Snap white="THE TECHNOLOGY IS HERE." gold="THE ADVANTAGE WON'T WAIT." size={72} delay={8} />
      </div>

      {/* the race panel */}
      <div style={{ position: "absolute", left: 110, top: 372, right: 110, height: 500, background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: "34px 46px", opacity: panelS, transform: `translateY(${(1 - panelS) * 34}px)` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontFamily: FONT.sans, fontSize: 16, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.goldSoft }}>The field is moving</span>
          <span style={{ fontFamily: FONT.sans, fontSize: 15, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>First mover · defines the decade</span>
        </div>

        {/* finish line */}
        <div style={{ position: "absolute", left: 46, right: 46, top: 92, bottom: 40 }}>
          <div style={{ position: "absolute", right: "4%", top: 0, bottom: 0, width: 2, background: "rgba(255,255,255,0.25)", opacity: rmp(frame, 34, 54) }} />
          {LANES.map((ln, i) => {
            const p = rmp(frame, ln.at, ln.at + ln.dur);
            const w = ln.pct * p; // percent of track
            const top = i * 96;
            return (
              <div key={i} style={{ position: "absolute", left: 0, right: 0, top }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontFamily: FONT.sans, fontSize: 17, fontWeight: ln.gold ? 800 : 600, letterSpacing: ln.gold ? "0.08em" : "0.02em", color: ln.gold ? "#fff" : "rgba(255,255,255,0.55)" }}>{ln.label}</span>
                  {ln.gold && <span style={{ fontFamily: FONT.sans, fontSize: 14, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: C.gold, opacity: rmp(frame, ln.at + 50, ln.at + 66) }}>Ahead</span>}
                </div>
                {/* track */}
                <div style={{ position: "relative", height: 16, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${w}%`, borderRadius: 999, background: ln.gold ? `linear-gradient(90deg, ${C.goldSoft}, ${C.gold})` : "rgba(150,207,212,0.28)", boxShadow: ln.gold ? "0 0 22px rgba(160,138,79,0.55)" : "none" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Stage>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   2) UNLOCK — navy — the locked value + the key
   VO o20: The value is already ours, locked inside the systems we run today.
   Meridian is the key that unlocks it.
   ═══════════════════════════════════════════════════════════════════════ */
const RAYS = Array.from({ length: 16 }, (_, i) => (i * 360) / 16);

export const Unlock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const OPEN = 92; // frame the lock springs open
  const s = spring({ frame: frame - 20, fps, config: { damping: 200, stiffness: 150 } });
  const open = spring({ frame: frame - OPEN, fps, config: { damping: 12, stiffness: 180 } });
  const burst = rmp(frame, OPEN, OPEN + 30);
  const cx = 960, cy = 560;

  return (
    <Stage bg={C.ink}>
      {/* headline band (top-center, protected) */}
      <div style={{ position: "absolute", top: 92, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Kicker delay={2}>The opportunity</Kicker>
        <Snap white="THE VALUE IS ALREADY OURS." gold="LOCKED IN." size={66} delay={8} align="center" />
      </div>

      {/* light burst on unlock */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {RAYS.map((deg, i) => {
          const r0 = 90, r1 = 90 + 360 * burst;
          const rad = (deg * Math.PI) / 180;
          return (
            <line key={i} x1={cx + Math.cos(rad) * r0} y1={cy + Math.sin(rad) * r0} x2={cx + Math.cos(rad) * r1} y2={cy + Math.sin(rad) * r1}
              stroke={C.gold} strokeWidth={2} opacity={(1 - burst) * 0.5} strokeLinecap="round" />
          );
        })}
        <circle cx={cx} cy={cy} r={60 + 320 * burst} fill="none" stroke={C.goldSoft} strokeWidth={2} opacity={(1 - burst) * 0.6} />
      </svg>

      {/* padlock */}
      <div style={{ position: "absolute", left: cx - 110, top: cy - 130, width: 220, height: 260, opacity: rmp(frame, 20, 40), transform: `scale(${0.7 + 0.3 * s})` }}>
        <svg width={220} height={260} viewBox="0 0 220 260">
          {/* shackle — lifts straight up out of the body (clearly "open") */}
          <g style={{ transform: `translateY(${-open * 40}px)` }}>
            <path d="M70 110 V80 a40 40 0 0 1 80 0 V110" fill="none" stroke={frame >= OPEN ? C.gold : "#fff"} strokeWidth={16} strokeLinecap="round" />
          </g>
          {/* body */}
          <rect x={52} y={108} width={116} height={104} rx={18} fill={`url(#lockg)`} stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} />
          <defs>
            <linearGradient id="lockg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={C.goldSoft} />
              <stop offset="1" stopColor={C.gold} />
            </linearGradient>
          </defs>
          {/* keyhole */}
          <circle cx={110} cy={150} r={12} fill={C.ink} />
          <rect x={104} y={150} width={12} height={30} rx={4} fill={C.ink} />
        </svg>
      </div>

      {/* payoff line */}
      <div style={{ position: "absolute", left: 0, right: 0, top: cy + 170, textAlign: "center", opacity: rmp(frame, OPEN + 14, OPEN + 34), transform: `translateY(${(1 - rmp(frame, OPEN + 14, OPEN + 34)) * 16}px)` }}>
        <span style={{ fontFamily: FONT.display, fontSize: 52, color: "#fff" }}>Meridian is the </span>
        <span style={{ fontFamily: FONT.display, fontSize: 52, color: C.gold }}>key.</span>
      </div>
    </Stage>
  );
};
