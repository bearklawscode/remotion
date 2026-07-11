/**
 * Ported-screen scene wrapper. Renders one of the approved minor-os UI screens
 * (1920×1080) with a cinematic camera move over the scene's duration, so a static
 * mockup becomes a living shot. Optional focus rectangle drives a push-in.
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import { Camera, EASE } from "../lib/motion";
import { C } from "../theme";

export type CamMove = {
  from?: { scale?: number; x?: number; y?: number };
  to?: { scale?: number; x?: number; y?: number };
  origin?: string;
  start?: number;
  end?: number;
};

export const Screen: React.FC<{ children: React.ReactNode; cam?: CamMove }> = ({ children, cam }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper, overflow: "hidden" }}>
      <Camera
        from={cam?.from ?? { scale: 1.04 }}
        to={cam?.to ?? { scale: 1.09 }}
        origin={cam?.origin ?? "50% 45%"}
        start={cam?.start}
        end={cam?.end}
        ease={EASE.inOut}
      >
        {children}
      </Camera>
    </AbsoluteFill>
  );
};
