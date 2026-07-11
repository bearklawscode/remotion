import { A } from "./asset";
import {
  Check,
  Hourglass,
  Sparkles,
  ArrowUp,
  ArrowUpRight,
} from "lucide-react";
import { MeridianWordmark } from "./ui/MeridianWordmark";

/**
 * MeridianAIChat — the AI Concierge chat surface, shared by both films.
 *
 * mode="insight" → Video 1, Scene 5 "Proof, in One Ask": GM asks for P&L +
 *   VIP arrivals; two answer cards assemble side by side.
 * mode="action"  → Video 2, Scene 3 "Ask It Anything. It Does It.": one
 *   command fans out across Jira, Teams and Guest Messaging.
 *
 * Static, light-mode only (paper / surface / ink / gold — brand-guide §1).
 * Designed as a ~1100px panel centered in a 1920×1080 frame.
 */

/* ————————————————————————— Data ————————————————————————— */

const HOTEL = "Anantara Riverside Bangkok";

const INSIGHT = {
  sender: "Sofia Chen · General Manager",
  time: "07:42",
  ask: "Show me last month's P&L and today's VIP arrivals.",
  intro: "Good morning, Sofia — here's both, live from your systems.",
  caption: "Answered in 1.8s · 2 systems queried",
};

/** Six months of Revenue (navy → gold for June) vs GOP (cadet), % heights. */
const PNL_BARS: { month: string; revenue: number; gop: number }[] = [
  { month: "Jan", revenue: 58, gop: 24 },
  { month: "Feb", revenue: 52, gop: 21 },
  { month: "Mar", revenue: 66, gop: 27 },
  { month: "Apr", revenue: 62, gop: 25 },
  { month: "May", revenue: 74, gop: 30 },
  { month: "Jun", revenue: 92, gop: 38 },
];

const PNL_ROWS: { label: string; value: string; delta?: string }[] = [
  { label: "Revenue", value: "€4.2M", delta: "+6.8%" },
  { label: "GOP", value: "€1.72M" },
  { label: "GOP Margin", value: "41%" },
];

const VIP_GUESTS: {
  name: string;
  avatar?: string;
  monogram?: string;
  tier: string;
  detail: string;
  prefs: string[];
}[] = [
  {
    name: "Isabelle Laurent",
    avatar: "/assets/images/avatar-vip.png",
    tier: "Minor DISCOVERY · Platinum",
    detail: "Royal Suite 1201 · ETA 14:30",
    prefs: ["Corner suite", "Still water", "Late checkout"],
  },
  {
    name: "Akira Tanaka",
    monogram: "AT",
    tier: "Minor DISCOVERY · Platinum",
    detail: "Garden Villa 7 · ETA 16:45",
    prefs: ["High floor", "Feather-free", "Airport pickup"],
  },
];

const ACTION = {
  sender: "Duty Manager · Front Office",
  time: "21:14",
  ask: "Guest in 203 reports AC not cooling — handle it.",
  intro: "On it — I've coordinated the response across three systems.",
  caption: "One ask. Three systems. Zero tabs.",
};

const ACTION_CARDS: {
  status: "done" | "pending";
  title: string;
  detail: string;
  chip: { label: string; src?: string };
  draft?: string;
}[] = [
  {
    status: "done",
    title: "Work order created",
    detail: "#ENG-2214 · High priority · Room 203",
    chip: { label: "Jira", src: "/assets/tech-stack/jira.svg" },
  },
  {
    status: "done",
    title: "Engineering notified",
    detail: "K. Anand on shift · ETA 8 min",
    chip: { label: "Teams", src: "/assets/tech-stack/teams.svg" },
  },
  {
    status: "pending",
    title: "Guest message drafted",
    detail: "Awaiting your approval",
    chip: { label: "Guest Messaging" },
    draft:
      "We're so sorry about the temperature in your room — our engineer is on the way and will be with you within ten minutes. Please enjoy a drink at the Riverside Lounge, on us, while we make it right.",
  },
];

/* ——————————————————————— Small pieces ——————————————————————— */

/** Tiny source-attribution chip (logo optional — Opera PMS is text-only by design). */
function SourceChip({ label, src }: { label: string; src?: string }) {
  return (
    <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-hairline bg-surface px-2.5">
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={A(src)} alt={label} className="h-3 w-auto max-w-[52px] object-contain" />
      )}
      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
        {label}
      </span>
    </span>
  );
}

