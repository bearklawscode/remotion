/**
 * VIDEO 4 — closing movement (rebuilt): four confident, motion-heavy scenes that
 * button the sizzle reel. MBB energy — declarative kinetic type, converging chips,
 * snapping grids, drawing connectors, a cinematic wordmark close.
 *   Connected   — every system still running, wired under the Meridian layer
 *   SixDomains  — six operator domains snap into one platform
 *   Close       — one platform / every role / every property → wordmark
 *   EndCard     — final lockup, premium hold
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, spring, staticFile } from "remotion";
import { Stage, Snap, Kicker, rmp } from "./kit";
import { C, FONT } from "../../theme";
import { ramp } from "../../lib/motion";
import { FlowLine } from "../../lib/v3ui";

/* ------------------------------------------------------------------ */
/* Shared: white "MERIDIAN" wordmark with a gold line that draws outward */
/* ------------------------------------------------------------------ */
const WhiteWordmark: React.FC<{ size?: number; appearFrom?: number; drawFrom?: number }> = ({
  size = 112,
  appearFrom = 0,
  drawFrom = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - appearFrom, fps, config: { damping: 200, stiffness: 120 } });
  const line = ramp(frame, drawFrom, drawFrom + 30);
  const w = size * 4.7;
  const bar = Math.max(2, size * 0.03);
  const node = size * 0.06;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: size * 0.16,
        opacity: s,
        transform: `scale(${0.94 + 0.06 * s})`,
      }}
    >
      <div
        style={{
          fontFamily: FONT.display,
          fontSize: size,
          letterSpacing: "0.26em",
          color: "#fff",
          lineHeight: 1,
          paddingLeft: "0.26em",
        }}
      >
        MERIDIAN
      </div>
      <div style={{ position: "relative", width: w, height: node, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: w, height: bar, background: C.gold, transform: `scaleX(${line})`, transformOrigin: "50% 50%" }} />
        <div
          style={{
            position: "absolute",
            width: node,
            height: node,
            background: C.gold,
            transform: `rotate(45deg) scale(${line})`,
            boxShadow: `0 0 ${12 * line}px rgba(160,138,79,0.7)`,
          }}
        />
      </div>
    </div>
  );
};

/* ================================================================== */
/* 1) CONNECTED — every system still running, under the Meridian bar   */
/* ================================================================== */
const SYSTEMS = [
  "oracle.svg",
  "sap.svg",
  "salesforce.svg",
  "jira.svg",
  "sharepoint.svg",
  "teams.svg",
  "mews.svg",
  "shiji.svg",
  "hubos-icon.png",
  "messagebox.png",
  "okami.png",
];

const HUB: [number, number] = [960, 604]; // where connectors converge (bar bottom)

const arcPos = (i: number, n: number) => {
  const t = i / (n - 1); // 0..1
  const x = 300 + t * (1920 - 600); // 300..1320
  const y = 826 - Math.sin(t * Math.PI) * 74; // gentle upward arch
  return { x, y };
};

