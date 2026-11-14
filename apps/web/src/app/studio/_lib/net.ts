// net1 / net2: one connected truss on a seeded grid, loaded by a seeded field, solved for its member forces.
// Port of prototypes/truzme-art-net (the code between /*CORE*/ and /*END*/). The record of how and why is
// docs/notes/truss-art-net-session.md. Output must match the prototype exactly: `pnpm check:studio`.

import { drawField, fieldAt, h32, hr, mulberry } from "./seed.ts";

export type NetState = {
  gen: 1 | 2;
  seed: string;
  /** net2 form: 0 wave, 1 arch, 2 swirl */
  m: 0 | 1 | 2;
  /** net2: curvature 0–10 */
  a: number;
  /** net2: depth in rows 2–10 */
  d: number;
  /** net2: gravity share 0–10 */
  g: number;
  /** field parts used 1–6 */
  c: number;
  /** fill, % of cells kept 50–100 */
  f: number;
  /** loaded nodes, % 10–100 */
  l: number;
  /** supports 2–6 */
  s: number;
  /** jitter 0–10 */
  w: number;
  /** tilted rollers */
  ra: boolean;
};

export type Point = { i: number; j: number; x: number; y: number };
export type Load = { g: number; Fx: number; Fy: number };
export type Support = { g: number; type: "pin" | "roller"; ang: number };
export type NetModel = { P: Point[]; nodes: number[]; members: [number, number][]; loads: Load[]; supports: Support[] };

export const NET_DEFAULT: NetState = { gen: 2, seed: "truzme", m: 1, a: 6, d: 4, g: 5, c: 3, f: 100, l: 60, s: 3, w: 3, ra: true };

const N = 14;
const r3 = (x: number) => {
  const v = Math.round(x * 1000) / 1000;
  return v === 0 ? 0 : v;
};
const r2 = (x: number) => {
  const v = Math.round(x * 100) / 100;
  return v === 0 ? 0 : v;
};

// channels: 3,4 node jitter · 5 cell keep · 6 diagonal · 7 loaded · 8 support type · 9 roller angle

/** Triangulated cells, keeping the largest edge-connected component (always rigid). */
function topology(S: number, cols: number, rows: number, fill: number) {
  const id = (i: number, j: number) => j * cols + i;
  const tris: number[][] = [];
  for (let j = 0; j < rows - 1; j++)
    for (let i = 0; i < cols - 1; i++) {
      if (hr(S, 5, i, j) >= fill / 100) continue;
      const a = id(i, j), b = id(i + 1, j), c = id(i + 1, j + 1), d = id(i, j + 1);
      if (hr(S, 6, i, j) < 0.5) tris.push([a, b, c], [a, c, d]);
      else tris.push([a, b, d], [b, c, d]);
    }
  if (!tris.length) return null;
  const par = tris.map((_, k) => k);
  const find = (k: number) => {
    while (par[k] !== k) {
      par[k] = par[par[k]];
      k = par[k];
    }
    return k;
  };
  const ek = (p: number, q: number) => (p < q ? p * 1000 + q : q * 1000 + p);
  const own = new Map<number, number>();
  tris.forEach((t, k) => {
    for (let e = 0; e < 3; e++) {
      const key = ek(t[e], t[(e + 1) % 3]);
      if (own.has(key)) {
        const a = find(own.get(key)!), b = find(k);
        if (a !== b) par[Math.max(a, b)] = Math.min(a, b);
      } else own.set(key, k);
    }
  });
  const cnt = new Map<number, number>();
  tris.forEach((_, k) => {
    const r = find(k);
    cnt.set(r, (cnt.get(r) || 0) + 1);
  });
  let best = -1, bc = 0;
  for (const [r, c] of cnt)
    if (c > bc || (c === bc && r < best)) {
      bc = c;
      best = r;
    }
  const eset = new Set<number>(), used = new Set<number>();
  tris.forEach((t, k) => {
    if (find(k) !== best) return;
    for (let e = 0; e < 3; e++) {
      eset.add(ek(t[e], t[(e + 1) % 3]));
      used.add(t[e]);
    }
  });
  const nodes = [...used].sort((a, b) => a - b);
  const members = [...eset].sort((a, b) => a - b).map((k) => [Math.floor(k / 1000), k % 1000] as [number, number]);
  return { used, nodes, members, id };
}

