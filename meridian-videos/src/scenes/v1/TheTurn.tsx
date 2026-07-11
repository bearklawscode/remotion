/**
 * v1-09 "The Turn" — the money shot. 12 system chips are pulled into a central
 * gold point (gravity well), a white bloom, then the Meridian wordmark blooms out.
 * Silent-ish beat; VO ("Meet Meridian") lands as the wordmark appears.
 */
import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../../theme";
import { EASE, ramp } from "../../lib/motion";
import { Wordmark } from "../../lib/chrome";

const SYS = [
  "oracle.svg", "sap.svg", "salesforce.svg", "jira.svg", "sharepoint.svg", "teams.svg",
  "mews.svg", "shiji.svg", "hubos-icon.png", "messagebox.png", "okami.png",
];

export const TheTurn: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const cx = width / 2, cy = height / 2;

  const collapseStart = 8, collapseEnd = 52;
  const collapse = interpolate(frame, [collapseStart, collapseEnd], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.in });
  const bloom = ramp(frame, 50, 62); // white flash
  const reveal = ramp(frame, 62, 90, EASE.out); // wordmark bloom
  const pointGlow = interpolate(frame, [30, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: C.paper, overflow: "hidden" }}>
      {/* orbiting chips converging to center */}
      {SYS.map((s, i) => {
        const ang = (i / SYS.length) * Math.PI * 2 - Math.PI / 2;
        const R = 520;
        const startX = cx + Math.cos(ang) * R - 46;
        const startY = cy + Math.sin(ang) * R - 46;
        const x = interpolate(collapse, [0, 1], [startX, cx - 46]);
        const y = interpolate(collapse, [0, 1], [startY, cy - 46]);
        const spin = collapse * 180;
        const scale = interpolate(collapse, [0, 1], [1, 0.12]);
        const op = interpolate(collapse, [0.7, 1], [1, 0], { extrapolateLeft: "clamp" });
        return (
          <div key={s} style={{ position: "absolute", left: x, top: y, width: 92, height: 92, borderRadius: 18, background: C.surface, boxShadow: "0 8px 24px rgba(19,33,60,0.12)", display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(${spin}deg) scale(${scale})`, opacity: op * (1 - bloom) }}>
            <Img src={staticFile("assets/tech-stack/" + s)} style={{ maxWidth: 52, maxHeight: 26, objectFit: "contain" }} />
          </div>
        );
      })}

      {/* central gold gravity point */}
      <div style={{ position: "absolute", left: cx, top: cy, transform: "translate(-50%,-50%)", opacity: pointGlow * (1 - reveal) }}>
        <div style={{ width: 40, height: 40, borderRadius: 999, background: C.gold, boxShadow: `0 0 ${40 + pointGlow * 120}px ${10 + pointGlow * 40}px rgba(160,138,79,0.6)` }} />
      </div>

      {/* white bloom flash */}
      <AbsoluteFill style={{ background: "#fff", opacity: bloom * (1 - reveal * 0.9) }} />

      {/* Meridian reveal */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: reveal, transform: `scale(${0.8 + reveal * 0.2})` }}>
        <Wordmark size={128} drawFrom={64} />
        <div style={{ marginTop: 46, fontFamily: FONT.serif, fontStyle: "italic", fontSize: 30, color: C.inkSoft, opacity: ramp(frame, 84, 104) }}>
          One login. One portal. Every system — still doing its job, underneath.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
