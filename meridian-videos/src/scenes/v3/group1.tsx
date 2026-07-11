/**
 * VIDEO 3 — Group 1 (Intro, S01 Title, S02 The Scale, S03 The Convergence).
 * Dynamic motion graphics: continuous float / traveling streams / counters /
 * growing bars / pulsing convergence — alive across the full scene, not a slide.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, staticFile } from "remotion";
import { C, FONT } from "../../theme";
import { ramp, Counter } from "../../lib/motion";
import { FlowLine } from "../../lib/v3ui";
import { DeckStage, Eyebrow3, Headline3, SubLine, Takeaway3 } from "./common3";

const W = 1920;
const H = 1080;

/** Full-frame shell: animated navy/paper backdrop + true 1920×1080 coordinate space. */
const Shell: React.FC<{ bg?: string; children: React.ReactNode }> = ({ bg, children }) => (
  <DeckStage bg={bg} pad={0}>
    <AbsoluteFill>{children}</AbsoluteFill>
  </DeckStage>
);

/* =============================================================== INTRO ==== */

export const IntroCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const drift = -(t * 6); // slow parallax rise
  const shimmer = ((frame * 6) % 240) / 240; // traveling dot on the gold rule
  const lineW = ramp(frame, 22, 52); // rule draws across
  const breathe = 1 + 0.006 * Math.sin(t * 1.4);

  const words = [
    { w: "MERIDIAN,", gold: false },
    { w: "IN", gold: true },
    { w: "MOTION", gold: true },
  ];

  return (
    <Shell>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `translateY(${drift}px)`,
        }}
      >
        {/* eyebrow */}
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: C.gold,
            opacity: ramp(frame, 6, 24),
            marginBottom: 34,
          }}
        >
          Project Meridian
        </div>

        {/* title — word stagger + gentle breathe */}
        <div
          style={{
            display: "flex",
            gap: "0 0.28em",
            fontFamily: FONT.display,
            fontSize: 150,
            lineHeight: 0.96,
            transform: `scale(${breathe})`,
          }}
        >
          {words.map((o, i) => {
            const p = ramp(frame, 12 + i * 5, 12 + i * 5 + 16);
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity: p,
                  transform: `translateY(${(1 - p) * 30}px)`,
                  color: o.gold ? C.gold : "#fff",
                }}
              >
                {o.w}
              </span>
            );
          })}
        </div>

        {/* drawing meridian rule with a traveling shimmer node */}
        <div style={{ position: "relative", width: 760, height: 20, marginTop: 40, marginBottom: 34 }}>
          <div
            style={{
              position: "absolute",
              top: 9,
              left: "50%",
              transform: "translateX(-50%)",
              width: 760 * lineW,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${C.gold} 20%, ${C.gold} 80%, transparent)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 4,
              left: `${8 + shimmer * 84}%`,
              width: 12,
              height: 12,
              borderRadius: 12,
              background: C.goldSoft,
              boxShadow: `0 0 16px ${C.gold}`,
              opacity: lineW,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 4,
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: 12,
              height: 12,
              background: C.gold,
              opacity: lineW,
            }}
          />
        </div>

        {/* sub-line */}
        <div
          style={{
            fontFamily: FONT.serif,
            fontStyle: "italic",
            fontSize: 32,
            color: "rgba(255,255,255,0.74)",
            opacity: ramp(frame, 40, 62),
            transform: `translateY(${(1 - ramp(frame, 40, 62)) * 12}px)`,
          }}
        >
          A walkthrough of the internal briefing
        </div>

        {/* minor hotels wordmark */}
        <div
          style={{
            position: "absolute",
            bottom: 84,
            fontFamily: FONT.sans,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.44em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            opacity: ramp(frame, 58, 78),
          }}
        >
          Minor Hotels
        </div>
      </AbsoluteFill>
    </Shell>
  );
};

/* ============================================================ S01 TITLE ==== */

const PILLARS: [string, string][] = [
  ["CUSTOMER SURFACE", "One Minor Hotels Identity"],
  ["OPERATOR SURFACE", "One Platform, Every Role"],
  ["MERIDIAN MOBILE", "Intelligence in Every Hand"],
  ["LIVE WORKFLOWS", "SOP to Real-Time Action"],
];

