/**
 * v1-07 "The Stakes" — competitor ticker rising like a stock tape. Each rival
 * line rises and its figure counts up, timed to the narration.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, FONT } from "../../theme";
import { Eyebrow } from "../../lib/chrome";
import { FadeUp, Counter, ramp } from "../../lib/motion";

const ROWS = [
  { name: "Marriott", figure: <Counter to={1.1} decimals={1} prefix="$" suffix="B" durationFrames={30} delay={30} />, note: "to replatform legacy systems", delay: 24 },
  { name: "Wyndham", figure: <Counter to={96} suffix="%" durationFrames={30} delay={54} />, note: "franchise retention from its portal", delay: 48 },
  { name: "Mews", figure: <Counter to={2.5} decimals={1} prefix="$" suffix="B" durationFrames={30} delay={78} />, note: "disruptor — coming for independents", delay: 72 },
];

export const Competitors: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper, justifyContent: "center", padding: "0 180px" }}>
      <FadeUp delay={4}><Eyebrow>The market is moving</Eyebrow></FadeUp>
      <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 34 }}>
        {ROWS.map((r) => {
          const p = ramp(frame, r.delay, r.delay + 18);
          return (
            <div key={r.name} style={{ display: "flex", alignItems: "baseline", gap: 40, opacity: p, transform: `translateY(${(1 - p) * 22}px)`, borderBottom: `1px solid ${C.hairline}`, paddingBottom: 26 }}>
              <div style={{ fontFamily: FONT.display, fontSize: 58, color: C.ink, width: 360 }}>{r.name}</div>
              <div style={{ fontFamily: FONT.display, fontSize: 72, color: C.gold, fontVariantNumeric: "tabular-nums", width: 300 }}>{r.figure}</div>
              <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 26, color: C.inkSoft }}>{r.note}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
