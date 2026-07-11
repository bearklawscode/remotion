import { A } from "./asset";
import {
  BarChart3,
  BedDouble,
  Bell,
  Building2,
  CalendarCheck,
  ChevronDown,
  ClipboardCheck,
  Clock,
  ConciergeBell,
  LayoutDashboard,
  MessageSquare,
  Receipt,
  Sparkles,
  TrendingUp,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { MeridianWordmark } from "./ui/MeridianWordmark";
import { LogoChip } from "./ui/LogoChip";
import { StatCard } from "./ui/StatCard";
import { TrendChart } from "./ui/TrendChart";

/* ============================================================================
 * DATA — edit here to retheme. Asset paths per docs/04-asset-manifest.md.
 * Design craft per docs/02-brand/ui-polish-guide.md (density, depth, data-viz).
 * ==========================================================================*/

const NAV_SECTIONS: { heading: string; items: { label: string; icon: LucideIcon; active?: boolean; badge?: string }[] }[] = [
  {
    heading: "Operate",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, active: true },
      { label: "Reservations", icon: CalendarCheck, badge: "24" },
      { label: "Front Desk", icon: ConciergeBell },
      { label: "Housekeeping", icon: BedDouble, badge: "12" },
      { label: "Maintenance", icon: Wrench, badge: "7" },
    ],
  },
  {
    heading: "Manage",
    items: [
      { label: "Billing", icon: Receipt },
      { label: "Reports", icon: BarChart3 },
    ],
  },
];

// The canonical 12 systems (Video 1's chaos, domesticated). Opera PMS = text chip.
const CONNECTED_SYSTEMS: { label: string; src?: string }[] = [
  { label: "Oracle", src: "/assets/tech-stack/oracle.svg" },
  { label: "SAP", src: "/assets/tech-stack/sap.svg" },
  { label: "Salesforce", src: "/assets/tech-stack/salesforce.svg" },
  { label: "Jira", src: "/assets/tech-stack/jira.svg" },
  { label: "SharePoint", src: "/assets/tech-stack/sharepoint.svg" },
  { label: "Teams", src: "/assets/tech-stack/teams.svg" },
  { label: "Mews", src: "/assets/tech-stack/mews.svg" },
  { label: "Shiji", src: "/assets/tech-stack/shiji.svg" },
  { label: "Hub OS", src: "/assets/tech-stack/hubos-icon.png" },
  { label: "MessageBox", src: "/assets/tech-stack/messagebox.png" },
  { label: "Okami", src: "/assets/tech-stack/okami.png" },
  { label: "Opera PMS" }, // no asset by design — text-only chip
];

const KPIS: {
  label: string;
  value: string;
  delta: string;
  deltaUp?: boolean;
  hero?: boolean;
  trend: number[];
  vs?: string;
}[] = [
  { label: "RevPAR", value: "€142", delta: "+8.2%", hero: true, trend: [118, 121, 119, 128, 132, 136, 142], vs: "vs €131 last month" },
  { label: "Occupancy", value: "87%", delta: "+3.1%", trend: [79, 81, 80, 83, 84, 86, 87], vs: "vs 84% last month" },
  { label: "ADR", value: "€163", delta: "+2.4%", trend: [154, 156, 155, 158, 160, 161, 163], vs: "vs €159 last month" },
  { label: "GOP Margin", value: "41%", delta: "+1.8%", trend: [37, 38, 38, 39, 40, 40, 41], vs: "vs 39% last month" },
];

const PERF = {
  labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
  revenue: [128, 141, 119, 133, 147, 152, 168], // €K/day
  occupancy: [82, 88, 76, 81, 89, 91, 94], // %
  revenueTotal: "€988K",
  revenueDelta: "+11.4%",
  tiles: [
    { label: "Direct bookings", value: "62%", sub: "+5 pts" },
    { label: "Avg. length of stay", value: "2.4", sub: "nights" },
    { label: "Forecast accuracy", value: "96%", sub: "7-day" },
  ],
};

