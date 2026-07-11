/**
 * VIDEO 3 — Group 3 (S08–S11): Why Now · What It Is · Six Service Domains · The Challenge.
 * Dynamic motion graphics (staggered builds, drawing connectors, flowing dots, motivated
 * camera on the live dashboard, continuous ambient bob/drift). Facts strictly from the deck.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { DeckStage, Eyebrow3, Headline3, SubLine, Takeaway3 } from "./common3";
import { Camera, ramp, EASE } from "../../lib/motion";
import { FlowLine } from "../../lib/v3ui";
import { C, FONT, SHADOW } from "../../theme";
import { MeridianDashboard } from "../../screens/MeridianDashboard";

/* ---------- shared helpers ---------- */

/** Full-frame stage: DeckStage animated navy background + absolute-positioned layout. */
const Frame: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg }) => (
  <DeckStage pad={0} bg={bg}>
    <AbsoluteFill>{children}</AbsoluteFill>
  </DeckStage>
);

/** Continuous gentle vertical float (keeps frames alive between beats). */
const bob = (frame: number, phase: number, amp = 3.5, period = 96) =>
  Math.sin((frame / period) * Math.PI * 2 + phase) * amp;

const WHITE = "#fff";
const W_SOFT = "rgba(255,255,255,0.72)";
const W_MUTE = "rgba(255,255,255,0.55)";
const CARD_BG = "rgba(255,255,255,0.045)";
const CARD_BD = "rgba(255,255,255,0.11)";

/* ============================================================================
 * S08 — WHY NOW
 * ==========================================================================*/

const PROOF: { n: string; title: string; body: string }[] = [
  { n: "01", title: "LEADERSHIP ALIGNMENT", body: "Group CEO independently converged on one unified platform." },
  { n: "02", title: "ORGANIC DEMAND", body: "A regional COO requested a conversational interface to financial data — unprompted." },
  { n: "03", title: "A VALIDATED PATTERN", body: "Tech Concierge, a Microsoft Copilot agent, already runs on Minor's systems via SharePoint & Teams." },
  { n: "04", title: "COMPETITIVE RISK IS LIVE", body: "Staff already ask ChatGPT & Gemini when Minor's systems can't answer." },
];

const ProofCard: React.FC<{
  d: (typeof PROOF)[number]; x: number; y: number; w: number; h: number; delay: number; phase: number;
}> = ({ d, x, y, w, h, delay, phase }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + 18);
  const pulse = 0.5 + 0.5 * Math.sin((frame / 40) * Math.PI * 2 + phase);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        opacity: p,
        transform: `translateY(${(1 - p) * 28 + bob(frame, phase)}px)`,
        background: CARD_BG,
        border: `1px solid ${CARD_BD}`,
        borderRadius: 16,
        padding: "22px 28px",
        display: "flex",
        gap: 22,
        alignItems: "center",
        boxShadow: "0 18px 44px rgba(0,0,0,0.22)",
      }}
    >
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div
          style={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            border: `1px solid ${C.gold}`,
            opacity: 0.15 + pulse * 0.35,
            transform: `scale(${1 + pulse * 0.14})`,
          }}
        />
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            border: `1.5px solid ${C.gold}`,
            background: "rgba(160,138,79,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT.display,
            fontSize: 22,
            color: C.gold,
          }}
        >
          {d.n}
        </div>
      </div>
      <div>
        <div style={{ fontFamily: FONT.sans, fontSize: 19, fontWeight: 800, letterSpacing: "0.10em", color: C.gold, marginBottom: 8 }}>
          {d.title}
        </div>
        <div style={{ fontFamily: FONT.serif, fontSize: 20, lineHeight: 1.35, color: W_SOFT }}>{d.body}</div>
      </div>
    </div>
  );
};

