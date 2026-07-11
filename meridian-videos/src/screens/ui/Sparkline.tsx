/** Tiny inline trend chart — SVG area+line. Deterministic, no deps.
 *  Used in KPI cards so a number carries its trend (ui-polish-guide §2). */
export function Sparkline({
  data,
  stroke = "#13213C",
  fill = "rgba(19,33,60,0.08)",
  width = 132,
  height = 40,
  className = "",
}: {
  data: number[];
  stroke?: string;
  fill?: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pad = 3;
  const stepX = (width - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => {
    const x = pad + i * stepX;
    const y = pad + (height - pad * 2) * (1 - (v - min) / span);
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${height} L${pts[0][0].toFixed(1)} ${height} Z`;
  const [lx, ly] = pts[pts.length - 1];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} preserveAspectRatio="none">
      <path d={area} fill={fill} />
      <path d={line} fill="none" stroke={stroke} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r={2.6} fill={stroke} />
      <circle cx={lx} cy={ly} r={5} fill={stroke} opacity={0.18} />
    </svg>
  );
}