type VipArrival = {
  name: string;
  avatar?: string; // circle-cropped tight (asset has garbled text at bottom)
  initials?: string;
  tier: "PLATINUM" | "GOLD";
  suite: string;
  eta: string;
  prefs: string[];
  note: string;
};

const VIP_ARRIVALS: VipArrival[] = [
  {
    name: "Isabelle Laurent",
    avatar: "/assets/images/avatar-vip.png",
    tier: "PLATINUM",
    suite: "Royal Suite 1201",
    eta: "14:30",
    prefs: ["Corner suite", "Still water"],
    note: "12th stay · anniversary",
  },
  {
    name: "Kenji Watanabe",
    initials: "KW",
    tier: "GOLD",
    suite: "Deluxe River 1108",
    eta: "16:05",
    prefs: ["High floor", "Feather-free"],
    note: "Late checkout requested",
  },
  {
    name: "Amara Okafor",
    initials: "AO",
    tier: "PLATINUM",
    suite: "Terrace Suite 902",
    eta: "18:40",
    prefs: ["Airport transfer", "Spa"],
    note: "Arriving from LHR · BA009",
  },
  {
    name: "Dmitri Volkov",
    initials: "DV",
    tier: "GOLD",
    suite: "Riverwing 1404",
    eta: "20:15",
    prefs: ["Quiet floor", "Sparkling"],
    note: "Business · 2-night stay",
  },
];

type OpsRow = {
  icon: LucideIcon;
  title: string;
  sub: string;
  time: string;
  pill: string;
  tone: "success" | "alert" | "cadet";
};

const OPERATIONS: OpsRow[] = [
  { icon: Wrench, title: "AC repair · Suite 203", sub: "#ENG-2214 · N. Prasert · ETA 8 min", time: "2m", pill: "High", tone: "alert" },
  { icon: BedDouble, title: "Housekeeping · Floor 12", sub: "8 in progress · 4 before 15:00", time: "9m", pill: "On track", tone: "success" },
  { icon: MessageSquare, title: "Pre-arrival requests", sub: "3 awaiting reply · 2 in-stay", time: "14m", pill: "Reply < 1h", tone: "cadet" },
  { icon: ConciergeBell, title: "Late checkout · 1108", sub: "Approved by front office", time: "22m", pill: "Done", tone: "success" },
];

const PILL_TONES: Record<OpsRow["tone"], string> = {
  success: "bg-success/10 text-success",
  alert: "bg-alert/10 text-alert",
  cadet: "bg-cadet/30 text-ink-soft",
};

const PORTFOLIO: { name: string; photo: string; brandLogo: string; brandAlt: string; occupancy: number; revpar: string }[] = [
  { name: "Avani Museum Quarter", photo: "/assets/images/property-avani-amsterdam.jpg", brandLogo: "/assets/hotels/avani.png", brandAlt: "Avani", occupancy: 91, revpar: "€128" },
  { name: "Anantara Ubud Bali", photo: "/assets/images/property-anantara-ubud.jpg", brandLogo: "/assets/hotels/anantara.png", brandAlt: "Anantara", occupancy: 84, revpar: "€214" },
  { name: "Anantara Palais Hansen", photo: "/assets/images/property-anantara-vienna.jpg", brandLogo: "/assets/hotels/anantara.png", brandAlt: "Anantara", occupancy: 88, revpar: "€312" },
];

const HEADER = {
  property: "Anantara Riverside Bangkok",
  date: "Friday, 11 July 2026",
  gmName: "Sofia Chen",
  gmRole: "General Manager",
  gmAvatar: "/assets/images/avatar-gm.png",
  searchPlaceholder: "Ask Meridian anything…",
};

const FRANCHISE_ALERT = { eyebrow: "Franchise", title: "Avani+ Khao Lak", sub: "Brand-standards review due", chipA: "Portal First", chipB: "Due 18 Jul" };

/* ============================================================================
 * SMALL PIECES
 * ==========================================================================*/

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-mist">{children}</div>
  );
}

