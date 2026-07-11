/**
 * VIDEO 2 — "This is Meridian."  (~2.5 min, 16:9, light mode)
 * Chapters: Meet Meridian → One Portal → The Intelligence → Everywhere → Built to Grow.
 * Answers Video 1's pains visually (show, don't tell). Audio-locked to Alice VO.
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT } from "./theme";
import { narrated, silent } from "./timing";
import { Scene, Video } from "./video";
import { Screen } from "./scenes/Screen";
import { Stage, TitleLines, G } from "./scenes/common";
import { Wordmark } from "./lib/chrome";
import { FadeUp, ScaleIn, ramp } from "./lib/motion";
import { useCurrentFrame } from "remotion";
import { MeridianDashboard } from "./screens/MeridianDashboard";
import { MeridianAIChat } from "./screens/MeridianAIChat";
import { DeviceTrioScene } from "./screens/DeviceFrame";
import { OnboardingPanel } from "./screens/OnboardingPanel";
import { Recap, OneLogin, RecapBeat, SixDomains, PortfolioScale } from "./scenes/v2/narrative";

/* ---------- Ported product screens with tailored camera moves ---------- */
const Dashboard: React.FC = () => (
  <Screen cam={{ from: { scale: 1.14, x: -60, y: -20 }, to: { scale: 1.0, x: 0, y: 0 }, origin: "50% 45%" }}>
    <MeridianDashboard />
  </Screen>
);

// Push into the connected-systems cluster (bottom-left sidebar) — "still connected".
const ConnectedSystems: React.FC = () => (
  <Screen cam={{ from: { scale: 1.05 }, to: { scale: 2.35 }, origin: "8% 90%" }}>
    <MeridianDashboard />
  </Screen>
);

const AiInsight: React.FC = () => (
  <Screen cam={{ from: { scale: 1.05, y: 8 }, to: { scale: 1.12, y: -8 }, origin: "50% 42%" }}>
    <AbsoluteFill style={{ backgroundColor: C.paper }}><MeridianAIChat mode="insight" /></AbsoluteFill>
  </Screen>
);

const AiAction: React.FC = () => (
  <Screen cam={{ from: { scale: 1.06, y: 20 }, to: { scale: 1.14, y: -30 }, origin: "50% 40%" }}>
    <AbsoluteFill style={{ backgroundColor: C.paper }}><MeridianAIChat mode="action" /></AbsoluteFill>
  </Screen>
);

const Devices: React.FC = () => (
  <Screen cam={{ from: { scale: 1.1, x: 0, y: 0 }, to: { scale: 1.0, x: 0, y: 0 }, origin: "50% 50%" }}>
    <DeviceTrioScene />
  </Screen>
);

const Omfa: React.FC = () => (
  <Screen cam={{ from: { scale: 1.12, y: -140 }, to: { scale: 1.06, y: -110 }, origin: "50% 0%" }}>
    <OnboardingPanel />
  </Screen>
);

const DayOne: React.FC = () => (
  <Screen cam={{ from: { scale: 1.22 }, to: { scale: 1.5 }, origin: "30% 56%" }}>
    <OnboardingPanel />
  </Screen>
);

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage>
      <ScaleIn delay={4} from={0.92}><Wordmark size={112} drawFrom={14} /></ScaleIn>
      <FadeUp delay={34} style={{ marginTop: 40 }}>
        <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 30, color: C.inkSoft, textAlign: "center" }}>
          The intelligence layer of Minor Hotels.
        </div>
      </FadeUp>
    </Stage>
  );
};

/* ---------- Scene registry ---------- */
const scenes: Scene[] = [
  { timing: silent("v2-c1", 2.4), chapter: "Meet Meridian", Component: () => null, isCard: true, cardKicker: "This is Meridian." },
  { timing: narrated("v2-01"), chapter: "Meet Meridian", Component: Recap, caption: "The answer to twelve systems", noChrome: true },

  { timing: silent("v2-c2", 2.2), chapter: "One Portal", Component: () => null, isCard: true },
  { timing: narrated("v2-02"), chapter: "One Portal", Component: OneLogin, caption: "One identity — one login" },
  { timing: narrated("v2-03"), chapter: "One Portal", Component: Dashboard, caption: "The command center" },
  { timing: narrated("v2-04"), chapter: "One Portal", Component: ConnectedSystems, caption: "Every legacy system, still connected" },

  { timing: silent("v2-c3", 2.2), chapter: "The Intelligence", Component: () => null, isCard: true },
  { timing: narrated("v2-05"), chapter: "The Intelligence", Component: AiInsight, caption: "Ask it anything" },
  { timing: narrated("v2-06"), chapter: "The Intelligence", Component: AiAction, caption: "It doesn't just answer — it acts" },
  { timing: narrated("v2-07"), chapter: "The Intelligence", Component: RecapBeat, caption: "One ask. Three systems. Zero tabs.", noChrome: true },

  { timing: silent("v2-c4", 2.2), chapter: "Everywhere", Component: () => null, isCard: true },
  { timing: narrated("v2-08"), chapter: "Everywhere", Component: Devices, caption: "Every role, every device" },
  { timing: narrated("v2-09"), chapter: "Everywhere", Component: SixDomains, caption: "Six service domains, unified" },

  { timing: silent("v2-c5", 2.4), chapter: "Built to Grow", Component: () => null, isCard: true, cardKicker: "Any model. Any stack. Day one." },
  { timing: narrated("v2-10"), chapter: "Built to Grow", Component: Omfa, caption: "OMFA — four ways to join" },
  { timing: narrated("v2-11"), chapter: "Built to Grow", Component: DayOne, caption: "Keep your PMS — live on day one" },
  { timing: narrated("v2-12"), chapter: "Built to Grow", Component: PortfolioScale, caption: "590 → 1,000 by 2029" },
  { timing: narrated("v2-13"), chapter: "Built to Grow", Component: EndCard, noChrome: true },
];

export const Video2_Franchising: React.FC = () => <Video scenes={scenes} />;
export const video2Scenes = scenes;
