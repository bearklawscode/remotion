/**
 * Dual-series trend chart — gold revenue area + navy occupancy line.
 * Pure SVG, deterministic, no deps (Remotion-portable). Subtle gridlines,
 * direct axis labels, end-point markers (ui-polish-guide §3).
 */
export function TrendChart({
  labels,
  revenue,
  occupancy,
  width = 620,
  height = 250,
  className = "",
}: {
  labels: string[];
  revenue: number[]; // primary, gold area
  occupancy: number[]; // secondary %, navy line (0–100)
  width?: number;
  height?: number;
  className?: string;
}) {
  const padX = 14;
  const padTop = 16;
  const padBottom = 30;
  const plotH = height - padTop - padBottom;
  const rMax = Math.max(...revenue) * 1.12;
  const rMin = Math.min(...revenue) * 0.82;
  const stepX = (width - padX * 2) / (labels.length - 1);

  const xy = (arr: number[], min: number, max: number) =>
    arr.map((v, i) => {
      const x = padX + i * stepX;
      const y = padTop + plotH * (1 - (v - min) / (max - min || 1));
      return [x, y] as const;
    });

  const rev = xy(revenue, rMin, rMax);
  const occ = xy(occupancy, 40, 100);
  const revLine = rev.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const revArea = `${revLine} L${rev[rev.length - 1][0].toFixed(1)} ${padTop + plotH} L${rev[0][0].toFixed(1)} ${padTop + plotH} Z`;
  const occLine = occ.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const gridYs = [0, 0.25, 0.5, 0.75, 1].map((t) => padTop + plotH * t);

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className={className}>
      <defs>
        <linearGradient id="revfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A08A4F" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#A08A4F" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* gridlines */}
      {gridYs.map((y, i) => (
        <line key={i} x1={padX} y1={y} x2={width - padX} y2={y} stroke="#13213C" strokeOpacity={0.06} strokeWidth={1} />
      ))}
      {/* revenue area + line */}
      <path d={revArea} fill="url(#revfill)" />
      <path d={revLine} fill="none" stroke="#A08A4F" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* occupancy line (dashed so it's distinguishable without color — a11y) */}
      <path d={occLine} fill="none" stroke="#13213C" strokeWidth={2} strokeDasharray="1 5" strokeLinecap="round" />
      {/* end markers */}
      {[rev[rev.length - 1]].map(([x, y], i) => (
        <g key={`r${i}`}>
          <circle cx={x} cy={y} r={7} fill="#A08A4F" opacity={0.16} />
          <circle cx={x} cy={y} r={3.5} fill="#A08A4F" />
        </g>
      ))}
      {[occ[occ.length - 1]].map(([x, y], i) => (
        <circle key={`o${i}`} cx={x} cy={y} r={3} fill="#13213C" />
      ))}
      {/* x labels */}
      {labels.map((l, i) => (
        <text
          key={l}
          x={padX + i * stepX}
          y={height - 9}
          textAnchor="middle"
          className="font-sans"
          fontSize={10.5}
          fontWeight={600}
          letterSpacing={1}
          fill="#A4A2AC"
        >
          {l}
        </text>
      ))}
    </svg>
  );
}
