import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Sparkline } from "./Sparkline";

/**
 * KPI stat card — big-number + trend (ui-polish-guide §2).
 * Carries a sparkline, tabular-figure value, delta pill and a "vs" caption so it
 * never reads as a bare wireframe. Gold reserved for THE hero number per view.
 */
export function StatCard({
  label,
  value,
  delta,
  deltaUp = true,
  hero = false,
  trend,
  vs = "vs last month",
  className = "",
}: {
  label: string;
  value: string;
  delta?: string;
  deltaUp?: boolean;
  hero?: boolean;
  trend?: number[];
  vs?: string;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-surface p-5 shadow-card ring-1 ring-ink/[0.06] ${
        hero ? "bg-wash" : ""
      } ${className}`}
    >
      {hero && <div className="absolute inset-x-0 top-0 h-0.5 bg-gold" />}
      <div className="flex items-start justify-between">
        <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-mist">
          {label}
        </div>
        {delta && (
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-sans text-[11px] font-semibold tabular-nums ${
              deltaUp ? "bg-success/10 text-success" : "bg-alert/10 text-alert"
            }`}
          >
            {deltaUp ? <ArrowUpRight size={12} strokeWidth={2.5} /> : <ArrowDownRight size={12} strokeWidth={2.5} />}
            {delta}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <div>
          <span
            className={`tnum font-display leading-none ${hero ? "text-[2.75rem] text-gold" : "text-[2.5rem] text-ink"}`}
          >
            {value}
          </span>
          <div className="mt-1.5 font-sans text-[10.5px] uppercase tracking-[0.12em] text-mist">
            {vs}
          </div>
        </div>
        {trend && (
          <Sparkline
            data={trend}
            stroke={hero ? "#A08A4F" : "#13213C"}
            fill={hero ? "rgba(160,138,79,0.12)" : "rgba(19,33,60,0.07)"}
            className="mb-1 shrink-0 opacity-90"
          />
        )}
      </div>
    </div>
  );
}
