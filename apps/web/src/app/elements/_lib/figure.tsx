// Byrne figure primitives for the Elements. Coordinates are copied from the prototypes
// (prototypes/elements-of-statics), so arrows keep the prototypes' marker geometry.

import type { ReactNode } from "react";
import { cssVar } from "@forzez/tokens";

/** r red · b blue · y yellow · k black (ink): the four Byrne colours. */
export type C = "r" | "b" | "y" | "k";
const ROLE: Record<C, string> = { r: "force-1", b: "force-2", y: "force-3", k: "ink" };
export const col = (c: C) => cssVar(ROLE[c]);
export const ink = cssVar("ink");
export const paper = cssVar("bg");
export const body = cssVar("body");

/**
 * A force: line from (x1,y1) to (x2,y2) with a filled head that starts 3 units before the
 * end and reaches 7 units past it, in head units `s` (as an SVG marker with refX 3 would).
 */
export function Arrow({ x1, y1, x2, y2, c, w = 6, s = 2, opacity }: { x1: number; y1: number; x2: number; y2: number; c: C; w?: number; s?: number; opacity?: number }) {
  const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
  const bx = x2 - 3 * s * ux, by = y2 - 3 * s * uy, tx = x2 + 7 * s * ux, ty = y2 + 7 * s * uy, h = 5 * s;
  const fill = col(c);
  return (
    <g opacity={opacity}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={fill} strokeWidth={w} />
      <path d={`M${bx - uy * h},${by + ux * h}L${tx},${ty}L${bx + uy * h},${by - ux * h}Z`} fill={fill} />
    </g>
  );
}

/** Thin dashed ink line: lines of action, construction lines. */
export function Dash({ x1, y1, x2, y2, w = 1.2, knockout }: { x1: number; y1: number; x2: number; y2: number; w?: number; knockout?: boolean }) {
  return (
    <>
      {knockout ? <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={paper} strokeWidth={3} /> : null}
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ink} strokeWidth={w} strokeDasharray="5 5" />
    </>
  );
}

export function Dot({ x, y, r = 5 }: { x: number; y: number; r?: number }) {
  return <circle cx={x} cy={y} r={r} fill={ink} />;
}

/** The figure: an SVG that scales to its column. */
export function Figure({ viewBox, label, children, maxWidth }: { viewBox: string; label: string; children: ReactNode; maxWidth?: string }) {
  return (
    <svg viewBox={viewBox} role="img" aria-label={label} className="mx-auto block h-auto w-full overflow-visible" style={{ maxWidth }}>
      {children}
    </svg>
  );
}
