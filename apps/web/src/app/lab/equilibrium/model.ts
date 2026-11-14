// Equilibrium of forces: the scene model and the step script.
// Every animatable parameter has a default; each step is a full snapshot (defaults + overrides).
// Angles in degrees, magnitudes in kN, positions in SVG units (y up in the model).

import type { Tone } from "@forzez/ui";

export const FORCES = ["F1", "F2", "F3"] as const;
export type ForceId = (typeof FORCES)[number];
export const TONE: Record<ForceId, 1 | 2 | 3> = { F1: 1, F2: 2, F3: 3 };
export const SUB: Record<ForceId, string> = { F1: "₁", F2: "₂", F3: "₃" };

export type Params = Record<string, number>;

export const DEF: Params = {
  chain: 0, lines: 0, bodyOp: 1, bodyR: 26, resOp: 0, ghost: 0, polyFill: 0, showM: 0, members: 0, comps: 0, axes: 0, arc: 0,
};
const FDEF: Record<ForceId, [number, number]> = { F1: [10, 0], F2: [10, 110], F3: [8, 250] };
for (const f of FORCES) {
  DEF[`${f}.mag`] = FDEF[f][0];
  DEF[`${f}.ang`] = FDEF[f][1];
  DEF[`${f}.op`] = 0; // opacity / presence
  DEF[`${f}.s`] = 26; // tail distance from the centre, along the force
  DEF[`${f}.off`] = 0; // sideways offset of the line of action
}
export const KEYS = Object.keys(DEF);

/** Fixed decimals with a true minus sign; never "−0.0". */
export const fmt = (v: number, d = 1) => v.toFixed(d).replace(/^-(0\.0+)$/, "$1").replace(/^-/, "−");
const deg = (v: number) => `${fmt(v, 0)}°`;
const kn = (v: number) => fmt(v, 1);
const plain = (v: number) => fmt(v, 2);

const F = (f: ForceId, mag: number, ang: number, extra: Params = {}): Params => {
  const o: Params = { [`${f}.mag`]: mag, [`${f}.ang`]: ang, [`${f}.op`]: 1 };
  for (const k in extra) o[`${f}.${k}`] = extra[k];
  return o;
};

/** The force that closes the polygon of the given forces: [magnitude, angle]. */
export function equilibrant(list: [number, number][]): [number, number] {
  let x = 0, y = 0;
  for (const [m, a] of list) {
    x += m * Math.cos((a * Math.PI) / 180);
    y += m * Math.sin((a * Math.PI) / 180);
  }
  let a = (Math.atan2(-y, -x) * 180) / Math.PI;
  if (a < 0) a += 360;
  return [Math.hypot(x, y), a];
}

export type SliderDef = {
  keys: string[]; label: string; min: number; max: number; step: number; format: (v: number) => string; tone: Tone;
};
const S = (keys: string[], label: string, min: number, max: number, step: number, format: (v: number) => string, tone: Tone): SliderDef =>
  ({ keys, label, min, max, step, format, tone });

export type StepDef = {
  id: string;
  intro?: boolean;
  set: Params;
  /** Params the reader drives with sliders. */
  free?: string[];
  /** Values the "back to equilibrium" button restores. */
  eq?: Params;
  sliders?: SliderDef[];
};

export const E3 = equilibrant([[8, 20], [7, 140]]);
const three = { ...F("F1", 8, 20), ...F("F2", 7, 140), ...F("F3", E3[0], E3[1]) };

