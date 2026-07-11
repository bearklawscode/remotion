/**
 * VIDEO 4 — "A rough sketch" — a ~3-min collaborative product film.
 * Show, don't tell: warm sparse narration (Sarah) + soft music + real UI mockups
 * (high-level and on-the-ground). Humble tone — an observation and a first draft,
 * inviting discussion. Persistent "illustrative mockup" note.
 */
import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, Img, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { C, FONT, FPS } from "./theme";
import { WarmStage, Caption, ScenarioTag, LaptopFrame, MockupNote, MusicBed4, ramp } from "./lib/v4ui";
import { Camera, FadeUp, ScaleIn, Drift } from "./lib/motion";
import { Wordmark } from "./lib/chrome";
import { MeridianDashboard } from "./screens/MeridianDashboard";
import { MeridianAIChat } from "./screens/MeridianAIChat";
import { DeviceTrioScene } from "./screens/DeviceFrame";
import { OnboardingPanel } from "./screens/OnboardingPanel";

const A = (p: string) => staticFile(p.replace(/^\//, ""));

/* ------------------------------------------------------------------ scenes */

// S1 — Open: a quiet human observation over a soft property montage.
const Open: React.FC = () => {
  const frame = useCurrentFrame();
  const photos = [
    "assets/images/property-avani-amsterdam.jpg",
    "assets/images/property-anantara-ubud.jpg",
    "assets/images/property-anantara-vienna.jpg",
  ];
  return (
    <WarmStage>
      {/* soft overlapping photo cards, gentle drift */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 30, opacity: 0.9 }}>
          {photos.map((p, i) => {
            const a = ramp(frame, 6 + i * 8, 30 + i * 8);
            return (
              <div key={p} style={{ width: 420, height: 300, borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(19,33,60,0.16)", opacity: a * 0.55, transform: `translateY(${(1 - a) * 30}px) rotate(${(i - 1) * 2}deg)` }}>
                <Drift scaleFrom={1.05} scaleTo={1.16}>
                  <Img src={A(p)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Drift>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: "rgba(251,246,240,0.55)" }} />
      <Caption label="An observation" text="We kept noticing the same quiet thing." start={30} hold={150} y="44%" size={54} />
      <Caption text="The people running our hotels are remarkable — the tools just ask them to hold too much, in too many places." start={195} hold={210} y="56%" size={34} />
    </WarmStage>
  );
};

// S2 — Sketch: the idea forms.
const Sketch: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <WarmStage>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <ScaleIn delay={20} from={0.9}>
          <Wordmark size={92} byline drawFrom={30} />
        </ScaleIn>
        <Caption text="So we started sketching what one calmer surface could feel like." start={70} hold={230} y="66%" size={38} />
        <Caption text="What follows is rough — a first draft, thinking out loud." start={300} hold={70} y="74%" size={26} />
      </AbsoluteFill>
    </WarmStage>
  );
};

// S3 — High level: a guided tour of the GM dashboard (establish → push in → pan down).
const HighLevel: React.FC = () => {
  const frame = useCurrentFrame();
  // establish in laptop, then push into the screen and drift down across the surface
  const zoom = interpolate(frame, [0, 120, 620, 960], [1.0, 1.12, 1.9, 2.0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const ty = interpolate(frame, [120, 620, 960], [0, -230, -300], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const origin = interpolate(frame, [0, 120], [50, 30], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  return (
    <WarmStage>
      <ScenarioTag who="Sofia · General Manager" where="Morning, at her desk" start={10} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ transform: `scale(${zoom}) translateY(${ty}px)`, transformOrigin: `${origin}% 30%` }}>
          <FadeUp delay={8} y={40}>
            <LaptopFrame w={1300}>
              <MeridianDashboard />
            </LaptopFrame>
          </FadeUp>
        </div>
      </AbsoluteFill>
      <Caption label="The whole property, at a glance" text="One place to see how the day is really going." start={40} hold={150} y="88%" size={34} />
      <Caption text="Revenue, tonight's VIPs, what's live right now — before it ever becomes a problem." start={520} hold={330} y="88%" size={32} />
      <MockupNote />
    </WarmStage>
  );
};

// S4 — On the ground: the AI does the work across systems (drift down the action cards).
const OnTheGround: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 780], [0.92, 1.06], { extrapolateRight: "clamp" });
  const ty = interpolate(frame, [60, 780], [40, -70], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  return (
    <WarmStage>
      <ScenarioTag who="Duty Manager" where="A guest calls down" start={10} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ transform: `scale(${zoom}) translateY(${ty}px)`, transformOrigin: "50% 40%" }}>
          <MeridianAIChat mode="action" />
        </div>
      </AbsoluteFill>
      <Caption label="One request" text="&ldquo;Guest in 203 says the AC isn't cooling — handle it.&rdquo;" start={70} hold={150} y="90%" size={30} />
      <Caption text="A work order, a dispatch, a kind note to the guest — all at once, across three systems." start={430} hold={280} y="90%" size={31} />
      <MockupNote />
    </WarmStage>
  );
};

// S5 — Every role, every device.
const Everywhere: React.FC = () => {
  return (
    <WarmStage>
      <ScenarioTag who="The team" where="Wherever the work happens" start={10} />
      <AbsoluteFill style={{ transform: "scale(0.98)" }}>
        <DeviceTrioScene />
      </AbsoluteFill>
      <Caption text="Not just a screen for headquarters — the same help, in every hand." start={60} hold={220} y="12%" size={34} />
      <MockupNote />
    </WarmStage>
  );
};

// S6 — The guest side: one seamless Minor.
const GuestSide: React.FC = () => {
  const frame = useCurrentFrame();
  const float = Math.sin(frame / 22) * 10;
  return (
    <WarmStage>
      <ScenarioTag who="A guest" where="In their room, that evening" start={10} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ transform: `translateY(${float}px)`, width: 380, height: 780, borderRadius: 52, background: C.ink, padding: 13, boxShadow: "0 30px 80px rgba(19,33,60,0.22)" }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 40, overflow: "hidden", background: "#fff", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "20px 22px 12px", display: "flex", justifyContent: "center" }}>
              <span style={{ fontFamily: FONT.display, fontSize: 18, letterSpacing: "0.16em", color: C.ink }}>MINOR HOTELS</span>
            </div>
            <div style={{ height: 210, margin: "6px 16px 0", borderRadius: 16, overflow: "hidden" }}>
              <Img src={A("assets/images/property-anantara-ubud.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "18px 22px", flex: 1 }}>
              <div style={{ fontFamily: FONT.serif, fontSize: 24, fontWeight: 600, color: C.ink }}>Thai Heritage Massage</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 14, color: C.mist, marginTop: 4 }}>Anantara Spa · 60 minutes</div>
              <div style={{ fontFamily: FONT.serif, fontSize: 15, color: C.inkSoft, marginTop: 14, lineHeight: 1.5 }}>A rejuvenating traditional Thai massage that restores balance and calm.</div>
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                {["Sat, 12 Jul", "3:00 PM"].map((t) => (
                  <div key={t} style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRadius: 10, background: C.paper, fontFamily: FONT.sans, fontSize: 14, fontWeight: 600, color: C.ink }}>{t}</div>
                ))}
              </div>
            </div>
            <div style={{ margin: "0 16px 20px", height: 52, borderRadius: 14, background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.sans, fontWeight: 700, letterSpacing: "0.1em", color: "#fff", fontSize: 15 }}>
              BOOK EXPERIENCE
            </div>
          </div>
        </div>
      </AbsoluteFill>
      <Caption text="And to the guest, it simply feels like one, effortless Minor." start={70} hold={220} y="50%" x="72%" align="left" size={34} />
      <MockupNote />
    </WarmStage>
  );
};

