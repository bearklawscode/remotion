/**
 * VIDEO 3 — GROUP 2 (S04–S07): the three competitive "vectors" + the Meridian
 * convergence. Navy deck scenes with continuous, purposeful motion —
 * staggered chip fly-ins, drifting particle fields, count-up stat blocks and an
 * animated convergence diagram. No static slideshow moments.
 */
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, W, H } from "../../theme";
import { ramp, EASE, Counter } from "../../lib/motion";
import { FlowLine } from "../../lib/v3ui";
import { DeckStage, Eyebrow3, Headline3, SubLine, Takeaway3, VendorChip } from "./common3";

/* ---------- small layout + motion helpers ---------- */

const Abs: React.FC<{
  l?: number; t?: number; r?: number; b?: number; w?: number;
  style?: React.CSSProperties; children: React.ReactNode;
}> = ({ l, t, r, b, w, style, children }) => (
  <div style={{ position: "absolute", left: l, top: t, right: r, bottom: b, width: w, ...style }}>{children}</div>
);

/** Full-frame drifting gold particle field — subtle, always-moving connective motif. */
const DriftField: React.FC<{ count?: number; opacity?: number }> = ({ count = 22, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0, opacity }}>
      {Array.from({ length: count }).map((_, i) => {
        const seed = i * 137.5;
        const bx = seed % W;
        const by = (seed * 1.7) % H;
        const speed = 10 + (i % 4) * 6;
        const x = (((bx + t * speed) % (W + 60)) + W + 60) % (W + 60) - 30;
        const y = (((by + t * (3 + (i % 3))) % (H + 60)) + H + 60) % (H + 60) - 30;
        const r = 1.1 + (i % 4) * 0.6;
        return <circle key={i} cx={x} cy={y} r={r} fill={C.gold} opacity={0.08 + (i % 3) * 0.04} />;
      })}
    </svg>
  );
};

/** A vendor chip that keeps a gentle continuous float after it flies in. */
const FloatChip: React.FC<{
  name: string; tag: string; delay: number; index: number; accent?: boolean;
}> = ({ name, tag, delay, index, accent }) => {
  const frame = useCurrentFrame();
  const floatY = Math.sin((frame / 30) * 1.05 + index * 1.3) * 4;
  return (
    <div style={{ flex: 1, transform: `translateY(${floatY}px)`, display: "flex" }}>
      <div style={{ width: "100%" }}>
        <VendorChip name={name} tag={tag} delay={delay} accent={accent} />
      </div>
    </div>
  );
};

/* ---------- S04 — VECTOR ONE ---------- */

const VENDORS_1 = [
  { name: "Canary Technologies", tag: "20,000+ HOTELS · $80M SERIES D" },
  { name: "Duve", tag: "1M+ GUEST MESSAGES / MONTH" },
  { name: "HiJiffy", tag: "2,500+ HOTELS · WHATSAPP-FIRST" },
  { name: "Akia", tag: "LUXURY TIER" },
];

