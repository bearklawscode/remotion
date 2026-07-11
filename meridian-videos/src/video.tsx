/**
 * Generic video assembler. Takes an ordered scene list, lays scenes back-to-back
 * using audio-locked timing, and overlays the recurring catch-up chrome
 * (chapter progress rail + persistent lower-third). Each narrated scene carries
 * its own VO clip, delayed by the scene's lead-in so visuals establish first.
 */
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { C } from "./theme";
import { SceneTiming, sequence } from "./timing";
import { ChapterCard, LowerThird, ProgressRail } from "./lib/chrome";

export type Scene = {
  timing: SceneTiming;
  chapter: string;
  Component: React.FC;
  caption?: string; // lower-third summary (defaults to none)
  isCard?: boolean; // full-frame chapter divider
  cardKicker?: string;
  noChrome?: boolean; // title / end cards
};

export const Video: React.FC<{ scenes: Scene[] }> = ({ scenes }) => {
  const placed = sequence(scenes.map((s) => s.timing));
  // ordered unique chapters for the progress rail
  const chapters: string[] = [];
  scenes.forEach((s) => {
    if (!chapters.includes(s.chapter)) chapters.push(s.chapter);
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      {scenes.map((s, i) => {
        const p = placed[i];
        const activeChapter = chapters.indexOf(s.chapter);
        const { Component } = s;
        return (
          <Sequence key={s.timing.id + i} from={p.from} durationInFrames={p.frames} name={s.timing.id}>
            {s.isCard ? (
              <ChapterCard index={activeChapter + 1} total={chapters.length} chapter={s.chapter} kicker={s.cardKicker} />
            ) : (
              <AbsoluteFill>
                <Component />
                {!s.noChrome && <ProgressRail chapters={chapters} active={activeChapter} />}
                {!s.noChrome && s.caption && (
                  <LowerThird chapter={s.chapter} caption={s.caption} index={i} total={scenes.length} />
                )}
              </AbsoluteFill>
            )}
            {s.timing.voFile && (
              <Sequence from={s.timing.voStartFrame} name={`vo-${s.timing.id}`}>
                <Audio src={staticFile(s.timing.voFile)} />
              </Sequence>
            )}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