/** Supports spaced evenly along the lowest node of each column; a lone pin can't sit on every roller's line. */
function supportsFor(S: number, P: Point[], used: Set<number>, id: (i: number, j: number) => number, cols: number, rows: number, st: NetState, arch: boolean) {
  const base: number[] = [];
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++)
      if (used.has(id(i, j))) {
        base.push(id(i, j));
        break;
      }
  const sc = Math.min(st.s, base.length), pick: number[] = [];
  for (let k = 0; k < sc; k++) {
    const g = base[Math.round((k * (base.length - 1)) / (sc - 1))];
    if (!pick.includes(g)) pick.push(g);
  }
  const supports: Support[] = pick.map((g, k) => {
    const p = P[g];
    // an arch on two supports gets two pins: that is what makes it carry thrust instead of bending
    const type: Support["type"] =
      k === 0 ? "pin" : pick.length === 2 ? (arch ? "pin" : "roller") : hr(S, 8, p.i, 0) < 0.5 ? "pin" : "roller";
    const ang = type === "roller" && st.ra ? (Math.floor(hr(S, 9, p.i, 0) * 5) - 2) * 15 : 0;
    return { g, type, ang };
  });
  const pins = supports.filter((s) => s.type === "pin");
  if (pins.length === 1)
    for (const s of supports)
      if (s.type === "roller" && s.ang) {
        const a = (s.ang * Math.PI) / 180, nx = -Math.sin(a), ny = Math.cos(a);
        const dx = P[pins[0].g].x - P[s.g].x, dy = P[pins[0].g].y - P[s.g].y;
        if (Math.abs(nx * dy - ny * dx) < 0.15 * Math.hypot(dx, dy)) s.ang = 0;
      }
  return supports;
}

/** net1: a 14 × 14 grid, loads sampled on grid indices. */
function gen1(st: NetState): NetModel | null {
  const S = h32(st.seed), rng = mulberry(S);
  const use = drawField(rng).slice(0, st.c), W = (st.w / 10) * 0.6;
  const P: Point[] = [];
  for (let j = 0; j < N; j++)
    for (let i = 0; i < N; i++) P.push({ i, j, x: r2(i + (hr(S, 3, i, j) - 0.5) * W), y: r2(j + (hr(S, 4, i, j) - 0.5) * W) });
  const top = topology(S, N, N, st.f);
  if (!top) return null;
  const { used, nodes, members, id } = top;

  let mx = 0;
  const raw: { g: number; vx: number; vy: number }[] = [];
  for (const g of nodes) {
    const p = P[g];
    if (hr(S, 7, p.i, p.j) >= st.l / 100) continue;
    const [vx, vy] = fieldAt(use, (p.i / (N - 1)) * 2 - 1, (p.j / (N - 1)) * 2 - 1);
    mx = Math.max(mx, Math.hypot(vx, vy));
    raw.push({ g, vx, vy });
  }
  const loads = raw.map((o) => ({ g: o.g, Fx: mx ? r3(o.vx / mx) : 0, Fy: mx ? r3(o.vy / mx) : 0 })).filter((o) => o.Fx || o.Fy);
  return { P, nodes, members, loads, supports: supportsFor(S, P, used, id, N, N, st, false) };
}

