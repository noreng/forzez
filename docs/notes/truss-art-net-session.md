# Truss art net1/net2 — session record (2026-10-12 → 2026-11-14)

What happened in the claude.ai conversation that produced the `net1`/`net2` generators, why each decision was made, and what a Claude Code session should pick up next. The plan and ideas backlog live in [`forzez-generative-plan.md`](forzez-generative-plan.md); this note is the engineering record behind it.

## Files

| Path | What |
| --- | --- |
| [`docs/specs/truzme-art-spec.md`](../specs/truzme-art-spec.md) | The original "Truzme Art" spec the conversation started from (`pts1`, unseeded prototypes, core rules). Historical: superseded where this note or the plan disagree. |
| [`prototypes/truss-art-net/index.html`](../../prototypes/truss-art-net/index.html) | Frozen snapshot of the prototype (artifact version 2, 2026-10-12). Open in a browser. Don't edit; port. |
| [`scripts/check-truss-art.mjs`](../../scripts/check-truss-art.mjs) | Runs the prototype's generator + solver in Node (extracts the code between `/*CORE*/` and `/*END*/`), checks stability and equilibrium over 702 recipes, prints fingerprints. `pnpm check:truss-art`, add `-- --svg out/` for previews. |

Original artifact: https://claude.ai/artifact/8UXW91s8vFDmE2mRZ2xo18 (private).

## 1. Spec review (2026-10-12)

The starting spec proposed `pts1` (a 20×20 grid of pins, each with a load from a seeded flow field, the pin rotated to align with its reaction) and a planned `tri1` (independent mini-triangles coloured by tension/compression).

Findings:

- **`pts1` is not physics.** A pin under a single nodal load has a reaction equal and opposite to the load, and rotating a pin only changes the drawing. So `ra` mode is a flow field with supports drawn on. Anyone could make it in p5.js without Truzme.
- **The T/C colouring of the mini-trusses was the strongest part**, but each cell is an independent triangle: local statics. It becomes Forzez (then "Truzme Art") when forces redistribute through **one connected, statically indeterminate structure**, so nobody can predict where the compression arch or tension chain emerges. Only the solver can. That became the thesis: *the physics designs it, not just paints it.*
- **Renderer is not frozen.** The recipe reproduces the model, not the image. Either put a style token in the recipe or declare that the piece is the model. Still open.
- **Float determinism is only practical.** Rounding (forces to 0.001, angles to 0.1°) can't stop two engines landing on opposite sides of a rounding boundary, and `mx` normalisation spreads that to every value. Fine for numbers; topology must come from integer hashes only.
- **Seeds:** base36 in the URL; word seeds (`steel-vortex-42`) are better for sharing. Support both by hashing the words.
- **Product:** the art should live on the main domain, not a separate one, so image → link → openable model → user stays one funnel. (Later superseded by the Forzez brand decision: Forzez is its own site, linking one way to Truzme.)

## 2. net1 — seeded connected grid

Built the same day as a single-page prototype.

