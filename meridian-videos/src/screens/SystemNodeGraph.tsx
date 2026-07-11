import { A } from "./asset";
import { LogoChip } from "./ui/LogoChip";
import { MeridianWordmark } from "./ui/MeridianWordmark";

/**
 * SystemNodeGraph — the "12 systems" set-piece, designed full-frame 1920×1080.
 *
 *   state="chaos"    Video 1 · Scene 2 "The Morning Reality": 12 overlapping
 *                    login windows, notification badges multiplying.
 *   state="unified"  Video 1 · Scene 4 / Video 2 sidebar view: calm hub-and-spoke,
 *                    Meridian at the center, every system a connected green-dot chip.
 *
 * Static by design — no animation, no client JS. Every position/rotation below is
 * a hardcoded, deterministic constant (exported) so the Remotion compositions can
 * interpolate chaos → unified 1:1 from the same arrays.
 * Canonical 12 systems + asset paths: docs/04-asset-manifest.md (Opera PMS = text chip).
 */

export const FRAME = { width: 1920, height: 1080 } as const;

export type SystemDef = {
  id: string;
  label: string;
  /** Logo asset from the manifest. Absent for Opera PMS (text chip by design). */
  src?: string;
  /** Chaos-state notification badge count. */
  badge: number;
  /** Logo pixel height inside the chaos login window. */
  logoH: number;
  /** Icon-only marks (Hub OS, MessageBox, Okami) get a text label beside the mark. */
  pairLabel?: boolean;
};

export const SYSTEMS: SystemDef[] = [
  { id: "oracle", label: "Oracle", src: "/assets/tech-stack/oracle.svg", badge: 17, logoH: 22 },
  { id: "sap", label: "SAP", src: "/assets/tech-stack/sap.svg", badge: 9, logoH: 30 },
  { id: "salesforce", label: "Salesforce", src: "/assets/tech-stack/salesforce.svg", badge: 23, logoH: 30 },
  { id: "jira", label: "Jira", src: "/assets/tech-stack/jira.svg", badge: 48, logoH: 28 },
  { id: "sharepoint", label: "SharePoint", src: "/assets/tech-stack/sharepoint.svg", badge: 6, logoH: 28 },
  { id: "teams", label: "Microsoft Teams", src: "/assets/tech-stack/teams.svg", badge: 31, logoH: 28 },
  { id: "mews", label: "Mews", src: "/assets/tech-stack/mews.svg", badge: 3, logoH: 20 },
  { id: "shiji", label: "Shiji", src: "/assets/tech-stack/shiji.svg", badge: 12, logoH: 22 },
  { id: "hubos", label: "Hub OS", src: "/assets/tech-stack/hubos-icon.png", badge: 27, logoH: 30, pairLabel: true },
  { id: "messagebox", label: "MessageBox", src: "/assets/tech-stack/messagebox.png", badge: 44, logoH: 30, pairLabel: true },
  { id: "okami", label: "Okami", src: "/assets/tech-stack/okami.png", badge: 5, logoH: 30, pairLabel: true },
  { id: "opera", label: "Opera PMS", badge: 8, logoH: 0 },
];

/* ------------------------------------------------------------------ */
/* CHAOS geometry — deterministic scatter (indexes align with SYSTEMS) */
/* ------------------------------------------------------------------ */

export const CHAOS_WINDOW_W = 340;

/** Top-left corner of each login window + rotation (deg) + stacking order. */
export const CHAOS_WINDOWS: { x: number; y: number; r: number; z: number }[] = [
  { x: 566, y: 96, r: -4, z: 3 }, // Oracle
  { x: 872, y: 60, r: 3, z: 5 }, // SAP
  { x: 1168, y: 118, r: -2, z: 4 }, // Salesforce
  { x: 1466, y: 76, r: 5, z: 6 }, // Jira
  { x: 398, y: 330, r: 2, z: 7 }, // SharePoint
  { x: 704, y: 316, r: -5, z: 8 }, // Teams
  { x: 1004, y: 352, r: 4, z: 9 }, // Mews
  { x: 1316, y: 398, r: -3, z: 10 }, // Shiji
  { x: 196, y: 602, r: -6, z: 11 }, // Hub OS
  { x: 538, y: 646, r: 3, z: 12 }, // MessageBox
  { x: 882, y: 664, r: -2, z: 13 }, // Okami
  { x: 1238, y: 686, r: 5, z: 14 }, // Opera PMS
];

