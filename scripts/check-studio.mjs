// Checks that the Studio generators in apps/web match the frozen prototypes exactly.
//   - net1/net2 (apps/web/src/app/studio/_lib/net.ts) against prototypes/truzme-art-net: same model and
//     forces over the 702-recipe sweep of check-truss-art.mjs, plus the recorded fingerprints;
//   - pts1 (supports.ts) against prototypes/pts1-seeded-supports over a sweep, plus the golden hash
//     from docs/specs/truzme-art-spec.md.
// Node ≥ 22.18 runs the .ts modules directly (type stripping).   pnpm check:studio

import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as net from "../apps/web/src/app/studio/_lib/net.ts";
import * as sup from "../apps/web/src/app/studio/_lib/supports.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
let failures = 0;
const fail = (msg) => {
  failures++;
  if (failures <= 10) console.error("MISMATCH", msg);
};

// ---- net1 / net2 ----
const netHtml = readFileSync(join(root, "prototypes/truzme-art-net/index.html"), "utf8");
const netCore = netHtml.split("/*CORE*/")[1].split("/*END*/")[0];
const proto = new Function(`${netCore}; return { gen, gen2, solve, recipeOf };`)();

const base = { seed: "truzme", c: 3, f: 100, l: 60, s: 3, w: 3, ra: true, m: 1, a: 6, d: 4, g: 5 };
const cases = [];
for (const seed of ["truzme", "abc", "q7x2", "steel", "zz9", "k1"]) {
  for (const s of [2, 3, 6]) for (const f of [50, 85, 100]) cases.push({ ...base, gen: 1, seed, s, f });
  for (const m of [0, 1, 2]) for (const a of [0, 5, 10]) for (const d of [2, 4, 10]) for (const s of [2, 4]) for (const f of [80, 100])
    cases.push({ ...base, gen: 2, seed, m, a, d, s, f, ra: (a + d) % 2 === 0 });
}
let worst = 0;
for (const st of cases) {
  const rec = proto.recipeOf(st);
  if (net.netRecipe(st) !== rec) fail(`recipe ${rec}`);
  const a = st.gen === 2 ? proto.gen2(st) : proto.gen(st);
  const b = net.generate(st);
  if (JSON.stringify(a) !== JSON.stringify(b)) { fail(`model ${rec}`); continue; }
  const Fa = a && proto.solve(a), Fb = b && net.solve(b);
  if (JSON.stringify(Fa) !== JSON.stringify(Fb)) { fail(`forces ${rec}`); continue; }
  if (Fb) worst = Math.max(worst, net.residual(b, Fb));
  const back = net.parseNetRecipe(rec);
  if (!back || net.netRecipe(back) !== rec) fail(`parse ${rec}`);
}
console.log(`net: ${cases.length} recipes compared · worst residual ${worst.toExponential(1)} kN`);

function fingerprint(F) {
  let h = 2166136261 >>> 0;
  for (const ch of F.join(",")) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0");
}
const recorded = {
  "net1.truzme.c3.f85.l60.s3.w3.ra": "476b35fb",
  "net2.truzme.m0.a7.d4.c3.f100.l60.g5.s2.w3.ra": "c9b25ba7",
  "net2.truzme.m1.a7.d4.c3.f100.l60.g5.s2.w3.ra": "c95ea02a",
  "net2.truzme.m2.a7.d6.c3.f100.l60.g5.s2.w3.ra": "62375566",
};
for (const [rec, fp] of Object.entries(recorded)) {
  const st = net.parseNetRecipe(rec);
  const got = fingerprint(net.solve(net.generate(st)));
  if (got !== fp) fail(`fingerprint ${rec}: ${got}, recorded ${fp}`);
}
console.log(`net: ${Object.keys(recorded).length} recorded fingerprints checked`);

// ---- pts1 ----
const ptsHtml = readFileSync(join(root, "prototypes/pts1-seeded-supports/index.html"), "utf8");
const ptsCode = ptsHtml.match(/<script>([\s\S]*?)function draw\(/)[1].replace(/const GEN=[^\n]*\n/, "const N=20,FMAX=1;\n");
const ptsGen = new Function(`${ptsCode}; return gen;`)();
let ptsCases = 0;
for (const seed of ["truzme", "abc", "q7x2", "steel", "zz9", "k1"])
  for (const c of [1, 3, 6]) for (const j of [0, 1, 10]) for (const f of [30, 75, 100]) for (const ra of [true, false]) {
    const st = { seed, c, j, f, ra };
    ptsCases++;
    if (JSON.stringify(ptsGen(st)) !== JSON.stringify(sup.supportsGen(st))) fail(`pts1 ${sup.supportsRecipe(st)}`);
    const rec = sup.supportsRecipe(st), back = sup.parseSupportsRecipe(rec);
    if (!back || sup.supportsRecipe(back) !== rec) fail(`parse ${rec}`);
  }
const golden = createHash("sha256")
  .update(JSON.stringify(sup.supportsGen({ seed: "truzme", c: 3, j: 1, f: 100, ra: true })))
  .digest("hex")
  .slice(0, 16);
if (golden !== "f025aad1e623f423") fail(`pts1 golden hash ${golden}`);
console.log(`pts1: ${ptsCases} recipes compared · golden hash ${golden}`);

if (failures) {
  console.error(`${failures} mismatches: the port is not faithful.`);
  process.exit(1);
}
console.log("Studio generators match the prototypes.");
