// Byrne figure parts for the Elements. Every figure is built from these, so a change here
// changes every page. Coordinates are copied from the prototypes
// (prototypes/elements-of-statics); keep their numbers and swap their markup for these parts.
//
// Colours: never a hex. Forces use C ("r" red, "b" blue, "y" yellow, "k" black/ink).
// Truss members use their meaning: "tension" (blue, pulls) and "compression" (red, pushes).

import type { ReactNode } from "react";
import { cssVar, stroke } from "@forzez/tokens";

/** r red · b blue · y yellow · k black (ink): the four Byrne colours. */
export type C = "r" | "b" | "y" | "k";
const ROLE: Record<C, string> = { r: "force-1", b: "force-2", y: "force-3", k: "ink" };
export const col = (c: C) => cssVar(ROLE[c]);
export const ink = cssVar("ink");
export const muted = cssVar("muted");
export const paper = cssVar("bg");
export const body = cssVar("body");

/* ---------------- the frame ---------------- */

/** The figure: an SVG that scales to its column. Copy `viewBox` from the prototype. */
export function Figure({ viewBox, label, children, maxWidth }: { viewBox: string; label: string; children: ReactNode; maxWidth?: string }) {
  return (
    <svg viewBox={viewBox} role="img" aria-label={label} className="mx-auto block h-auto w-full overflow-visible" style={{ maxWidth }}>
      {children}
    </svg>
  );
}

/* ---------------- forces ---------------- */

/**
 * A force: line from (x1,y1) to (x2,y2) with a filled head that starts 3 units before the
 * end and reaches 7 units past it, in head units `s` (as an SVG marker with refX 3 would).
 * Prototype `marker-end` arrows: pass the line's own x1..y2; s = markerWidth × stroke-width / 10.
 */
export function Arrow({ x1, y1, x2, y2, c, w = 6, s = 2, opacity, dashed }: { x1: number; y1: number; x2: number; y2: number; c: C; w?: number; s?: number; opacity?: number; dashed?: boolean }) {
  const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
  const bx = x2 - 3 * s * ux, by = y2 - 3 * s * uy, tx = x2 + 7 * s * ux, ty = y2 + 7 * s * uy, h = 5 * s;
  const fill = col(c);
  return (
    <g opacity={opacity}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={fill} strokeWidth={w} strokeDasharray={dashed ? "8 5" : undefined} />
      <path d={`M${bx - uy * h},${by + ux * h}L${tx},${ty}L${bx + uy * h},${by - ux * h}Z`} fill={fill} />
    </g>
  );
}

/* ---------------- lines ---------------- */

/** A plain stroke in a Byrne colour or ink: rims, chains, rods, slopes. */
export function Stroke({ x1, y1, x2, y2, c = "k", w = 2.5, opacity, cap, dash, knockout }: {
  x1: number; y1: number; x2: number; y2: number; c?: C; w?: number; opacity?: number; cap?: "round" | "butt";
  /** SVG dash pattern, e.g. "7 5" for coloured lines of action. */
  dash?: string;
  /** Width of a paper band laid under the line, so it crosses a fill cleanly. */
  knockout?: number;
}) {
  return (
    <>
      {knockout ? <Knockout x1={x1} y1={y1} x2={x2} y2={y2} w={knockout} /> : null}
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={col(c)} strokeWidth={w} strokeOpacity={opacity} strokeLinecap={cap} strokeDasharray={dash} />
    </>
  );
}

