import { A } from "./asset";
import { Check, Sparkles } from "lucide-react";

/**
 * DeviceFrame — Video 2, Scene 4 "Every Role. Every Device." (full-frame 1920×1080).
 * Generic CSS device chrome (phone / tablet / desktop) + the composed DeviceTrioScene:
 * phone center-hero (housekeeping + AI push), tablet left (front-desk guest recognition),
 * desktop right (miniature GM dashboard), gold thread linking all three.
 * Static, light mode only. Tokens per docs/02-brand/brand-guide.md.
 */

/* ————————————————————————— data ————————————————————————— */

const ROOM_STATUS: Array<{
  room: string;
  status: string;
  tone: "done" | "progress" | "due";
}> = [
  { room: "203", status: "Inspected", tone: "done" },
  { room: "204", status: "In progress", tone: "progress" },
  { room: "207", status: "Due out", tone: "due" },
];

const MINI_KPIS = [
  { label: "RevPAR", value: "€142", delta: "+8.2%", hero: true },
  { label: "Occupancy", value: "87%", delta: "+2.1%", hero: false },
  { label: "ADR", value: "€163", delta: "+4.6%", hero: false },
  { label: "GOP Margin", value: "34%", delta: "+1.4%", hero: false },
];

const MINI_VIPS = [
  { name: "Isabelle Laurent", meta: "Suite 12 · 14:05" },
  { name: "Marco den Berg", meta: "Suite 4 · 16:30" },
];

const MINI_OPS = [
  { task: "Housekeeping — Floor 2", state: "On track", tone: "done" as const },
  { task: "Engineering — AC unit 203", state: "In progress", tone: "progress" as const },
  { task: "Minibar restock — Floor 5", state: "Queued", tone: "due" as const },
];

const MINI_PROPERTIES = [
  { src: "/assets/images/property-avani-amsterdam.jpg", name: "Avani Amsterdam" },
  { src: "/assets/images/property-anantara-ubud.jpg", name: "Anantara Ubud" },
  { src: "/assets/images/property-anantara-vienna.jpg", name: "Anantara Vienna" },
];

/* ————————————————————————— generic device chrome ————————————————————————— */

export function DeviceFrame({
  kind,
  children,
  tilt = 0,
  className = "",
}: {
  kind: "phone" | "tablet" | "desktop";
  children: React.ReactNode;
  /** degrees — slight 3D tilt applied on the outer wrapper */
  tilt?: number;
  className?: string;
}) {
  const transform =
    tilt === 0
      ? undefined
      : `perspective(2200px) rotateY(${tilt * 1.1}deg) rotate(${tilt * 0.35}deg)`;

  if (kind === "phone") {
    return (
      <div className={className} style={{ transform }}>
        <div className="rounded-[54px] bg-ink p-[13px] shadow-card-lg">
          <div className="relative overflow-hidden rounded-[42px] bg-surface">
            {/* notch pill */}
            <div className="absolute left-1/2 top-3 z-20 h-[22px] w-[110px] -translate-x-1/2 rounded-full bg-ink" />
            {children}
          </div>
        </div>
      </div>
    );
  }

  if (kind === "tablet") {
    return (
      <div className={className} style={{ transform }}>
        <div className="relative rounded-[34px] bg-ink p-[16px] shadow-card-lg">
          {/* camera dot on top bezel */}
          <div className="absolute left-1/2 top-[6px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ink-soft" />
          <div className="overflow-hidden rounded-[20px] bg-surface">{children}</div>
        </div>
      </div>
    );
  }

  // desktop
  return (
    <div className={`flex flex-col items-center ${className}`} style={{ transform }}>
      <div className="relative rounded-[20px] bg-ink p-[11px] pt-[16px] shadow-card-lg">
        {/* camera dot on top bezel */}
        <div className="absolute left-1/2 top-[7px] h-1 w-1 -translate-x-1/2 rounded-full bg-ink-soft" />
        <div className="overflow-hidden rounded-[10px] bg-surface">{children}</div>
      </div>
      <div className="h-[52px] w-[92px] bg-linear-to-b from-ink to-ink/80" />
      <div className="h-[10px] w-[230px] rounded-full bg-ink" />
    </div>
  );
}

/* ————————————————————————— screen contents ————————————————————————— */

function StatusPill({ status, tone }: { status: string; tone: "done" | "progress" | "due" }) {
  if (tone === "done") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 font-sans text-[11px] font-bold text-success">
        {status} <Check size={11} strokeWidth={3.5} />
      </span>
    );
  }
  if (tone === "progress") {
    return (
      <span className="inline-flex items-center rounded-full bg-cadet/25 px-2.5 py-1 font-sans text-[11px] font-bold text-ink-soft">
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-alert/10 px-2.5 py-1 font-sans text-[11px] font-bold text-alert">
      {status}
    </span>
  );
}

