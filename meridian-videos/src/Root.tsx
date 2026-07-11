import "./index.css";
import React from "react";
import { Composition } from "remotion";
import { FONT_FACE_CSS } from "./fontface-css";
import { FPS, W, H } from "./theme";
import { totalFrames } from "./timing";
import { Video1_Ecosystem, video1Scenes } from "./Video1_Ecosystem";
import { Video2_Franchising, video2Scenes } from "./Video2_Franchising";
import { CoverV1, CoverV2 } from "./Covers";
import { Video3_Deck, video3List } from "./Video3_Deck";
import { totalFrames3 } from "./timing3";
import { Video4_Product, VIDEO4_FRAMES } from "./Video4_Product";

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
      <Composition
        id="Video3"
        component={() => (
          <>
            <Fonts />
            <Video3_Deck />
          </>
        )}
        durationInFrames={totalFrames3(video3List)}
        fps={FPS}
        width={W}
        height={H}
      />
      <Composition
        id="Video4"
        component={() => (
          <>
            <Fonts />
            <Video4_Product />
          </>
        )}
        durationInFrames={VIDEO4_FRAMES}
        fps={FPS}
        width={W}
        height={H}
      />
      <Composition id="CoverV1" component={CoverV1} durationInFrames={Math.round(4.5 * FPS)} fps={FPS} width={W} height={H} />
      <Composition id="CoverV2" component={CoverV2} durationInFrames={Math.round(4.5 * FPS)} fps={FPS} width={W} height={H} />
    </>
  );
};
