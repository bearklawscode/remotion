import "./index.css";
import React from "react";
import { Composition } from "remotion";
import { FONT_FACE_CSS } from "./fontface-css";
import { FPS, W, H } from "./theme";
import { totalFrames } from "./timing";
import { Video1_Ecosystem, video1Scenes } from "./Video1_Ecosystem";
import { Video2_Franchising, video2Scenes } from "./Video2_Franchising";

export const Fonts: React.FC = () => <style dangerouslySetInnerHTML={{ __html: FONT_FACE_CSS }} />;

const V1 = totalFrames(video1Scenes.map((s) => s.timing));
const V2 = totalFrames(video2Scenes.map((s) => s.timing));

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Video1"
        component={() => (
          <>
            <Fonts />
            <Video1_Ecosystem />
          </>
        )}
        durationInFrames={V1}
        fps={FPS}
        width={W}
        height={H}
      />
      <Composition
        id="Video2"
        component={() => (
          <>
            <Fonts />
            <Video2_Franchising />
          </>
        )}
        durationInFrames={V2}
        fps={FPS}
        width={W}
        height={H}
      />
    </>
  );
};
