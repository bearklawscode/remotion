/**
 * VIDEO 4 — Group 5 (added for v3): four confident capability scenes, heavily
 * animated with the interact kit + eased/interpolated motion (Remotion best
 * practice: interpolate + Easing.bezier for organic settle).
 *   WhatIs    — "ONE LOGIN. EVERYTHING UNDERNEATH."  layered-stack build
 *   Knowledge — "ASK ANYTHING. KNOW INSTANTLY."      staff knowledge assistant
 *   Finance   — "FOR OWNERS. CLARITY, LIVE."         owner finance console
 *   Loyalty   — "EVERY GUEST, KNOWN."                guest-360 intelligence card
 *
 * Layout rule (user directive): headline lives in its OWN band; interactive UI
 * never overlaps the title/text. Light-mode tokens throughout.
 */
import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig, spring } from "remotion";
import {
  KeyRound,
  Layers3,
  Sparkles,
  Search,
  BookOpen,
  Wallet,
  Banknote,
  TrendingUp,
  Crown,
  ShieldCheck,
} from "lucide-react";
import { Stage, Snap, Kicker } from "./kit";
import { C, FONT } from "../../theme";
import { Cursor, TypeText, Checklist, GrowBar, rmp } from "../../lib/interact";
import { Counter } from "../../lib/motion";

/* ═══════════════════════════════════════════════════════════════════════
   Shared small pieces
   ═══════════════════════════════════════════════════════════════════════ */

/** A row that springs up with an icon puck, a bold label, and a soft sub. */
const CapRow: React.FC<{ icon: React.ReactNode; label: string; sub: string; at: number; light?: boolean }> = ({
  icon, label, sub, at, light,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 200, stiffness: 170 } });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24, opacity: rmp(frame, at - 4, at + 10), transform: `translateY(${(1 - s) * 40}px)` }}>
      <div style={{ width: 78, height: 78, borderRadius: 20, flexShrink: 0, background: light ? "rgba(160,138,79,0.10)" : "rgba(160,138,79,0.16)", border: `1px solid rgba(160,138,79,0.34)`, display: "flex", alignItems: "center", justifyContent: "center", color: C.gold, transform: `scale(${0.7 + 0.3 * s})` }}>
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: FONT.display, fontSize: 46, lineHeight: 1, color: light ? C.ink : "#fff" }}>{label}</div>
        <div style={{ marginTop: 8, fontFamily: FONT.sans, fontSize: 20, fontWeight: 600, color: light ? C.inkSoft : "rgba(255,255,255,0.66)" }}>{sub}</div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   1) WHAT IS — navy — "ONE LOGIN. EVERYTHING UNDERNEATH."
   VO o05: One login. Every system underneath. A home for conversational, agentic AI.
   ═══════════════════════════════════════════════════════════════════════ */
const STACK = ["Meridian", "Oracle · SAP", "Salesforce · Mews", "Shiji · Opera", "Teams · Jira"];

