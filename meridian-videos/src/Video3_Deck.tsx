/**
 * VIDEO 3 — "Meridian, in Motion" — a dynamic motion-graphic walkthrough of the
 * Technical Deck V2, in slide order. Matilda VO + soft music bed. Facts grounded
 * strictly in the deck. Navy-faithful (matching the deck), light UI mockups
 * composited in. Persistent small "illustrative mockup" disclaimer on mockup scenes.
 */
import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { C } from "./theme";
import { scene3, card3, Timing3, totalFrames3 } from "./timing3";
import { MusicBed, SlideTag, MockupDisclaimer } from "./lib/v3ui";
import * as V3 from "./scenes/v3";

type Entry = { t: Timing3; C: React.FC; label: string; idx: number; mockup?: boolean; dark?: boolean; noTag?: boolean };

// Slide order (19) + intro/outro. dark=true → chrome uses light text (navy bg).
const REG: Entry[] = [
  { t: card3("intro", 4.0), C: V3.IntroCard, label: "", idx: 0, dark: true, noTag: true },
  { t: scene3("s01"), C: V3.S01, label: "Title", idx: 1, dark: true, mockup: true },
  { t: scene3("s02"), C: V3.S02, label: "The Scale", idx: 2, dark: true },
  { t: scene3("s03"), C: V3.S03, label: "The Convergence", idx: 3 },
  { t: scene3("s04"), C: V3.S04, label: "Vector One", idx: 4, dark: true },
  { t: scene3("s05"), C: V3.S05, label: "Vector Two", idx: 5, dark: true },
  { t: scene3("s06"), C: V3.S06, label: "Vector Three", idx: 6, dark: true },
  { t: scene3("s07"), C: V3.S07, label: "The Meridian Layer", idx: 7, dark: true },
  { t: scene3("s08"), C: V3.S08, label: "Why Now", idx: 8, dark: true },
  { t: scene3("s09"), C: V3.S09, label: "What It Is", idx: 9, dark: true, mockup: true },
  { t: scene3("s10"), C: V3.S10, label: "Six Service Domains", idx: 10, dark: true },
  { t: scene3("s11"), C: V3.S11, label: "The Challenge", idx: 11, dark: true },
  { t: scene3("s12"), C: V3.S12, label: "The Operator Surface", idx: 12, dark: true, mockup: true },
  { t: scene3("s13"), C: V3.S13, label: "The Growth Model", idx: 13, dark: true },
  { t: scene3("s14"), C: V3.S14, label: "Fast Franchise", idx: 14 },
  { t: scene3("s15"), C: V3.S15, label: "For the Franchisee", idx: 15 },
  { t: scene3("s16"), C: V3.S16, label: "Operational Intelligence", idx: 16 },
  { t: scene3("s17"), C: V3.S17, label: "The Disruptor", idx: 17, dark: true },
  { t: scene3("s18"), C: V3.S18, label: "The Approach", idx: 18 },
  { t: scene3("s19"), C: V3.S19, label: "Point of Reference", idx: 19, dark: true },
  { t: card3("outro", 5.0), C: V3.OutroCard, label: "", idx: 20, dark: true, noTag: true },
];

export const video3List = REG.map((e) => e.t);

export const Video3_Deck: React.FC = () => {
  let from = 0;
  const placed = REG.map((e) => {
    const p = { ...e, from };
    from += e.t.frames;
    return p;
  });
  const TOTAL = totalFrames3(video3List);
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      {/* one music bed under the whole film */}
      <Sequence durationInFrames={TOTAL} name="music">
        <MusicBed volume={0.13} />
      </Sequence>
      {placed.map((e, i) => {
        const { C: Comp } = e;
        return (
          <Sequence key={e.t.id + i} from={e.from} durationInFrames={e.t.frames} name={e.t.id}>
            <Comp />
            {!e.noTag && <SlideTag index={e.idx} total={19} label={e.label} dark={e.dark} />}
            {e.mockup && <MockupDisclaimer dark={e.dark} />}
            {e.t.voFile && (
              <Sequence from={e.t.voStartFrame} name={`vo-${e.t.id}`}>
                <Audio src={staticFile(e.t.voFile)} />
              </Sequence>
            )}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
