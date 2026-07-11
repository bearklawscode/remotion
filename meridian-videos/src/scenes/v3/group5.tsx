/**
 * VIDEO 3 — Group 5 (the finale): S16 Operational Intelligence, S17 The Disruptor,
 * S18 The Approach, S19 The Point of Reference (the emotional CLOSE), and the OutroCard.
 * Dynamic motion graphics — advancing timelines, drawing connectors, counters,
 * spawning chips, line-by-line builds. Facts are grounded strictly in the deck.
 */
import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import {
  DeckStage,
  Eyebrow3,
  Headline3,
  Takeaway3,
} from "./common3";
import { C, FONT } from "../../theme";
import { ramp, EASE, Counter } from "../../lib/motion";

/* ============================================================= shared bits === */

/** White "MINOR HOTELS" + confidential strip (for navy backgrounds). */
const MinorHotelsMark: React.FC<{ delay?: number; center?: boolean }> = ({ delay = 0, center }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + 22);
  return (
    <div
      style={{
        position: "absolute",
        bottom: 46,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: center ? "center" : "flex-start",
        paddingLeft: center ? 0 : 110,
        gap: 8,
        opacity: p,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 22 * p, height: 2, background: C.gold }} />
        <span
          style={{
            fontFamily: FONT.sans,
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "0.34em",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          MINOR HOTELS
        </span>
      </div>
      <span
        style={{
          fontFamily: FONT.sans,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.28em",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        CONFIDENTIAL · INTERNAL ONLY
      </span>
    </div>
  );
};

/* ==================================================== S16 — Operational Intel = */

const NoteBar: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + 18);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginTop: 18,
        maxWidth: 1250,
        opacity: p,
        transform: `translateY(${(1 - p) * 10}px)`,
        borderLeft: `2px solid ${C.gold}`,
        padding: "6px 0 6px 18px",
      }}
    >
      <span style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 22, lineHeight: 1.35, color: C.inkSoft }}>
        A housekeeper still gets her task from the system, not a chatbot. Conversational AI is for the
        knowledge- and learning-based moment.
      </span>
    </div>
  );
};

/** An advancing arrow between generation cards, with a traveling gold pulse. */
const ArrowFlow: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const draw = ramp(frame, delay, delay + 20);
  const travel = ((frame - delay) * 1.8) % 78;
  const tip = 70 * draw;
  return (
    <svg width={92} height={60} style={{ overflow: "visible", flexShrink: 0 }}>
      <line x1={0} y1={30} x2={tip} y2={30} stroke={C.gold} strokeWidth={2.5} strokeOpacity={0.55} />
      {draw > 0.55 && (
        <polygon points={`${tip},23 ${tip + 11},30 ${tip},37`} fill={C.gold} opacity={draw} />
      )}
      {draw > 0.92 && <circle cx={(travel / 78) * 70} cy={30} r={4.5} fill={C.gold} />}
    </svg>
  );
};

const GenCard: React.FC<{
  gen: string;
  title: string;
  desc: string;
  delay: number;
  highlight?: boolean;
}> = ({ gen, title, desc, delay, highlight }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + 18);
  // living glow pulse on the highlighted (Generation Three) card
  const pulse = highlight ? 0.5 + 0.5 * Math.sin((frame - delay) * 0.09) : 0;
  return (
    <div
      style={{
        flex: 1,
        opacity: p,
        transform: `translateY(${(1 - p) * 22}px) scale(${0.96 + p * 0.04})`,
        background: highlight ? C.ink : "#fff",
        border: `1px solid ${highlight ? C.gold : C.hairline}`,
        boxShadow: highlight
          ? `0 22px 60px rgba(19,33,60,0.22), 0 0 ${18 + pulse * 22}px rgba(160,138,79,${0.25 + pulse * 0.3})`
          : "0 8px 24px rgba(19,33,60,0.06)",
        borderRadius: 16,
        padding: "26px 26px 30px",
        minHeight: 232,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontFamily: FONT.sans,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.22em",
          color: C.gold,
          textTransform: "uppercase",
        }}
      >
        {gen}
      </div>
      <div
        style={{
          fontFamily: FONT.display,
          fontSize: 30,
          lineHeight: 1.02,
          color: highlight ? "#fff" : C.ink,
          marginTop: 14,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: FONT.serif,
          fontSize: 21,
          lineHeight: 1.4,
          color: highlight ? "rgba(255,255,255,0.82)" : C.inkSoft,
          marginTop: 14,
        }}
      >
        {desc}
      </div>
      {highlight && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "auto", paddingTop: 16 }}>
          <span style={{ width: 8, height: 8, borderRadius: 8, background: C.gold, boxShadow: `0 0 ${6 + pulse * 8}px ${C.gold}` }} />
          <span style={{ fontFamily: FONT.sans, fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", color: C.goldSoft }}>LIVE</span>
        </div>
      )}
    </div>
  );
};

