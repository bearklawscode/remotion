/**
 * Meridian wordmark — typographic by design (no logo asset exists; brand-guide §3).
 * Navy condensed caps with a gold meridian line drawn through, optional byline.
 */
export function MeridianWordmark({
  size = "md",
  byline = false,
  className = "",
}: {
  size?: "sm" | "md" | "lg" | "hero";
  byline?: boolean;
  className?: string;
}) {
  const scale = {
    sm: { word: "text-xl", track: "tracking-[0.18em]", line: "h-[2px]", gap: "gap-1" },
    md: { word: "text-3xl", track: "tracking-[0.2em]", line: "h-[2px]", gap: "gap-1.5" },
    lg: { word: "text-6xl", track: "tracking-[0.22em]", line: "h-[3px]", gap: "gap-2.5" },
    hero: { word: "text-8xl", track: "tracking-[0.24em]", line: "h-1", gap: "gap-4" },
  }[size];

  return (
    <div className={`inline-flex flex-col items-center ${scale.gap} ${className}`}>
      <span className={`font-display text-ink ${scale.word} ${scale.track} leading-none`}>
        MERIDIAN
      </span>
      <div className="flex w-full items-center gap-2">
        <div className={`flex-1 ${scale.line} bg-gold`} />
        <div className={`${scale.line} aspect-square rotate-45 bg-gold`} style={{ height: undefined }} />
        <div className={`flex-1 ${scale.line} bg-gold`} />
      </div>
      {byline && (
        <span className="font-sans text-[0.6em] font-semibold uppercase tracking-[0.3em] text-ink-soft">
          by Minor Hotels
        </span>
      )}
    </div>
  );
}