export const S08: React.FC = () => {
  const frame = useCurrentFrame();
  // 2x2 grid geometry
  const P = 90, gridTop = 502, gridH = 366, colGap = 30, rowGap = 24;
  const cardW = (1920 - 2 * P - colGap) / 2;
  const cardH = (gridH - rowGap) / 2;
  const cx = [P + cardW / 2, P + cardW + colGap + cardW / 2];
  const cy = [gridTop + cardH / 2, gridTop + cardH + rowGap + cardH / 2];
  const center = { x: 960, y: gridTop + gridH / 2 };
  const connDraw = ramp(frame, 78, 96);

  return (
    <Frame>
      {/* header */}
      <div style={{ position: "absolute", top: 66, left: P, right: P }}>
        <Eyebrow3>WHY NOW</Eyebrow3>
        <Headline3
          white="THE BIGGER UNLOCK ISN'T GUEST-FACING AI."
          gold="IT'S OPERATIONS."
          size={56}
          delay={4}
        />
        <div
          style={{
            marginTop: 26,
            borderLeft: `3px solid ${C.gold}`,
            paddingLeft: 24,
            maxWidth: 1560,
            opacity: ramp(frame, 24, 44),
            transform: `translateY(${(1 - ramp(frame, 24, 44)) * 12}px)`,
          }}
        >
          <span style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 23, lineHeight: 1.42, color: "rgba(255,255,255,0.80)" }}>
            McKinsey's research finds enterprise chatbots scale fast but deliver diffuse gains — the
            function-specific work of running the operation is where transformation actually happens.
          </span>
        </div>
      </div>

      {/* connective motif: demand · proof · risk converging */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
        {cx.map((x, ci) =>
          cy.map((y, ri) => (
            <FlowLine key={`${ci}-${ri}`} x1={center.x} y1={center.y} x2={x} y2={y} delay={70 + (ci + ri) * 4} color={C.gold} width={1.5} dots={2} />
          )),
        )}
        <circle cx={center.x} cy={center.y} r={7 * connDraw} fill={C.gold} opacity={0.9} />
        <circle cx={center.x} cy={center.y} r={14 * connDraw} fill="none" stroke={C.gold} strokeWidth={1} opacity={0.4} />
      </svg>

      {/* 2x2 proof cards */}
      {PROOF.map((d, i) => {
        const col = i % 2, row = Math.floor(i / 2);
        return (
          <ProofCard
            key={d.n}
            d={d}
            x={P + col * (cardW + colGap)}
            y={gridTop + row * (cardH + rowGap)}
            w={cardW}
            h={cardH}
            delay={40 + i * 8}
            phase={i * 1.7}
          />
        );
      })}

      <Takeaway3 delay={96}>
        None of this requires belief in a future trend — only connecting demand, proof, and risk that already exist.
      </Takeaway3>
    </Frame>
  );
};

/* ============================================================================
 * S09 — WHAT IT IS  (mockup showcase: the live dashboard as the layer above)
 * ==========================================================================*/