export const S16: React.FC = () => {
  return (
    <DeckStage bg={C.paper} pad={96}>
      <Eyebrow3>OPERATIONAL INTELLIGENCE</Eyebrow3>
      <Headline3 white="LOCKED IN A FOLDER." gold="ALIVE IN A CONVERSATION." size={60} light />
      <NoteBar delay={30} />
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 44 }}>
        <GenCard
          gen="Generation One"
          title="KNOWLEDGE AS A DOCUMENT"
          desc="Written, filed, and forgotten."
          delay={46}
        />
        <ArrowFlow delay={70} />
        <GenCard
          gen="Generation Two"
          title="KNOWLEDGE AS TRAINING CONTENT"
          desc="Learned in the abstract; the gap to the live moment remains."
          delay={82}
        />
        <ArrowFlow delay={106} />
        <GenCard
          gen="Generation Three"
          title="KNOWLEDGE AS A LIVE CONVERSATION"
          desc="Surfaces the moment staff ask, guides the response, logs the resolution."
          delay={118}
          highlight
        />
      </div>
      <Takeaway3 delay={150} light>
        A third-shift staff member handles complex service recovery with the quality of a ten-year veteran.
      </Takeaway3>
    </DeckStage>
  );
};

/* ============================================================ S17 — Disruptor = */

const MewsStat: React.FC<{
  value: React.ReactNode;
  label: string;
  delay: number;
}> = ({ value, label, delay }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + 16);
  return (
    <div style={{ flex: 1, opacity: p, transform: `translateY(${(1 - p) * 20}px)` }}>
      <div
        style={{
          fontFamily: FONT.display,
          fontSize: 66,
          lineHeight: 0.9,
          color: "#fff",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: FONT.sans,
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.13em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.52)",
          marginTop: 12,
        }}
      >
        {label}
      </div>
      <div style={{ height: 2, background: "rgba(160,138,79,0.5)", marginTop: 14, transform: `scaleX(${p})`, transformOrigin: "0 50%" }} />
    </div>
  );
};

/** An empty capability slot — dashed outline + a drawn X (what Mews lacks). */
const EmptySlot: React.FC<{ label: string; delay: number }> = ({ label, delay }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + 16);
  const cross = ramp(frame, delay + 10, delay + 26);
  const dash = 26;
  return (
    <div
      style={{
        flex: 1,
        opacity: p,
        transform: `translateY(${(1 - p) * 16}px)`,
        border: `1.5px dashed rgba(180,86,47,0.5)`,
        borderRadius: 14,
        padding: "20px 22px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        background: "rgba(255,255,255,0.015)",
      }}
    >
      <svg width={30} height={30} style={{ flexShrink: 0 }}>
        <line x1={7} y1={7} x2={23} y2={23} stroke={C.alert} strokeWidth={3} strokeLinecap="round" strokeDasharray={dash} strokeDashoffset={dash * (1 - cross)} />
        <line x1={23} y1={7} x2={7} y2={23} stroke={C.alert} strokeWidth={3} strokeLinecap="round" strokeDasharray={dash} strokeDashoffset={dash * (1 - cross)} />
      </svg>
      <span
        style={{
          fontFamily: FONT.sans,
          fontSize: 19,
          fontWeight: 600,
          letterSpacing: "0.04em",
          color: "rgba(255,255,255,0.62)",
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const S17: React.FC = () => {
  return (
    <DeckStage bg={C.ink} pad={96}>
      <Eyebrow3>THE DISRUPTOR</Eyebrow3>
      <Headline3
        white="ONE VENDOR IS TRYING TO BECOME THE PLATFORM,"
        gold="NOT A POINT IN IT."
        size={54}
      />
      <div style={{ display: "flex", gap: 40, marginTop: 46 }}>
        <MewsStat value={<Counter to={300} prefix="$" suffix="M" delay={40} durationFrames={30} />} label="SERIES D · JANUARY 2026" delay={34} />
        <MewsStat value={<Counter to={2.5} decimals={1} prefix="$" suffix="B" delay={52} durationFrames={30} />} label="VALUATION" delay={46} />
        <MewsStat value={<span style={{ fontSize: 44 }}>Largest ever</span>} label="HOSPITALITY SOFTWARE ROUND" delay={58} />
        <MewsStat value={<Counter to={2} delay={70} durationFrames={22} />} label="ACQUISITIONS · DATACHAT + FLEXKEEPING" delay={70} />
      </div>

      <div style={{ marginTop: 52 }}>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: C.goldSoft,
            marginBottom: 18,
            opacity: ramp(useCurrentFrame(), 96, 112),
          }}
        >
          The Limitation — Built Property-First
        </div>
        <div style={{ display: "flex", gap: 22 }}>
          <EmptySlot label="No franchise / brand layer" delay={112} />
          <EmptySlot label="No owner portal" delay={124} />
          <EmptySlot label="No multi-brand governance" delay={136} />
        </div>
      </div>

      <Takeaway3 delay={158}>
        Mews can win independents and small chains — but it has no answer for a multi-brand operator's
        franchise layer.
      </Takeaway3>
    </DeckStage>
  );
};

/* ============================================================= S18 — Approach = */

const PHASES = [
  { tag: "PHASE 0", title: "ALIGNMENT", desc: "A common language, mapped to OMFA. No technology yet." },
  { tag: "PHASE 1", title: "UNIFIED PORTAL", desc: "One surface, one identity, live from day one." },
  { tag: "PHASE 2", title: "FULL PLATFORM", desc: "Conversational AI across both surfaces; Meridian Mobile with live SOP workflows." },
];

const Chip: React.FC<{
  text: string;
  x: number;
  y: number;
  accent?: boolean;
  opacity: number;
  scale?: number;
}> = ({ text, x, y, accent, opacity, scale = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: `translate(-50%,-50%) scale(${scale})`,
      opacity,
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: accent ? C.ink : "#fff",
      border: `1px solid ${accent ? C.gold : C.hairline}`,
      boxShadow: "0 10px 26px rgba(19,33,60,0.14)",
      borderRadius: 999,
      padding: "9px 16px",
      whiteSpace: "nowrap",
    }}
  >
    <span style={{ width: 8, height: 8, borderRadius: 8, background: accent ? C.gold : C.cadet }} />
    <span style={{ fontFamily: FONT.sans, fontSize: 15, fontWeight: 700, letterSpacing: "0.03em", color: accent ? "#fff" : C.ink }}>
      {text}
    </span>
  </div>
);

