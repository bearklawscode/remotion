import { A } from "./asset";
import { Check } from "lucide-react";

/**
 * OnboardingPanel — Video 2, Scene 5 "Built to Grow" (full-frame 1920×1080).
 * The OMFA growth engine: four ways to join, one platform. Franchise "Portal First"
 * is the hero path — a new partner keeps their PMS and is live on Meridian Day 1.
 * Static, light mode only. Tokens per docs/02-brand/brand-guide.md.
 */

/* ————————————————————————— data ————————————————————————— */

const OMFA_MODES = [
  { letter: "O", name: "Owned", sub: "Full Integration", depth: 4, selected: false },
  { letter: "M", name: "Managed", sub: "Deep Integration", depth: 3, selected: false },
  { letter: "F", name: "Franchise", sub: "Portal First", depth: 2, selected: true },
  { letter: "A", name: "Affiliate", sub: "Portal Only", depth: 1, selected: false },
];

const DAY_ONE_CHECKLIST = [
  "Global distribution — Synxis CRS",
  "Minor DISCOVERY loyalty",
  "Brand standards & SOPs",
  "Portfolio benchmarking",
];

/**
 * Abstract dot-grid world silhouette ('#' = dot). Deliberately impressionistic —
 * a "map-ish" texture, not cartography. 38 cols × 15 rows.
 */
const DOT_MAP = [
  "    ###  ##                           ",
  "  ##########         #### #######     ",
  " ############       ################  ",
  "  ##########       ################## ",
  "   #######         ################## ",
  "    ####  #         ########  ######  ",
  "     ##  ####       ########   ####   ",
  "         ######      ######     ##    ",
  "      #########      ######    ##     ",
  "       ########       ####   #####    ",
  "        ######        ###   ### ##    ",
  "         ####         ###    ## #     ",
  "          ###          #        ##    ",
  "          ##                     #    ",
  "           #                          ",
];

/** Gold "live network" nodes — [col, row] on the dot grid. */
const GOLD_NODES: Array<[number, number]> = [
  [7, 3], // North America
  [12, 9], // South America
  [21, 3], // Europe
  [23, 8], // Africa / Middle East
  [30, 4], // Asia
  [33, 11], // Australia
];

const DOT_SPACING = 14;
const MAP_COLS = 38;
const MAP_ROWS = DOT_MAP.length;

/* ————————————————————————— pieces ————————————————————————— */

function DepthMeter({ depth, selected }: { depth: number; selected: boolean }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4].map((seg) => (
        <span
          key={seg}
          className={`h-1.5 w-5 rounded-full ${
            seg <= depth ? (selected ? "bg-gold" : "bg-ink") : "bg-ink/10"
          }`}
        />
      ))}
    </div>
  );
}

function OmfaPill({
  letter,
  name,
  sub,
  depth,
  selected,
}: (typeof OMFA_MODES)[number]) {
  return (
    <div
      className={`relative flex items-center gap-4 overflow-hidden rounded-2xl bg-surface px-5 py-4 ${
        selected
          ? "bg-wash shadow-card-lg ring-1 ring-gold/30"
          : "shadow-card ring-1 ring-ink/[0.06]"
      }`}
    >
      {selected && <div className="absolute inset-x-0 top-0 h-0.5 bg-gold" />}
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-lg leading-none ${
          selected ? "bg-gold text-surface" : "bg-ink/5 text-ink"
        }`}
      >
        {letter}
      </span>
      <div className="min-w-0 flex-1">
        <div className="font-sans text-[15px] font-bold text-ink">{name}</div>
        <div
          className={`font-sans text-[10px] font-semibold uppercase tracking-[0.16em] ${
            selected ? "text-gold" : "text-mist"
          }`}
        >
          {sub}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-mist">
          Integration
        </span>
        <DepthMeter depth={depth} selected={selected} />
      </div>
    </div>
  );
}

function WorldNodeMap() {
  const width = MAP_COLS * DOT_SPACING;
  const height = MAP_ROWS * DOT_SPACING;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label="Global network of Minor Hotels properties"
    >
      {DOT_MAP.flatMap((row, y) =>
        row.split("").map((ch, x) =>
          ch === "#" ? (
            <circle
              key={`${x}-${y}`}
              cx={x * DOT_SPACING + DOT_SPACING / 2}
              cy={y * DOT_SPACING + DOT_SPACING / 2}
              r={3.2}
              fill="#13213C"
              opacity={0.14}
            />
          ) : null,
        ),
      )}
      {GOLD_NODES.map(([x, y]) => {
        const cx = x * DOT_SPACING + DOT_SPACING / 2;
        const cy = y * DOT_SPACING + DOT_SPACING / 2;
        return (
          <g key={`node-${x}-${y}`}>
            <circle cx={cx} cy={cy} r={13} fill="#A08A4F" opacity={0.12} />
            <circle cx={cx} cy={cy} r={8} fill="#C8B37E" opacity={0.3} />
            <circle cx={cx} cy={cy} r={4.2} fill="#A08A4F" />
          </g>
        );
      })}
    </svg>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full ${
        on ? "bg-success" : "bg-ink/15"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-surface shadow-card ${
          on ? "right-1" : "left-1"
        }`}
      />
    </span>
  );
}