export const STEPS: StepDef[] = [
  { id: "title", intro: true, set: {} },
  { id: "one", set: { ...F("F1", 10, 0), resOp: 1, ghost: 1 } },
  {
    id: "components", set: { ...F("F1", 10, 35, { s: 0 }), bodyOp: 0.2, axes: 1, comps: 1, arc: 1 },
    free: ["F1.ang", "F1.mag"],
    sliders: [S(["F1.ang"], "α", 0, 360, 1, deg, 1), S(["F1.mag"], "F₁ kN", 0, 14, 0.1, kn, 1)],
  },
  { id: "two", set: { ...F("F1", 10, 0), ...F("F2", 10, 180), resOp: 1, ghost: 1 } },
  {
    id: "two-try", set: { ...F("F1", 10, 0), ...F("F2", 10, 180), resOp: 1, ghost: 1 },
    free: ["F2.ang", "F2.mag"], eq: { "F2.ang": 180, "F2.mag": 10 },
    sliders: [S(["F2.ang"], "F₂ angle", 90, 270, 1, deg, 2), S(["F2.mag"], "F₂ kN", 0, 15, 0.1, kn, 2)],
  },
  {
    id: "couple", set: { ...F("F1", 10, 0, { s: 0, off: 34 }), ...F("F2", 10, 180, { s: 0, off: 34 }), bodyR: 64, resOp: 1, ghost: 1, showM: 1 },
    free: ["F1.off", "F2.off"], eq: { "F1.off": 0, "F2.off": 0 },
    sliders: [S(["F1.off", "F2.off"], "arm ½d", 0, 55, 0.5, (v) => `${fmt(v / 100, 2)} m`, "ink")],
  },
  { id: "three", set: { ...three, lines: 1, resOp: 1, ghost: 1, showM: 1 } },
  {
    id: "three-components", set: { ...three, "F1.s": 0, "F2.s": 0, "F3.s": 0, bodyOp: 0.2, axes: 1, comps: 1, resOp: 1, showM: 1 },
    free: ["F2.ang"], eq: { "F2.ang": 140 },
    sliders: [S(["F2.ang"], "F₂ angle", 100, 180, 1, deg, 2)],
  },
  { id: "triangle", set: { ...three, chain: 1, bodyOp: 0.12, resOp: 1, polyFill: 1, showM: 1 } },
  {
    id: "triangle-try", set: { ...three, chain: 1, bodyOp: 0.12, resOp: 1, polyFill: 1, showM: 1 },
    free: ["chain", "F3.ang", "F3.mag"], eq: { "F3.ang": E3[1], "F3.mag": E3[0] },
    sliders: [
      S(["chain"], "chain", 0, 1, 0.01, plain, "ink"),
      S(["F3.ang"], "F₃ angle", 190, 320, 1, deg, 3),
      S(["F3.mag"], "F₃ kN", 0, 14, 0.1, kn, 3),
    ],
  },
  { id: "joint", set: { ...three, "F1.s": 10, "F2.s": 10, "F3.s": 10, bodyR: 10, members: 1, resOp: 1 } },
];

export const MERGED: Params[] = STEPS.map((s) => ({ ...DEF, ...s.set }));

/* ---------------- physics: one frame from the current (animated) params ---------------- */

export const PX_PER_M = 100; // SVG units per metre
export const PX_PER_KN = 10; // SVG units per kN

export type ForceState = {
  f: ForceId; op: number; m: number; ux: number; uy: number; fx: number; fy: number; px: number; py: number;
};

export type Frame = {
  V: (k: string) => number;
  chain: number;
  fs: ForceState[];
  Rx: number; Ry: number; R: number; M: number;
  verts: [number, number][];
  ox: number; oy: number;
  live: Record<string, string>;
};

export function solve(V: (k: string) => number): Frame {
  const chain = clamp01(V("chain"));
  const fs = FORCES.map((f): ForceState => {
    const op = clamp01(V(`${f}.op`)), a = (V(`${f}.ang`) * Math.PI) / 180, m = Math.max(0, V(`${f}.mag`));
    const ux = Math.cos(a), uy = Math.sin(a), s = V(`${f}.s`), off = V(`${f}.off`);
    return { f, op, m, ux, uy, fx: m * ux * op, fy: m * uy * op, px: s * ux - off * uy, py: s * uy + off * ux };
  });
  let Rx = 0, Ry = 0, M = 0;
  for (const q of fs) {
    Rx += q.fx;
    Ry += q.fy;
    M += (q.px * q.fy - q.py * q.fx) / PX_PER_M;
  }
  const R = Math.hypot(Rx, Ry);

  // force polygon vertices, centred when chained
  const verts: [number, number][] = [[0, 0]];
  for (const q of fs) {
    const [x, y] = verts[verts.length - 1];
    verts.push([x + q.fx * PX_PER_KN, y + q.fy * PX_PER_KN]);
  }
  const cx = verts.reduce((a, v) => a + v[0], 0) / verts.length;
  const cy = verts.reduce((a, v) => a + v[1], 0) / verts.length;

  const live: Record<string, string> = { R: fmt(R, 1), M: fmt(Math.abs(M), 2), Sx: fmt(Rx, 1), Sy: fmt(Ry, 1) };
  for (const q of fs) {
    live[`${q.f}x`] = fmt(q.fx, 1);
    live[`${q.f}y`] = fmt(q.fy, 1);
  }
  return { V, chain, fs, Rx, Ry, R, M, verts, ox: -cx * chain, oy: -cy * chain, live };
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}