export const WhatIs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Stage bg={C.ink}>
      {/* headline band (top-left, protected) */}
      <div style={{ position: "absolute", left: 110, top: 90, width: 1100 }}>
        <Kicker delay={2}>What it is</Kicker>
        <Snap white="ONE LOGIN." gold="EVERYTHING UNDERNEATH." size={78} delay={8} />
      </div>

      {/* left: three capability rows */}
      <div style={{ position: "absolute", left: 110, top: 380, width: 880, display: "flex", flexDirection: "column", gap: 40 }}>
        <CapRow at={40} icon={<KeyRound size={38} strokeWidth={2} />} label="Single identity" sub="One secure login across every brand and property" />
        <CapRow at={64} icon={<Layers3 size={38} strokeWidth={2} />} label="Every system beneath" sub="12+ platforms unified into one entry point" />
        <CapRow at={88} icon={<Sparkles size={38} strokeWidth={2} />} label="A home for AI" sub="Conversational answers · agentic action" />
      </div>

      {/* right: isometric layered stack assembling under the Meridian plate */}
      <div style={{ position: "absolute", left: 1230, top: 360, width: 560, height: 520 }}>
        {STACK.map((label, i) => {
          const at = 46 + i * 12;
          const s = spring({ frame: frame - at, fps, config: { damping: 200, stiffness: 150 } });
          const top = i * 92;
          const isHead = i === 0;
          return (
            <div
              key={label}
              style={{
                position: "absolute", left: 0, top, width: 520, height: 116,
                transform: `perspective(1400px) rotateX(46deg) rotateZ(-32deg) translateY(${(1 - s) * -60}px) scale(${0.9 + 0.1 * s})`,
                transformOrigin: "50% 50%",
                opacity: rmp(frame, at - 4, at + 12),
                borderRadius: 20,
                background: isHead ? `linear-gradient(135deg, ${C.goldSoft}, ${C.gold})` : "rgba(255,255,255,0.07)",
                border: `1px solid ${isHead ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.16)"}`,
                boxShadow: isHead ? "0 30px 60px rgba(160,138,79,0.4)" : "0 20px 44px rgba(0,0,0,0.34)",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 10 - i,
              }}
            >
              <span style={{ fontFamily: isHead ? FONT.display : FONT.sans, fontSize: isHead ? 34 : 22, fontWeight: 800, letterSpacing: isHead ? "0.16em" : "0.02em", color: isHead ? C.ink : "rgba(255,255,255,0.82)" }}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   2) KNOWLEDGE — paper — "ASK ANYTHING. KNOW INSTANTLY."
   VO o08: the right answer arrives the moment they ask — brand standards and
   know-how, in plain language.
   ═══════════════════════════════════════════════════════════════════════ */
export const Knowledge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const CARD = { L: 968, T: 176, W: 840, H: 720 };
  const askS = spring({ frame: frame - 18, fps, config: { damping: 200, stiffness: 150 } });
  const ansAt = 96;
  const ansS = spring({ frame: frame - ansAt, fps, config: { damping: 200, stiffness: 140 } });

  return (
    <Stage bg={C.paper}>
      {/* headline band (left, protected) */}
      <div style={{ position: "absolute", left: 108, top: 200, width: 740 }}>
        <Kicker>For every team member</Kicker>
        <Snap white="ASK ANYTHING." gold="KNOW INSTANTLY." size={82} light />
        <div style={{ marginTop: 28, maxWidth: 620, fontFamily: FONT.serif, fontStyle: "italic", fontSize: 26, color: C.inkSoft, opacity: rmp(frame, 44, 66) }}>
          Brand standards and operating know-how — in plain language, the moment it's needed.
        </div>
        <div style={{ marginTop: 34, display: "flex", gap: 12, opacity: rmp(frame, 60, 82) }}>
          {["Brand Standards", "SOPs", "Every language"].map((t, i) => (
            <span key={t} style={{ padding: "9px 16px", borderRadius: 999, background: "rgba(19,33,60,0.05)", border: `1px solid ${C.hairline}`, fontFamily: FONT.sans, fontSize: 15, fontWeight: 700, color: C.ink, transform: `translateY(${(1 - rmp(frame, 60 + i * 6, 80 + i * 6)) * 10}px)` }}>{t}</span>
          ))}
        </div>
      </div>

      {/* knowledge assistant card */}
      <div style={{ position: "absolute", left: CARD.L, top: CARD.T, width: CARD.W, height: CARD.H, borderRadius: 28, background: "#fff", boxShadow: "0 34px 90px rgba(19,33,60,0.16)", border: `1px solid ${C.hairline}`, overflow: "hidden", opacity: askS, transform: `translateY(${(1 - askS) * 44}px)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: 4, width: "100%", background: C.gold }} />
        {/* header */}
        <div style={{ padding: "26px 34px 0", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(160,138,79,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: C.gold }}><BookOpen size={22} /></div>
          <div style={{ fontFamily: FONT.display, fontSize: 22, letterSpacing: "0.14em", color: C.ink }}>MERIDIAN ASSIST</div>
          <span style={{ marginLeft: "auto", fontFamily: FONT.sans, fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.mist }}>Housekeeping · Anantara</span>
        </div>

        {/* the question (staff bubble, right-aligned) */}
        <div style={{ padding: "30px 34px 0", display: "flex", justifyContent: "flex-end" }}>
          <div style={{ maxWidth: 560, background: C.ink, color: "#fff", borderRadius: "20px 20px 6px 20px", padding: "16px 22px", fontFamily: FONT.sans, fontSize: 19, fontWeight: 600, opacity: rmp(frame, 30, 44) }}>
            <TypeText text="What's the turndown standard for a Premier suite?" at={32} cps={34} />
          </div>
        </div>

        {/* the answer (assistant, left) */}
        <div style={{ padding: "22px 34px 0", opacity: ansS, transform: `translateY(${(1 - ansS) * 24}px)` }}>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 44, height: 44, borderRadius: 999, flexShrink: 0, background: "rgba(160,138,79,0.14)", display: "flex", alignItems: "center", justifyContent: "center", color: C.gold }}><Sparkles size={22} /></div>
            <div style={{ flex: 1, background: C.paper, borderRadius: "20px 20px 20px 6px", padding: "20px 24px", border: `1px solid ${C.hairline}` }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 18, fontWeight: 700, color: C.ink, marginBottom: 16 }}>
                Anantara Premier turndown — four steps:
              </div>
              <Checklist
                at={ansAt + 20}
                stagger={16}
                items={[
                  "Draw drapes, dim to warm evening scene",
                  "Fold bed, place branded slippers & robe",
                  "Set still water + local sweet on the nightstand",
                  "Leave next-day weather & activities card",
                ]}
              />
            </div>
          </div>
          {/* source chips */}
          <div style={{ marginTop: 20, marginLeft: 58, display: "flex", gap: 10, opacity: rmp(frame, ansAt + 96, ansAt + 116) }}>
            <span style={{ fontFamily: FONT.sans, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.mist }}>Source</span>
            {["Anantara Brand Standard §7", "Housekeeping SOP"].map((t) => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, background: "#fff", border: `1px solid ${C.hairline}`, fontFamily: FONT.sans, fontSize: 13, fontWeight: 700, color: C.inkSoft }}>
                <ShieldCheck size={13} color={C.success} /> {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   3) FINANCE — navy — "FOR OWNERS. CLARITY, LIVE."
   VO o12: consolidated reporting, trust accounting, and disbursements, in real time.
   ═══════════════════════════════════════════════════════════════════════ */
const FIN_KPIS = [
  { icon: <TrendingUp size={26} />, label: "Portfolio RevPAR", to: 148, prefix: "$", delta: "+8.2%", at: 40 },
  { icon: <Wallet size={26} />, label: "Trust balance", to: 24.6, decimals: 1, prefix: "$", suffix: "M", delta: "reconciled", at: 56 },
  { icon: <Banknote size={26} />, label: "Disbursements", to: 3.1, decimals: 1, prefix: "$", suffix: "M", delta: "cleared today", at: 72 },
];
const FIN_BARS = [52, 61, 58, 70, 66, 78, 74, 88];

export const Finance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const panelS = spring({ frame: frame - 20, fps, config: { damping: 200, stiffness: 140 } });

  return (
    <Stage bg={C.ink}>
      {/* headline band top-left */}
      <div style={{ position: "absolute", left: 110, top: 92, width: 1000 }}>
        <Kicker delay={2}>For owners</Kicker>
        <Snap white="CLARITY," gold="IN REAL TIME." size={82} delay={8} />
      </div>

      {/* KPI row */}
      <div style={{ position: "absolute", left: 110, top: 330, right: 110, display: "flex", gap: 30 }}>
        {FIN_KPIS.map((k) => {
          const s = spring({ frame: frame - k.at, fps, config: { damping: 200, stiffness: 160 } });
          return (
            <div key={k.label} style={{ flex: 1, background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 22, padding: "26px 30px", boxShadow: "0 18px 44px rgba(0,0,0,0.3)", opacity: rmp(frame, k.at - 4, k.at + 10), transform: `translateY(${(1 - s) * 40}px)` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, color: C.goldSoft }}>
                <div style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(160,138,79,0.16)", display: "flex", alignItems: "center", justifyContent: "center" }}>{k.icon}</div>
                <span style={{ fontFamily: FONT.sans, fontSize: 16, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>{k.label}</span>
              </div>
              <div style={{ marginTop: 18, fontFamily: FONT.display, fontSize: 78, lineHeight: 0.9, color: "#fff" }}>
                <Counter to={k.to} from={0} delay={k.at + 10} durationFrames={40} decimals={k.decimals ?? 0} prefix={k.prefix} suffix={k.suffix} />
              </div>
              <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT.sans, fontSize: 15, fontWeight: 700, color: C.success }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: C.success }} /> {k.delta}
              </div>
            </div>
          );
        })}
      </div>

      {/* consolidated reporting chart panel */}
      <div style={{ position: "absolute", left: 110, top: 604, right: 110, height: 340, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 22, padding: "26px 34px", opacity: panelS, transform: `translateY(${(1 - panelS) * 30}px)` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: FONT.sans, fontSize: 16, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.goldSoft }}>Consolidated revenue · all brands</span>
          <span style={{ fontFamily: FONT.sans, fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>Owned · Managed · Franchise · Affiliate</span>
        </div>
        {/* bar chart */}
        <div style={{ position: "absolute", left: 34, right: 34, bottom: 30, height: 190, display: "flex", alignItems: "flex-end", gap: 26 }}>
          {FIN_BARS.map((h, i) => {
            const at = 120 + i * 7;
            const p = rmp(frame, at, at + 22);
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                <div style={{ width: "100%", height: `${h * p}%`, borderRadius: "8px 8px 0 0", background: i === FIN_BARS.length - 1 ? `linear-gradient(180deg, ${C.goldSoft}, ${C.gold})` : "rgba(200,179,126,0.4)", boxShadow: i === FIN_BARS.length - 1 ? "0 0 24px rgba(160,138,79,0.5)" : "none" }} />
              </div>
            );
          })}
        </div>
      </div>
    </Stage>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   4) LOYALTY — paper — "EVERY GUEST, KNOWN."
   VO o13: Every Minor Discovery member is recognized, with guest intelligence
   no third party will ever have.
   ═══════════════════════════════════════════════════════════════════════ */
const STAYS = [
  { brand: "Anantara", place: "Ubud", when: "Mar" },
  { brand: "Avani", place: "Lisbon", when: "May" },
  { brand: "Tivoli", place: "Sintra", when: "Jul" },
  { brand: "NH Collection", place: "Rome", when: "Sep" },
];

export const Loyalty: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const CARD = { L: 966, T: 168, W: 842, H: 744 };
  const cardS = spring({ frame: frame - 12, fps, config: { damping: 200, stiffness: 150 } });
  const avS = spring({ frame: frame - 28, fps, config: { damping: 13, stiffness: 170 } });

  return (
    <Stage bg={C.paper}>
      {/* headline band left */}
      <div style={{ position: "absolute", left: 108, top: 210, width: 730 }}>
        <Kicker>Minor Discovery</Kicker>
        <Snap white="EVERY GUEST," gold="KNOWN." size={94} light />
        <div style={{ marginTop: 28, maxWidth: 600, fontFamily: FONT.serif, fontStyle: "italic", fontSize: 26, color: C.inkSoft, opacity: rmp(frame, 44, 66) }}>
          One profile across every brand — guest intelligence no third party will ever have.
        </div>
        <div style={{ marginTop: 34, display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 22px", borderRadius: 14, background: "rgba(160,138,79,0.08)", border: `1px solid rgba(160,138,79,0.3)`, opacity: rmp(frame, 150, 172) }}>
          <ShieldCheck size={22} color={C.gold} />
          <span style={{ fontFamily: FONT.sans, fontSize: 18, fontWeight: 700, color: C.ink }}>First-party data — <span style={{ color: C.gold }}>yours alone.</span></span>
        </div>
      </div>

      {/* guest-360 card */}
      <div style={{ position: "absolute", left: CARD.L, top: CARD.T, width: CARD.W, height: CARD.H, borderRadius: 28, background: "#fff", boxShadow: "0 34px 90px rgba(19,33,60,0.16)", border: `1px solid ${C.hairline}`, overflow: "hidden", opacity: cardS, transform: `translateY(${(1 - cardS) * 42}px)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: 4, width: "100%", background: C.gold }} />
        {/* identity */}
        <div style={{ padding: "44px 44px 0", display: "flex", alignItems: "center", gap: 26 }}>
          <div style={{ width: 128, height: 128, borderRadius: 999, overflow: "hidden", border: `3px solid ${C.gold}`, flexShrink: 0, transform: `scale(${0.4 + 0.6 * avS})`, opacity: rmp(frame, 28, 42), boxShadow: "0 10px 30px rgba(19,33,60,0.18)" }}>
            <Img src={staticFile("assets/images/avatar-vip.png")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 18%", transform: "scale(1.18)" }} />
          </div>
          <div>
            <div style={{ fontFamily: FONT.sans, fontSize: 13, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.mist, opacity: rmp(frame, 40, 56) }}>Member since 2019</div>
            <div style={{ fontFamily: FONT.display, fontSize: 44, color: C.ink, lineHeight: 1, marginTop: 6, opacity: rmp(frame, 44, 60) }}>Isabelle Laurent</div>
            <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 9, padding: "8px 16px", borderRadius: 999, background: C.gold, color: "#fff", fontFamily: FONT.sans, fontSize: 15, fontWeight: 800, letterSpacing: "0.1em", opacity: rmp(frame, 58, 74) }}>
              <Crown size={16} /> MINOR DISCOVERY · PLATINUM
            </div>
          </div>
        </div>

        {/* cross-brand stay history */}
        <div style={{ padding: "34px 44px 0" }}>
          <div style={{ fontFamily: FONT.sans, fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.mist, marginBottom: 16 }}>Across the family — this year</div>
          <div style={{ display: "flex", gap: 14 }}>
            {STAYS.map((s, i) => {
              const at = 92 + i * 12;
              const sp = spring({ frame: frame - at, fps, config: { damping: 200, stiffness: 180 } });
              return (
                <div key={s.brand} style={{ flex: 1, background: C.paper, borderRadius: 16, border: `1px solid ${C.hairline}`, padding: "16px 14px", opacity: rmp(frame, at - 4, at + 10), transform: `translateY(${(1 - sp) * 24}px) scale(${0.9 + 0.1 * sp})` }}>
                  <div style={{ fontFamily: FONT.sans, fontSize: 12, fontWeight: 700, color: C.gold }}>{s.when}</div>
                  <div style={{ fontFamily: FONT.display, fontSize: 19, color: C.ink, marginTop: 6, lineHeight: 1 }}>{s.brand}</div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 13, color: C.inkSoft, marginTop: 4 }}>{s.place}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* preferences */}
        <div style={{ padding: "30px 44px 0" }}>
          <div style={{ fontFamily: FONT.sans, fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.mist, marginBottom: 14 }}>Known preferences</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["High floor, corner", "Still water", "Late checkout", "Thai massage", "Vegetarian"].map((p, i) => (
              <span key={p} style={{ padding: "9px 16px", borderRadius: 999, background: "rgba(19,33,60,0.05)", border: `1px solid ${C.hairline}`, fontFamily: FONT.sans, fontSize: 15, fontWeight: 600, color: C.ink, opacity: rmp(frame, 150 + i * 6, 168 + i * 6) }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
};
