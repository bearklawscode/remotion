/**
 * Video 3 — Group 4 (S12–S15): the deployment / growth arc of the deck.
 *   S12 The Operator Surface — Meridian Mobile + a five-tier capability ladder
 *       that lights up bottom→top while a gold rail climbs (mockup phone floats).
 *   S13 The Growth Model — OMFA letter-cards with integration-depth meters that fill.
 *   S14 Fast Franchise — a drawing navy AI bar + three staggered scenario cards.
 *   S15 For the Franchisee — a 3×2 grid of value-prop tiles with hover-float drift.
 * All scenes: full-frame 1920×1080, static, useCurrentFrame relative to own sequence.
 * DYNAMIC motion — staggered builds, climbing rail, filling meters, drifting tiles.
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { C, FONT } from "../../theme";
import { ramp, EASE } from "../../lib/motion";
import { DeckStage, Eyebrow3, Headline3, Takeaway3 } from "./common3";

const NAVY = "#13213C";
const PAPER = "#FBF6F0";

/* ═══════════════════════════════════════════════════════════════════════════
   S12 — THE OPERATOR SURFACE (navy) — climbing five-tier ladder + phone mockup
   ═══════════════════════════════════════════════════════════════════════════ */

const TIERS: { n: string; title: string; body: string }[] = [
  { n: "1", title: "INFORMATION", body: "Brand standards & SOPs in natural language — no integration." },
  { n: "2", title: "INTELLIGENCE", body: "Full guest profile & loyalty context, day one — no integration." },
  { n: "3", title: "PROPERTY INTEGRATION", body: "Late checkout, room moves, folio queries; PMS updates in the conversation." },
  { n: "4", title: "ANCILLARY CONNECTED", body: "Spa, dining & activities booked and confirmed in real time." },
  { n: "5", title: "FULL INTEGRATION", body: "POS postings, comp logging, escalation, multi-department dispatch." },
];

const LadderRow: React.FC<{ tier: (typeof TIERS)[number]; active: number }> = ({ tier, active }) => {
  // active: 0→1 activation progress for this row
  const on = active;
  const badge = interpolate(on, [0, 1], [0.18, 1]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: "16px 26px",
        borderRadius: 16,
        background: `rgba(255,255,255,${0.03 + on * 0.05})`,
        border: `1px solid rgba(160,138,79,${0.12 + on * 0.4})`,
        boxShadow: on > 0.6 ? `0 0 ${28 * on}px rgba(160,138,79,${0.18 * on})` : "none",
        opacity: interpolate(on, [0, 1], [0.34, 1]),
        transform: `translateX(${(1 - on) * -46}px)`,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 52,
          height: 52,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT.display,
          fontSize: 26,
          color: on > 0.5 ? NAVY : "rgba(255,255,255,0.7)",
          background: on > 0.5 ? C.gold : "rgba(255,255,255,0.07)",
          border: `1px solid rgba(160,138,79,${0.3 + badge * 0.5})`,
        }}
      >
        {tier.n}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, letterSpacing: "0.06em", color: on > 0.5 ? "#fff" : "rgba(255,255,255,0.8)" }}>
          {tier.title}
        </div>
        <div style={{ fontFamily: FONT.serif, fontSize: 18.5, lineHeight: 1.28, color: "rgba(255,255,255,0.66)", marginTop: 4 }}>
          {tier.body}
        </div>
      </div>
    </div>
  );
};