const SystemChip: React.FC<{ file: string; i: number; n: number }> = ({ file, i, n }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = 92 + i * 6;
  const s = spring({ frame: frame - appear, fps, config: { damping: 20, stiffness: 150 } });

  const target = arcPos(i, n);
  const a0 = (i / n) * Math.PI * 2;
  const start = { x: 960 + Math.cos(a0) * 1080, y: 560 + Math.sin(a0) * 640 };
  const x = start.x + (target.x - start.x) * s;
  const y = start.y + (target.y - start.y) * s;

  const dotAt = appear + 26;
  const dot = rmp(frame, dotAt, dotAt + 12);
  const pulse = 0.5 + 0.5 * Math.sin((frame - dotAt) / 6);
  const size = 72;

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: 18,
        background: "#fff",
        boxShadow: `0 10px 26px rgba(0,0,0,0.35)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: rmp(frame, appear - 4, appear + 10),
        transform: `scale(${0.7 + 0.3 * s})`,
      }}
    >
      <img src={staticFile(`assets/tech-stack/${file}`)} style={{ maxWidth: 46, maxHeight: 46, objectFit: "contain" }} />
      {/* connected dot */}
      <div
        style={{
          position: "absolute",
          top: -5,
          right: -5,
          width: 18,
          height: 18,
          borderRadius: 999,
          background: C.success,
          border: "3px solid " + C.ink,
          opacity: dot,
          transform: `scale(${dot})`,
          boxShadow: `0 0 ${6 + pulse * 10}px rgba(62,124,89,${0.5 * dot})`,
        }}
      />
    </div>
  );
};

const MeridianBar: React.FC<{ delay?: number }> = ({ delay = 62 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 22, stiffness: 180 } });
  const w = 560;
  return (
    <div
      style={{
        position: "absolute",
        left: 960 - w / 2,
        top: 512,
        width: w,
        height: 92,
        borderRadius: 16,
        background: `linear-gradient(180deg, ${C.goldSoft}, ${C.gold})`,
        boxShadow: "0 18px 48px rgba(160,138,79,0.35)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: rmp(frame, delay - 2, delay + 10),
        transform: `scaleX(${0.4 + 0.6 * s}) scaleY(${0.7 + 0.3 * s})`,
      }}
    >
      <div style={{ fontFamily: FONT.display, fontSize: 34, letterSpacing: "0.24em", color: C.ink, paddingLeft: "0.24em" }}>
        MERIDIAN
      </div>
      <div style={{ fontFamily: FONT.sans, fontSize: 12.5, fontWeight: 700, letterSpacing: "0.34em", color: "rgba(19,33,60,0.72)", marginTop: 4 }}>
        THE INTELLIGENCE LAYER
      </div>
    </div>
  );
};

export const Connected: React.FC = () => {
  const n = SYSTEMS.length;
  return (
    <Stage>
      {/* headline */}
      <div style={{ position: "absolute", top: 96, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Kicker delay={6}>No rip-and-replace</Kicker>
        <div style={{ maxWidth: 1320, textAlign: "center" }}>
          <Snap white="EVERY SYSTEM YOU RUN," gold="STILL RUNNING." size={82} delay={20} align="center" />
        </div>
      </div>

      {/* converging connectors (behind chips) */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {SYSTEMS.map((_, i) => {
          const p = arcPos(i, n);
          const delay = 92 + i * 6 + 20;
          return <FlowLine key={i} x1={p.x} y1={p.y - 42} x2={HUB[0]} y2={HUB[1]} delay={delay} color={C.gold} width={2.2} dots={2} />;
        })}
      </svg>

      <MeridianBar />

      {SYSTEMS.map((f, i) => (
        <SystemChip key={f} file={f} i={i} n={n} />
      ))}

      {/* confident footer line */}
      <FooterLine text="The layer above — nothing ripped out." delay={200} />
    </Stage>
  );
};

const FooterLine: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const frame = useCurrentFrame();
  const p = rmp(frame, delay, delay + 16);
  return (
    <div
      style={{
        position: "absolute",
        bottom: 58,
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: FONT.sans,
        fontSize: 21,
        fontWeight: 600,
        letterSpacing: "0.02em",
        color: "rgba(255,255,255,0.78)",
        opacity: p,
        transform: `translateY(${(1 - p) * 12}px)`,
      }}
    >
      {text}
    </div>
  );
};

/* ================================================================== */
/* 2) SIX DOMAINS — six operator domains snap into one platform        */
/* ================================================================== */
type Domain = { label: string; sub: string };
const DOMAINS: Domain[] = [
  { label: "DISTRIBUTION", sub: "Booking & CRS" },
  { label: "GUEST & CRM", sub: "Loyalty & Identity" },
  { label: "FINANCE", sub: "ERP & Reporting" },
  { label: "WORKFORCE", sub: "People & Culture" },
  { label: "DEVELOPMENT", sub: "Brand & Standards" },
  { label: "PROCUREMENT", sub: "Sourcing & Supply" },
];

const TILE = { w: 404, h: 152, gapX: 44, gapY: 40 };
const GRID_TOP = 356;
const gridStartX = (1920 - (TILE.w * 3 + TILE.gapX * 2)) / 2;
const tileXY = (i: number) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  return {
    x: gridStartX + col * (TILE.w + TILE.gapX),
    y: GRID_TOP + row * (TILE.h + TILE.gapY),
  };
};
const BAND_TOP = 838;

const DomainTile: React.FC<{ d: Domain; i: number }> = ({ d, i }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 70 + i * 9;
  const s = spring({ frame: frame - delay, fps, config: { damping: 21, stiffness: 190 } });
  const { x, y } = tileXY(i);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: TILE.w,
        height: TILE.h,
        borderRadius: 18,
        background: "rgba(255,255,255,0.055)",
        border: "1px solid rgba(255,255,255,0.16)",
        boxShadow: "0 14px 40px rgba(0,0,0,0.28)",
        padding: "26px 30px",
        opacity: rmp(frame, delay - 4, delay + 10),
        transform: `translateY(${(1 - s) * 44}px) scale(${0.86 + 0.14 * s})`,
        transformOrigin: "50% 50%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ fontFamily: FONT.display, fontSize: 20, color: C.gold, letterSpacing: "0.06em" }}>
          {String(i + 1).padStart(2, "0")}
        </div>
        <div style={{ width: 26, height: 2, background: "rgba(160,138,79,0.6)" }} />
      </div>
      <div style={{ fontFamily: FONT.sans, fontSize: 27, fontWeight: 800, letterSpacing: "0.06em", color: "#fff", marginTop: 16 }}>
        {d.label}
      </div>
      <div style={{ fontFamily: FONT.sans, fontSize: 17, fontWeight: 500, color: "rgba(150,207,212,0.92)", marginTop: 6 }}>
        {d.sub}
      </div>
    </div>
  );
};

const PlatformBand: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const draw = ramp(frame, delay, delay + 26);
  const textP = rmp(frame, delay + 20, delay + 36);
  const w = 1400;
  return (
    <div
      style={{
        position: "absolute",
        left: 960 - w / 2,
        top: BAND_TOP,
        width: w,
        height: 104,
        borderRadius: 18,
        background: `linear-gradient(180deg, ${C.goldSoft}, ${C.gold})`,
        boxShadow: "0 20px 54px rgba(160,138,79,0.34)",
        transform: `scaleX(${draw})`,
        transformOrigin: "0% 50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 22, opacity: textP }}>
        <span style={{ fontFamily: FONT.display, fontSize: 30, letterSpacing: "0.14em", color: C.ink }}>
          MERIDIAN
        </span>
        <span style={{ fontFamily: FONT.sans, fontSize: 15, fontWeight: 700, letterSpacing: "0.14em", color: "rgba(19,33,60,0.62)" }}>
          BY MINOR HOTELS
        </span>
        <span style={{ width: 1, height: 30, background: "rgba(19,33,60,0.3)" }} />
        <span style={{ fontFamily: FONT.sans, fontSize: 16, fontWeight: 700, color: C.ink }}>Conversational AI</span>
        <span style={{ width: 5, height: 5, borderRadius: 999, background: C.ink }} />
        <span style={{ fontFamily: FONT.sans, fontSize: 16, fontWeight: 700, color: C.ink }}>Workflow Engine</span>
      </div>
    </div>
  );
};

export const SixDomains: React.FC = () => {
  return (
    <Stage>
      <div style={{ position: "absolute", top: 92, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Kicker delay={6}>One operator surface</Kicker>
        <Snap white="SIX DOMAINS." gold="ONE PLATFORM." size={74} delay={18} align="center" />
      </div>

      {/* connectors from each tile down into the platform band */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {DOMAINS.map((_, i) => {
          const { x, y } = tileXY(i);
          const cx = x + TILE.w / 2;
          const delay = 70 + i * 9 + 24;
          return <FlowLine key={i} x1={cx} y1={y + TILE.h} x2={cx} y2={BAND_TOP} delay={delay} color={C.gold} width={2.2} dots={2} />;
        })}
      </svg>

      {DOMAINS.map((d, i) => (
        <DomainTile key={d.label} d={d} i={i} />
      ))}

      <PlatformBand delay={196} />
    </Stage>
  );
};

/* ================================================================== */
/* 3) CLOSE — the confident button                                     */
/* ================================================================== */
const Decl: React.FC<{ children: React.ReactNode; delay: number; gold?: boolean }> = ({ children, delay, gold }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 180 } });
  const op = rmp(frame, delay - 4, delay + 9);
  return (
    <div
      style={{
        fontFamily: FONT.display,
        fontSize: 132,
        lineHeight: 1.0,
        letterSpacing: "0.01em",
        color: gold ? C.gold : "#fff",
        opacity: op,
        transform: `translateY(${(1 - s) * 52}px) scale(${0.86 + 0.14 * s})`,
      }}
    >
      {children}
    </div>
  );
};

export const Close: React.FC = () => {
  const frame = useCurrentFrame();
  const groupOut = ramp(frame, 176, 200); // declarations clear
  const float = Math.sin(frame / 44) * 3; // subtle life on the hold
  return (
    <Stage>
      {/* Phase A — three declarations build, then clear */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          opacity: 1 - groupOut,
          transform: `translateY(${-groupOut * 40}px)`,
        }}
      >
        <Decl delay={16}>ONE PLATFORM.</Decl>
        <Decl delay={52}>EVERY ROLE.</Decl>
        <Decl delay={90} gold>
          EVERY PROPERTY.
        </Decl>
      </div>

      {/* Phase B — cinematic wordmark close */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 44,
          transform: `translateY(${float}px)`,
        }}
      >
        <WhiteWordmark size={128} appearFrom={206} drawFrom={224} />
        <div
          style={{
            fontFamily: FONT.serif,
            fontStyle: "italic",
            fontSize: 34,
            color: "rgba(255,255,255,0.82)",
            opacity: rmp(frame, 250, 272),
            transform: `translateY(${(1 - rmp(frame, 250, 272)) * 12}px)`,
          }}
        >
          The intelligence layer of Minor Hotels.
        </div>
      </div>
    </Stage>
  );
};

/* ================================================================== */
/* 4) END CARD — final lockup, premium hold                            */
/* ================================================================== */
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;
  const drift = -8 * t; // slow rise
  const scale = 1 + 0.018 * t; // gentle breathe
  const div = ramp(frame, 44, 74);
  const minor = rmp(frame, 58, 80);
  const caption = rmp(frame, 74, 96);
  return (
    <Stage>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${drift}px) scale(${scale})`,
        }}
      >
        <WhiteWordmark size={126} appearFrom={8} drawFrom={22} />

        <div style={{ width: 300, height: 1, background: "rgba(255,255,255,0.28)", marginTop: 60, transform: `scaleX(${div})` }} />

        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: "0.30em",
            color: "#fff",
            marginTop: 30,
            paddingLeft: "0.30em",
            opacity: minor,
            transform: `translateY(${(1 - minor) * 10}px)`,
            textAlign: "center",
          }}
        >
          THE INTELLIGENCE LAYER OF MINOR HOTELS
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT.sans,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.4em",
          color: "rgba(255,255,255,0.5)",
          paddingLeft: "0.4em",
          opacity: caption,
        }}
      >
        CONFIDENTIAL · INTERNAL
      </div>
    </Stage>
  );
};
