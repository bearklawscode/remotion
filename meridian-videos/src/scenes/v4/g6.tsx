/**
 * VIDEO 4 — Group 6 (added for v3): breadth + MECE summary.
 *   MontageOps        — fast grid of operational surfaces (no VO, MrBeast rhythm)
 *   MontageCommercial — fast grid of commercial surfaces (no VO)
 *   Personas          — "WHOEVER YOU ARE, A SURFACE FOR YOU."  four roles
 *   BigPicture        — the one-frame summary: What / Why / Who / What-it-does
 *
 * Montages carry their own internal rhythm (a highlight sweep across tiles) so
 * the VO-less stretches never feel static. Headlines live in protected bands.
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import {
  BedDouble,
  Wrench,
  ConciergeBell,
  UtensilsCrossed,
  ShieldCheck,
  Sparkles,
  LineChart,
  Share2,
  Users,
  Megaphone,
  ShoppingCart,
  Building2,
  User,
  Crown,
  Eye,
  MessageSquare,
  Zap,
  Globe2,
} from "lucide-react";
import { Stage, Snap, Kicker } from "./kit";
import { C, FONT } from "../../theme";
import { rmp } from "../../lib/interact";

/* ═══════════════════════════════════════════════════════════════════════
   Shared: a montage grid of surface tiles with a sweeping highlight.
   ═══════════════════════════════════════════════════════════════════════ */
type Tile = { icon: React.ReactNode; label: string; metric: string; pct: number };

