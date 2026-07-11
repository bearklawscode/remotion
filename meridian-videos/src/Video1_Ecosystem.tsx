/**
 * VIDEO 1 — "Why Meridian. Why Now."  (~2.5 min, 16:9, light mode)
 * Chapters: The Situation → The Friction → The Stakes → The Answer → The Ask.
 * Scene durations are audio-locked to the Alice VO (see timing.ts).
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./theme";
import { narrated, silent } from "./timing";
import { Scene, Video } from "./video";
import { Screen } from "./scenes/Screen";
import { Stage, BigStat, PhotoCard, TitleLines, Eyebrow, Headline, G } from "./scenes/common";
import { Wordmark } from "./lib/chrome";
import { FadeUp, ScaleIn, Counter, ramp, Camera, Stagger } from "./lib/motion";
import { SystemNodeGraph } from "./screens/SystemNodeGraph";
import { MeridianAIChat } from "./screens/MeridianAIChat";
import { TheTurn } from "./scenes/v1/TheTurn";
import { Competitors } from "./scenes/v1/Competitors";
import { ShadowIT } from "./scenes/v1/ShadowIT";

/* ---------- Chapter 1: The Situation ---------- */
const Hook: React.FC = () => (
  <Stage>
    <ScaleIn delay={6} from={0.9}>
      <Wordmark size={96} byline drawFrom={16} />
    </ScaleIn>
    <FadeUp delay={40} style={{ marginTop: 46 }}>
      <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 34, color: C.inkSoft, textAlign: "center", maxWidth: 1100 }}>
        The next breakthrough won&rsquo;t be a building. It&rsquo;ll be a platform.
      </div>
    </FadeUp>
  </Stage>
);

const Empire: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage>
      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        <BigStat value={<Counter to={590} durationFrames={40} suffix="+" />} label="Hotels" delay={4} />
        <BigStat value={<Counter to={63} durationFrames={40} />} label="Countries" delay={12} />
        <BigStat value="6" label="Continents" delay={20} />
      </div>
      <FadeUp delay={44} style={{ marginTop: 60 }}>
        <Headline size={72} style={{ textAlign: "center" }}>
          THE PLAN — <G>1,000</G> BY 2029
        </Headline>
      </FadeUp>
      <FadeUp delay={58} style={{ marginTop: 18 }}>
        <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: C.gold }}>
          80% asset-light
        </div>
      </FadeUp>
    </Stage>
  );
};

const TheCatch: React.FC = () => (
  <Stage>
    <TitleLines
      size={80}
      lines={[
        { text: <>GROWTH NEEDS EVERY HOTEL</> },
        { text: <>TO <G>PLUG IN FAST.</G></> },
        { text: <span style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 34, color: C.inkSoft }}>Right now — it can&rsquo;t.</span> },
      ]}
    />
  </Stage>
);

/* ---------- Chapter 2: The Friction ---------- */
const TwelveSystems: React.FC = () => (
  <Screen cam={{ from: { scale: 1.12, x: 40, y: 20 }, to: { scale: 1.02, x: 0, y: 0 }, origin: "50% 40%" }}>
    <SystemNodeGraph state="chaos" />
  </Screen>
);

const MonthsFriction: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage>
      <Eyebrow>The bottleneck</Eyebrow>
      <div style={{ marginTop: 30 }}>
        <BigStat value="Months" label="to wire one new hotel" gold delay={6} />
      </div>
      <FadeUp delay={40} style={{ marginTop: 40 }}>
        <Headline size={58} style={{ textAlign: "center" }}>
          NOT <G>DAYS.</G>
        </Headline>
      </FadeUp>
    </Stage>
  );
};

/* ---------- Chapter 3: The Stakes ---------- */
const Threat: React.FC = () => (
  <Stage>
    <TitleLines
      size={72}
      lines={[
        { text: <>IF MINOR DOESN&rsquo;T UNIFY ITS SYSTEMS,</> },
        { text: <>SOMEONE ELSE WILL <G>SELL THAT UNITY</G></> },
        { text: <>TO ITS FRANCHISEES.</> },
      ]}
    />
  </Stage>
);

