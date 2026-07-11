/** Video 2 narrative (non-ported-screen) scenes. */
import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { C, FONT, SHADOW } from "../../theme";
import { Eyebrow, Headline, G, Wordmark } from "../../lib/chrome";
import { FadeUp, ScaleIn, Counter, ramp, EASE, Stagger } from "../../lib/motion";
import { Stage } from "../common";
import { Globe, Package, Users, Wallet, BadgeCheck, Boxes, Check, Mail } from "lucide-react";

/* v2-01 — Recap: the problem (12 systems, months) collapses to "1 · Meridian". */
export const Recap: React.FC = () => {
  const frame = useCurrentFrame();
  const strike = ramp(frame, 30, 50);
  const one = ramp(frame, 54, 74);
  return (
    <Stage>
      <FadeUp delay={4}><Eyebrow>You&rsquo;ve seen the problem</Eyebrow></FadeUp>
      <div style={{ position: "relative", marginTop: 30 }}>
        <FadeUp delay={12}>
          <Headline size={78} style={{ textAlign: "center", opacity: 1 - one * 0.85 }}>
            12 SYSTEMS. 12 LOGINS. <G>MONTHS.</G>
          </Headline>
        </FadeUp>
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 6, background: C.alert, transform: `scaleX(${strike})`, transformOrigin: "left", opacity: 1 - one }} />
      </div>
      <div style={{ marginTop: 50, opacity: one, transform: `scale(${0.8 + one * 0.2})` }}>
        <Wordmark size={96} byline drawFrom={58} />
      </div>
    </Stage>
  );
};

/* v2-02 — One login: a single email field autofills and succeeds. */
export const OneLogin: React.FC = () => {
  const frame = useCurrentFrame();
  const type = ramp(frame, 20, 46);
  const ok = ramp(frame, 54, 66);
  const email = "sofia.chen@minorhotels.com";
  const shown = email.slice(0, Math.floor(type * email.length));
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper, justifyContent: "center", alignItems: "center" }}>
      <ScaleIn delay={4} from={0.94}>
        <div style={{ width: 520, background: C.surface, borderRadius: 22, boxShadow: SHADOW.pop, padding: 44, display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <Wordmark size={44} />
          <div style={{ fontFamily: FONT.sans, fontSize: 15, color: C.mist, letterSpacing: "0.04em" }}>One identity for every Minor hotel</div>
          <div style={{ width: "100%", height: 54, borderRadius: 12, border: `1px solid ${C.hairline}`, display: "flex", alignItems: "center", padding: "0 18px", fontFamily: FONT.sans, fontSize: 17, color: C.ink }}>
            {shown}
            <span style={{ opacity: type < 1 ? 1 : 0, marginLeft: 1 }}>|</span>
          </div>
          <div style={{ width: "100%", height: 52, borderRadius: 12, background: ok > 0 ? C.success : C.ink, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: FONT.sans, fontWeight: 600, fontSize: 16, transition: "none" }}>
            {ok > 0.5 ? (<><Check size={18} /> Signed in</>) : "Continue"}
          </div>
        </div>
      </ScaleIn>
    </AbsoluteFill>
  );
};

/* v2-07 — Recap beat: three big words. */
export const RecapBeat: React.FC = () => (
  <Stage>
    <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
      {[["One ask.", false], ["Three systems.", false], ["Zero tabs.", true]].map(([t, gold], i) => (
        <FadeUp key={i} delay={8 + i * 20} y={30}>
          <Headline size={110}>{gold ? <G>{t as string}</G> : (t as string)}</Headline>
        </FadeUp>
      ))}
      <FadeUp delay={78} style={{ marginTop: 20 }}>
        <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 30, color: C.inkSoft }}>The complexity simply disappears.</div>
      </FadeUp>
    </div>
  </Stage>
);

/* v2-09 — Six service domains grid. */
const DOMAINS = [
  { icon: Globe, t: "Distribution", s: "Booking & CRS" },
  { icon: BadgeCheck, t: "Guest & CRM", s: "Loyalty & Identity" },
  { icon: Wallet, t: "Finance", s: "ERP & Reporting" },
  { icon: Users, t: "Workforce", s: "People & Culture" },
  { icon: Boxes, t: "Development", s: "Brand & Standards" },
  { icon: Package, t: "Procurement", s: "Sourcing & Supply" },
];
export const SixDomains: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper, justifyContent: "center", alignItems: "center", padding: 120 }}>
      <FadeUp delay={4}><Eyebrow>What Meridian unifies</Eyebrow></FadeUp>
      <FadeUp delay={12} style={{ marginTop: 16 }}><Headline size={60}>SIX SERVICE <G>DOMAINS.</G></Headline></FadeUp>
      <div style={{ marginTop: 50, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, width: 1400 }}>
        {DOMAINS.map((d, i) => {
          const p = ramp(frame, 24 + i * 6, 24 + i * 6 + 18);
          const Icon = d.icon;
          return (
            <div key={d.t} style={{ background: C.surface, borderRadius: 20, boxShadow: SHADOW.card, padding: 30, display: "flex", alignItems: "center", gap: 20, opacity: p, transform: `translateY(${(1 - p) * 26}px)`, outline: `1px solid ${C.ring}` }}>
              <div style={{ width: 60, height: 60, borderRadius: 16, background: C.wash, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={28} color={C.gold} />
              </div>
              <div>
                <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 22, color: C.ink }}>{d.t}</div>
                <div style={{ fontFamily: FONT.sans, fontSize: 15, color: C.mist, marginTop: 2 }}>{d.s}</div>
              </div>
            </div>
          );
        })}
      </div>
      <FadeUp delay={70} style={{ marginTop: 34 }}>
        <div style={{ fontFamily: FONT.sans, fontSize: 18, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: C.gold }}>One operator surface</div>
      </FadeUp>
    </AbsoluteFill>
  );
};

/* v2-12 — Portfolio scale: 590 → 1,000 + brand family strip. */
const BRANDS = ["anantara.png", "avani.png", "tivoli.png", "nh.png", "nh-collection.png", "oaks.png", "nhow.png", "elewana.png"];
export const PortfolioScale: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper, justifyContent: "center", alignItems: "center" }}>
      <FadeUp delay={4}><Eyebrow>Built to grow</Eyebrow></FadeUp>
      <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 40, fontFamily: FONT.display, fontSize: 150, lineHeight: 0.9 }}>
        <span style={{ color: C.ink, fontVariantNumeric: "tabular-nums" }}><Counter to={590} durationFrames={44} suffix="+" /></span>
        <span style={{ color: C.mist, fontSize: 90 }}>→</span>
        <span style={{ color: C.gold, fontVariantNumeric: "tabular-nums" }}><Counter to={1000} durationFrames={60} delay={20} format={(n) => Math.round(n).toLocaleString()} /></span>
      </div>
      <FadeUp delay={40}><div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: C.mist }}>hotels by 2029</div></FadeUp>
      <div style={{ marginTop: 60, display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "center", alignItems: "center", maxWidth: 1500 }}>
        {BRANDS.map((b, i) => {
          const p = ramp(frame, 50 + i * 5, 50 + i * 5 + 16);
          return (
            <div key={b} style={{ opacity: p, transform: `translateY(${(1 - p) * 16}px)`, height: 46, display: "flex", alignItems: "center" }}>
              <Img src={staticFile("assets/hotels/" + b)} style={{ maxHeight: 44, maxWidth: 180, objectFit: "contain" }} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