const Timeline: React.FC = () => {
  const frame = useCurrentFrame();
  const W = 1620;
  const H = 300;
  const lineY = 78;
  const nodes = [180, 810, 1440];
  const x0 = nodes[0];
  const x1 = nodes[2];
  const draw = ramp(frame, 22, 150, EASE.inOut);
  const drawnX = x0 + (x1 - x0) * draw;
  // traveling glow after the line has drawn
  const glow = ((frame - 40) * 4) % (x1 - x0);
  const glowX = x0 + glow;

  // phase-2 chip micro-animation loop
  const chipStart = 300;
  const cycle = 160;
  const local = frame - chipStart;
  const c = local >= 0 ? local % cycle : -1;
  const n2 = nodes[2];
  // guest chip glides in 0..46, holds, task chip spawns at 52
  const guestOp = c < 0 ? 0 : ramp(c, 0, 12) * (1 - ramp(c, 48, 62));
  const guestX = n2 - 250 + 190 * ramp(c, 0, 46, EASE.inOut);
  const taskOp = c < 0 ? 0 : ramp(c, 54, 68) * (1 - ramp(c, 122, 150));
  const taskScale = 0.7 + 0.3 * ramp(c, 52, 72, EASE.out);
  const spawnPulse = c >= 46 && c < 60;

  return (
    <div style={{ position: "relative", width: W, height: H, margin: "0 auto" }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {/* base track */}
        <line x1={x0} y1={lineY} x2={x1} y2={lineY} stroke={C.hairline} strokeWidth={4} />
        {/* drawn gold progress */}
        <line x1={x0} y1={lineY} x2={drawnX} y2={lineY} stroke={C.gold} strokeWidth={4} strokeLinecap="round" />
        {/* traveling glow bead */}
        {draw > 0.98 && <circle cx={glowX} cy={lineY} r={6} fill={C.gold} opacity={0.9} />}
        {/* nodes */}
        {nodes.map((nx, i) => {
          const frac = (nx - x0) / (x1 - x0);
          const lit = draw >= frac - 0.001;
          const litP = ramp(frame, 22 + frac * 128, 22 + frac * 128 + 14);
          const isDest = i === 2;
          const r = isDest ? 20 : 14;
          return (
            <g key={i}>
              {isDest && lit && (
                <circle cx={nx} cy={lineY} r={spawnPulse ? r + 18 : r + 11} fill="none" stroke={C.gold} strokeOpacity={spawnPulse ? 0.45 : 0.22} strokeWidth={2} />
              )}
              <circle cx={nx} cy={lineY} r={r} fill={isDest ? C.ink : lit ? C.gold : "#fff"} stroke={C.gold} strokeWidth={isDest ? 3 : 2} opacity={0.35 + litP * 0.65} />
              {isDest && <circle cx={nx} cy={lineY} r={7} fill={C.gold} opacity={litP} />}
            </g>
          );
        })}
      </svg>

      {/* phase cards under nodes */}
      {nodes.map((nx, i) => {
        const ph = PHASES[i];
        const frac = (nx - x0) / (x1 - x0);
        const delay = 40 + frac * 128;
        const p = ramp(frame, delay, delay + 18);
        const dest = i === 2;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: nx - 190,
              top: lineY + 44,
              width: 380,
              opacity: p,
              transform: `translateY(${(1 - p) * 16}px)`,
              background: dest ? C.ink : "#fff",
              border: `1px solid ${dest ? C.gold : C.hairline}`,
              boxShadow: dest ? "0 22px 56px rgba(19,33,60,0.22)" : "0 8px 22px rgba(19,33,60,0.07)",
              borderRadius: 14,
              padding: "18px 20px 20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: FONT.sans, fontSize: 13, fontWeight: 800, letterSpacing: "0.2em", color: C.gold }}>{ph.tag}</span>
              {dest && <span style={{ fontFamily: FONT.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", color: C.goldSoft, border: `1px solid ${C.gold}`, borderRadius: 6, padding: "2px 7px" }}>DESTINATION</span>}
            </div>
            <div style={{ fontFamily: FONT.display, fontSize: 27, color: dest ? "#fff" : C.ink, marginTop: 8 }}>{ph.title}</div>
            <div style={{ fontFamily: FONT.serif, fontSize: 18, lineHeight: 1.35, color: dest ? "rgba(255,255,255,0.8)" : C.inkSoft, marginTop: 9 }}>{ph.desc}</div>
          </div>
        );
      })}

      {/* phase-2 auto-task micro animation (above the line) */}
      {frame >= chipStart && (
        <>
          <Chip text="Guest message" x={guestX} y={lineY - 46} opacity={guestOp} />
          {/* connector spark from guest chip to node */}
          {c >= 40 && c < 70 && (
            <svg width={W} height={H} style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}>
              <line x1={n2 - 60} y1={lineY - 40} x2={n2 + 40} y2={lineY - 40} stroke={C.gold} strokeWidth={2} strokeDasharray="4 5" opacity={0.7} />
            </svg>
          )}
          <Chip text="Task created — automatically" x={n2 + 120} y={lineY - 46} accent opacity={taskOp} scale={taskScale} />
        </>
      )}
    </div>
  );
};

export const S18: React.FC = () => {
  const frame = useCurrentFrame();
  const marr = ramp(frame, 200, 220);
  return (
    <DeckStage bg={C.paper} pad={90}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <Eyebrow3>THE APPROACH</Eyebrow3>
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Headline3 white="THREE PHASES." gold="ONE DESTINATION." size={72} light />
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <Timeline />
      </div>

      <div
        style={{
          marginTop: 26,
          textAlign: "center",
          opacity: marr,
          transform: `translateY(${(1 - marr) * 10}px)`,
        }}
      >
        <span style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 24, color: C.inkSoft }}>
          This is what Marriott is spending{" "}
          <span style={{ color: C.gold, fontStyle: "normal", fontWeight: 700 }}>$1.1B</span> to build.
        </span>
      </div>
    </DeckStage>
  );
};