/* ---------- Chapter 4: The Answer ---------- */
const WhatItIs: React.FC = () => (
  <Screen cam={{ from: { scale: 1.0 }, to: { scale: 1.08 }, origin: "50% 50%" }}>
    <SystemNodeGraph state="unified" />
  </Screen>
);

const Proof: React.FC = () => (
  <Screen cam={{ from: { scale: 1.05, y: 10 }, to: { scale: 1.12, y: -10 }, origin: "50% 42%" }}>
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      <MeridianAIChat mode="insight" />
    </AbsoluteFill>
  </Screen>
);

/* ---------- Chapter 5: The Ask ---------- */
const TheAsk: React.FC = () => (
  <Stage>
    <TitleLines
      size={92}
      delayEach={22}
      lines={[
        { text: <>HIGH <G>IMPACT.</G></>, sub: "One portal for a thousand hotels" },
        { text: <>LIGHT <G>LIFT.</G></>, sub: "A layer on what Minor already owns" },
        { text: <>RIGHT <G>NOW.</G></>, sub: "Before someone else owns the screen" },
      ]}
    />
  </Stage>
);

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const p = ramp(frame, 6, 30);
  return (
    <Stage>
      <ScaleIn delay={4} from={0.92}>
        <Wordmark size={110} drawFrom={14} />
      </ScaleIn>
      <FadeUp delay={34} style={{ marginTop: 40 }}>
        <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 30, color: C.inkSoft, textAlign: "center" }}>
          The intelligence layer for Minor&rsquo;s asset-light future.
        </div>
      </FadeUp>
    </Stage>
  );
};

/* ---------- Scene registry ---------- */
const scenes: Scene[] = [
  { timing: silent("v1-c1", 2.4), chapter: "The Situation", Component: () => null, isCard: true, cardKicker: "Why Meridian. Why now." },
  { timing: narrated("v1-01"), chapter: "The Situation", Component: Hook, caption: "Minor's next breakthrough is a platform", noChrome: true },
  { timing: narrated("v1-02"), chapter: "The Situation", Component: Empire, caption: "590 hotels today — 1,000 by 2029" },
  { timing: narrated("v1-03"), chapter: "The Situation", Component: TheCatch, caption: "Growth needs hotels to plug in fast" },

  { timing: silent("v1-c2", 2.2), chapter: "The Friction", Component: () => null, isCard: true },
  { timing: narrated("v1-04"), chapter: "The Friction", Component: TwelveSystems, caption: "12+ disconnected systems per property" },
  { timing: narrated("v1-05"), chapter: "The Friction", Component: MonthsFriction, caption: "Wiring a new hotel takes months" },
  { timing: narrated("v1-06"), chapter: "The Friction", Component: ShadowIT, caption: "Shadow IT: WhatsApp & public AI" },

  { timing: silent("v1-c3", 2.2), chapter: "The Stakes", Component: () => null, isCard: true },
  { timing: narrated("v1-07"), chapter: "The Stakes", Component: Competitors, caption: "Marriott $1.1B · Wyndham 96% · Mews $2.5B" },
  { timing: narrated("v1-08"), chapter: "The Stakes", Component: Threat, caption: "Unify — or someone else will" },

  { timing: silent("v1-c4", 2.2), chapter: "The Answer", Component: () => null, isCard: true, cardKicker: "Meet Meridian" },
  { timing: narrated("v1-09"), chapter: "The Answer", Component: TheTurn, caption: "Twelve systems become one", noChrome: true },
  { timing: narrated("v1-10"), chapter: "The Answer", Component: WhatItIs, caption: "One intelligence layer over everything" },
  { timing: narrated("v1-11"), chapter: "The Answer", Component: Proof, caption: "Ask once. It finds everything." },

  { timing: silent("v1-c5", 2.2), chapter: "The Ask", Component: () => null, isCard: true },
  { timing: narrated("v1-12"), chapter: "The Ask", Component: TheAsk, caption: "High impact. Light lift. Now." },
  { timing: narrated("v1-13"), chapter: "The Ask", Component: EndCard, noChrome: true },
];

export const Video1_Ecosystem: React.FC = () => <Video scenes={scenes} />;
export const video1Scenes = scenes;