const PhoneMock: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = ramp(frame, delay, delay + 22);
  const t = frame / fps;
  const floatY = Math.sin(t * 1.1) * 9;
  const tilt = Math.sin(t * 0.7) * 1.1;
  const bubble = (i: number) => ramp(frame, delay + 26 + i * 12, delay + 26 + i * 12 + 14);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * 40 + floatY}px) scale(${0.9 + p * 0.1}) rotate(${tilt}deg)`,
        transformOrigin: "50% 50%",
        filter: "drop-shadow(0 30px 70px rgba(0,0,0,0.5))",
      }}
    >
      <div style={{ width: 322, borderRadius: 46, background: "#0C1428", padding: 12, border: "1px solid rgba(160,138,79,0.28)" }}>
        <div style={{ position: "relative", borderRadius: 36, background: PAPER, overflow: "hidden", height: 620 }}>
          {/* notch */}
          <div style={{ position: "absolute", left: "50%", top: 12, transform: "translateX(-50%)", width: 96, height: 20, borderRadius: 12, background: "#0C1428", zIndex: 3 }} />
          {/* app header */}
          <div style={{ background: "#fff", padding: "34px 22px 14px", boxShadow: "0 1px 0 rgba(19,33,60,0.06)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontFamily: FONT.display, fontSize: 15, letterSpacing: "0.2em", color: NAVY }}>MERIDIAN AI</span>
              <span style={{ width: 40, height: 2, background: C.gold }} />
            </div>
          </div>
          {/* chat */}
          <div style={{ padding: "18px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ alignSelf: "flex-end", opacity: bubble(0), maxWidth: "82%", background: NAVY, color: "#fff", borderRadius: "16px 16px 4px 16px", padding: "11px 14px", fontFamily: FONT.sans, fontSize: 14.5, lineHeight: 1.3 }}>
              Can we move Ms. Laurent to a corner suite and push checkout to 2pm?
            </div>
            <div style={{ alignSelf: "flex-start", opacity: bubble(1), maxWidth: "88%", background: "#fff", border: "1px solid rgba(160,138,79,0.35)", borderRadius: "16px 16px 16px 4px", padding: "12px 14px", boxShadow: "0 8px 22px rgba(19,33,60,0.10)" }}>
              <span style={{ fontFamily: FONT.sans, fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", color: C.gold }}>MERIDIAN</span>
              <div style={{ fontFamily: FONT.sans, fontSize: 14.5, lineHeight: 1.34, color: NAVY, marginTop: 5 }}>
                Done — Suite 1204 assigned, late checkout confirmed to 14:00.
              </div>
            </div>
            <div style={{ alignSelf: "flex-start", opacity: bubble(2), display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(62,124,89,0.12)", border: "1px solid rgba(62,124,89,0.4)", borderRadius: 999, padding: "7px 13px" }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: C.success }} />
              <span style={{ fontFamily: FONT.sans, fontSize: 12.5, fontWeight: 700, color: C.success }}>PMS updated · Opera</span>
            </div>
          </div>
          {/* input */}
          <div style={{ position: "absolute", left: 16, right: 16, bottom: 18, display: "flex", alignItems: "center", gap: 10, background: "#fff", border: "1px solid rgba(19,33,60,0.12)", borderRadius: 999, padding: "10px 16px", boxShadow: "0 6px 18px rgba(19,33,60,0.08)" }}>
            <span style={{ flex: 1, fontFamily: FONT.sans, fontSize: 13.5, color: C.mist }}>Ask Meridian…</span>
            <span style={{ width: 30, height: 30, borderRadius: 999, background: C.gold, display: "inline-flex", alignItems: "center", justifyContent: "center", color: NAVY, fontSize: 16 }}>↑</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const S12: React.FC = () => {
  const frame = useCurrentFrame();
  // rail climb 0→1 across the activation window
  const railFrac = interpolate(frame, [34, 122], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.out });
  const noteP = ramp(frame, 132, 152);
  const ROWH = 92;
  const GAP = 12;
  const stackH = TIERS.length * ROWH + (TIERS.length - 1) * GAP;
  return (
    <DeckStage bg={NAVY} pad={100}>
      <Eyebrow3 delay={2}>THE OPERATOR SURFACE</Eyebrow3>
      <Headline3 white="MERIDIAN MOBILE," gold="OPERATIONS IN EVERY HAND." size={62} delay={6} />

      <div style={{ display: "flex", alignItems: "center", gap: 54, marginTop: 34 }}>
        {/* ladder + climbing rail */}
        <div style={{ position: "relative", flex: 1, paddingLeft: 34 }}>
          {/* rail track */}
          <div style={{ position: "absolute", left: 8, top: 6, bottom: 6, width: 6, borderRadius: 6, background: "rgba(255,255,255,0.09)" }} />
          {/* rail fill (climbs from bottom up) */}
          <div style={{ position: "absolute", left: 8, bottom: 6, width: 6, borderRadius: 6, height: `calc(${railFrac} * (${stackH}px - 12px))`, background: `linear-gradient(to top, ${C.gold}, ${C.goldSoft})`, boxShadow: `0 0 16px rgba(160,138,79,0.6)` }} />
          {/* climbing node */}
          <div style={{ position: "absolute", left: 5, width: 12, height: 12, borderRadius: 999, background: C.goldSoft, boxShadow: "0 0 14px rgba(200,179,126,0.9)", bottom: `calc(6px + ${railFrac} * (${stackH}px - 18px))`, opacity: railFrac > 0.02 && railFrac < 0.99 ? 1 : 0.25 }} />

          {/* rows: DOM top→bottom is tier5→tier1; tier1 activates first */}
          <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
            {[...TIERS].reverse().map((tier) => {
              const idx = Number(tier.n) - 1; // 0 = bottom
              const delay = 34 + idx * 16;
              const active = ramp(frame, delay, delay + 18);
              return <LadderRow key={tier.n} tier={tier} active={active} />;
            })}
          </div>
        </div>

        {/* phone mockup */}
        <div style={{ flexShrink: 0, position: "relative" }}>
          <PhoneMock delay={16} />
        </div>
      </div>

      {/* note */}
      <div style={{ marginTop: 26, opacity: noteP, transform: `translateY(${(1 - noteP) * 10}px)`, display: "inline-flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 9, height: 9, borderRadius: 999, background: C.gold }} />
        <span style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 22, color: "rgba(255,255,255,0.82)" }}>
          Conversational AI runs through every tier.
        </span>
      </div>
    </DeckStage>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   S13 — THE GROWTH MODEL (navy) — OMFA cards with filling depth meters
   ═══════════════════════════════════════════════════════════════════════════ */

const OMFA: { letter: string; label: string; depth: string; fill: number }[] = [
  { letter: "O", label: "OWNED", depth: "Full Integration", fill: 4 },
  { letter: "M", label: "MANAGED", depth: "Deep Integration", fill: 3 },
  { letter: "F", label: "FRANCHISE", depth: "Portal First", fill: 2 },
  { letter: "A", label: "AFFILIATE", depth: "Portal Only", fill: 1 },
];

const DepthMeter: React.FC<{ fill: number; delay: number }> = ({ fill, delay }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
      {[0, 1, 2, 3].map((j) => {
        const isFilled = j < fill;
        const w = isFilled ? ramp(frame, delay + j * 9, delay + j * 9 + 16) : 0;
        return (
          <div key={j} style={{ flex: 1, height: 16, borderRadius: 5, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(160,138,79,0.28)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${w * 100}%`, background: `linear-gradient(90deg, ${C.gold}, ${C.goldSoft})`, boxShadow: w > 0.4 ? "0 0 12px rgba(160,138,79,0.5)" : "none" }} />
          </div>
        );
      })}
    </div>
  );
};

