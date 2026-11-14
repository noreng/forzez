// Checks the net1/net2 generators in prototypes/truss-art-net/index.html without editing the prototype.
// Pulls the code between /*CORE*/ and /*END*/, then for a sweep of recipes checks:
//   - the solver returns a result (structure is stable),
//   - equilibrium at every free node (residual should be ~rounding, ≤ 0.005 kN),
//   - timing,
// and prints a short fingerprint per sample recipe so a port can be compared against the prototype.
//
//   node scripts/check-truss-art.mjs            sweep + fingerprints
//   node scripts/check-truss-art.mjs --svg out  also write one SVG per sample recipe into ./out

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "prototypes/truss-art-net/index.html"), "utf8");
const core = html.split("/*CORE*/")[1]?.split("/*END*/")[0];
if (!core) throw new Error("CORE markers not found in the prototype");
const { gen, gen2, solve, recipeOf } = new Function(`${core}; return { gen, gen2, solve, recipeOf };`)();

function residual(m, F) {
  const sup = new Set(m.supports.map((s) => s.g));
  const R = new Map();
  m.members.forEach(([p, q], k) => {
    const A = m.P[p], B = m.P[q], L = Math.hypot(B.x - A.x, B.y - A.y);
    const c = (B.x - A.x) / L, s = (B.y - A.y) / L;
    for (const [g, sg] of [[p, 1], [q, -1]]) {
      const r = R.get(g) || [0, 0];
      r[0] += sg * F[k] * c; r[1] += sg * F[k] * s; R.set(g, r);
    }
  });
  for (const l of m.loads) { const r = R.get(l.g); r[0] += l.Fx; r[1] += l.Fy; }
  let worst = 0;
  for (const [g, r] of R) if (!sup.has(g)) worst = Math.max(worst, Math.hypot(...r));
  return worst;
}

function run(st) {
  const t = performance.now();
  const m = st.gen === 2 ? gen2(st) : gen(st);
  const F = m && solve(m);
  return { m, F, ms: performance.now() - t };
}

// FNV-1a over the rounded forces: equal fingerprint = identical model and forces.
function fingerprint(F) {
  let h = 2166136261 >>> 0;
  for (const ch of F.join(",")) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0");
}

const base = { seed: "truzme", c: 3, f: 100, l: 60, s: 3, w: 3, ra: true, m: 1, a: 6, d: 4, g: 5 };
const cases = [];
for (const seed of ["truzme", "abc", "q7x2", "steel", "zz9", "k1"]) {
  for (const s of [2, 3, 6]) for (const f of [50, 85, 100]) cases.push({ ...base, gen: 1, seed, s, f });
  for (const m of [0, 1, 2]) for (const a of [0, 5, 10]) for (const d of [2, 4, 10]) for (const s of [2, 4]) for (const f of [80, 100])
    cases.push({ ...base, gen: 2, seed, m, a, d, s, f });
}

let fails = 0, worst = 0, slowest = 0;
for (const st of cases) {
  const { m, F, ms } = run(st);
  slowest = Math.max(slowest, ms);
  if (!F) { fails++; console.log("UNSTABLE", recipeOf(st)); continue; }
  worst = Math.max(worst, residual(m, F));
}
console.log(`${cases.length} recipes · unstable ${fails} · worst residual ${worst.toExponential(1)} kN · slowest ${slowest.toFixed(0)} ms`);

const samples = [
  { ...base, gen: 1, f: 85 },
  { ...base, gen: 2, m: 0, a: 7, s: 2 },
  { ...base, gen: 2, m: 1, a: 7, s: 2 },
  { ...base, gen: 2, m: 2, a: 7, d: 6, s: 2 },
];
const svgDir = process.argv.includes("--svg") ? process.argv[process.argv.indexOf("--svg") + 1] : null;
if (svgDir) mkdirSync(svgDir, { recursive: true });
for (const st of samples) {
  const { m, F } = run(st);
  const rec = recipeOf(st);
  const T = F.filter((x) => x > 0.01).length, C = F.filter((x) => x < -0.01).length;
  console.log(`${rec}  n=${m.nodes.length} m=${m.members.length} T/C=${T}/${C} fp=${fingerprint(F)}`);
  if (svgDir) writeFileSync(join(svgDir, `${rec}.svg`), toSvg(m, F));
}

// Plain preview: compression red, tension blue (repo rule), width ∝ sqrt(|N|).
function toSvg(m, F) {
  const xs = m.nodes.map((g) => m.P[g].x), ys = m.nodes.map((g) => m.P[g].y);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const size = 800, sc = size / (Math.max(x1 - x0, y1 - y0) + 2), mx = Math.max(...F.map(Math.abs));
  const X = (v) => (size / 2 + (v - (x0 + x1) / 2) * sc).toFixed(1);
  const Y = (v) => (size / 2 - (v - (y0 + y1) / 2) * sc).toFixed(1);
  const lines = m.members.map(([p, q], k) => {
    const t = Math.sqrt(Math.abs(F[k]) / mx);
    const col = t < 0.08 ? "#cccccc" : F[k] > 0 ? "#2152c4" : "#cf3427";
    return `<line x1="${X(m.P[p].x)}" y1="${Y(m.P[p].y)}" x2="${X(m.P[q].x)}" y2="${Y(m.P[q].y)}" stroke="${col}" stroke-width="${(0.6 + 4 * t).toFixed(2)}" stroke-linecap="round"/>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="#ffffff"/>${lines.join("")}</svg>\n`;
}