const PhoneMock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const p = ramp(frame, 14, 46);
  const enterX = (1 - p) * 150;
  const scale = 0.9 + 0.1 * p;
  const floatY = 14 * Math.sin(t * 1.1);
  const rotY = 5 * Math.sin(t * 0.55);
  const btnGlow = 0.5 + 0.5 * Math.sin(t * 2.2);

  const chip = (label: string) => (
    <div
      style={{
        flex: 1,
        background: "rgba(19,33,60,0.05)",
        border: `1px solid ${C.hairline}`,
        borderRadius: 12,
        padding: "12px 14px",
      }}
    >
      <div style={{ fontFamily: FONT.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", color: C.mist, textTransform: "uppercase" }}>
        {label === "DATE" ? "Date" : "Time"}
      </div>
      <div style={{ fontFamily: FONT.sans, fontSize: 19, fontWeight: 700, color: C.ink, marginTop: 4 }}>
        {label === "DATE" ? "Fri, 12 Jul" : "3:00 PM"}
      </div>
    </div>
  );

  return (
    <div style={{ position: "absolute", left: 1140, top: 80, width: 460, height: 920, perspective: 1600 }}>
      {/* soft floor shadow, breathes with float */}
      <div
        style={{
          position: "absolute",
          bottom: 40 - floatY * 0.6,
          left: "50%",
          transform: "translateX(-50%)",
          width: 320,
          height: 44,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.38)",
          filter: "blur(26px)",
          opacity: p * (0.7 - Math.abs(floatY) * 0.01),
        }}
      />
      <div
        style={{
          width: 440,
          height: 900,
          margin: "0 auto",
          opacity: p,
          transform: `translateX(${enterX}px) translateY(${floatY}px) rotateY(${rotY}deg) scale(${scale})`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* bezel */}
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#0C1730",
            borderRadius: 52,
            padding: 15,
            boxShadow: "0 40px 90px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          {/* screen */}
          <div
            style={{
              width: "100%",
              height: "100%",
              background: C.paper,
              borderRadius: 40,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 14, fontWeight: 700, letterSpacing: "0.22em", color: C.ink, textTransform: "uppercase" }}>
                Minor Hotels
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: 5, height: 5, borderRadius: 5, background: C.gold }} />
                ))}
              </div>
            </div>

            {/* hero image */}
            <div style={{ position: "relative", marginTop: 16, height: 218, borderRadius: 20, overflow: "hidden" }}>
              <img
                src={staticFile("assets/images/property-anantara-ubud.jpg")}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  background: "rgba(160,138,79,0.92)",
                  color: "#fff",
                  fontFamily: FONT.sans,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "5px 10px",
                  borderRadius: 8,
                }}
              >
                Signature
              </div>
            </div>

            {/* title block */}
            <div style={{ fontFamily: FONT.display, fontSize: 30, color: C.ink, marginTop: 20, lineHeight: 1.05 }}>
              Thai Heritage Massage
            </div>
            <div style={{ fontFamily: FONT.sans, fontSize: 14, fontWeight: 700, letterSpacing: "0.16em", color: C.gold, textTransform: "uppercase", marginTop: 8 }}>
              Anantara Spa
            </div>
            <div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 700, color: C.ink, marginTop: 12 }}>
              THB 2,200 · 60 minutes
            </div>
            <div style={{ fontFamily: FONT.serif, fontSize: 18, lineHeight: 1.4, color: C.inkSoft, marginTop: 12 }}>
              A restorative ritual of warm compress and slow, grounding pressure.
            </div>

            {/* date / time */}
            <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
              {chip("DATE")}
              {chip("TIME")}
            </div>

            {/* CTA */}
            <div style={{ marginTop: "auto" }}>
              <div
                style={{
                  height: 62,
                  borderRadius: 16,
                  background: `linear-gradient(90deg, ${C.gold}, ${C.goldSoft})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONT.sans,
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#fff",
                  boxShadow: `0 0 ${16 + btnGlow * 22}px rgba(160,138,79,${0.35 + btnGlow * 0.3})`,
                }}
              >
                Book Experience
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const S01: React.FC = () => {
  const frame = useCurrentFrame();
  const active = frame > 96 ? Math.floor((frame - 96) / 70) % 4 : -1; // cycling highlight keeps list alive

  return (
    <Shell>
      {/* LEFT — copy */}
      <div style={{ position: "absolute", left: 110, top: 150, width: 900 }}>
        <Headline3 white="MERIDIAN" size={150} delay={4} />
        <div
          style={{
            fontFamily: FONT.serif,
            fontStyle: "italic",
            fontSize: 36,
            color: C.gold,
            marginTop: 6,
            opacity: ramp(frame, 20, 40),
          }}
        >
          by Minor Hotels
        </div>
        <SubLine delay={30} max={820}>
          A unified platform connecting every property, owner, and operating partner — one
          entry point, built mobile-first.
        </SubLine>

        {/* pillars */}
        <div style={{ marginTop: 42, display: "flex", flexDirection: "column", gap: 18 }}>
          {PILLARS.map(([label, desc], i) => {
            const p = ramp(frame, 46 + i * 9, 46 + i * 9 + 18);
            const on = active === i;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  opacity: p,
                  transform: `translateX(${(1 - p) * -40 + (on ? 10 : 0)}px)`,
                  transition: "transform 0.3s",
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    background: C.gold,
                    transform: `rotate(45deg) scale(${on ? 1.3 : 1})`,
                    boxShadow: on ? `0 0 14px ${C.gold}` : "none",
                  }}
                />
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: FONT.sans, fontSize: 21, fontWeight: 800, letterSpacing: "0.12em", color: on ? C.goldSoft : C.gold }}>
                    {label}
                  </span>
                  <span style={{ fontFamily: FONT.serif, fontSize: 24, color: "rgba(255,255,255,0.82)" }}>
                    {desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT — phone */}
      <PhoneMock />
    </Shell>
  );
};

/* ============================================================ S02 SCALE ==== */

const StatBlock: React.FC<{
  value: React.ReactNode;
  label: string;
  x: number;
  delay: number;
  gold?: boolean;
}> = ({ value, label, x, delay, gold }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = ramp(frame, delay, delay + 16);
  const glow = gold ? 0.5 + 0.5 * Math.sin((frame / fps) * 2) : 0;
  return (
    <div style={{ position: "absolute", left: x, top: 470, width: 380, opacity: p, transform: `translateY(${(1 - p) * 22}px)` }}>
      <div
        style={{
          fontFamily: FONT.display,
          fontSize: 104,
          lineHeight: 0.9,
          color: gold ? C.gold : "#fff",
          fontVariantNumeric: "tabular-nums",
          textShadow: gold ? `0 0 ${18 + glow * 26}px rgba(160,138,79,${0.3 + glow * 0.35})` : "none",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: FONT.sans,
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: "0.13em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.58)",
          marginTop: 14,
          maxWidth: 320,
          lineHeight: 1.35,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const S02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // growth bar geometry
  const bx0 = 130;
  const bx1 = 1790;
  const bw = bx1 - bx0;
  const todayFrac = 0.59; // 590 / 1000
  const solid = ramp(frame, 44, 84) * todayFrac;
  const target = solid < todayFrac - 0.001 ? 0 : (todayFrac + (1 - todayFrac) * ramp(frame, 88, 138));
  const edge = Math.max(solid, target);
  const done = ramp(frame, 138, 150);
  const sweep = ((frame * 9) % (bw + 240)) - 120; // repeating shimmer after fill
  const edgePulse = 0.5 + 0.5 * Math.sin((frame / fps) * 3);

  const cols = [130, 570, 1010, 1450];

  return (
    <Shell>
      <div style={{ position: "absolute", left: 110, top: 96 }}>
        <Eyebrow3>The Scale</Eyebrow3>
        <Headline3 white="THE PORTFOLIO WE" gold="ARE BUILDING TOWARD." size={80} delay={6} />
      </div>
      <div style={{ position: "absolute", left: 110, top: 360 }}>
        <SubLine delay={26} max={1100}>
          A growth target already signed into the corporate strategy.
        </SubLine>
      </div>

      {/* growing dividers between stats */}
      {[540, 980, 1420].map((dx, i) => {
        const g = ramp(frame, 40 + i * 8, 40 + i * 8 + 22);
        return (
          <div
            key={dx}
            style={{
              position: "absolute",
              left: dx,
              top: 486,
              width: 1,
              height: 150,
              background: "linear-gradient(180deg, transparent, rgba(160,138,79,0.55), transparent)",
              transform: `scaleY(${g})`,
              transformOrigin: "50% 50%",
            }}
          />
        );
      })}

      {/* stats */}
      <StatBlock x={cols[0]} delay={40} value={<Counter to={590} delay={44} durationFrames={40} suffix="+" />} label="Hotels across six continents" />
      <StatBlock x={cols[1]} delay={52} gold value={<Counter to={1000} delay={56} durationFrames={44} format={(n) => Math.round(n).toLocaleString()} />} label="Properties targeted by 2029" />
      <StatBlock x={cols[2]} delay={64} value={<Counter to={63} delay={68} durationFrames={38} />} label="Countries of operation" />
      <StatBlock x={cols[3]} delay={76} value={<Counter to={80} delay={80} durationFrames={40} suffix="%" />} label="New additions asset-light" />

      {/* dynamic growth bar: 590 → 1,000 */}
      <div style={{ position: "absolute", left: bx0, top: 812, width: bw, height: 8 }}>
        {/* track */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 4, background: "rgba(255,255,255,0.10)" }} />
        {/* target (lighter) segment */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: 8,
            width: bw * target,
            borderRadius: 4,
            background: `rgba(200,179,126,0.45)`,
          }}
        />
        {/* solid "today" segment */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: 8,
            width: bw * solid,
            borderRadius: 4,
            background: `linear-gradient(90deg, ${C.gold}, ${C.goldSoft})`,
          }}
        />
        {/* leading edge node */}
        <div
          style={{
            position: "absolute",
            left: bw * edge - 8,
            top: -4,
            width: 16,
            height: 16,
            borderRadius: 16,
            background: C.goldSoft,
            boxShadow: `0 0 ${12 + edgePulse * 16}px ${C.gold}`,
          }}
        />
        {/* repeating shimmer after fill completes */}
        <div
          style={{
            position: "absolute",
            left: sweep,
            top: 0,
            width: 120,
            height: 8,
            borderRadius: 4,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            opacity: done * 0.8,
          }}
        />
      </div>

      {/* bar labels */}
      <div
        style={{
          position: "absolute",
          left: bx0 + bw * todayFrac - 40,
          top: 834,
          fontFamily: FONT.sans,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
          opacity: ramp(frame, 84, 100),
        }}
      >
        Today · 590
      </div>
      <div
        style={{
          position: "absolute",
          left: bx1 - 150,
          top: 834,
          fontFamily: FONT.sans,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: C.gold,
          opacity: ramp(frame, 130, 148),
        }}
      >
        2029 · 1,000
      </div>
    </Shell>
  );
};

/* ====================================================== S03 CONVERGENCE ==== */

const VECTORS: [string, string, string][] = [
  ["1", "GUEST COMMS & OMNICHANNEL 360", "Off-property solutions focus on the guest surface only."],
  ["2", "GUEST COMMS & WORKFLOW", "On-property tools have inconsistent adoption; staff default to LINE and WhatsApp."],
  ["3", "PROPERTY-TECH AGNOSTIC", "1,000 hotels; we cannot be opinionated about PMS."],
];

export const S03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const centers = [480, 960, 1440];
  const target = { x: 960, y: 628 };

  const barP = ramp(frame, 70, 96);
  const pulse = 0.5 + 0.5 * Math.sin(t * 2.4);

  return (
    <Shell bg={C.paper}>
      <div style={{ position: "absolute", left: 110, top: 90 }}>
        <Eyebrow3>The Convergence</Eyebrow3>
        <Headline3 light white="THREE VECTORS." gold="ONE MISSING LAYER." size={78} delay={6} />
      </div>
      <div style={{ position: "absolute", left: 110, top: 250 }}>
        <SubLine light delay={26} max={1200}>
          Three separate vectors are each arriving independently at the same gap.
        </SubLine>
      </div>

      {/* three vector columns */}
      {VECTORS.map(([num, title, desc], i) => {
        const p = ramp(frame, 40 + i * 12, 40 + i * 12 + 20);
        const cx = centers[i];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx - 210,
              top: 342,
              width: 420,
              opacity: p,
              transform: `translateY(${(1 - p) * 26}px)`,
            }}
          >
            {/* ghost number */}
            <div
              style={{
                position: "absolute",
                top: -70,
                left: -10,
                fontFamily: FONT.display,
                fontSize: 220,
                lineHeight: 1,
                color: "rgba(19,33,60,0.06)",
                transform: `translateY(${3 * Math.sin(t * 0.8 + i)}px)`,
              }}
            >
              {num}
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ width: 46, height: 3, background: C.gold, marginBottom: 16 }} />
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  color: C.ink,
                  lineHeight: 1.2,
                  minHeight: 56,
                }}
              >
                {title}
              </div>
              <div style={{ fontFamily: FONT.serif, fontSize: 20, lineHeight: 1.42, color: C.inkSoft, marginTop: 14 }}>
                {desc}
              </div>
            </div>
          </div>
        );
      })}

      {/* converging streams */}
      <svg width={W} height={H} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} viewBox={`0 0 ${W} ${H}`}>
        {centers.map((cx, i) => (
          <FlowLine key={i} x1={cx} y1={560} x2={target.x} y2={target.y} delay={72 + i * 6} dots={4} width={2} />
        ))}
      </svg>

      {/* pulsing MISSING LAYER bar */}
      <div
        style={{
          position: "absolute",
          left: 960 - 430,
          top: 636,
          width: 860,
          height: 68,
          borderRadius: 14,
          background: `linear-gradient(90deg, ${C.gold}, ${C.goldSoft}, ${C.gold})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: barP,
          transform: `translateY(${(1 - barP) * 16}px) scale(${0.96 + barP * 0.04})`,
          boxShadow: `0 0 ${24 + pulse * 40}px rgba(160,138,79,${0.4 + pulse * 0.35})`,
        }}
      >
        <span
          style={{
            fontFamily: FONT.display,
            fontSize: 32,
            letterSpacing: "0.14em",
            color: "#12203A",
          }}
        >
          THE MISSING LAYER
        </span>
      </div>

      <Takeaway3 light delay={100}>
        Not three problems — three teams discovering the same missing layer.
      </Takeaway3>
    </Shell>
  );
};