- **Grid:** 14×14 nodes at 1 m spacing. Cell `(i,j)` is kept if `hr(S,5,i,j) < f/100`; its diagonal direction comes from `hr(S,6,i,j) < 0.5`. Each kept cell becomes two triangles.
- **Always rigid:** triangles that share an edge are merged with union-find; only the largest edge-connected component is kept. An edge-connected triangle strip is rigid, so no solver-based stability filter is needed. Ties go to the lowest root index (deterministic).
- **Loads:** the same 6-component seeded field as `pts1` (wave / vortex / source-sink; `c` picks how many are used, but all 6 are always drawn from the PRNG so `c` doesn't reshuffle anything). Sampled at grid indices, not jittered positions. A node is loaded if `hr(S,7,i,j) < l/100`. Magnitudes normalised so the largest is 1 kN, rounded to 0.001.
- **Supports:** the lowest kept node of each column forms the base line; `s` supports are spaced evenly along it. First support is a pin. With 2 supports the second is a roller (determinate); with 3+ each is a pin or roller by `hr(S,8,i,0)`, which makes the structure statically indeterminate so forces visibly redistribute as you move the slider.
- **Rotated rollers** (`ra`): roller angle `(⌊hr(S,9,i,0)·5⌋ − 2)·15°`, so −30…+30°. Unlike a rotated pin, this changes the physics. Guard: if there is exactly one pin and a roller's restrained line passes (nearly) through it, the system is a mechanism, so that roller is straightened. This guard uses a trig-based threshold, which is an open determinism issue.
- **Distortion (`w`):** each node gets an independent hash offset in x and y (`hr(S,3,…)`, `hr(S,4,…)`), uniform, up to ±0.3 m at `w=10`, rounded to 0.01 m. Topology and loads don't change because both are decided in index space. It looks hand-drawn but it's white noise, so it can't produce arches. That question led to net2.
- **Solver:** 2D truss stiffness matrix (EA = 1, member stiffness 1/L), supports as penalty springs (1e8; rollers penalise only the direction normal to the rolling plane), dense Cholesky. A non-positive pivot means unstable and the UI shows "Instabil szerkezet". Member forces rounded to 0.001 kN, positive = tension. Up to ~400 DOF, 20–100 ms.
- **Recipe:** `net1.<seed>.c<c>.f<f>.l<l>.s<s>.w<w>.<ra|r0>`, e.g. `net1.truzme.c3.f85.l60.s3.w3.ra`. Written to `location.hash`, parsed back on load.

### Hash channels (both generators)

| Channel | Use |
| --- | --- |
| 1, 2 | `pts1` only (angle noise, fill) |
| 3, 4 | node jitter x, y |
| 5 | cell kept |
| 6 | diagonal direction |
| 7 | node loaded |
| 8 | support type (pin / roller) |
| 9 | roller angle |

## 3. net2 — curved bands

Question from Norbert: "How does distortion work? Can we get more arches, where groups aren't so grid-like? Waves, etc."

Answer: arches need a coherent map, not noise. net2 keeps the net1 topology in `(i,j)` parameter space and only sends the positions through a smooth, fold-free map, so no triangle can invert.

- **Wave (`m0`):** 25 columns × `d` rows. Rows are offset along the normal of a sine centreline (`kw` ∈ {1, 1.5, 2, 2.5} periods, phase `wph`). Amplitude is capped so the centreline's curvature radius stays larger than the band's half-width, so rows never cross.
- **Arch (`m1`):** polar band. Opening angle 40°–200° from `a`, radius chosen so the intrados radius stays positive. With exactly 2 supports **both are pins**: that gives the horizontal reaction an arch needs. With a roller it would be a curved beam.
- **Swirl (`m2`):** 18 columns × `min(18, 2d)` rows; rotation by θ(r) = ±a·π·exp(−r²/σ²) around 1 or 2 seeded centres. Rotation by a radius-dependent angle is bijective and area-preserving, so it's fold-free at any amplitude.
- **Fixed draw count:** the form parameters (`kw`, `wph`, two swirl centres, one-vs-two flag) are always drawn after the 6 field components, whatever the form, so switching form doesn't change the field.
- **Gravity (`g`):** each load is `(1−g/10)·field + (g/10)·(0,−1)`, renormalised to a 1 kN maximum.
- **Loads in world space:** net2 samples the field at the mapped position ("the field is the weather"). Physically honest, but the curvature slider then also changes loads, which breaks rule 4 (one slider = one layer). Open decision.
- **Fill default 100%:** in thin bands (2–4 rows) holes split the band, and "largest component" then drops half the arch.
- **Recipe:** `net2.<seed>.m<0|1|2>.a<0–10>.d<2–10>.c<1–6>.f<50–100>.l<10–100>.g<0–10>.s<2–6>.w<0–10>.<ra|r0>`, e.g. `net2.truzme.m1.a6.d4.c3.f100.l60.g5.s2.w3.ra`.

## 4. Prototype UI (as frozen)

- Square canvas plate + control column; stacks on phones. Light/dark via CSS tokens.
- Controls: seed + random seed, generator toggle (net1 / net2), form (wave / arch / swirl), sliders, rotated-rollers checkbox, recipe box + copy.
- View options, not part of the recipe: **Line** (colour mixed from grey to the force colour by √(|N|/max), width 0.7–5.3 px) and **Plotter** (two pens, 1–3 parallel passes by force). Toggle loads and supports.
- Stats: nodes, members, reactions, degree of indeterminacy `m + r − 2n`, T/C counts, max |N|.
- Colours: tension blue, compression red. This matches the repo rule (`tension` blue, `compression` red); decided 2026-10-13.

**Porting caveat:** the prototype breaks several DESIGN.md rules: hard-coded hex colours, Hungarian UI copy, uppercase letter-spaced labels, non-Plex fonts. A port into `apps/web` must use `@forzez/tokens` roles and `@forzez/ui` components, English copy, and pass `pnpm check:design`.

## 5. Verification

Done in the conversation and reproduced by `scripts/check-truss-art.mjs`:

- 702 recipes (6 seeds; net1 × supports × fill; net2 × form × curvature × depth × supports × fill): **0 unstable**, worst free-node equilibrium residual **2.4e-3 kN** (the 0.001 rounding), slowest **~80–110 ms**.
- Arch under pure gravity (`g10`): 151 compression / 91 tension members. The extrados carries compression and the intrados is the tied side, as expected.
- Fingerprints at the time of import (compare after porting; any change means the port isn't faithful):

```
net1.truzme.c3.f85.l60.s3.w3.ra               n=193 m=498 T/C=274/216 fp=476b35fb
net2.truzme.m0.a7.d4.c3.f100.l60.g5.s2.w3.ra  n=100 m=243 T/C=121/122 fp=c9b25ba7
net2.truzme.m1.a7.d4.c3.f100.l60.g5.s2.w3.ra  n=100 m=243 T/C=104/138 fp=c95ea02a
net2.truzme.m2.a7.d6.c3.f100.l60.g5.s2.w3.ra  n=216 m=589 T/C=260/329 fp=62375566
```

These are V8 (Node 22) values. Cross-engine equality is not guaranteed (see the float-determinism issue).

## 6. Brainstorm: making it T-shirt / wallpaper worthy (2026-10-12)

Diagnosis: every member has the same weight and the density is uniform, so it reads as an FEM mesh screenshot: nice, but no silhouette. Prints need something readable from 3 m that is still true up close.

Top three, in order:

1. **Topology optimisation → Michell-like trusses.** Dense ground structure, remove low-|N| members, re-solve, keep stable. Bone/tree forms, entirely solver-driven. (`prototypes/michell-truss-generator/` exists separately and is worth comparing.)
2. **Title block.** Engineering-drawing stamp: Sheet No., recipe / Forze Code, `n m r`, degree of indeterminacy, max |N|, equilibrium residual. In-joke for engineers, credible ornament for everyone else.
3. **Text as truss.** Masked domain (Poisson-disk + Delaunay) shaped like a word or name: "Your name, structurally verified."

The full list (force-flow lines, deformed shape, negative space, 2-ink screen print, risograph, buckling / failure, moving loads, personal seeds) is in [`forzez-generative-plan.md`](forzez-generative-plan.md), which has since grown much larger (themes, fracture, fields).

## 7. Open issues (before freezing any generator version)

- [ ] Roller-angle mechanism guard uses `sin/cos` near a threshold → replace with an integer/rational test.
- [ ] Renderer freezing: style token in the recipe, or "the piece is the model".
- [ ] net2 world-space load sampling vs rule 4: keep or move to parameter space.
- [ ] Forze Code / Truzme Project code export (not built).
- [ ] Word seeds.
- [ ] Scale: 1000–2000+ members needs a sparse/banded solver instead of dense Cholesky (O(n³), already ~100 ms at ~600 members).
- [ ] Cross-engine check: run the fingerprints in SpiderMonkey/JavaScriptCore as well as V8.

## 8. Suggested next steps for Claude Code

1. Port `gen`, `gen2`, `solve`, `recipeOf` into a typed module (e.g. `apps/web/src/app/lab/truss-art/` next to `lab/equilibrium`, or a `packages/art` package if it'll be shared with the films tool). Keep it pure (no DOM). Make it match the fingerprints above.
2. Swap the dense solver for a banded/sparse one. Bandwidth is small because node ids follow the grid.
3. Lab page with `@forzez/ui` controls, tokens, English copy; recipe in `location.hash`.
4. Then the plan's order: title block → `opt1` topology optimisation → masked domains / text-as-truss → SVG/PNG export → plotter-order drawing animation.