/** A paper band: lets a line cross a fill cleanly. Draw it before the line. */
export function Knockout({ x1, y1, x2, y2, w = 5 }: { x1: number; y1: number; x2: number; y2: number; w?: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={paper} strokeWidth={w} />;
}

/**
 * Coloured dashed lines of action over a body. All paper bands go down before any dash,
 * so crossing lines stay whole.
 */
export function LinesOfAction({ lines, w = 2.5, dash = "7 5", knockout = 5 }: { lines: [number, number, number, number, C][]; w?: number; dash?: string; knockout?: number }) {
  return (
    <>
      {lines.map(([x1, y1, x2, y2], i) => <Knockout key={`k${i}`} x1={x1} y1={y1} x2={x2} y2={y2} w={knockout} />)}
      {lines.map(([x1, y1, x2, y2, c], i) => <Stroke key={`d${i}`} x1={x1} y1={y1} x2={x2} y2={y2} c={c} w={w} dash={dash} />)}
    </>
  );
}

/** A faint square grid across the box (x0,y0)–(x1,y1), every `step` units. */
export function Grid({ x0, y0, x1, y1, step, opacity = 0.09 }: { x0: number; y0: number; x1: number; y1: number; step: number; opacity?: number }) {
  const xs = Array.from({ length: Math.round((x1 - x0) / step) + 1 }, (_, i) => x0 + i * step);
  const ys = Array.from({ length: Math.round((y1 - y0) / step) + 1 }, (_, i) => y0 + i * step);
  return (
    <>
      {xs.map((x) => <Stroke key={`x${x}`} x1={x} y1={y0} x2={x} y2={y1} w={1} opacity={opacity} />)}
      {ys.map((y) => <Stroke key={`y${y}`} x1={x0} y1={y} x2={x1} y2={y} w={1} opacity={opacity} />)}
    </>
  );
}

/** An open polyline in a colour: chains, cables, arches, string polygons. */
export function Path({ points, c = "k", w = 2.5, opacity, dashed, closed }: { points: string; c?: C; w?: number; opacity?: number; dashed?: boolean; closed?: boolean }) {
  const p = { points, fill: "none", stroke: col(c), strokeWidth: w, strokeOpacity: opacity, strokeLinejoin: "round" as const, strokeDasharray: dashed ? "8 5" : undefined };
  return closed ? <polygon {...p} /> : <polyline {...p} />;
}

/**
 * Thin dashed ink line: lines of action, construction lines, rays.
 * `dotted` for mirror and section lines. `knockout` paints paper under it, to cross a fill cleanly.
 */
export function Dash({ x1, y1, x2, y2, w = 1.2, knockout, dotted }: { x1: number; y1: number; x2: number; y2: number; w?: number; knockout?: boolean; dotted?: boolean }) {
  return (
    <>
      {knockout ? <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={paper} strokeWidth={3} /> : null}
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ink} strokeWidth={w} strokeDasharray={dotted ? "2 6" : "5 5"} />
    </>
  );
}

/** Small right-angle mark at a corner. Pass the prototype's polyline points. */
export function RightAngle({ points }: { points: string }) {
  return <polyline points={points} fill="none" stroke={ink} strokeWidth={1.5} />;
}

/* ---------------- points and bodies ---------------- */

/** A point where forces meet. */
export function Dot({ x, y, r = 5, c = "k", opacity }: { x: number; y: number; r?: number; c?: C; opacity?: number }) {
  return <circle cx={x} cy={y} r={r} fill={col(c)} fillOpacity={opacity} />;
}

/** A string of beads at given points; `pale` for beads that only hang (pale ink). */
export function Beads({ at, c = "k", pale, r = 6.5 }: { at: [number, number][]; c?: C; pale?: boolean; r?: number }) {
  return <>{at.map(([x, y], i) => <Dot key={i} x={x} y={y} r={r} c={pale ? "k" : c} opacity={pale ? 0.3 : undefined} />)}</>;
}

/** A body: a light fill without outline. `shade` darker for a second body or a block. */
export function Body({ points, x, y, width, height, shade = 1 }: { points?: string; x?: number; y?: number; width?: number; height?: number; shade?: 1 | 2 | 3 }) {
  const fill = shade === 1 ? body : ink;
  const fillOpacity = shade === 1 ? undefined : shade === 2 ? 0.16 : 0.3;
  return points
    ? <polygon points={points} fill={fill} fillOpacity={fillOpacity} />
    : <rect x={x} y={y} width={width} height={height} fill={fill} fillOpacity={fillOpacity} />;
}