const OmfaCard: React.FC<{ item: (typeof OMFA)[number]; i: number }> = ({ item, i }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 26 + i * 15;
  const p = ramp(frame, delay, delay + 20);
  const float = Math.sin((frame / fps) * 0.9 + i * 1.3) * 5;
  return (
    <div
      style={{
        flex: 1,
        opacity: p,
        transform: `translateY(${(1 - p) * 46 + float}px)`,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(160,138,79,0.22)",
        borderRadius: 22,
        padding: "30px 28px 32px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <span style={{ fontFamily: FONT.display, fontSize: 118, lineHeight: 0.8, color: C.gold }}>{item.letter}</span>
        <span style={{ fontFamily: FONT.sans, fontSize: 15, fontWeight: 800, letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)" }}>{item.fill}/4</span>
      </div>
      <div style={{ fontFamily: FONT.sans, fontSize: 24, fontWeight: 800, letterSpacing: "0.1em", color: "#fff", marginTop: 14 }}>{item.label}</div>
      <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 21, color: C.goldSoft, marginTop: 6 }}>{item.depth}</div>
      <DepthMeter fill={item.fill} delay={delay + 16} />
      <div style={{ fontFamily: FONT.sans, fontSize: 12.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: 10 }}>Integration Depth</div>
    </div>
  );
};

export const S13: React.FC = () => {
  return (
    <DeckStage bg={NAVY} pad={100}>
      <Eyebrow3 delay={2}>THE GROWTH MODEL</Eyebrow3>
      <Headline3 white="ANY MODEL. ANY CAPABILITY." gold="MERIDIAN PROVIDES THE GLUE." size={58} delay={6} />
      <div style={{ display: "flex", gap: 24, marginTop: 44, alignItems: "stretch" }}>
        {OMFA.map((item, i) => (
          <OmfaCard key={item.letter} item={item} i={i} />
        ))}
      </div>
      <Takeaway3 delay={100}>
        The relationship model is the owner&rsquo;s choice — Meridian meets each at the depth it justifies, and deepens automatically as the relationship does.
      </Takeaway3>
    </DeckStage>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   S14 — FAST FRANCHISE (paper) — drawing AI bar + three scenario cards
   ═══════════════════════════════════════════════════════════════════════════ */

const SCENARIOS: { key: string; title: string; body: string }[] = [
  { key: "A", title: "EXISTING PMS ON-SITE", body: "Meridian connects via API where viable, portal where not — an AI gateway over live PMS state." },
  { key: "B", title: "MINOR PROVIDES THE PMS", body: "Full depth from day one; finance fully event-driven — the strongest deployment, not a compromise." },
  { key: "C", title: "NO PMS OR LEGACY", body: "Full portal mode, structured manual entry; AI gateway draws on CDIP — days, not months." },
];

const ScenarioCard: React.FC<{ s: (typeof SCENARIOS)[number]; i: number }> = ({ s, i }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 66 + i * 14;
  const p = ramp(frame, delay, delay + 22);
  const float = Math.sin((frame / fps) * 0.85 + i * 1.4) * 4;
  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        opacity: p,
        transform: `translateY(${(1 - p) * 44 + float}px)`,
        background: "#fff",
        border: "1px solid rgba(19,33,60,0.10)",
        borderRadius: 20,
        padding: "30px 30px 34px",
        boxShadow: "0 2px 4px rgba(19,33,60,0.05), 0 18px 46px rgba(19,33,60,0.10)",
      }}
    >
      {/* gold top accent */}
      <div style={{ position: "absolute", left: 0, top: 0, height: 4, width: `${p * 100}%`, background: C.gold }} />
      {/* ghosted letter */}
      <span style={{ position: "absolute", right: 8, bottom: -34, fontFamily: FONT.display, fontSize: 220, lineHeight: 0.8, color: "rgba(19,33,60,0.05)", pointerEvents: "none" }}>{s.key}</span>
      <div style={{ position: "relative" }}>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 46, height: 46, borderRadius: 12, background: NAVY, color: C.gold, fontFamily: FONT.display, fontSize: 24 }}>{s.key}</div>
        <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, letterSpacing: "0.05em", color: NAVY, marginTop: 18 }}>{s.title}</div>
        <div style={{ fontFamily: FONT.serif, fontSize: 21, lineHeight: 1.36, color: C.inkSoft, marginTop: 10 }}>{s.body}</div>
      </div>
    </div>
  );
};