// S7 — Growth: a new partner, live in days.
const Growth: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 120, 690], [1.0, 1.18, 1.42], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  return (
    <WarmStage>
      <ScenarioTag who="A new partner" where="Signing day" start={10} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ transform: `scale(${zoom})`, transformOrigin: "38% 55%" }}>
          <FadeUp delay={8} y={30}>
            <LaptopFrame w={1320}>
              <OnboardingPanel />
            </LaptopFrame>
          </FadeUp>
        </div>
      </AbsoluteFill>
      <Caption label="Any model — owned, managed, franchise, affiliate" text="A new partner can keep the systems they already run…" start={50} hold={150} y="90%" size={32} />
      <Caption text="…and still go live on day one. Days, not months." start={430} hold={230} y="90%" size={34} />
      <MockupNote />
    </WarmStage>
  );
};

// S8 — Close: humble invitation.
const Close: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <WarmStage>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <ScaleIn delay={10} from={0.92}>
          <Wordmark size={96} drawFrom={24} />
        </ScaleIn>
        <Caption text="A rough first sketch of how it could feel." start={70} hold={150} y="62%" size={36} />
        <Caption text="If we get this even close, everything after it gets easier. We'd love your thoughts." start={230} hold={210} y="72%" size={30} />
      </AbsoluteFill>
    </WarmStage>
  );
};

/* --------------------------------------------------------------- timeline */

type Cut = { from: number; dur: number; C: React.FC };
const S = (from: number, dur: number, Comp: React.FC): Cut => ({ from, dur, C: Comp });

const CUTS: Cut[] = [
  S(0, 480, Open),
  S(480, 390, Sketch),
  S(870, 960, HighLevel),
  S(1830, 780, OnTheGround),
  S(2610, 840, Everywhere),
  S(3450, 660, GuestSide),
  S(4110, 690, Growth),
  S(4800, 660, Close),
];
export const VIDEO4_FRAMES = 5460;

const VO: { id: string; at: number }[] = [
  { id: "o1", at: 60 },
  { id: "o2", at: 200 },
  { id: "o3", at: 550 },
  { id: "o4", at: 1900 },
  { id: "o5", at: 4880 },
];

export const Video4_Product: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      <Sequence durationInFrames={VIDEO4_FRAMES} name="music">
        <MusicBed4 volume={0.16} />
      </Sequence>
      {CUTS.map((c, i) => {
        const { C: Comp } = c;
        return (
          <Sequence key={i} from={c.from} durationInFrames={c.dur} name={Comp.name || `s${i}`}>
            <Comp />
          </Sequence>
        );
      })}
      {VO.map((v) => (
        <Sequence key={v.id} from={v.at} name={`vo-${v.id}`}>
          <Audio src={staticFile(`vo4/${v.id}.mp3`)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