/** A hanging weight or anchor block. */
export function Weight({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  return <rect x={x} y={y} width={width} height={height} fill={ink} fillOpacity={0.3} />;
}

/** A filled area in a Byrne colour: squares on forces, rectangles of moments, load areas. */
export function Area({ points, x, y, width, height, c, opacity }: { points?: string; x?: number; y?: number; width?: number; height?: number; c: C; opacity?: number }) {
  return points
    ? <polygon points={points} fill={col(c)} fillOpacity={opacity} />
    : <rect x={x} y={y} width={width} height={height} fill={col(c)} fillOpacity={opacity} />;
}

/** A painted angle: pass the prototype's path `d`. */
export function Wedge({ d, c, faint, opacity }: { d: string; c: C; faint?: boolean; opacity?: number }) {
  return <path d={d} fill={col(c)} fillOpacity={opacity ?? (faint ? 0.55 : undefined)} />;
}

/* ---------------- structures ---------------- */

/** A truss member or beam in its meaning: tension blue, compression red, neutral member grey. */
export function Member({ x1, y1, x2, y2, kind, w = 7, dashed, opacity }: { x1: number; y1: number; x2: number; y2: number; kind: "tension" | "compression" | "member" | "beam"; w?: number; dashed?: boolean; opacity?: number }) {
  const color = kind === "beam" ? ink : cssVar(kind);
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={kind === "beam" && w === 7 ? 8 : w} strokeOpacity={opacity} strokeDasharray={dashed ? "8 6" : undefined} strokeLinecap={kind === "member" ? "round" : undefined} />;
}

/** A curved member (Michell's spirals, a bent chord) as one polyline, coloured by its meaning. */
export function MemberPath({ points, kind, w = 7 }: { points: [number, number][]; kind: "tension" | "compression" | "member"; w?: number }) {
  return <polyline points={points.map((p) => p.join(",")).join(" ")} fill="none" stroke={cssVar(kind)} strokeWidth={w} strokeLinejoin="round" />;
}

/**
 * A fixed (clamped) support: a wall face at x from y1 to y2, hatched on the side `side`
 * (1 right, -1 left).
 */
export function Clamp({ x, y1, y2, side = 1, step = 12, depth = 12 }: { x: number; y1: number; y2: number; side?: 1 | -1; step?: number; depth?: number }) {
  const n = Math.floor((y2 - y1) / step);
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const yy = y1 + step * (i + 1);
        return <Stroke key={i} x1={x} y1={yy} x2={x + side * depth} y2={yy - depth} w={1.5} />;
      })}
      <Ground x1={x} x2={x} y={y1} y2={y2} />
    </>
  );
}

/** A circular stone arch (half annulus) as a pale body: centre (x, y), inner and outer radius. */
export function ArchRing({ x, y, ri, ro, step = 2 }: { x: number; y: number; ri: number; ro: number; step?: number }) {
  const q = (v: number) => Math.round(v * 10) / 10;
  const arc = (r: number) => Array.from({ length: 180 / step + 1 }, (_, i) => {
    const a = Math.PI - (i * step * Math.PI) / 180;
    return `${q(x + r * Math.cos(a))},${q(y - r * Math.sin(a))}`;
  });
  return <Body points={[...arc(ro), ...arc(ri).reverse()].join(" ")} />;
}

/** A circle outline in ink: `dashed` to ring a joint the proof talks about. */
export function Circle({ x, y, r = 15, w = 1.2, dashed }: { x: number; y: number; r?: number; w?: number; dashed?: boolean }) {
  return <circle cx={x} cy={y} r={r} fill="none" stroke={ink} strokeWidth={w} strokeDasharray={dashed ? "5 5" : undefined} />;
}

/** A pinned joint: a small paper ring. */
export function Joint({ x, y, r = 7, w = 2.5 }: { x: number; y: number; r?: number; w?: number }) {
  return <circle cx={x} cy={y} r={r} fill={paper} stroke={ink} strokeWidth={w} />;
}

/** Ground or a ceiling: a heavy ink line. */
export function Ground({ x1, x2, y, y2 }: { x1: number; x2: number; y: number; y2?: number }) {
  return <line x1={x1} y1={y} x2={x2} y2={y2 ?? y} stroke={ink} strokeWidth={2.5} />;
}