export const S14: React.FC = () => {
  const frame = useCurrentFrame();
  const barDraw = interpolate(frame, [38, 66], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.out });
  const barTextP = ramp(frame, 58, 76);
  return (
    <DeckStage bg={PAPER} pad={100}>
      <Eyebrow3 delay={2}>FAST FRANCHISE DEPLOYMENT</Eyebrow3>
      <Headline3 white="NOT ALL FRANCHISE DEALS" gold="ARE THE SAME." size={62} delay={6} light />

      {/* drawing navy AI bar */}
      <div style={{ marginTop: 34, height: 74, borderRadius: 16, overflow: "hidden", position: "relative", width: `${barDraw * 100}%`, background: NAVY, boxShadow: "0 16px 40px rgba(19,33,60,0.22)" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 16, padding: "0 30px", width: "1720px", opacity: barTextP }}>
          <span style={{ flexShrink: 0, fontFamily: FONT.sans, fontSize: 14, fontWeight: 800, letterSpacing: "0.2em", color: NAVY, background: C.gold, borderRadius: 999, padding: "7px 16px" }}>CONVERSATIONAL AI</span>
          <span style={{ fontFamily: FONT.serif, fontSize: 23, color: "rgba(255,255,255,0.9)" }}>Available from day one — regardless of integration depth.</span>
        </div>
      </div>

      {/* scenario cards */}
      <div style={{ display: "flex", gap: 22, marginTop: 26, alignItems: "stretch" }}>
        {SCENARIOS.map((s, i) => (
          <ScenarioCard key={s.key} s={s} i={i} />
        ))}
      </div>

      <Takeaway3 delay={112} light>
        No deal is ever blocked by technology.
      </Takeaway3>
    </DeckStage>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   S15 — FOR THE FRANCHISEE (paper) — 3×2 value-prop grid with hover-float
   ═══════════════════════════════════════════════════════════════════════════ */

const VALUES: { cat: string; title: string; body: string }[] = [
  { cat: "DISTRIBUTION", title: "Global CRS Reach", body: "Distribution reach a partner can't build alone." },
  { cat: "LOYALTY", title: "Minor Discovery Recognition", body: "Inherit the loyalty relationship from day one." },
  { cat: "GUEST INTELLIGENCE", title: "CDIP Guest Profile", body: "Group-level guest data the OTA will never have." },
  { cat: "COMMERCIAL", title: "Portfolio Benchmarking", body: "See where you stand against the Minor portfolio." },
  { cat: "BRAND STANDARDS", title: "Compliance Through the Platform", body: "Standards as workflows, not documents." },
  { cat: "TECHNOLOGY", title: "Any Stack. Day One", body: "No PMS mandate — the tech never blocks a deal." },
];

const ValueTile: React.FC<{ v: (typeof VALUES)[number]; i: number }> = ({ v, i }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 28 + i * 9;
  const p = ramp(frame, delay, delay + 20);
  const drift = Math.sin((frame / fps) * 0.8 + i * 1.15) * 5;
  return (
    <div
      style={{
        position: "relative",
        opacity: p,
        transform: `translateY(${(1 - p) * 40 + drift}px)`,
        background: "#fff",
        border: "1px solid rgba(19,33,60,0.10)",
        borderRadius: 20,
        padding: "28px 28px 30px",
        boxShadow: "0 2px 4px rgba(19,33,60,0.05), 0 16px 40px rgba(19,33,60,0.09)",
        overflow: "hidden",
      }}
    >
      {/* gold accent corner */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 4, height: `${p * 100}%`, background: C.gold }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 9, height: 9, borderRadius: 2, transform: "rotate(45deg)", background: C.gold }} />
        <span style={{ fontFamily: FONT.sans, fontSize: 14, fontWeight: 800, letterSpacing: "0.16em", color: C.gold }}>{v.cat}</span>
      </div>
      <div style={{ fontFamily: FONT.display, fontSize: 30, lineHeight: 1.02, color: NAVY, marginTop: 14 }}>{v.title}</div>
      <div style={{ fontFamily: FONT.serif, fontSize: 20, lineHeight: 1.34, color: C.inkSoft, marginTop: 10 }}>{v.body}</div>
    </div>
  );
};

export const S15: React.FC = () => {
  return (
    <DeckStage bg={PAPER} pad={100}>
      <Eyebrow3 delay={2}>FOR THE FRANCHISEE</Eyebrow3>
      <Headline3 white="WHAT MERIDIAN DELIVERS" gold="TO EVERY PARTNER." size={60} delay={6} light />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "1fr", gap: 22, marginTop: 42 }}>
        {VALUES.map((v, i) => (
          <ValueTile key={v.cat} v={v} i={i} />
        ))}
      </div>
    </DeckStage>
  );
};