/* -------------------------------------------------------------------- */
/* UNIFIED geometry — perfect circle around the hub (same system order)  */
/* -------------------------------------------------------------------- */

export const HUB = { x: 960, y: 560 } as const;
export const UNIFIED_RADIUS = 400;
/** Half-extents of the hub block (card + pills) — spokes' gold dots sit just outside. */
export const HUB_CLEAR = { w: 316, h: 156 } as const;

/** Chip centers: 12 o'clock first, then clockwise, 30° apart. */
export const UNIFIED_POSITIONS: { x: number; y: number }[] = SYSTEMS.map((_, i) => {
  const a = ((-90 + i * 30) * Math.PI) / 180;
  return {
    x: Math.round(HUB.x + UNIFIED_RADIUS * Math.cos(a)),
    y: Math.round(HUB.y + UNIFIED_RADIUS * Math.sin(a)),
  };
});

/** Gold dot at the hub end of each spoke — where the line exits the hub block. */
export const HUB_SPOKE_DOTS: { x: number; y: number }[] = UNIFIED_POSITIONS.map((p) => {
  const dx = p.x - HUB.x;
  const dy = p.y - HUB.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const t =
    Math.min(
      ux !== 0 ? HUB_CLEAR.w / Math.abs(ux) : Infinity,
      uy !== 0 ? HUB_CLEAR.h / Math.abs(uy) : Infinity,
    ) + 18;
  return { x: Math.round(HUB.x + ux * t), y: Math.round(HUB.y + uy * t) };
});

const PILLS = ["One Identity", "One Entry Point", "The Home for AI"];

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

export function SystemNodeGraph({ state }: { state: "chaos" | "unified" }) {
  return (
    <div className="relative h-[1080px] w-[1920px] overflow-hidden bg-paper font-sans text-ink">
      {state === "chaos" ? <ChaosState /> : <UnifiedState />}
    </div>
  );
}

/* ---------------------------- chaos ------------------------------- */

function ChaosState() {
  return (
    <>
      {SYSTEMS.map((system, i) => (
        <LoginWindow key={system.id} system={system} placement={CHAOS_WINDOWS[i]} />
      ))}

      <div className="absolute left-24 top-20 z-40">
        <p className="eyebrow">— The Morning Reality</p>
        <h1 className="headline-split mt-6 font-display text-[64px] leading-[0.95] text-ink">
          TWELVE SYSTEMS.
          <br />
          <em>TWELVE LOGINS.</em>
        </h1>
      </div>
    </>
  );
}