/* ==================================================== S19 — Point of Reference = */

const RivalFigure: React.FC<{
  name: string;
  value: React.ReactNode;
  unit: string;
  delay: number;
}> = ({ name, value, unit, delay }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + 18);
  return (
    <div style={{ flex: 1, textAlign: "center", opacity: p, transform: `translateY(${(1 - p) * 18}px)` }}>
      <div style={{ fontFamily: FONT.sans, fontSize: 16, fontWeight: 700, letterSpacing: "0.24em", color: C.goldSoft }}>{name}</div>
      <div style={{ fontFamily: FONT.display, fontSize: 60, lineHeight: 1, color: "#fff", marginTop: 12, fontVariantNumeric: "tabular-nums" }}>{value}</div>
      <div style={{ fontFamily: FONT.sans, fontSize: 15, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 10 }}>{unit}</div>
    </div>
  );
};

const CloseLine: React.FC<{ text: string; gold?: boolean; delay: number }> = ({ text, gold, delay }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + 22);
  return (
    <div
      style={{
        fontFamily: FONT.display,
        fontSize: 90,
        lineHeight: 1.04,
        color: gold ? C.gold : "#fff",
        opacity: p,
        transform: `translateY(${(1 - p) * 20}px)`,
      }}
    >
      {text}
    </div>
  );
};