export const S09: React.FC = () => {
  const frame = useCurrentFrame();
  const FW = 1044; // frame width
  const scale = FW / 1920;
  const bodyH = 1080 * scale;
  const frameTop = 208;
  const frameLeft = 810;
  const slide = ramp(frame, 6, 40);
  const slideX = (1 - slide) * 140;

  return (
    <Frame>
      {/* LEFT ~40% — the pitch */}
      <div style={{ position: "absolute", top: 150, left: 96, width: 660, display: "flex", flexDirection: "column" }}>
        <Eyebrow3>WHAT IT IS</Eyebrow3>
        <Headline3 white="THE INTELLIGENCE LAYER" gold="ABOVE WHAT WE ALREADY HAVE." size={54} delay={4} />
        <SubLine delay={22} max={620}>
          Meridian is not a replacement. PMS, revenue, and messaging systems keep running exactly as they
          do today — Meridian is the common login and AI layer above them.
        </SubLine>
        <div
          style={{
            marginTop: 30,
            borderLeft: `3px solid ${C.gold}`,
            paddingLeft: 20,
            opacity: ramp(frame, 34, 54),
            transform: `translateY(${(1 - ramp(frame, 34, 54)) * 12}px)`,
          }}
        >
          <span style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 21, lineHeight: 1.4, color: C.goldSoft }}>
            The property systems don't change. The intelligence layer above them does.
          </span>
        </div>
      </div>

      {/* RIGHT ~60% — floating browser frame with the live dashboard */}
      <div style={{ position: "absolute", left: frameLeft, top: frameTop, opacity: slide, transform: `translateX(${slideX}px)` }}>
        {/* stacked "systems of record" slabs beneath the bright layer */}
        {[2, 1].map((k) => (
          <div
            key={k}
            style={{
              position: "absolute",
              left: k * 18,
              top: k * 18,
              width: FW,
              height: bodyH + 42,
              borderRadius: 16,
              background: `rgba(9,17,34,${0.9 - k * 0.18})`,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          />
        ))}

        {/* browser chrome + framed dashboard (the live, bright layer) */}
        <div
          style={{
            position: "relative",
            width: FW,
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: SHADOW.pop,
          }}
        >
          <div style={{ height: 42, background: "#0f1a30", display: "flex", alignItems: "center", padding: "0 18px", gap: 9, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#E5766B" }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#E9C46A" }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#7FB98B" }} />
            <div style={{ marginLeft: 16, flex: 1, height: 24, borderRadius: 7, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", padding: "0 14px" }}>
              <span style={{ fontFamily: FONT.sans, fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: "0.02em" }}>app.meridian.minor</span>
            </div>
          </div>
          <div style={{ width: FW, height: bodyH, overflow: "hidden" }}>
            <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: "top left" }}>
              <Camera from={{ scale: 1.0, x: 0, y: 0 }} to={{ scale: 1.07, x: -70, y: -34 }} start={18} end={520} ease={EASE.inOut}>
                <MeridianDashboard />
              </Camera>
            </div>
          </div>
        </div>

        {/* systems-of-record label under the stack */}
        <div
          style={{
            position: "absolute",
            top: bodyH + 42 + 30,
            left: 0,
            width: FW,
            textAlign: "center",
            opacity: ramp(frame, 60, 80),
          }}
        >
          <div style={{ fontFamily: FONT.sans, fontSize: 16, fontWeight: 700, letterSpacing: "0.24em", color: W_MUTE }}>
            PMS · REVENUE · MESSAGING
          </div>
          <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.42)", marginTop: 6 }}>
            systems of record — unchanged
          </div>
        </div>
      </div>
    </Frame>
  );
};

/* ============================================================================
 * S10 — THE SIX SERVICE DOMAINS  (diagram: domains → gold surface → integration tracks)
 * ==========================================================================*/

const DOMAINS: { label: string; sub: string }[] = [
  { label: "DISTRIBUTION", sub: "Booking & CRS" },
  { label: "GUEST & CRM", sub: "Loyalty & Identity" },
  { label: "FINANCE", sub: "ERP & Reporting" },
  { label: "WORKFORCE", sub: "People & Culture" },
  { label: "DEVELOPMENT", sub: "Brand & Standards" },
  { label: "PROCUREMENT", sub: "Sourcing & Supply" },
];

const TRACKS: { title: string; depth: string; chips: string[] }[] = [
  { title: "OWNED & MANAGED", depth: "FULL INTEGRATION", chips: ["Opera Cloud", "TMS", "OHIP", "Oracle Fusion", "SAP"] },
  { title: "STRATEGIC PARTNER & FRANCHISE", depth: "CHOSEN INTEGRATION", chips: ["Shiji", "Mews", "Approved PMS", "Certified API", "OHIP"] },
  { title: "FRANCHISE & AFFILIATE", depth: "PORTAL FIRST", chips: ["Any PMS or none", "Manual entry", "Synxis & OCC", "CDIP"] },
];

const Chip: React.FC<{ children: React.ReactNode; delay: number }> = ({ children, delay }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + 12);
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: FONT.sans,
        fontSize: 15,
        fontWeight: 600,
        color: "rgba(255,255,255,0.86)",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.16)",
        borderRadius: 999,
        padding: "6px 14px",
        opacity: p,
        transform: `translateY(${(1 - p) * 10}px)`,
      }}
    >
      {children}
    </span>
  );
};