/** Phone — housekeeping supervisor in the corridor. Screen 420×820. */
function PhoneScreen() {
  return (
    <div className="flex h-[820px] w-[420px] flex-col bg-paper">
      {/* compact header */}
      <div className="flex items-end justify-between bg-surface px-6 pb-4 pt-12 shadow-card">
        <div className="flex flex-col gap-1">
          <span className="font-display text-[15px] leading-none tracking-[0.2em] text-ink">
            MERIDIAN
          </span>
          <span className="h-[2px] w-full bg-gold" />
        </div>
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-mist">
          Housekeeping · Floor 2
        </span>
      </div>

      {/* room-status list */}
      <div className="flex-1 px-5 pt-6">
        <div className="px-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-mist">
          Room Status
        </div>
        <div className="mt-3 flex flex-col gap-3">
          {ROOM_STATUS.map(({ room, status, tone }) => (
            <div
              key={room}
              className="flex items-center justify-between rounded-2xl bg-surface px-5 py-4 shadow-card ring-1 ring-ink/[0.06]"
            >
              <div className="flex items-center gap-3.5">
                <span className="tnum flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5 font-display text-[15px] text-ink">
                  {room}
                </span>
                <span className="font-sans text-[13px] font-semibold text-ink">
                  Room {room}
                </span>
              </div>
              <StatusPill status={status} tone={tone} />
            </div>
          ))}
        </div>
      </div>

      {/* AI push notification */}
      <div className="px-5 pb-7">
        <div className="relative overflow-hidden rounded-3xl bg-wash bg-surface p-5 shadow-card-lg ring-1 ring-gold/30">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gold" />
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
              <Sparkles size={12} /> Meridian AI
            </span>
            <span className="font-sans text-[10px] font-semibold text-mist">now</span>
          </div>
          <p className="mt-2.5 font-sans text-[15px] font-semibold leading-snug text-ink">
            VIP arriving 25 min early — Suite 12 ready?
          </p>
          <div className="mt-4 flex gap-2.5">
            <span className="flex-1 rounded-xl bg-gold py-2.5 text-center font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-surface">
              Confirm ready
            </span>
            <span className="rounded-xl border border-hairline px-5 py-2.5 text-center font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
              View
            </span>
          </div>
        </div>
        {/* home indicator */}
        <div className="mx-auto mt-4 h-[5px] w-32 rounded-full bg-ink/15" />
      </div>
    </div>
  );
}

/** Tablet — front-desk guest recognition. Screen 500×370. */
function TabletScreen() {
  return (
    <div className="flex h-[370px] w-[500px] flex-col bg-paper">
      <div className="flex items-center justify-between bg-surface px-6 py-3 shadow-card">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-mist">
          Front Desk · Arrival
        </span>
        <span className="font-display text-[11px] tracking-[0.2em] text-ink">MERIDIAN</span>
      </div>
      <div className="flex flex-1 items-center gap-6 px-8">
        {/* VIP avatar — tight circle-crop (asset manifest: crop out garbled base) */}
        <span className="block h-[132px] w-[132px] shrink-0 overflow-hidden rounded-full shadow-card ring-2 ring-gold/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={A("/assets/images/avatar-vip.png")}
            alt="Isabelle Laurent"
            className="h-full w-full object-cover"
            style={{
              objectPosition: "50% 14%",
              transform: "scale(1.5)",
              transformOrigin: "50% 20%",
            }}
          />
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-display text-[26px] leading-none text-ink">
            Isabelle Laurent
          </div>
          <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-gold">
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            Minor DISCOVERY · Platinum
          </span>
          <p className="mt-2.5 font-serif text-[14px] italic leading-snug text-ink-soft">
            3rd stay · prefers corner suite · still water
          </p>
          <span className="mt-3.5 inline-block rounded-xl bg-gold px-7 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-surface">
            Begin check-in
          </span>
        </div>
      </div>
    </div>
  );
}