/**
 * A pin support under the point (x, y): an open triangle on the ground.
 * Default size matches Book IV (18 half-width, 27 tall, ground 30 either side).
 */
export function Pin({ x, y, half = 18, height = 27, gap = 8, over = 12 }: { x: number; y: number; half?: number; height?: number; gap?: number; over?: number }) {
  const top = y + gap, base = top + height;
  return (
    <>
      <polygon points={`${x},${top} ${x - half},${base} ${x + half},${base}`} fill="none" stroke={ink} strokeWidth={2.5} />
      <Ground x1={x - half - over} x2={x + half + over} y={base + 3} />
    </>
  );
}

/** A roller support under (x, y): a smaller triangle on two wheels, on the ground. */
export function Roller({
  x, y, half = 16, height = 20, gap = 8, over = 14, drop = 10, wheelR = 4, wheelX = 9, wheelY = 5, wheelW = 2,
}: {
  x: number; y: number; half?: number; height?: number; gap?: number;
  /** ground: how far past the triangle, how far below its base */
  over?: number; drop?: number;
  /** wheels: radius, offset from the centre line, depth below the base, ring width */
  wheelR?: number; wheelX?: number; wheelY?: number; wheelW?: number;
}) {
  const top = y + gap, base = top + height;
  return (
    <>
      <polygon points={`${x},${top} ${x - half},${base} ${x + half},${base}`} fill="none" stroke={ink} strokeWidth={2.5} />
      <Wheel x={x - wheelX} y={base + wheelY} r={wheelR} w={wheelW} fill="none" />
      <Wheel x={x + wheelX} y={base + wheelY} r={wheelR} w={wheelW} fill="none" />
      <Ground x1={x - half - over} x2={x + half + over} y={base + drop} />
    </>
  );
}

/** A wheel, pulley or disc: paper fill with an ink rim. */
export function Wheel({ x, y, r, w = 2.5, fill = "paper", c = "k" }: { x: number; y: number; r: number; w?: number; fill?: "paper" | "none" | "body"; c?: C }) {
  return <circle cx={x} cy={y} r={r} fill={fill === "paper" ? paper : fill === "body" ? body : "none"} stroke={col(c)} strokeWidth={w} />;
}

/** Spokes of a wheel: n tension members from radius r0 to r1; the indices in `slack` thin and dashed. */
export function Spokes({ x, y, n, r0, r1, slack = [] }: { x: number; y: number; n: number; r0: number; r1: number; slack?: number[] }) {
  const q = (v: number) => Math.round(v * 10) / 10;
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const a = (2 * Math.PI * i) / n, cx = Math.cos(a), sy = Math.sin(a), s = slack.includes(i);
        return <Member key={i} x1={q(x + r0 * cx)} y1={q(y + r0 * sy)} x2={q(x + r1 * cx)} y2={q(y + r1 * sy)} kind="tension" w={s ? 1.8 : 3} dashed={s} />;
      })}
    </>
  );
}

/** A free ink path (rope over a pulley, curved outlines): pass the prototype's `d`. */
export function Curve({ d, c = "k", w = 3, dashed, fill }: { d: string; c?: C; w?: number; dashed?: boolean; fill?: C }) {
  return <path d={d} fill={fill ? col(fill) : "none"} stroke={col(c)} strokeWidth={w} strokeLinejoin="round" strokeDasharray={dashed ? "5 5" : undefined} />;
}

/**
 * A turning: a curved force. Draws the path `d` and puts an arrowhead at its end (x, y),
 * pointing along the end tangent (ux, uy).
 */
export function Turn({ d, x, y, ux, uy, c = "k", w = 3, s = 1.5 }: { d: string; x: number; y: number; ux: number; uy: number; c?: C; w?: number; s?: number }) {
  return (
    <>
      <Curve d={d} c={c} w={w} />
      <Arrow x1={x - ux} y1={y - uy} x2={x} y2={y} c={c} w={0} s={s} />
    </>
  );
}

/** Stroke widths from tokens, for parts that should follow the system scale. */
export const STROKE = { hair: Number(stroke["stroke-hair"]), member: Number(stroke["stroke-member"]) };