/** Letterspaced small-caps label (card titles, section eyebrows). */
function CapsLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-mist">
      {children}
    </div>
  );
}

/** Row of source chips pinned to a card's bottom, hairline-topped. */
function SourceRow({ chips }: { chips: { label: string; src?: string }[] }) {
  return (
    <div className="mt-auto flex items-center gap-2 border-t border-hairline pt-3">
      <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-mist">
        Sources
      </span>
      {chips.map((c) => (
        <SourceChip key={c.label} {...c} />
      ))}
    </div>
  );
}

/* ————————————————————— Insight answer cards ————————————————————— */

function PnlCard() {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl bg-surface bg-wash p-5 shadow-card ring-1 ring-ink/[0.06]">
      {/* gold keyline — this is the hero answer card (June revenue) */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gold" />
      <CapsLabel>P&amp;L — June 2026</CapsLabel>

      {/* Mini grouped bar chart — pure CSS. Navy revenue, cadet GOP, gold = THE number (June revenue). */}
      <div className="mt-4 flex h-24 items-end gap-3 border-b border-hairline pb-0">
        {PNL_BARS.map((b, i) => {
          const isHero = i === PNL_BARS.length - 1;
          return (
            <div key={b.month} className="flex h-full flex-1 items-end justify-center gap-1">
              <div
                className={`w-3.5 rounded-t-sm ${isHero ? "bg-gold" : "bg-ink"}`}
                style={{ height: `${b.revenue}%` }}
              />
              <div
                className="w-3.5 rounded-t-sm bg-cadet"
                style={{ height: `${b.gop}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-1.5 flex gap-3">
        {PNL_BARS.map((b, i) => (
          <div
            key={b.month}
            className={`flex-1 text-center font-sans text-[9px] font-semibold uppercase tracking-[0.14em] ${
              i === PNL_BARS.length - 1 ? "text-gold" : "text-mist"
            }`}
          >
            {b.month}
          </div>
        ))}
      </div>

      {/* Figures */}
      <div className="mt-4 space-y-2.5">
        {PNL_ROWS.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              {row.label}
            </span>
            <span className="flex items-center gap-2">
              <span className="tnum font-display text-lg leading-none text-ink">{row.value}</span>
              {row.delta && (
                <span className="inline-flex items-center gap-0.5 rounded-full bg-success/10 px-1.5 py-0.5 font-sans text-[10px] font-bold tabular-nums text-success">
                  <ArrowUpRight size={10} strokeWidth={3} />
                  {row.delta}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="h-4" />
      <SourceRow
        chips={[
          { label: "Oracle Fusion", src: "/assets/tech-stack/oracle.svg" },
          { label: "SAP", src: "/assets/tech-stack/sap.svg" },
        ]}
      />
    </div>
  );
}

function VipCard() {
  return (
    <div className="flex flex-col rounded-2xl bg-surface p-5 shadow-card ring-1 ring-ink/[0.06]">
      <CapsLabel>VIP Arrivals — Today</CapsLabel>

      <div className="mt-4 space-y-4">
        {VIP_GUESTS.map((g, i) => (
          <div
            key={g.name}
            className={`flex items-start gap-3.5 ${i > 0 ? "border-t border-hairline pt-4" : ""}`}
          >
            {/* Avatar — tight circle crop (hides garbled bottom edge of the AI portrait) */}
            {g.avatar ? (
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-ink/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={A(g.avatar)}
                  alt={g.name}
                  className="absolute inset-0 h-full w-full scale-125 object-cover object-[50%_28%]"
                />
              </span>
            ) : (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cadet/25 font-display text-sm text-ink ring-1 ring-ink/10">
                {g.monogram}
              </span>
            )}

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-sans text-[15px] font-bold text-ink">{g.name}</span>
                <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-gold">
                  {g.tier}
                </span>
              </div>
              <div className="mt-1 font-sans text-xs font-medium tabular-nums text-ink-soft">{g.detail}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {g.prefs.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-hairline bg-paper px-2 py-0.5 font-sans text-[10px] font-medium text-ink-soft"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-4" />
      <SourceRow
        chips={[
          { label: "Opera PMS" }, // no asset by design — text chip per asset manifest
          { label: "Minor DISCOVERY", src: "/assets/brand/minor-discovery-navy.png" },
        ]}
      />
    </div>
  );
}

/* ————————————————————— Action stream cards ————————————————————— */

function ActionCard({ card }: { card: (typeof ACTION_CARDS)[number] }) {
  const done = card.status === "done";
  return (
    <div className="rounded-2xl bg-surface p-5 shadow-card ring-1 ring-ink/[0.06]">
      <div className="flex items-start gap-4">
        {/* Status icon */}
        <span
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            done ? "bg-success/10 text-success" : "bg-gold/10 text-gold"
          }`}
        >
          {done ? <Check size={17} strokeWidth={3} /> : <Hourglass size={15} strokeWidth={2.5} />}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <span className="font-sans text-[15px] font-bold text-ink">{card.title}</span>
            <SourceChip {...card.chip} />
          </div>
          <div className="mt-0.5 font-sans text-[13px] font-medium tabular-nums text-ink-soft">
            {card.detail}
          </div>

          {card.draft && (
            <>
              <blockquote className="mt-3 rounded-r-xl border-l-2 border-gold/50 bg-paper/80 px-4 py-3 font-serif text-[15px] italic leading-relaxed text-ink-soft">
                &ldquo;{card.draft}&rdquo;
              </blockquote>
              <div className="mt-3.5 flex items-center gap-2.5">
                <span className="inline-flex h-9 items-center rounded-full bg-gold px-5 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-card">
                  Approve &amp; send
                </span>
                <span className="inline-flex h-9 items-center rounded-full border border-hairline bg-surface px-5 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft">
                  Edit
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ————————————————————— Shared chrome pieces ————————————————————— */

function UserBubble({ sender, time, text }: { sender: string; time: string; text: string }) {
  return (
    <div className="flex flex-col items-end">
      <div className="mb-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] tabular-nums text-mist">
        {sender} · {time}
      </div>
      <div className="max-w-[560px] rounded-2xl rounded-br-md bg-ink px-5 py-3.5 font-sans text-[15px] font-medium leading-relaxed text-surface shadow-card">
        {text}
      </div>
    </div>
  );
}

function AiHeader() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/10">
        <Sparkles size={13} className="text-gold" />
      </span>
      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-mist">
        Meridian AI
      </span>
    </div>
  );
}

function Caption({ text }: { text: string }) {
  return (
    <div className="pl-10 font-sans text-[11px] font-medium tracking-[0.04em] tabular-nums text-mist">
      {text}
    </div>
  );
}

/* ————————————————————————— Component ————————————————————————— */

export function MeridianAIChat({
  mode,
  className = "",
}: {
  mode: "insight" | "action";
  className?: string;
}) {
  const thread = mode === "insight" ? INSIGHT : ACTION;

  return (
    <div
      className={`flex w-[1100px] flex-col overflow-hidden rounded-3xl bg-surface shadow-pop ring-1 ring-ink/[0.06] ${className}`}
    >
      {/* ——— Header ——— */}
      <header className="flex h-[68px] items-center justify-between border-b border-hairline bg-surface px-8">
        <div className="flex items-center gap-5">
          <MeridianWordmark size="sm" />
          <span className="h-6 w-px bg-ink/10" />
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
            AI Concierge <span className="mx-1 text-mist">·</span> {HOTEL}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-success">
            All systems connected
          </span>
        </div>
      </header>

      {/* ——— Thread ——— */}
      <div className="flex flex-col gap-6 bg-paper/60 px-10 py-8">
        <UserBubble sender={thread.sender} time={thread.time} text={thread.ask} />

        {/* AI reply */}
        <div className="flex flex-col gap-3.5">
          <AiHeader />
          <p className="pl-10 font-serif text-[17px] italic leading-relaxed text-ink">
            {thread.intro}
          </p>

          {mode === "insight" ? (
            <div className="grid grid-cols-2 gap-5 pl-10">
              <PnlCard />
              <VipCard />
            </div>
          ) : (
            <div className="flex max-w-[720px] flex-col gap-3.5 pl-10">
              {ACTION_CARDS.map((card) => (
                <ActionCard key={card.title} card={card} />
              ))}
            </div>
          )}

          <Caption text={thread.caption} />
        </div>
      </div>

      {/* ——— Input bar ——— */}
      <div className="border-t border-hairline bg-surface px-8 py-5">
        <div className="flex h-[52px] items-center gap-3.5 rounded-full border border-hairline bg-paper/70 pl-5 pr-2 shadow-card">
          <Sparkles size={17} className="shrink-0 text-gold" />
          <span className="flex-1 font-sans text-[15px] font-medium text-mist">
            Ask Meridian…
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold shadow-card">
            <ArrowUp size={17} strokeWidth={2.5} className="text-white" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default MeridianAIChat;