function TierChip({ tier }: { tier: VipArrival["tier"] }) {
  return (
    <span
      className={`rounded-full px-2 py-[3px] font-sans text-[9px] font-bold uppercase tracking-[0.14em] ${
        tier === "PLATINUM" ? "bg-gold text-surface" : "bg-gold/15 text-gold"
      }`}
    >
      {tier}
    </span>
  );
}

/* ============================================================================
 * LAYOUT REGIONS
 * ==========================================================================*/

function Sidebar() {
  return (
    <aside className="flex w-[248px] shrink-0 flex-col border-r border-hairline bg-surface px-4 py-6">
      <div className="px-2">
        <MeridianWordmark size="sm" />
      </div>

      <nav className="mt-8 flex flex-col gap-6">
        {NAV_SECTIONS.map((section) => (
          <div key={section.heading}>
            <div className="px-3 pb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-mist/70">
              {section.heading}
            </div>
            <div className="flex flex-col gap-0.5">
              {section.items.map(({ label, icon: Icon, active, badge }) => (
                <div
                  key={label}
                  className={`relative flex h-9 items-center gap-3 rounded-lg px-3 font-sans text-[13.5px] ${
                    active ? "bg-gold/[0.09] font-semibold text-ink" : "font-medium text-ink-soft"
                  }`}
                >
                  {active && <span className="absolute -left-[3px] top-2 bottom-2 w-[3px] rounded-full bg-gold" />}
                  <Icon size={16} className={active ? "text-gold" : "text-mist"} strokeWidth={2} />
                  {label}
                  {badge && (
                    <span className="ml-auto rounded-md bg-ink/[0.05] px-1.5 py-0.5 font-sans text-[10px] font-bold tabular-nums text-ink-soft">
                      {badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Connected systems — the quiet answer to Video 1's chaos */}
      <div className="mt-auto">
        <div className="mb-3 flex items-center justify-between px-1">
          <SectionLabel>Connected</SectionLabel>
          <span className="inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold text-success">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-none rounded-full bg-success opacity-40" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            12 live
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {CONNECTED_SYSTEMS.map(({ label, src }) => (
            <div
              key={label}
              className="flex h-9 items-center justify-center rounded-lg bg-paper ring-1 ring-ink/[0.05]"
              title={label}
            >
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={A(src)} alt={label} className="max-h-3.5 max-w-[46px] w-auto object-contain" />
              ) : (
                <span className="px-1 text-center font-sans text-[8px] font-bold uppercase leading-tight tracking-[0.06em] text-ink-soft">
                  Opera
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header className="flex h-[72px] shrink-0 items-center gap-6 border-b border-hairline bg-surface px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink/[0.04]">
          <Building2 size={16} className="text-ink-soft" />
        </div>
        <div>
          <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-mist">Property</div>
          <div className="flex items-center gap-1.5 font-sans text-sm font-semibold text-ink">
            {HEADER.property}
            <ChevronDown size={14} className="text-mist" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 justify-center">
        <div className="flex h-11 w-[520px] items-center gap-3 rounded-full bg-paper px-5 shadow-card ring-1 ring-ink/[0.06]">
          <Sparkles size={16} className="text-gold" />
          <span className="font-sans text-sm text-mist">{HEADER.searchPlaceholder}</span>
          <span className="ml-auto rounded-md bg-surface px-1.5 py-0.5 font-sans text-[10px] font-semibold text-mist ring-1 ring-ink/[0.06]">
            ⌘K
          </span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <Bell size={18} className="text-ink-soft" strokeWidth={2} />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-alert ring-2 ring-surface" />
        </div>
        <span className="hidden font-sans text-sm text-ink-soft xl:block">{HEADER.date}</span>
        <span className="h-6 w-px bg-ink/10" />
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={A(HEADER.gmAvatar)} alt={HEADER.gmName} className="h-9 w-9 rounded-full object-cover ring-2 ring-gold/30" />
          <div>
            <div className="font-sans text-sm font-semibold leading-tight text-ink">{HEADER.gmName}</div>
            <div className="font-sans text-[11px] leading-tight text-mist">{HEADER.gmRole}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function PerformanceCard() {
  return (
    <section className="col-span-5 flex flex-col rounded-2xl bg-surface p-6 shadow-card ring-1 ring-ink/[0.06]">
      <div className="flex items-start justify-between">
        <div>
          <SectionLabel>Revenue &amp; Occupancy</SectionLabel>
          <div className="mt-1 font-sans text-xs text-mist">Last 7 days · live</div>
        </div>
        <div className="text-right">
          <div className="tnum font-display text-3xl leading-none text-ink">{PERF.revenueTotal}</div>
          <div className="mt-1 inline-flex items-center gap-1 font-sans text-xs font-semibold text-success">
            <TrendingUp size={13} strokeWidth={2.5} />
            {PERF.revenueDelta}
          </div>
        </div>
      </div>
      {/* legend */}
      <div className="mt-3 flex items-center gap-5">
        <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-medium text-ink-soft">
          <span className="h-2 w-2 rounded-full bg-gold" /> Revenue
        </span>
        <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-medium text-ink-soft">
          <span className="h-[3px] w-4 rounded-full bg-ink" /> Occupancy
        </span>
      </div>
      <div className="mt-2 flex flex-1 items-center">
        <TrendChart labels={PERF.labels} revenue={PERF.revenue} occupancy={PERF.occupancy} height={250} className="w-full" />
      </div>
      {/* mini-stat tiles fill height with useful density */}
      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-hairline pt-4">
        {PERF.tiles.map((t) => (
          <div key={t.label} className="rounded-xl bg-paper px-3.5 py-3 ring-1 ring-ink/[0.05]">
            <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-mist">{t.label}</div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="tnum font-display text-2xl leading-none text-ink">{t.value}</span>
              <span className="font-sans text-[11px] font-medium text-mist">{t.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function VipArrivalsCard() {
  return (
    <section className="col-span-4 flex flex-col rounded-2xl bg-surface shadow-card ring-1 ring-ink/[0.06]">
      <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
        <SectionLabel>VIP Arrivals — Today</SectionLabel>
        <span className="font-sans text-xs font-medium text-mist tabular-nums">3 of 14</span>
      </div>
      <div className="flex flex-1 flex-col divide-y divide-ink/[0.06] px-5">
        {VIP_ARRIVALS.map((vip) => (
          <div key={vip.name} className="flex items-center gap-3.5 py-[13px]">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-ink/10">
              {vip.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={A(vip.avatar)} alt={vip.name} className="h-full w-full scale-[1.18] object-cover object-[50%_18%]" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-cadet/30 font-sans text-sm font-bold text-ink">
                  {vip.initials}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate font-sans text-[14px] font-semibold text-ink">{vip.name}</span>
                <TierChip tier={vip.tier} />
              </div>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {vip.prefs.map((pref) => (
                  <span key={pref} className="rounded-full bg-paper px-2 py-[2px] font-sans text-[10px] font-medium text-ink-soft ring-1 ring-ink/[0.06]">
                    {pref}
                  </span>
                ))}
              </div>
              <div className="mt-1 font-serif text-[11px] italic text-mist">{vip.note}</div>
            </div>
            <div className="shrink-0 text-right">
              <div className="font-sans text-[13px] font-semibold text-ink">{vip.suite}</div>
              <div className="mt-1 inline-flex items-center gap-1 font-sans text-xs text-mist tabular-nums">
                <Clock size={11} />
                {vip.eta}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-hairline px-5 py-3.5">
        <span className="font-sans text-xs font-medium text-ink-soft">+11 more arrivals today</span>
        <span className="font-sans text-xs font-semibold text-gold">View all →</span>
      </div>
    </section>
  );
}

function OperationsCard() {
  return (
    <section className="col-span-3 flex flex-col rounded-2xl bg-surface shadow-card ring-1 ring-ink/[0.06]">
      <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
        <SectionLabel>Live Operations</SectionLabel>
        <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> Live
        </span>
      </div>
      <div className="flex flex-1 flex-col divide-y divide-ink/[0.06] px-5">
        {OPERATIONS.map(({ icon: Icon, title, sub, time, pill, tone }) => (
          <div key={title} className="flex items-center gap-3 py-[13px]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/[0.04]">
              <Icon size={15} className="text-ink-soft" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-sans text-[13px] font-semibold text-ink">{title}</div>
              <div className="mt-0.5 truncate font-sans text-[11px] text-mist">{sub}</div>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className={`rounded-full px-2 py-[3px] font-sans text-[10px] font-semibold ${PILL_TONES[tone]}`}>{pill}</span>
              <span className="font-sans text-[10px] text-mist tabular-nums">{time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-hairline px-5 py-3.5">
        <span className="font-sans text-xs font-medium text-ink-soft">24 open tasks</span>
        <span className="font-sans text-xs font-semibold text-gold">Open board →</span>
      </div>
    </section>
  );
}

function PortfolioPulse() {
  return (
    <section className="shrink-0">
      <div className="mb-3 flex items-baseline justify-between">
        <SectionLabel>Portfolio Pulse</SectionLabel>
        <span className="font-sans text-xs font-medium text-mist">590+ properties · 63 countries · live</span>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {PORTFOLIO.map(({ name, photo, brandLogo, brandAlt, occupancy, revpar }) => (
          <div key={name} className="group flex overflow-hidden rounded-2xl bg-surface shadow-card ring-1 ring-ink/[0.06]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={A(photo)} alt={name} className="h-full w-24 shrink-0 object-cover" />
            <div className="flex min-w-0 flex-1 flex-col justify-between p-3.5">
              <div className="flex items-start justify-between gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={A(brandLogo)} alt={brandAlt} className="h-3.5 w-auto max-w-[74px] object-contain" />
                <span className="tnum font-display text-xl leading-none text-ink">{occupancy}%</span>
              </div>
              <div>
                <div className="truncate font-sans text-[12px] font-semibold text-ink">{name}</div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-ink/5">
                  <div className="h-full rounded-full bg-cadet" style={{ width: `${occupancy}%` }} />
                </div>
                <div className="mt-1.5 flex items-center justify-between font-sans text-[10px] text-mist">
                  <span className="uppercase tracking-[0.14em]">Occupancy</span>
                  <span className="tabular-nums">RevPAR {revpar}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Gentle franchise alert — gold accent, never alarming */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-wash p-4 shadow-card ring-1 ring-gold/25">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gold" />
          <div>
            <div className="flex items-center gap-2">
              <ClipboardCheck size={14} className="text-gold" />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">— {FRANCHISE_ALERT.eyebrow}</span>
            </div>
            <div className="mt-2 font-sans text-[15px] font-semibold text-ink">{FRANCHISE_ALERT.title}</div>
            <div className="mt-0.5 font-serif text-[13px] italic text-ink-soft">{FRANCHISE_ALERT.sub}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gold/10 px-2 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-gold">{FRANCHISE_ALERT.chipA}</span>
            <span className="font-sans text-xs font-medium text-mist">{FRANCHISE_ALERT.chipB}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
 * MERIDIAN DASHBOARD — the GM command center, designed at exactly 1920×1080.
 * Static by design (no client state); filmed full-frame for Video 2, Scene 2.
 * ==========================================================================*/

export function MeridianDashboard() {
  return (
    <div className="flex h-[1080px] w-[1920px] overflow-hidden bg-paper font-sans text-ink">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex min-h-0 flex-1 flex-col gap-5 px-8 pb-7 pt-6">
          {/* KPI row — each card carries a sparkline trend */}
          <div className="grid shrink-0 grid-cols-4 gap-5">
            {KPIS.map((kpi) => (
              <StatCard key={kpi.label} {...kpi} />
            ))}
          </div>

          {/* Main analytics row: performance chart + VIP arrivals + live ops */}
          <div className="grid min-h-0 flex-1 grid-cols-12 gap-5">
            <PerformanceCard />
            <VipArrivalsCard />
            <OperationsCard />
          </div>

          <PortfolioPulse />
        </main>
      </div>
    </div>
  );
}

export default MeridianDashboard;