/** net2: the same hash topology in (i, j) parameter space, positions through a smooth fold-free map. */
function gen2(st: NetState): NetModel | null {
  const S = h32(st.seed), rng = mulberry(S);
  const comps = drawField(rng);
  // shape draws: always the same count, whatever the form
  const kw = [1, 1.5, 2, 2.5][Math.floor(rng() * 4)], wph = rng() * Math.PI * 2;
  const sw = [0, 1].map(() => ({ cx: 0.2 + rng() * 0.6, cy: 0.2 + rng() * 0.6, sg: 0.25 + rng() * 0.3, s: rng() < 0.5 ? -1 : 1 }));
  const twoSw = rng() < 0.5;
  const use = comps.slice(0, st.c), A = st.a / 10, form = st.m;
  const C = form === 2 ? 18 : 25, R = form === 2 ? Math.min(18, 2 * st.d) : st.d, Lx = C - 1, H = R - 1, W = (st.w / 10) * 0.6;

  let map: (x: number, y: number) => [number, number];
  if (form === 0) {
    // wave band: rows offset along the normal, curvature capped so rows never cross
    const om = (2 * Math.PI * kw) / Lx, Am = A * Math.min((0.9 * 2) / (Math.max(H, 1) * om * om), Lx * 0.3);
    map = (x, y) => {
      const d = Am * om * Math.cos(om * x + wph), nl = Math.hypot(d, 1), o = y - H / 2;
      return [x - (d / nl) * o, Am * Math.sin(om * x + wph) + o / nl];
    };
  } else if (form === 1) {
    // arch: a polar band, intrados radius kept positive
    const Ph = ((40 + 160 * A) * Math.PI) / 180, Rr = Math.max(Lx / Ph, H / 2 + 1.5);
    map = (x, y) => {
      const f = Math.PI / 2 + (0.5 - x / Lx) * Ph, r = Rr + y - H / 2;
      return [r * Math.cos(f), r * Math.sin(f)];
    };
  } else {
    // swirl: rotation by θ(r) around one or two centres, bijective and area-preserving
    const Lm = Math.max(Lx, H), list = twoSw ? sw : [sw[0]];
    map = (x, y) => {
      for (const q of list) {
        const cx = q.cx * Lx, cy = q.cy * H, dx = x - cx, dy = y - cy;
        const t = q.s * A * Math.PI * Math.exp(-(dx * dx + dy * dy) / (q.sg * Lm) ** 2), c = Math.cos(t), s = Math.sin(t);
        x = cx + dx * c - dy * s;
        y = cy + dx * s + dy * c;
      }
      return [x, y];
    };
  }
  const P: Point[] = [];
  for (let j = 0; j < R; j++)
    for (let i = 0; i < C; i++) {
      const [x, y] = map(i + (hr(S, 3, i, j) - 0.5) * W, j + (hr(S, 4, i, j) - 0.5) * W);
      P.push({ i, j, x: r2(x), y: r2(y) });
    }
  const top = topology(S, C, R, st.f);
  if (!top) return null;
  const { used, nodes, members, id } = top;

  // loads: field sampled in world space (the field is "the weather"), blended with gravity
  let bx0 = 1e9, bx1 = -1e9, by0 = 1e9, by1 = -1e9;
  for (const p of P) {
    bx0 = Math.min(bx0, p.x);
    bx1 = Math.max(bx1, p.x);
    by0 = Math.min(by0, p.y);
    by1 = Math.max(by1, p.y);
  }
  const mcx = (bx0 + bx1) / 2, mcy = (by0 + by1) / 2, half = Math.max(bx1 - bx0, by1 - by0) / 2 || 1;
  let mx = 0;
  const raw: { g: number; vx: number; vy: number }[] = [];
  for (const g of nodes) {
    const p = P[g];
    if (hr(S, 7, p.i, p.j) >= st.l / 100) continue;
    const [vx, vy] = fieldAt(use, (p.x - mcx) / half, (p.y - mcy) / half);
    mx = Math.max(mx, Math.hypot(vx, vy));
    raw.push({ g, vx, vy });
  }
  const gm = st.g / 10;
  let m2 = 0;
  const bl = raw.map((o) => {
    const fx = (1 - gm) * (mx ? o.vx / mx : 0), fy = (1 - gm) * (mx ? o.vy / mx : 0) - gm;
    m2 = Math.max(m2, Math.hypot(fx, fy));
    return { g: o.g, fx, fy };
  });
  const loads = bl.map((o) => ({ g: o.g, Fx: m2 ? r3(o.fx / m2) : 0, Fy: m2 ? r3(o.fy / m2) : 0 })).filter((o) => o.Fx || o.Fy);
  return { P, nodes, members, loads, supports: supportsFor(S, P, used, id, C, R, st, form === 1) };
}

