import { cssVar, stroke } from "@forzez/tokens";

type ForceArrowProps = {
  /** Tail and tip in SVG coordinates (y down). */
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** Colour role, e.g. "force-1", "resultant", "tension". */
  role: string;
  /** Colour role for the label; defaults to `role` (use "force-3-text" for the yellow force). */
  labelRole?: string;
  label?: string;
  width?: number;
  dashed?: boolean;
  opacity?: number;
  /** Max arrowhead length; the head shrinks on short arrows. */
  head?: number;
  labelSize?: number;
};

/** A force arrow: line + filled triangular head, label just beyond the tip. */
export function ForceArrow({
  x1, y1, x2, y2, role, labelRole, label, width = Number(stroke["stroke-force"]), dashed, opacity = 1, head, labelSize = 10.5,
}: ForceArrowProps) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
  if (opacity < 0.01 || L < 0.8) return null;
  const ux = dx / L, uy = dy / L;
  const h = Math.min(head ?? 4 + width * 2.6, L * 0.45), w = h * 0.5;
  const bx = x2 - ux * h, by = y2 - uy * h;
  // label beyond the tip, nudged sideways (perpendicular, counter-clockwise on screen)
  const lx = x2 + ux * 8 + uy * 9, ly = y2 + uy * 8 - ux * 9;
  const color = cssVar(role);
  return (
    <g opacity={opacity}>
      <line x1={x1} y1={y1} x2={bx} y2={by} stroke={color} strokeWidth={width} strokeDasharray={dashed ? "6 4" : undefined} />
      <path d={`M${x2},${y2}L${bx + uy * w},${by - ux * w}L${bx - uy * w},${by + ux * w}Z`} fill={color} />
      {label ? (
        <text
          x={lx}
          y={ly + 3.5}
          fill={cssVar(labelRole ?? role)}
          fontSize={labelSize}
          className="font-data"
          textAnchor={ux > 0.35 ? "start" : ux < -0.35 ? "end" : "middle"}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}