/* ————————————————————————— scene ————————————————————————— */

export function OnboardingPanel() {
  return (
    <div className="relative flex h-[1080px] w-[1920px] flex-col overflow-hidden bg-paper px-24 pt-16">
      {/* Header */}
      <div className="shrink-0">
        <div className="eyebrow">— The Growth Model</div>
        <h1 className="headline-split mt-4 font-display text-[64px] leading-[0.95] tracking-tight text-ink">
          FOUR WAYS TO JOIN. <em>ONE PLATFORM.</em>
        </h1>
      </div>

      {/* OMFA selector row */}
      <div className="mt-10 grid shrink-0 grid-cols-4 gap-6">
        {OMFA_MODES.map((mode) => (
          <OmfaPill key={mode.letter} {...mode} />
        ))}
      </div>

      {/* Main: onboarding hero card + world node panel */}
      <div className="mt-10 grid min-h-0 flex-1 grid-cols-[1.12fr_0.88fr] gap-10">
        {/* Hero card — new partner onboarding */}
        <div className="flex flex-col rounded-3xl bg-surface p-9 shadow-card-lg ring-1 ring-ink/[0.06]">
          <div className="flex items-center gap-5">
            {/* Franchise owner — tight circle-crop to face (asset manifest: hides nameplate) */}
            <span className="block h-16 w-16 shrink-0 overflow-hidden rounded-full ring-1 ring-gold/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={A("/assets/images/avatar-owner.png")}
                alt="Franchise owner"
                className="h-full w-full object-cover"
                style={{
                  objectPosition: "50% 16%",
                  transform: "scale(1.55)",
                  transformOrigin: "50% 22%",
                }}
              />
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-mist">
                New Partner Onboarding
              </div>
              <div className="mt-1 font-display text-[26px] leading-none text-ink">
                Avani+ Koh Samui
              </div>
            </div>
            <span className="rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
              Franchise · Portal First
            </span>
          </div>

          {/* Keep existing PMS */}
          <div className="mt-7 flex items-center gap-4 rounded-2xl border border-hairline bg-paper/70 px-6 py-4">
            <Toggle on />
            <div className="min-w-0 flex-1">
              <div className="font-sans text-[15px] font-bold text-ink">
                Keep existing PMS
              </div>
              <div className="font-serif text-[13px] italic text-ink-soft">
                No migration required
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={A("/assets/tech-stack/mews.svg")}
              alt="Mews"
              className="h-6 w-auto shrink-0 opacity-90"
            />
          </div>

          {/* Day-one checklist */}
          <div className="mt-7 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-mist">
            Day-One Checklist
          </div>
          <ul className="mt-3 flex flex-1 flex-col justify-between gap-2.5">
            {DAY_ONE_CHECKLIST.map((item) => (
              <li key={item} className="flex items-center gap-3.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/10 ring-1 ring-success/20">
                  <Check size={13} strokeWidth={3} className="text-success" />
                </span>
                <span className="font-sans text-[15px] font-medium text-ink">
                  {item}
                </span>
              </li>
            ))}
            {/* Status badge */}
            <li className="mt-1.5 flex items-center justify-center gap-3 rounded-xl border border-gold/40 bg-gold/10 px-6 py-3.5">
              <span className="h-2 w-2 rotate-45 bg-gold" />
              <span className="font-sans text-[13px] font-bold uppercase tracking-[0.24em] text-gold">
                Live on Meridian — Day 1
              </span>
              <span className="h-2 w-2 rotate-45 bg-gold" />
            </li>
          </ul>
        </div>

        {/* World node panel */}
        <div className="flex flex-col rounded-3xl bg-surface p-9 shadow-card ring-1 ring-ink/[0.06]">
          <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-mist">
            The Network
          </div>
          <div className="mt-5 flex-1">
            <WorldNodeMap />
          </div>
          <div className="mt-4 flex items-end gap-4 border-t border-hairline pt-6">
            <span className="tnum font-display text-[52px] leading-none text-ink">
              590+
            </span>
            <span className="mb-2 font-display text-[26px] leading-none text-mist">
              →
            </span>
            <span className="tnum font-display text-[52px] leading-none text-gold">
              1,000
            </span>
            <span className="mb-1.5 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
              by 2029
            </span>
          </div>
          <div className="mt-3 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-mist">
            <span className="tnum">80%</span> Asset-Light
          </div>
        </div>
      </div>

      {/* Takeaway bar */}
      <div className="mt-10 shrink-0 border-t border-hairline py-8 text-center">
        <p className="font-serif text-[24px] italic leading-none text-ink-soft">
          Days, not months. No deal blocked by technology.
        </p>
      </div>
    </div>
  );
}