export const generate = (st: NetState) => (st.gen === 2 ? gen2(st) : gen1(st));

/**
 * Member forces in kN (positive = tension), or null if the structure is unstable.
 * 2D truss stiffness (EA = 1), supports as penalty springs, dense Cholesky.
 */
export function solve(m: NetModel): number[] | null {
  const n = m.nodes.length, D = 2 * n, K = new Float64Array(D * D), F = new Float64Array(D);
  const ix = new Map(m.nodes.map((g, k) => [g, k]));
  const geo = m.members.map(([p, q]) => {
    const A = m.P[p], B = m.P[q], dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy);
    return { a: ix.get(p)!, b: ix.get(q)!, c: dx / L, s: dy / L, k: 1 / L };
  });
  for (const e of geo) {
    const kk = [e.c * e.c, e.c * e.s, e.s * e.s], blk = [[kk[0], kk[1]], [kk[1], kk[2]]];
    for (const [r0, c0, sg] of [[e.a, e.a, 1], [e.b, e.b, 1], [e.a, e.b, -1], [e.b, e.a, -1]])
      for (let x = 0; x < 2; x++) for (let y = 0; y < 2; y++) K[(2 * r0 + x) * D + 2 * c0 + y] += sg * e.k * blk[x][y];
  }
  const PEN = 1e8;
  for (const s of m.supports) {
    const a = ix.get(s.g)!;
    if (s.type === "pin") {
      K[2 * a * D + 2 * a] += PEN;
      K[(2 * a + 1) * D + 2 * a + 1] += PEN;
    } else {
      const t = (s.ang * Math.PI) / 180, nx = -Math.sin(t), ny = Math.cos(t), v = [[nx * nx, nx * ny], [nx * ny, ny * ny]];
      for (let x = 0; x < 2; x++) for (let y = 0; y < 2; y++) K[(2 * a + x) * D + 2 * a + y] += PEN * v[x][y];
    }
  }
  for (const l of m.loads) {
    const a = ix.get(l.g)!;
    F[2 * a] += l.Fx;
    F[2 * a + 1] += l.Fy;
  }
  for (let j = 0; j < D; j++) {
    let d = K[j * D + j];
    for (let k = 0; k < j; k++) d -= K[j * D + k] * K[j * D + k];
    if (!(d > 1e-9)) return null;
    d = Math.sqrt(d);
    K[j * D + j] = d;
    for (let i = j + 1; i < D; i++) {
      let s = K[i * D + j];
      for (let k = 0; k < j; k++) s -= K[i * D + k] * K[j * D + k];
      K[i * D + j] = s / d;
    }
  }
  const y = new Float64Array(D);
  for (let i = 0; i < D; i++) {
    let s = F[i];
    for (let k = 0; k < i; k++) s -= K[i * D + k] * y[k];
    y[i] = s / K[i * D + i];
  }
  const u = new Float64Array(D);
  for (let i = D - 1; i >= 0; i--) {
    let s = y[i];
    for (let k = i + 1; k < D; k++) s -= K[k * D + i] * u[k];
    u[i] = s / K[i * D + i];
  }
  return geo.map((e) => r3(e.k * (e.c * (u[2 * e.b] - u[2 * e.a]) + e.s * (u[2 * e.b + 1] - u[2 * e.a + 1]))));
}

