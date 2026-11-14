// pts1 · seeded supports: a 20 × 20 grid of pins, each with one load from a seeded field.
// Port of prototypes/pts1-seeded-supports. pts1 is frozen (docs/specs/truzme-art-spec.md):
// its output never changes, a fix is pts2. Golden check: `pnpm check:studio`.

import { drawField, fieldAt, h32, hr, mulberry } from "./seed.ts";

export type SupportsState = {
  seed: string;
  /** field parts used 1–6 */
  c: number;
  /** angle noise 0–10 */
  j: number;
  /** fill, % of nodes kept 30–100 */
  f: number;
  /** pin turned to its reaction */
  ra: boolean;
};

/** One pin: grid position (y up), load in kN, pin angle in degrees counter-clockwise. */
export type SupportPoint = { x: number; y: number; Fx: number; Fy: number; ang: number };

export const SUPPORTS_DEFAULT: SupportsState = { seed: "truzme", c: 3, j: 1, f: 100, ra: true };
export const SUPPORTS_N = 20;
const N = SUPPORTS_N, FMAX = 1;

const r3 = (x: number) => {
  const v = Math.round(x * 1000) / 1000;
  return Object.is(v, -0) ? 0 : v;
};
const r1 = (x: number) => {
  const v = Math.round(x * 10) / 10;
  return Object.is(v, -0) ? 0 : v;
};

export function supportsGen(st: SupportsState): SupportPoint[] {
  const S = h32(st.seed), rng = mulberry(S);
  const use = drawField(rng).slice(0, st.c);
  const pts: { i: number; j: number; a: number; m: number }[] = [];
  let mx = 0;
  for (let j = 0; j < N; j++)
    for (let i = 0; i < N; i++) {
      if (hr(S, 2, i, j) >= st.f / 100) continue;
      const [vx, vy] = fieldAt(use, (i / (N - 1)) * 2 - 1, 1 - (j / (N - 1)) * 2);
      const a = Math.atan2(vy, vx) + ((hr(S, 1, i, j) - 0.5) * st.j) / 10 * Math.PI, m = Math.hypot(vx, vy);
      mx = Math.max(mx, m);
      pts.push({ i, j, a, m });
    }
  return pts.map((p) => {
    const m = mx ? p.m / mx : 0, Fx = r3(Math.cos(p.a) * m * FMAX), Fy = r3(Math.sin(p.a) * m * FMAX);
    let ang = 0;
    if (st.ra && (Fx || Fy)) ang = r1(((((Math.atan2(-Fy, -Fx) * 180) / Math.PI - 90) % 360) + 540) % 360 - 180);
    return { x: p.i, y: N - 1 - p.j, Fx, Fy, ang };
  });
}

export const supportsRecipe = (st: SupportsState) =>
  ["pts1", st.seed.replace(/[^a-z0-9]/gi, "").toLowerCase() || "0", `c${st.c}`, `j${st.j}`, `f${st.f}`, st.ra ? "ra" : "r0"].join(".");

export function parseSupportsRecipe(text: string): SupportsState | null {
  const m = text.trim().replace(/^#/, "").match(/^pts1\.([a-z0-9]+)\.c([1-6])\.j(\d+)\.f(\d+)\.(ra|r0)$/i);
  if (!m) return null;
  return {
    seed: m[1].toLowerCase(),
    c: +m[2],
    j: Math.min(10, +m[3]),
    f: Math.max(30, Math.min(100, Math.round(+m[4] / 5) * 5)),
    ra: m[5].toLowerCase() === "ra",
  };
}
