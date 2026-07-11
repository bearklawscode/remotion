/**
 * System logo chip — used for the "12 chaotic systems" in both chaos and calm states.
 * Opera PMS has no asset by design (asset manifest): pass `label` without `src`.
 *
 * `fit="tight"` (default) sizes the logo generously; `fit="contain"` caps width hard so
 * wide wordmarks (Oracle, Shiji, Mews) never overflow a narrow container (e.g. sidebar).
 */
import { A } from "../asset";

export function LogoChip({
  src,
  label,
  connected = false,
  size = "md",
  fit = "tight",
  className = "",
}: {
  src?: string;
  label: string;
  connected?: boolean;
  size?: "sm" | "md" | "lg";
  fit?: "tight" | "contain";
  className?: string;
}) {
  const box = { sm: "h-9 px-2.5 gap-2", md: "h-12 px-3.5 gap-2.5", lg: "h-16 px-5 gap-3" }[size];
  const img = { sm: "max-h-3.5", md: "max-h-5", lg: "max-h-7" }[size];
  const cap = fit === "contain" ? { sm: "max-w-[62px]", md: "max-w-[84px]", lg: "max-w-[120px]" }[size] : "max-w-[120px]";
  const text = { sm: "text-[10px]", md: "text-xs", lg: "text-sm" }[size];

  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl bg-surface shadow-card ring-1 ring-ink/[0.06] ${box} ${className}`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={A(src)} alt={label} className={`${img} ${cap} w-auto object-contain`} />
      ) : (
        <span className={`font-sans font-bold uppercase tracking-[0.1em] text-ink ${text}`}>
          {label}
        </span>
      )}
      {connected && (
        <span className="relative ml-auto flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
      )}
    </div>
  );
}