/** Desktop — miniature simplified GM dashboard. Screen 640×390. */
function DesktopScreen() {
  return (
    <div className="flex h-[390px] w-[640px] flex-col bg-paper">
      {/* mini app header */}
      <div className="flex items-center justify-between bg-surface px-5 py-2.5 shadow-card">
        <div className="flex items-center gap-5">
          <div className="flex flex-col gap-[2px]">
            <span className="font-display text-[10px] leading-none tracking-[0.2em] text-ink">
              MERIDIAN
            </span>
            <span className="h-[1.5px] w-full bg-gold" />
          </div>
          <div className="flex gap-3 font-sans text-[8px] font-semibold uppercase tracking-[0.14em]">
            <span className="text-ink">Dashboard</span>
            <span className="text-mist">Operations</span>
            <span className="text-mist">Guests</span>
            <span className="text-mist">Reports</span>
          </div>
        </div>
        <span className="block h-6 w-6 overflow-hidden rounded-full ring-1 ring-ink/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={A("/assets/images/avatar-gm.png")}
            alt="General manager"
            className="h-full w-full object-cover"
          />
        </span>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-2.5 px-5 pt-4">
        {MINI_KPIS.map(({ label, value, delta, hero }) => (
          <div
            key={label}
            className={`rounded-xl bg-surface px-3 py-2.5 shadow-card ring-1 ring-ink/[0.06] ${
              hero ? "bg-wash" : ""
            }`}
          >
            <div className="font-sans text-[7px] font-semibold uppercase tracking-[0.16em] text-mist">
              {label}
            </div>
            <div className="mt-1 flex items-end gap-1.5">
              <span
                className={`tnum font-display text-[19px] leading-none ${hero ? "text-gold" : "text-ink"}`}
              >
                {value}
              </span>
              <span className="tnum mb-[1px] font-sans text-[8px] font-bold text-success">
                {delta} ↑
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* content cards */}
      <div className="grid flex-1 grid-cols-2 gap-2.5 px-5 pt-2.5">
        <div className="rounded-xl bg-surface p-3 shadow-card ring-1 ring-ink/[0.06]">
          <div className="font-sans text-[7px] font-semibold uppercase tracking-[0.16em] text-mist">
            VIP Arrivals
          </div>
          <div className="mt-2 flex flex-col gap-1.5">
            {MINI_VIPS.map(({ name, meta }) => (
              <div key={name} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="flex-1 truncate font-sans text-[9px] font-semibold text-ink">
                  {name}
                </span>
                <span className="tnum font-sans text-[8px] text-mist">{meta}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-surface p-3 shadow-card ring-1 ring-ink/[0.06]">
          <div className="font-sans text-[7px] font-semibold uppercase tracking-[0.16em] text-mist">
            Today&rsquo;s Operations
          </div>
          <div className="mt-2 flex flex-col gap-1.5">
            {MINI_OPS.map(({ task, state, tone }) => (
              <div key={task} className="flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    tone === "done" ? "bg-success" : tone === "progress" ? "bg-cadet" : "bg-alert"
                  }`}
                />
                <span className="flex-1 truncate font-sans text-[9px] font-semibold text-ink">
                  {task}
                </span>
                <span className="font-sans text-[8px] text-mist">{state}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* portfolio strip */}
      <div className="flex gap-2.5 px-5 pb-4 pt-2.5">
        {MINI_PROPERTIES.map(({ src, name }) => (
          <div
            key={name}
            className="relative h-[46px] flex-1 overflow-hidden rounded-lg shadow-card ring-1 ring-ink/[0.06]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={A(src)} alt={name} className="h-full w-full object-cover" />
            <span className="absolute bottom-1 left-1.5 rounded bg-surface/85 px-1 py-[1px] font-sans text-[6.5px] font-bold uppercase tracking-[0.12em] text-ink">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ————————————————————————— composed scene ————————————————————————— */

export function DeviceTrioScene() {
  return (
    <div className="relative h-[1080px] w-[1920px] overflow-hidden bg-paper">
      {/* gold connecting thread behind the devices */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 z-0 h-full w-full"
        aria-hidden
      >
        <path
          d="M 60 620 C 300 470, 520 480, 830 460 S 1380 520, 1860 430"
          fill="none"
          stroke="#A08A4F"
          strokeWidth="2.5"
          opacity="0.55"
        />
        {/* nodes where the thread meets each device */}
        <circle cx="390" cy="497" r="6" fill="#A08A4F" opacity="0.5" />
        <circle cx="960" cy="463" r="6" fill="#A08A4F" opacity="0.5" />
        <circle cx="1480" cy="480" r="6" fill="#A08A4F" opacity="0.5" />
      </svg>

      {/* tablet — left, front desk */}
      <div className="absolute left-[104px] top-[300px] z-10">
        <DeviceFrame kind="tablet" tilt={-6}>
          <TabletScreen />
        </DeviceFrame>
      </div>

      {/* desktop — right, GM dashboard */}
      <div className="absolute right-[96px] top-[248px] z-10">
        <DeviceFrame kind="desktop" tilt={6}>
          <DesktopScreen />
        </DeviceFrame>
      </div>

      {/* phone — center hero */}
      <div className="absolute left-1/2 top-[56px] z-30 -translate-x-1/2">
        <DeviceFrame kind="phone">
          <PhoneScreen />
        </DeviceFrame>
      </div>

      {/* caption */}
      <div className="absolute bottom-[54px] left-1/2 z-20 -translate-x-1/2 text-center">
        <div className="eyebrow">— Meridian Mobile</div>
        <h2 className="headline-split mt-3 font-display text-[46px] leading-none tracking-tight text-ink">
          EVERY ROLE. <em>EVERY DEVICE.</em>
        </h2>
      </div>
    </div>
  );
}