export const S19: React.FC = () => {
  const frame = useCurrentFrame();
  // slow cinematic push-in over the whole scene
  const push = interpolate(frame, [0, 520], [1.015, 1.05], { extrapolateRight: "clamp", easing: EASE.inOut });
  const para = ramp(frame, 300, 326);
  return (
    <DeckStage bg={C.ink} pad={110}>
      <AbsoluteFill style={{ transform: `scale(${push})`, transformOrigin: "50% 45%" }}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 118, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Eyebrow3>THE POINT OF REFERENCE</Eyebrow3>
          </div>

          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <CloseLine text="IF WE DON'T BUILD THIS," delay={26} />
            <CloseLine text="SOMEONE ELSE WILL SELL IT" gold delay={54} />
            <CloseLine text="TO OUR FRANCHISEES." delay={84} />
          </div>

          <div style={{ display: "flex", gap: 40, width: 1240, marginTop: 68 }}>
            <RivalFigure name="MARRIOTT" value={<Counter to={1.1} decimals={1} prefix="$" suffix="B" delay={150} durationFrames={30} />} unit="platform investment" delay={148} />
            <div style={{ width: 1, background: "rgba(255,255,255,0.14)" }} />
            <RivalFigure name="ACCOR" value={<Counter to={100} suffix="M" delay={168} durationFrames={30} />} unit="loyalty members" delay={166} />
            <div style={{ width: 1, background: "rgba(255,255,255,0.14)" }} />
            <RivalFigure name="WYNDHAM" value={<Counter to={350} prefix="$" suffix="M" delay={186} durationFrames={30} />} unit="/ 96% adoption" delay={184} />
          </div>

          <div
            style={{
              maxWidth: 1160,
              marginTop: 66,
              opacity: para,
              transform: `translateY(${(1 - para) * 16}px)`,
            }}
          >
            <span style={{ fontFamily: FONT.serif, fontSize: 30, lineHeight: 1.5, color: "rgba(255,255,255,0.82)" }}>
              The race is already underway. Meridian is Minor Hotels' answer — built on what we already
              have, connected through a single surface, and designed to compound in value with every
              property that joins.
            </span>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
      <MinorHotelsMark delay={380} center />
    </DeckStage>
  );
};

/* =============================================================== OutroCard ==== */

/** White Meridian wordmark (the chrome Wordmark is navy → invisible on navy). */
const WhiteWordmark: React.FC<{ size?: number; drawFrom?: number }> = ({ size = 140, drawFrom = 12 }) => {
  const frame = useCurrentFrame();
  const line = ramp(frame, drawFrom, drawFrom + 28);
  const seg = Math.max(2, size * 0.028);
  const dia = Math.max(7, size * 0.05);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: size * 0.09 }}>
      <div style={{ fontFamily: FONT.display, fontSize: size, letterSpacing: "0.24em", color: "#fff", lineHeight: 1, paddingLeft: "0.24em" }}>MERIDIAN</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, width: size * 5.0 }}>
        <div style={{ flex: line, height: seg, background: C.gold }} />
        <div style={{ width: dia, height: dia, background: C.gold, transform: "rotate(45deg)", opacity: line }} />
        <div style={{ flex: line, height: seg, background: C.gold }} />
      </div>
    </div>
  );
};

export const OutroCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const mark = ramp(frame, 6, 30, EASE.out);
  const sub = ramp(frame, 46, 68);
  const drift = interpolate(frame, [0, durationInFrames], [0, -14], { extrapolateRight: "clamp" });
  const fadeOut = ramp(frame, durationInFrames - 16, durationInFrames);
  return (
    <DeckStage bg={C.ink} pad={110}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: 1 - fadeOut }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `translateY(${drift}px) scale(${0.9 + mark * 0.1})`,
            opacity: mark,
          }}
        >
          <WhiteWordmark />
          <div
            style={{
              fontFamily: FONT.serif,
              fontStyle: "italic",
              fontSize: 32,
              color: "rgba(255,255,255,0.72)",
              marginTop: 42,
              opacity: sub,
              transform: `translateY(${(1 - sub) * 12}px)`,
            }}
          >
            The intelligence layer of Minor Hotels.
          </div>
        </div>
      </AbsoluteFill>
      <MinorHotelsMark delay={70} center />
    </DeckStage>
  );
};
