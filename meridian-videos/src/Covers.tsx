/**
 * Branded pitch title cards (covers), prepended to each film in Phase 4.
 * Rendered with the same encoder params as the main films for clean concat.
 */
import "./index.css";
import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "./theme";
import { FONT_FACE_CSS } from "./fontface-css";
import { Wordmark } from "./lib/chrome";
import { FadeUp, ScaleIn, ramp } from "./lib/motion";

const Cover: React.FC<{ part: string; title: string; audience: string }> = ({ part, title, audience }) => {
  const frame = useCurrentFrame();
  const line = ramp(frame, 20, 44);
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper, justifyContent: "center", alignItems: "center" }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_FACE_CSS }} />
      <FadeUp delay={4}>
        <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 700, letterSpacing: "0.34em", textTransform: "uppercase", color: C.gold }}>
          Project Meridian · {part}
        </div>
      </FadeUp>
      <div style={{ width: 380, height: 2, background: C.gold, margin: "34px 0", transform: `scaleX(${line})` }} />
      <ScaleIn delay={14} from={0.92}>
        <div style={{ fontFamily: FONT.display, fontSize: 104, color: C.ink, textAlign: "center", lineHeight: 0.96, letterSpacing: "-0.01em", maxWidth: 1500 }}>
          {title}
        </div>
      </ScaleIn>
      <FadeUp delay={40} style={{ marginTop: 34 }}>
        <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 28, color: C.inkSoft }}>{audience}</div>
      </FadeUp>
      <FadeUp delay={62} style={{ marginTop: 70 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <Wordmark size={30} />
          <div style={{ width: 1, height: 34, background: C.hairline }} />
          <Img src={staticFile("assets/brand/minor-hotels-logo.png")} style={{ height: 30, objectFit: "contain" }} />
        </div>
      </FadeUp>
    </AbsoluteFill>
  );
};

export const CoverV1: React.FC = () => <Cover part="Part One" title="Why Meridian. Why Now." audience="For the Executive Committee" />;
export const CoverV2: React.FC = () => <Cover part="Part Two" title="This is Meridian." audience="A guided tour of the platform" />;