const MontageGrid: React.FC<{
  kicker: string; white: string; gold: string; tiles: Tile[]; bg?: string;
}> = ({ kicker, white, gold, tiles, bg = C.ink }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  // a highlight index that advances across the tiles over the scene
  const gridStart = 44;
  const sweepEvery = Math.max(18, Math.floor((durationInFrames - gridStart - 30) / tiles.length));
  const active = Math.floor((frame - gridStart) / sweepEvery);

  return (
    <Stage bg={bg}>
      {/* headline band (top, protected) */}
      <div style={{ position: "absolute", left: 110, top: 84, right: 110 }}>
        <Kicker delay={2}>{kicker}</Kicker>
        <Snap white={white} gold={gold} size={70} delay={8} />
      </div>

      {/* 2×3 grid */}
      <div style={{ position: "absolute", left: 110, top: 322, right: 110, bottom: 90, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(2, 1fr)", gap: 30 }}>
        {tiles.map((t, i) => {
          const at = gridStart + i * 9;
          const s = spring({ frame: frame - at, fps, config: { damping: 200, stiffness: 170 } });
          const isActive = active === i;
          const pop = isActive ? spring({ frame: frame - (gridStart + i * sweepEvery), fps, config: { damping: 140, stiffness: 200 } }) : 0;
          return (
            <div
              key={t.label}
              style={{
                position: "relative", borderRadius: 22, padding: "30px 32px",
                background: isActive ? "rgba(160,138,79,0.14)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${isActive ? "rgba(160,138,79,0.5)" : "rgba(255,255,255,0.13)"}`,
                boxShadow: isActive ? "0 24px 60px rgba(160,138,79,0.28)" : "0 16px 40px rgba(0,0,0,0.28)",
                opacity: rmp(frame, at - 4, at + 10),
                transform: `translateY(${(1 - s) * 44}px) scale(${(0.9 + 0.1 * s) + pop * 0.02})`,
                transformOrigin: "50% 50%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 62, height: 62, borderRadius: 16, flexShrink: 0, background: "rgba(160,138,79,0.16)", display: "flex", alignItems: "center", justifyContent: "center", color: C.goldSoft }}>{t.icon}</div>
                <div style={{ fontFamily: FONT.display, fontSize: 30, color: "#fff", lineHeight: 1 }}>{t.label}</div>
              </div>
              <div style={{ marginTop: 26, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: FONT.sans, fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>{t.metric}</span>
              </div>
              {/* full-width progress bar (percentage of container, never overflows) */}
              <div style={{ marginTop: 14, height: 8, borderRadius: 8, background: "rgba(255,255,255,0.12)", overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 8, background: `linear-gradient(90deg, ${C.goldSoft}, ${C.gold})`, width: `${t.pct * rmp(frame, at + 12, at + 34)}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

/* 1) MONTAGE — OPERATIONS (no VO) */
export const MontageOps: React.FC = () => (
  <MontageGrid
    kicker="On the ground"
    white="EVERY OPERATION,"
    gold="ONE SURFACE."
    tiles={[
      { icon: <BedDouble size={30} />, label: "Housekeeping", metric: "42 rooms · live status", pct: 82 },
      { icon: <Wrench size={30} />, label: "Maintenance", metric: "6 work orders open", pct: 64 },
      { icon: <ConciergeBell size={30} />, label: "Front Desk", metric: "18 arrivals today", pct: 74 },
      { icon: <UtensilsCrossed size={30} />, label: "F&B", metric: "3 outlets · covers live", pct: 58 },
      { icon: <ShieldCheck size={30} />, label: "Security", metric: "All zones nominal", pct: 96 },
      { icon: <Sparkles size={30} />, label: "Concierge", metric: "12 guest requests", pct: 70 },
    ]}
  />
);

/* 2) MONTAGE — COMMERCIAL (no VO) */
export const MontageCommercial: React.FC = () => (
  <MontageGrid
    kicker="Above the property"
    white="EVERY COMMERCIAL LEVER,"
    gold="CONNECTED."
    tiles={[
      { icon: <LineChart size={30} />, label: "Revenue", metric: "RevPAR +8.2% YoY", pct: 88 },
      { icon: <Share2 size={30} />, label: "Distribution", metric: "9 channels synced", pct: 76 },
      { icon: <Users size={30} />, label: "CRM & Loyalty", metric: "2.4M members", pct: 84 },
      { icon: <Megaphone size={30} />, label: "Marketing", metric: "14 campaigns live", pct: 62 },
      { icon: <ShoppingCart size={30} />, label: "Procurement", metric: "Group rates applied", pct: 68 },
      { icon: <Building2 size={30} />, label: "Development", metric: "1,000 by 2029", pct: 59 },
    ]}
  />
);

/* ═══════════════════════════════════════════════════════════════════════
   3) PERSONAS — "WHOEVER YOU ARE, A SURFACE FOR YOU."
   VO o16: manager, staff, owner, or guest — there's a surface built for you.
   ═══════════════════════════════════════════════════════════════════════ */
const PERSONAS = [
  { icon: <Building2 size={34} />, role: "MANAGER", sees: "The whole property in one live view", tag: "Command center" },
  { icon: <User size={34} />, role: "STAFF", sees: "The next task, and the answer to any question", tag: "In every hand" },
  { icon: <Crown size={34} />, role: "OWNER", sees: "Consolidated performance, in real time", tag: "Portfolio clarity" },
  { icon: <ConciergeBell size={34} />, role: "GUEST", sees: "One seamless Minor, across every brand", tag: "Recognized" },
];

export const Personas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage bg={C.ink}>
      {/* headline band top-center */}
      <div style={{ position: "absolute", top: 100, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Kicker delay={2}>Built for everyone</Kicker>
        <Snap white="WHOEVER YOU ARE," gold="A SURFACE FOR YOU." size={74} delay={8} align="center" />
      </div>

      {/* four persona columns */}
      <div style={{ position: "absolute", left: 110, right: 110, top: 372, display: "flex", gap: 28 }}>
        {PERSONAS.map((p, i) => {
          const at = 40 + i * 14;
          const s = spring({ frame: frame - at, fps, config: { damping: 200, stiffness: 160 } });
          return (
            <div key={p.role} style={{ flex: 1, height: 520, borderRadius: 24, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 22px 54px rgba(0,0,0,0.3)", padding: "38px 32px", display: "flex", flexDirection: "column", opacity: rmp(frame, at - 4, at + 12), transform: `translateY(${(1 - s) * 54}px) scale(${0.92 + 0.08 * s})` }}>
              <div style={{ width: 84, height: 84, borderRadius: 22, background: "rgba(160,138,79,0.16)", border: "1px solid rgba(160,138,79,0.36)", display: "flex", alignItems: "center", justifyContent: "center", color: C.gold }}>{p.icon}</div>
              <div style={{ marginTop: 30, fontFamily: FONT.display, fontSize: 40, letterSpacing: "0.04em", color: "#fff" }}>{p.role}</div>
              <div style={{ marginTop: 8, fontFamily: FONT.sans, fontSize: 14, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.goldSoft }}>{p.tag}</div>
              <div style={{ marginTop: 22, fontFamily: FONT.serif, fontSize: 22, lineHeight: 1.4, color: "rgba(255,255,255,0.82)" }}>{p.sees}</div>
              <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10, fontFamily: FONT.sans, fontSize: 14, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: C.success, opacity: rmp(frame, at + 30, at + 46) }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: C.success }} /> Built in
              </div>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   4) BIG PICTURE — the one-frame MECE summary.
   VO o17: One platform. Six service domains. Every role, every property — integrated.
   Four quadrants answer: WHAT IT IS · WHY · WHO IT'S FOR · WHAT IT DOES,
   radiating from a center MERIDIAN lockup.
   ═══════════════════════════════════════════════════════════════════════ */
const QUAD = [
  {
    k: "WHAT IT IS", icon: <Globe2 size={26} />, at: 60,
    lines: ["The intelligence layer", "+ unified portal", "on top of every system"],
  },
  {
    k: "WHY", icon: <LineChart size={26} />, at: 76,
    lines: ["1,000 properties by 2029", "12+ systems, unified", "days, not months"],
  },
  {
    k: "WHO IT'S FOR", icon: <Users size={26} />, at: 92,
    lines: ["Manager · Staff", "Owner · Guest", "a surface for each"],
  },
  {
    k: "WHAT IT DOES", icon: <Zap size={26} />, at: 108,
    lines: ["See · Ask · Act", "across every domain", "one approval, zero tabs"],
  },
];
const DOABLE = [
  { icon: <Eye size={20} />, t: "SEE" },
  { icon: <MessageSquare size={20} />, t: "ASK" },
  { icon: <Zap size={20} />, t: "ACT" },
  { icon: <Globe2 size={20} />, t: "SCALE" },
];

export const BigPicture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const hubS = spring({ frame: frame - 18, fps, config: { damping: 200, stiffness: 130 } });
  const line = rmp(frame, 150, 176);

  // quadrant anchor positions (corners), center hub at 960,470
  const spots = [
    { x: 120, y: 250, ax: "left", ay: "top" },
    { x: 1240, y: 250, ax: "left", ay: "top" },
    { x: 120, y: 610, ax: "left", ay: "top" },
    { x: 1240, y: 610, ax: "left", ay: "top" },
  ];

  return (
    <Stage bg={C.ink}>
      {/* kicker top-center (protected, above the diagram) */}
      <div style={{ position: "absolute", top: 60, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Kicker delay={2}>The whole picture</Kicker>
      </div>

      {/* connectors from hub to each quadrant */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {spots.map((s, i) => {
          const tx = s.x + 280;
          const ty = s.y + 80;
          const dr = rmp(frame, QUAD[i].at + 10, QUAD[i].at + 34);
          const hx = 960, hy = 470;
          const x2 = hx + (tx - hx) * dr;
          const y2 = hy + (ty - hy) * dr;
          return <line key={i} x1={hx} y1={hy} x2={x2} y2={y2} stroke={C.gold} strokeWidth={2} opacity={0.4 * dr} strokeDasharray="2 8" strokeLinecap="round" />;
        })}
      </svg>

      {/* four quadrant cards */}
      {QUAD.map((q, i) => {
        const s = spring({ frame: frame - q.at, fps, config: { damping: 200, stiffness: 160 } });
        return (
          <div key={q.k} style={{ position: "absolute", left: spots[i].x, top: spots[i].y, width: 560, borderRadius: 22, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 20px 50px rgba(0,0,0,0.3)", padding: "24px 30px", opacity: rmp(frame, q.at - 4, q.at + 12), transform: `translateY(${(1 - s) * 40}px) scale(${0.94 + 0.06 * s})` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(160,138,79,0.16)", display: "flex", alignItems: "center", justifyContent: "center", color: C.goldSoft }}>{q.icon}</div>
              <span style={{ fontFamily: FONT.sans, fontSize: 17, fontWeight: 800, letterSpacing: "0.2em", color: C.gold }}>{q.k}</span>
            </div>
            <div style={{ marginTop: 16 }}>
              {q.lines.map((l, j) => (
                <div key={l} style={{ fontFamily: FONT.display, fontSize: 26, lineHeight: 1.24, color: "#fff", opacity: rmp(frame, q.at + 10 + j * 5, q.at + 22 + j * 5) }}>{l}</div>
              ))}
            </div>
          </div>
        );
      })}

      {/* center MERIDIAN hub */}
      <div style={{ position: "absolute", left: 960 - 240, top: 470 - 90, width: 480, height: 180, borderRadius: 26, background: `linear-gradient(135deg, ${C.goldSoft}, ${C.gold})`, boxShadow: "0 30px 80px rgba(160,138,79,0.42)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: hubS, transform: `scale(${0.8 + 0.2 * hubS})`, zIndex: 5 }}>
        <div style={{ fontFamily: FONT.display, fontSize: 46, letterSpacing: "0.18em", color: C.ink, paddingLeft: "0.18em" }}>MERIDIAN</div>
        <div style={{ marginTop: 8, fontFamily: FONT.sans, fontSize: 14, fontWeight: 800, letterSpacing: "0.24em", color: "rgba(19,33,60,0.72)" }}>ONE PLATFORM · SIX DOMAINS</div>
      </div>

      {/* bottom integrated strip: See · Ask · Act · Scale */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 66, display: "flex", justifyContent: "center", gap: 18, opacity: line }}>
        {DOABLE.map((d, i) => (
          <div key={d.t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 24px", borderRadius: 999, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(160,138,79,0.36)", color: "#fff", transform: `translateY(${(1 - rmp(frame, 154 + i * 6, 174 + i * 6)) * 14}px)` }}>
            <span style={{ color: C.goldSoft }}>{d.icon}</span>
            <span style={{ fontFamily: FONT.sans, fontSize: 17, fontWeight: 800, letterSpacing: "0.18em" }}>{d.t}</span>
          </div>
        ))}
      </div>
    </Stage>
  );
};