/** Largest out-of-balance force at a free node, in kN: only the 0.001 rounding should be left. */
export function residual(m: NetModel, F: number[]): number {
  const sup = new Set(m.supports.map((s) => s.g));
  const R = new Map<number, [number, number]>();
  m.members.forEach(([p, q], k) => {
    const A = m.P[p], B = m.P[q], L = Math.hypot(B.x - A.x, B.y - A.y), c = (B.x - A.x) / L, s = (B.y - A.y) / L;
    for (const [g, sg] of [[p, 1], [q, -1]]) {
      const r = R.get(g) || [0, 0];
      r[0] += sg * F[k] * c;
      r[1] += sg * F[k] * s;
      R.set(g, r);
    }
  });
  for (const l of m.loads) {
    const r = R.get(l.g)!;
    r[0] += l.Fx;
    r[1] += l.Fy;
  }
  let worst = 0;
  for (const [g, r] of R) if (!sup.has(g)) worst = Math.max(worst, Math.hypot(r[0], r[1]));
  return worst;
}

export const netRecipe = (st: NetState) =>
  st.gen === 2
    ? `net2.${st.seed}.m${st.m}.a${st.a}.d${st.d}.c${st.c}.f${st.f}.l${st.l}.g${st.g}.s${st.s}.w${st.w}.${st.ra ? "ra" : "r0"}`
    : `net1.${st.seed}.c${st.c}.f${st.f}.l${st.l}.s${st.s}.w${st.w}.${st.ra ? "ra" : "r0"}`;

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/** Reads a recipe back into settings (values clamped to the slider ranges), or null if it isn't one. */
export function parseNetRecipe(text: string): NetState | null {
  const t = text.trim().replace(/^#/, "").toLowerCase();
  let r = t.match(/^net1\.([a-z0-9]+)\.c(\d)\.f(\d+)\.l(\d+)\.s(\d)\.w(\d+)\.(ra|r0)$/);
  if (r)
    return {
      ...NET_DEFAULT,
      gen: 1,
      seed: r[1],
      c: clamp(+r[2], 1, 6),
      f: clamp(+r[3], 50, 100),
      l: clamp(+r[4], 10, 100),
      s: clamp(+r[5], 2, 6),
      w: clamp(+r[6], 0, 10),
      ra: r[7] === "ra",
    };
  r = t.match(/^net2\.([a-z0-9]+)\.m(\d)\.a(\d+)\.d(\d+)\.c(\d)\.f(\d+)\.l(\d+)\.g(\d+)\.s(\d)\.w(\d+)\.(ra|r0)$/);
  if (r)
    return {
      gen: 2,
      seed: r[1],
      m: clamp(+r[2], 0, 2) as NetState["m"],
      a: clamp(+r[3], 0, 10),
      d: clamp(+r[4], 2, 10),
      c: clamp(+r[5], 1, 6),
      f: clamp(+r[6], 50, 100),
      l: clamp(+r[7], 10, 100),
      g: clamp(+r[8], 0, 10),
      s: clamp(+r[9], 2, 6),
      w: clamp(+r[10], 0, 10),
      ra: r[11] === "ra",
    };
  return null;
}

/** Counts for the readout: nodes, members, reactions, degree of indeterminacy, tension and compression members. */
export function netStats(m: NetModel, F: number[]) {
  const n = m.nodes.length, mm = m.members.length, r = m.supports.reduce((a, s) => a + (s.type === "pin" ? 2 : 1), 0);
  const max = Math.max(...F.map(Math.abs));
  return {
    nodes: n,
    members: mm,
    reactions: r,
    indeterminacy: mm + r - 2 * n,
    tension: F.filter((f) => f > 0.001 * max).length,
    compression: F.filter((f) => f < -0.001 * max).length,
    max,
    residual: residual(m, F),
  };
}
