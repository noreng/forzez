// Seeded randomness and the flow field shared by every generator.
// Ported verbatim from the prototypes (docs/specs/truzme-art-spec.md, rules 3–5): any change to the
// arithmetic here changes every published recipe, so a fix means a new generator version, not an edit.

/** FNV-1a 32-bit hash of a string. */
export function h32(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** mulberry32: a seedable PRNG returning floats in [0, 1). */
export function mulberry(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Per-cell random value from (seed, channel, i, j): independent of any shared sequence. */
export function hr(S: number, ch: number, i: number, j: number): number {
  let h = S ^ Math.imul(ch + 1, 0x9e3779b1);
  h = Math.imul(h ^ (i + 1), 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h ^ (j + 1), 0xc2b2ae35);
  h ^= h >>> 16;
  return mulberry(h)();
}

/** One field component: 0 wave across direction th, 1 vortex, 2 source or sink. */
export type FieldPart = { t: number; cx: number; cy: number; s: number; f: number; th: number; ph: number; sg: number };

/** Always draws six components, so the "field parts" setting only chooses how many are used. */
export function drawField(rng: () => number): FieldPart[] {
  const parts: FieldPart[] = [];
  for (let k = 0; k < 6; k++)
    parts.push({
      t: Math.floor(rng() * 3),
      cx: rng() * 2 - 1,
      cy: rng() * 2 - 1,
      s: rng() < 0.5 ? -1 : 1,
      f: 1 + Math.floor(rng() * 4),
      th: rng() * Math.PI * 2,
      ph: rng() * Math.PI * 2,
      sg: 0.3 + rng() * 0.7,
    });
  return parts;
}

/** The field vector at (u, v) in [−1, 1]². */
export function fieldAt(use: FieldPart[], u: number, v: number): [number, number] {
  let vx = 0;
  let vy = 0;
  for (const q of use) {
    const dx = u - q.cx;
    const dy = v - q.cy;
    const e = Math.exp(-(dx * dx + dy * dy) / (q.sg * q.sg));
    if (q.t === 0) {
      const w = Math.sin(q.f * Math.PI * (u * Math.cos(q.th) + v * Math.sin(q.th)) + q.ph);
      vx += -Math.sin(q.th) * w;
      vy += Math.cos(q.th) * w;
    } else if (q.t === 1) {
      vx += -dy * e * 2 * q.s;
      vy += dx * e * 2 * q.s;
    } else {
      vx += dx * e * 2 * q.s;
      vy += dy * e * 2 * q.s;
    }
  }
  return [vx, vy];
}

/** Seed text as it goes into a recipe: lower case a–z and 0–9 only. */
export const cleanSeed = (s: string, fallback: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "") || fallback;

/** A fresh random seed: six base-36 characters. */
export function randomSeed(): string {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0].toString(36).padStart(6, "0").slice(0, 6);
}