function LoginWindow({
  system,
  placement,
}: {
  system: SystemDef;
  placement: { x: number; y: number; r: number; z: number };
}) {
  return (
    <div
      className="absolute rounded-xl bg-surface shadow-card-lg ring-1 ring-ink/[0.06]"
      style={{
        width: CHAOS_WINDOW_W,
        left: placement.x,
        top: placement.y,
        transform: `rotate(${placement.r}deg)`,
        zIndex: placement.z,
      }}
    >
      {/* notification badge — ring-2 ring-surface halo lifts it off overlapping windows */}
      <div className="absolute -right-3 -top-3 z-10 flex h-7 min-w-7 items-center justify-center rounded-full bg-alert px-2 text-xs font-bold tabular-nums text-white shadow-card ring-2 ring-surface">
        {system.badge}
      </div>

      {/* mac-style title bar */}
      <div className="flex items-center gap-2 rounded-t-xl border-b border-hairline bg-paper/60 px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-alert/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold-soft" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
        <span className="ml-2 truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-mist">
          {system.label} — Sign in
        </span>
      </div>

      {/* body */}
      <div className="flex flex-col gap-2.5 p-5">
        <div className="mb-1 flex h-8 items-center gap-2.5">
          {system.src ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={A(system.src)}
                alt={system.label}
                className="w-auto max-w-[170px] object-contain"
                style={{ height: system.logoH }}
              />
              {system.pairLabel && (
                <span className="text-sm font-bold text-ink">{system.label}</span>
              )}
            </>
          ) : (
            <span className="flex items-center gap-2">
              {/* Opera PMS = text chip w/ small Oracle mark (asset manifest) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={A("/assets/tech-stack/oracle.svg")} alt="Oracle" className="h-3 w-auto" />
              <span className="text-sm font-bold uppercase tracking-[0.14em] text-ink">
                Opera PMS
              </span>
            </span>
          )}
        </div>

        <div className="rounded-lg border border-hairline bg-paper/70 px-3.5 py-2.5 text-[12px] text-ink-soft">
          gm.riverside@minorhotels.com
        </div>
        <div className="rounded-lg border border-hairline bg-paper/70 px-3.5 py-2.5 text-[11px] leading-none tracking-[0.28em] text-ink">
          ••••••••••
        </div>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-[10px] font-medium text-mist">Forgot password?</span>
          <span className="rounded-md bg-ink px-4 py-1.5 text-[11px] font-semibold text-white">
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- unified ------------------------------ */

function UnifiedState() {
  return (
    <>
      {/* spokes */}
      <svg
        className="absolute inset-0 z-0"
        width={FRAME.width}
        height={FRAME.height}
        viewBox={`0 0 ${FRAME.width} ${FRAME.height}`}
        fill="none"
        aria-hidden
      >
        {UNIFIED_POSITIONS.map((p, i) => (
          <line
            key={SYSTEMS[i].id}
            x1={HUB.x}
            y1={HUB.y}
            x2={p.x}
            y2={p.y}
            stroke="rgba(19,33,60,0.10)"
            strokeWidth={1}
          />
        ))}
        {HUB_SPOKE_DOTS.map((d, i) => (
          <circle key={SYSTEMS[i].id} cx={d.x} cy={d.y} r={3.5} fill="#A08A4F" />
        ))}
      </svg>

      {/* the 12 systems — calm, connected */}
      {SYSTEMS.map((system, i) => (
        <div
          key={system.id}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: UNIFIED_POSITIONS[i].x, top: UNIFIED_POSITIONS[i].y }}
        >
          <LogoChip src={system.src} label={system.label} connected />
        </div>
      ))}

      {/* hub */}
      <div
        className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        style={{ left: HUB.x, top: HUB.y }}
      >
        <div className="relative flex flex-col items-center overflow-hidden rounded-2xl bg-surface bg-wash px-16 pb-9 pt-10 shadow-pop ring-1 ring-ink/[0.06]">
          {/* gold keyline — the hub is the single hero of the unified view */}
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gold" />
          <MeridianWordmark size="lg" />
          <p className="mt-5 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
            Conversational &amp; Agentic AI
          </p>
        </div>
        <div className="mt-6 flex items-center gap-3 whitespace-nowrap">
          {PILLS.map((pill) => (
            <span
              key={pill}
              className="flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft shadow-card ring-1 ring-ink/[0.06]"
            >
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* corner copy */}
      <div className="absolute left-24 top-20 z-30">
        <p className="eyebrow">— The Meridian Layer</p>
        <h1 className="headline-split mt-6 font-display text-[56px] leading-[0.95] text-ink">
          EVERY SYSTEM.
          <br />
          <em>ONE SURFACE.</em>
        </h1>
      </div>
    </>
  );
}