export const S10: React.FC = () => {
  const frame = useCurrentFrame();
  const P = 80;
  const inner = 1920 - 2 * P;
  // domain tiles
  const tGap = 18, tileW = (inner - 5 * tGap) / 6, tilesY = 244, tileH = 116;
  const tileX = (i: number) => P + i * (tileW + tGap);
  const tileCx = (i: number) => tileX(i) + tileW / 2;
  // gold band
  const bandY = 486, bandH = 82;
  const bandDraw = ramp(frame, 44, 70);
  const bandText = ramp(frame, 62, 82);
  // tracks
  const trGap = 24, colW = (inner - 2 * trGap) / 3, tracksY = 616;
  const trackX = (i: number) => P + i * (colW + trGap);

  return (
    <Frame>
      <div style={{ position: "absolute", top: 54, left: P, right: P }}>
        <Eyebrow3>THE SIX SERVICE DOMAINS</Eyebrow3>
        <Headline3 white="WHAT MERIDIAN DELIVERS" gold="TO EVERY PROPERTY." size={50} delay={4} />
      </div>

      {/* connectors: domains → band, band → tracks */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {DOMAINS.map((_, i) => (
          <FlowLine key={`d${i}`} x1={tileCx(i)} y1={tilesY + tileH} x2={tileCx(i)} y2={bandY} delay={30 + i * 4} color={C.gold} width={1.6} dots={2} />
        ))}
        {TRACKS.map((_, i) => (
          <FlowLine key={`t${i}`} x1={trackX(i) + colW / 2} y1={bandY + bandH} x2={trackX(i) + colW / 2} y2={tracksY} delay={78 + i * 5} color={C.goldSoft} width={1.6} dots={2} />
        ))}
      </svg>

      {/* six domain tiles */}
      {DOMAINS.map((d, i) => {
        const p = ramp(frame, 12 + i * 5, 12 + i * 5 + 16);
        return (
          <div
            key={d.label}
            style={{
              position: "absolute",
              left: tileX(i),
              top: tilesY,
              width: tileW,
              height: tileH,
              opacity: p,
              transform: `translateY(${(1 - p) * 22 + bob(frame, i * 1.1, 2.6)}px)`,
              background: CARD_BG,
              border: `1px solid ${CARD_BD}`,
              borderRadius: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0 12px",
              boxShadow: "0 14px 34px rgba(0,0,0,0.20)",
            }}
          >
            <div style={{ fontFamily: FONT.sans, fontSize: 19, fontWeight: 800, letterSpacing: "0.04em", color: C.gold }}>{d.label}</div>
            <div style={{ fontFamily: FONT.serif, fontSize: 16, color: W_SOFT, marginTop: 7 }}>{d.sub}</div>
          </div>
        );
      })}

      {/* gold band — the unified operator surface, drawing across */}
      <div style={{ position: "absolute", left: P, top: bandY, width: inner, height: bandH, borderRadius: 14, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: `${bandDraw * 100}%`,
            background: `linear-gradient(90deg, ${C.gold}, ${C.goldSoft})`,
            boxShadow: "0 10px 30px rgba(160,138,79,0.35)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 22, opacity: bandText }}>
          <span style={{ fontFamily: FONT.display, fontSize: 26, color: C.ink, letterSpacing: "0.01em" }}>MERIDIAN BY MINOR HOTELS</span>
          <span style={{ width: 1, height: 30, background: "rgba(19,33,60,0.35)" }} />
          <span style={{ fontFamily: FONT.sans, fontSize: 15, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(19,33,60,0.80)" }}>
            Unified Operator Surface · Conversational AI · Workflow Engine
          </span>
        </div>
      </div>

      {/* three integration tracks with real named systems */}
      {TRACKS.map((t, i) => {
        const p = ramp(frame, 82 + i * 8, 82 + i * 8 + 18);
        return (
          <div
            key={t.title}
            style={{
              position: "absolute",
              left: trackX(i),
              top: tracksY,
              width: colW,
              opacity: p,
              transform: `translateY(${(1 - p) * 26}px)`,
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${CARD_BD}`,
              borderTop: `2px solid ${C.gold}`,
              borderRadius: 14,
              padding: "18px 20px 20px",
            }}
          >
            <div style={{ fontFamily: FONT.sans, fontSize: 17, fontWeight: 800, letterSpacing: "0.03em", color: WHITE }}>{t.title}</div>
            <div style={{ fontFamily: FONT.sans, fontSize: 12.5, fontWeight: 700, letterSpacing: "0.16em", color: C.gold, marginTop: 5 }}>{t.depth}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 15 }}>
              {t.chips.map((ch, j) => (
                <Chip key={ch} delay={92 + i * 8 + j * 3}>
                  {ch}
                </Chip>
              ))}
            </div>
          </div>
        );
      })}

      <Takeaway3 delay={120}>
        Meridian is the demarcation point — owners see one cohesive service; Minor manages the varied tech behind it.
      </Takeaway3>
    </Frame>
  );
};

/* ============================================================================
 * S11 — THE CHALLENGE  (AI absorbs the integration)
 * ==========================================================================*/

const REGIONS: { label: string; body: string }[] = [
  { label: "FINANCE", body: "one common ERP alone won't unlock better finance" },
  { label: "WORKFORCE", body: "one common HCM alone won't unlock better service" },
  { label: "OPERATIONS", body: "one common WFM alone won't unlock adoption" },
];

const RecordChip: React.FC<{ title: string; sub: string; x: number; y: number; delay: number; phase: number }> = ({ title, sub, x, y, delay, phase }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, delay, delay + 16);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 236,
        opacity: p,
        transform: `translate(${(1 - p) * -22}px, ${bob(frame, phase, 3)}px)`,
        background: CARD_BG,
        border: `1px solid ${CARD_BD}`,
        borderRadius: 14,
        padding: "16px 20px",
        boxShadow: "0 14px 32px rgba(0,0,0,0.24)",
      }}
    >
      <div style={{ fontFamily: FONT.display, fontSize: 26, color: WHITE }}>{title}</div>
      <div style={{ fontFamily: FONT.sans, fontSize: 13, fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", color: W_MUTE, marginTop: 6 }}>{sub}</div>
    </div>
  );
};

export const S11: React.FC = () => {
  const frame = useCurrentFrame();
  const P = 80;
  const inner = 1920 - 2 * P;
  const rGap = 24, colW = (inner - 2 * rGap) / 3, regionsY = 250, regionH = 128;
  const regionX = (i: number) => P + i * (colW + rGap);

  // AI absorption diagram geometry
  const diagLabelY = 430;
  const chipX = 300;
  const nodeC = { x: 960, y: 640 };
  const nodeR = 118;
  const ansX = 1384;
  const pulse = 0.5 + 0.5 * Math.sin((frame / 34) * Math.PI * 2);
  const nodeIn = ramp(frame, 70, 90);
  const ansIn = ramp(frame, 104, 124);

  return (
    <Frame>
      <div style={{ position: "absolute", top: 56, left: P, right: P }}>
        <Eyebrow3>THE CHALLENGE</Eyebrow3>
        <Headline3 white="DIFFERENT STACKS BY REGION." gold="ONE PLAYBOOK STILL WORKS." size={56} delay={4} />
      </div>

      {/* three region cards */}
      {REGIONS.map((r, i) => {
        const p = ramp(frame, 26 + i * 7, 26 + i * 7 + 16);
        return (
          <div
            key={r.label}
            style={{
              position: "absolute",
              left: regionX(i),
              top: regionsY,
              width: colW,
              height: regionH,
              opacity: p,
              transform: `translateY(${(1 - p) * 22}px)`,
              background: CARD_BG,
              border: `1px solid ${CARD_BD}`,
              borderLeft: `3px solid ${C.gold}`,
              borderRadius: 14,
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ fontFamily: FONT.sans, fontSize: 18, fontWeight: 800, letterSpacing: "0.10em", color: C.gold }}>{r.label}</div>
            <div style={{ fontFamily: FONT.serif, fontSize: 20, lineHeight: 1.34, color: W_SOFT, marginTop: 9 }}>{r.body}</div>
          </div>
        );
      })}

      {/* KEY BEAT — AI absorbs the integration */}
      <div
        style={{
          position: "absolute",
          top: diagLabelY,
          left: 0,
          width: 1920,
          textAlign: "center",
          opacity: ramp(frame, 56, 76),
        }}
      >
        <span style={{ fontFamily: FONT.sans, fontSize: 19, fontWeight: 800, letterSpacing: "0.26em", color: C.gold }}>AI ABSORBS THE INTEGRATION</span>
      </div>

      {/* flowing connectors: records → AI → answer */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <FlowLine x1={chipX + 236} y1={588} x2={nodeC.x - nodeR} y2={nodeC.y - 18} delay={58} color={C.cadet} width={2} dots={3} />
        <FlowLine x1={chipX + 236} y1={700} x2={nodeC.x - nodeR} y2={nodeC.y + 18} delay={66} color={C.cadet} width={2} dots={3} />
        <FlowLine x1={nodeC.x + nodeR} y1={nodeC.y} x2={ansX} y2={nodeC.y} delay={100} color={C.gold} width={2.4} dots={3} />
        {/* pulsing halo on the node */}
        <circle cx={nodeC.x} cy={nodeC.y} r={nodeR * nodeIn * (1 + pulse * 0.05)} fill="none" stroke={C.gold} strokeWidth={1} opacity={0.18 + pulse * 0.22} />
        <circle cx={nodeC.x} cy={nodeC.y} r={(nodeR + 22) * nodeIn} fill="none" stroke={C.gold} strokeWidth={1} opacity={0.08 + pulse * 0.10} />
      </svg>

      {/* two record chips (left) */}
      <RecordChip title="CRS" sub="Booking records" x={chipX} y={548} delay={44} phase={0} />
      <RecordChip title="CDP" sub="Guest data platform" x={chipX} y={660} delay={52} phase={1.4} />

      {/* central conversational-AI node (glowing) */}
      <div
        style={{
          position: "absolute",
          left: nodeC.x - nodeR,
          top: nodeC.y - nodeR,
          width: nodeR * 2,
          height: nodeR * 2,
          borderRadius: "50%",
          opacity: nodeIn,
          transform: `scale(${0.85 + nodeIn * 0.15})`,
          background: "radial-gradient(circle at 50% 40%, rgba(160,138,79,0.32), rgba(19,33,60,0.65))",
          border: `1.5px solid ${C.gold}`,
          boxShadow: `0 0 ${44 + pulse * 34}px rgba(160,138,79,${0.34 + pulse * 0.24})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ fontFamily: FONT.sans, fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", color: C.goldSoft }}>CONVERSATIONAL</div>
        <div style={{ fontFamily: FONT.display, fontSize: 44, color: WHITE, lineHeight: 1, marginTop: 4 }}>AI</div>
      </div>

      {/* clean single answer (right) */}
      <div
        style={{
          position: "absolute",
          left: ansX,
          top: nodeC.y - 66,
          width: 300,
          opacity: ansIn,
          transform: `translateX(${(1 - ansIn) * 24}px)`,
          background: "#fff",
          borderRadius: 16,
          padding: "22px 26px",
          boxShadow: SHADOW.pop,
        }}
      >
        <div style={{ fontFamily: FONT.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.gold }}>Answer</div>
        <div style={{ fontFamily: FONT.serif, fontSize: 21, lineHeight: 1.3, color: C.ink, marginTop: 10 }}>
          One clear answer — no matter where the record lives.
        </div>
      </div>

      {/* caption under node */}
      <div
        style={{
          position: "absolute",
          top: nodeC.y + nodeR + 26,
          left: 0,
          width: 1920,
          textAlign: "center",
          opacity: ramp(frame, 118, 138),
        }}
      >
        <span style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 19, color: "rgba(255,255,255,0.60)" }}>
          Staff never need to know where the record lives — AI normalizes the chaos.
        </span>
      </div>

      <Takeaway3 delay={132}>Owners never see the stack — only the service.</Takeaway3>
    </Frame>
  );
};