export const S04: React.FC = () => {
  const frame = useCurrentFrame();
  const bandY = 640; // vertical centre of the chip band
  return (
    <DeckStage pad={0}>
      <DriftField opacity={0.9} />

      {/* connective flow line running through the chip band */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
        <FlowLine x1={150} y1={bandY} x2={1770} y2={bandY} delay={78} color={C.gold} width={1.5} dots={7} />
      </svg>

      <Abs l={120} t={104} w={1500}>
        <Eyebrow3>VECTOR ONE · UNIFIED COMMUNICATION</Eyebrow3>
        <Headline3 white="THE GUEST LAYER IS" gold="ALREADY A CATEGORY." size={70} />
        <SubLine max={1360} delay={26}>
          The guest-facing communication surface is already a funded, fast-moving category.
        </SubLine>
      </Abs>

      {/* chip row */}
      <Abs l={120} t={560} w={1680}>
        <div style={{ display: "flex", gap: 28, alignItems: "stretch" }}>
          {VENDORS_1.map((v, i) => (
            <FloatChip key={v.name} name={v.name} tag={v.tag} delay={44 + i * 12} index={i} />
          ))}
        </div>
      </Abs>

      <Takeaway3 delay={100}>
        Meridian introduces the operational back-end to a program already in flight.
      </Takeaway3>
    </DeckStage>
  );
};

/* ---------- S05 — VECTOR TWO ---------- */

const VENDORS_2 = [
  { name: "MessageBox / HubOS / Okami", tag: "MINOR'S CURRENT STACK — AUDIT LOG, NOT A TOOL", incumbent: true },
  { name: "HotSOS", tag: "AMADEUS · 104+ INTEGRATION PARTNERS" },
  { name: "ALICE", tag: "ACTABL · 14,000+ PROPERTIES" },
  { name: "hotelkit", tag: "SHIPPED KNOWLEDGE AI, 2026" },
];

export const S05: React.FC = () => {
  const bandY = 640;
  const tagP = ramp(useCurrentFrame(), 40, 58);
  return (
    <DeckStage pad={0}>
      <DriftField opacity={0.9} />

      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
        <FlowLine x1={150} y1={bandY} x2={1770} y2={bandY} delay={78} color={C.gold} width={1.5} dots={7} />
      </svg>

      <Abs l={120} t={104} w={1500}>
        <Eyebrow3>VECTOR TWO · WORKFORCE &amp; TASK</Eyebrow3>
        <Headline3 white="MATURE TOOLS," gold="NOT YET AI-NATIVE." size={70} />
        <SubLine max={1360} delay={26}>
          The category is heading conversational — Minor&rsquo;s current stack is not there yet.
        </SubLine>
      </Abs>

      <Abs l={120} t={560} w={1680}>
        <div style={{ display: "flex", gap: 28, alignItems: "stretch" }}>
          {VENDORS_2.map((v, i) => (
            <div key={v.name} style={{ flex: 1, position: "relative", display: "flex" }}>
              {v.incumbent && (
                <div
                  style={{
                    position: "absolute", top: -30, left: 0,
                    fontFamily: FONT.sans, fontSize: 13, fontWeight: 800,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: C.alert, opacity: tagP,
                  }}
                >
                  ◂ Minor today
                </div>
              )}
              <FloatChip name={v.name} tag={v.tag} delay={44 + i * 12} index={i} />
            </div>
          ))}
        </div>
      </Abs>

      <Takeaway3 delay={100}>
        Category leaders are proving conversational — not just faster — is where this heads next.
      </Takeaway3>
    </DeckStage>
  );
};

/* ---------- S06 — VECTOR THREE (count-up competitor blocks) ---------- */

const StatBlock: React.FC<{
  name: string; value: React.ReactNode; second?: React.ReactNode; sub: string;
  delay: number; accent?: boolean;
}> = ({ name, value, second, sub, delay, accent }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + 20);
  const draw = ramp(frame, delay + 14, delay + 40);
  return (
    <div
      style={{
        flex: 1, opacity: p, transform: `translateY(${(1 - p) * 26}px)`,
        background: accent ? "rgba(160,138,79,0.10)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${accent ? C.gold : "rgba(255,255,255,0.12)"}`,
        borderRadius: 18, padding: "34px 32px 30px",
        display: "flex", flexDirection: "column", minHeight: 360,
      }}
    >
      <div
        style={{
          fontFamily: FONT.sans, fontSize: 19, fontWeight: 800, letterSpacing: "0.2em",
          textTransform: "uppercase", color: accent ? C.gold : "rgba(255,255,255,0.62)",
        }}
      >
        {name}
      </div>
      <div style={{ width: 240 * draw, height: 2, background: accent ? C.gold : "rgba(255,255,255,0.18)", margin: "18px 0 26px" }} />
      <div style={{ display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap" }}>
        <div style={{ fontFamily: FONT.display, fontSize: 96, lineHeight: 0.88, color: accent ? C.gold : "#fff", fontVariantNumeric: "tabular-nums" }}>
          {value}
        </div>
        {second && (
          <div style={{ fontFamily: FONT.display, fontSize: 60, lineHeight: 0.9, color: accent ? C.goldSoft : "rgba(255,255,255,0.85)", fontVariantNumeric: "tabular-nums" }}>
            {second}
          </div>
        )}
      </div>
      <div style={{ marginTop: "auto", paddingTop: 22, fontFamily: FONT.serif, fontSize: 22, lineHeight: 1.35, color: accent ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.66)" }}>
        {sub}
      </div>
    </div>
  );
};

export const S06: React.FC = () => {
  return (
    <DeckStage pad={0}>
      <DriftField opacity={0.85} />

      <Abs l={120} t={104} w={1500}>
        <Eyebrow3>VECTOR THREE · FRANCHISE ENABLEMENT</Eyebrow3>
        <Headline3 white="EVERY OPERATOR," gold="A DIFFERENT ANSWER." size={70} />
      </Abs>

      <Abs l={120} t={430} w={1680}>
        <div style={{ display: "flex", gap: 34, alignItems: "stretch" }}>
          <StatBlock
            name="Marriott"
            delay={44}
            value={<Counter to={1.1} decimals={1} prefix="$" suffix="B" delay={60} durationFrames={40} />}
            sub="2026 capex to replatform · AI is guest-facing only"
          />
          <StatBlock
            name="Accor"
            delay={60}
            value={<Counter to={2} decimals={0} suffix="×" delay={76} durationFrames={30} />}
            second="FAILED"
            sub="unification attempts before landing on D-Edge, 2022"
          />
          <StatBlock
            name="Wyndham"
            accent
            delay={76}
            value={<Counter to={350} decimals={0} prefix="$" suffix="M" delay={92} durationFrames={44} />}
            second={<Counter to={96} decimals={0} suffix="%" delay={104} durationFrames={40} />}
            sub="invested since 2018 · 96% franchisee retention"
          />
        </div>
      </Abs>

      <Takeaway3 delay={132}>
        Wyndham&rsquo;s 96% retention proves the design — build around the franchisee&rsquo;s stack, not against it.
      </Takeaway3>
    </DeckStage>
  );
};

/* ---------- S07 — THE MERIDIAN LAYER (animated convergence diagram) ---------- */

const VectorBox: React.FC<{ cx: number; top: number; label: string; sub: string; delay: number }> = ({ cx, top, label, sub, delay }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + 16);
  const w = 400, h = 104;
  return (
    <div
      style={{
        position: "absolute", left: cx - w / 2, top, width: w, height: h,
        opacity: p, transform: `translateY(${(1 - p) * 20}px)`,
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.16)",
        borderRadius: 14, padding: "16px 22px", display: "flex", flexDirection: "column", justifyContent: "center",
      }}
    >
      <div style={{ fontFamily: FONT.sans, fontSize: 15, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold }}>{label}</div>
      <div style={{ fontFamily: FONT.display, fontSize: 26, color: "#fff", marginTop: 6 }}>{sub}</div>
    </div>
  );
};

const ProvideCard: React.FC<{ cx: number; top: number; text: string; delay: number }> = ({ cx, top, text, delay }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + 18);
  const w = 400, h = 118;
  const glow = 0.5 + 0.5 * Math.sin((frame / 30) * 1.4 + cx);
  return (
    <div
      style={{
        position: "absolute", left: cx - w / 2, top, width: w, height: h,
        opacity: p, transform: `translateY(${(1 - p) * 26}px)`,
        background: "rgba(160,138,79,0.08)", border: "1px solid rgba(160,138,79,0.45)",
        boxShadow: `0 0 ${18 + glow * 14}px rgba(160,138,79,${0.10 + glow * 0.08})`,
        borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div style={{ fontFamily: FONT.display, fontSize: 34, letterSpacing: "0.02em", color: "#fff", textAlign: "center" }}>{text}</div>
    </div>
  );
};

export const S07: React.FC = () => {
  const frame = useCurrentFrame();

  const boxCx = [480, 960, 1440];
  const boxTop = 288;
  const boxBottom = boxTop + 104;

  const bandTop = 512, bandH = 112, bandBottom = bandTop + bandH;
  const bandCx = W / 2;

  const cardCx = [480, 960, 1440];
  const cardTop = 720;

  // gold band draw-in
  const bandP = ramp(frame, 92, 122, EASE.out);
  const bandTextP = ramp(frame, 118, 140);
  const bandGlow = 0.5 + 0.5 * Math.sin((frame / 30) * 1.3);

  return (
    <DeckStage pad={0}>
      <DriftField opacity={0.85} />

      <Abs l={120} t={92} w={1500}>
        <Eyebrow3>THE MERIDIAN LAYER</Eyebrow3>
        <Headline3 white="THREE VECTORS." gold="ONE MERIDIAN." size={62} />
      </Abs>

      {/* flow-line layer (behind boxes/cards, above band bg drawn separately) */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
        {/* top: each vector converges into the band centre */}
        {boxCx.map((cx, i) => (
          <FlowLine key={`t${i}`} x1={cx} y1={boxBottom} x2={bandCx} y2={bandTop} delay={128 + i * 8} color={C.gold} width={1.6} dots={4} />
        ))}
        {/* bottom: Meridian feeds each of the three provisions */}
        {cardCx.map((cx, i) => (
          <FlowLine key={`b${i}`} x1={bandCx} y1={bandBottom} x2={cx} y2={cardTop} delay={150 + i * 8} color={C.gold} width={1.6} dots={4} />
        ))}
      </svg>

      {/* top vector boxes */}
      <VectorBox cx={boxCx[0]} top={boxTop} label="The Guest" sub="Guest Communications" delay={44} />
      <VectorBox cx={boxCx[1]} top={boxTop} label="The Workflow" sub="Workflow Management" delay={56} />
      <VectorBox cx={boxCx[2]} top={boxTop} label="The Operation" sub="Operational Capabilities" delay={68} />

      {/* central gold band (draws open from the centre) */}
      <div
        style={{
          position: "absolute", top: bandTop, left: 0, width: W,
          display: "flex", justifyContent: "center",
        }}
      >
        <div
          style={{
            height: bandH, width: 1560, transform: `scaleX(${bandP})`, transformOrigin: "50% 50%",
            background: `linear-gradient(90deg, ${C.gold}, ${C.goldSoft} 50%, ${C.gold})`,
            borderRadius: 16, boxShadow: `0 0 ${34 + bandGlow * 22}px rgba(160,138,79,${0.28 + bandGlow * 0.14})`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}
        >
          <div style={{ opacity: bandTextP, transform: `scaleX(${1 / Math.max(bandP, 0.001)})`, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontFamily: FONT.display, fontSize: 34, letterSpacing: "0.06em", color: C.ink }}>
              MERIDIAN · CONVERSATIONAL &amp; AGENTIC AI
            </div>
            <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 21, color: "rgba(19,33,60,0.8)", marginTop: 6 }}>
              the glue that binds all three into one surface
            </div>
          </div>
        </div>
      </div>

      {/* bottom provision cards */}
      <ProvideCard cx={cardCx[0]} top={cardTop} text="ONE IDENTITY" delay={172} />
      <ProvideCard cx={cardCx[1]} top={cardTop} text="ONE ENTRY POINT" delay={184} />
      <ProvideCard cx={cardCx[2]} top={cardTop} text="THE HOME FOR AI" delay={196} />

      <Takeaway3 delay={210}>
        Only Minor owns all three — so no vendor can replicate it.
      </Takeaway3>
    </DeckStage>
  );
};
