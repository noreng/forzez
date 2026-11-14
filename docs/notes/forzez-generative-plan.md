# Forzez — generative art plan (2026-10-13, fields updated 2026-10-21)

Companion to `forzez-roadmap.md`. Collects everything from the Truzme Art spec review, the net1/net2 prototypes and the "what makes it T-shirt / wallpaper worthy" brainstorm.

Prototype: `prototypes/truss-art-net/` (snapshot of https://claude.ai/artifact/8UXW91s8vFDmE2mRZ2xo18). Engineering record: [`truss-art-net-session.md`](truss-art-net-session.md). Check: `pnpm check:truss-art`.

## Thesis
**The physics designs it, not just paints it.** A piece is only Forzez if the solver decides something nobody could fake with a shader: where the compression arch and the tension chain emerge, which members survive, what fails.
- `pts1` (support-aligned field) fails this test: a pin on a loaded node just mirrors the load. It's a flow field with supports drawn on. Keep it as a reference, not as a flagship.
- Independent mini-triangles (`tri1` idea) are local statics. Connected structures, where forces redistribute globally, are the core.

## Where we are
### net1 — seeded connected grid (done, prototype)
- 14×14 nodes, hash-chosen cells + diagonals, keep the largest edge-connected triangle component (always rigid → no solver filter needed).
- Loads from the seeded field (6 components, `c` picks how many), sampled on grid indices.
- Supports on the lowest node per column, evenly spaced; 2 = pin+roller, 3+ = hash-chosen mix → statically indeterminate, force redistribution visible.
- Rotated rollers (−30…+30°, 15° steps) change the physics. Guard: if a lone pin and a roller's line pass through each other, straighten the roller.
- **Distortion (`w`)**: per-node independent hash offset, ±0.3 m at w=10, rounded to 0.01. Topology and loads unchanged. Looks hand-drawn, but it's white noise → no arches.
- Solver: dense stiffness + Cholesky, penalty supports, forces rounded to 0.001 kN. Equilibrium residual ≈ rounding (≤ 0.003 kN). 20–100 ms.
- Recipe: `net1.<seed>.c3.f85.l60.s3.w3.ra`

### net2 — curved bands (done, prototype)
- Same hash topology in (i,j) parameter space, positions through a smooth fold-free map:
  - **Wave**: normal offset along a sine centreline; curvature capped so curvature radius > band half-width.
  - **Arch**: polar band, 40–200°, intrados radius always > 0. Two supports → two pins (thrust, not a curved beam).
  - **Swirl**: rotation θ(r) around 1–2 centres; bijective + area-preserving, safe at any amplitude.
- New param **gravity** `g`: blend of field load and self-weight-like downward load.
- Loads sampled in world space ("the field is the weather") → the curvature slider also changes loads slightly. Violates rule 4 (independent layers). Decide: keep (physically honest) or sample in parameter space.
- Fill defaults to 100%: thin bands split when holed, and "largest component" drops half the arch.
- Recipe: `net2.<seed>.m1.a6.d4.c3.f100.l60.g5.s2.w3.ra`

## Open issues (fix before freezing any version)
- [x] **Colour convention.** Decided 2026-10-13: Compression **Red**, Tension **Blue** (Bridge Designer convention). The prototype already uses this — keep it. Truzme flips its default to match.
- [ ] **Roller-angle guard uses trig near a threshold** (collinearity test) → could flip between engines. Replace with integer/rational test before freezing.
- [ ] **Renderer not frozen.** Recipe reproduces the model, not the image. Either add a style token to the recipe (`….s1`) or declare "the piece is the model".
- [ ] **Float determinism is only "visual".** Rounding can't stop two engines landing on opposite sides of a 0.0005 boundary; `mx` normalisation spreads it. OK for numbers, never for topology.
- [ ] **Project code / Forze Code export** not built (schema details needed).
- [ ] Seed format: base36 in URL, word seeds (`steel-vortex-42`) for sharing — hash the words, support both.
- [ ] Scale check: how Truzme renders/solves 1000–2000+ members.
- [ ] Failure-order determinism (fracture themes): float-driven topology → tie-break by index + margin, or store the order in the Forze Code.

## Recipe ↔ Forze Code
The generative recipe is the natural Forze Code for generated pieces: a few dozen chars, versioned, reproducible forever (frozen generators). Content-addressed hash only needed for hand-edited models. Keep both: `FZ-…` short code can map to either.

## Ideas backlog (brainstorm 2026-10-12)

### A. Physics that designs (the "wow")
1. **Topology optimisation → Michell-like trusses.** Start from a dense ground structure, iteratively remove low-|N| members, re-solve, keep stable. Bone/tree-like, organic, 100% engineering. **Priority 1.**
2. **Force-flow lines.** Chain high-force members into continuous tension/compression "strands" (principal-stress trajectories). Combed-hair look, ideal for the plotter.
3. **Deformed shape.** Displacements ×50–200, ghost of the undeformed shape behind. Animated: the load "sits down" on the structure.

### B. Composition and form
4. **Masked domains.** Poisson-disk points inside a shape + Delaunay instead of a grid: bridge silhouette, mountain, letters, logo.
5. **Name / word as truss.** "Your name, structurally verified." Most sellable idea (gifts). FORZEZ wordmark itself as a truss. **Priority 3.**
6. **Negative space.** Wallpaper 16:9, structure off-centre (golden section), room for desktop icons. The current mesh fills everything and reads as an FEM screenshot.
7. **Hierarchy.** Few heavy members, many faint ones; readable from 3 m, true up close.

### C. Identity: the title block (**Priority 2**)
- Engineering-drawing stamp in the corner: Sheet No., Forze Code / recipe, `n=193 m=498 r=4`, degree of indeterminacy, max |N|, equilibrium residual `Σ = 0.002 kN`.
- In-joke for engineers, credible ornament for everyone else; matches product naming ("Sheet No. 017").
- Dry humour options: "Statically indeterminate. Like me." · "In equilibrium. Mostly."

### D. Palette and print technique
- 2-colour screen print: T and C are exactly 2 inks → cheap T-shirts. Line weight carries info even in one colour.
- Risograph feel: fluo pink + blue, slight layer misregistration.
- 4K wallpaper: ~2000+ members, very thin faint lines, detail when zoomed.
- Plotter view (already in prototype): 2 pens, high force = 2–3 parallel passes.

### E. Drama and motion (video, live wallpaper)
- **Buckling / failure.** Real section → overloaded members highlighted or "break". Video: load ramps up, structure collapses.
- **Moving load / influence lines.** A load travels across the bridge, colours ripple. Live wallpaper (Wallpaper Engine).
- **Drawing animation in plotter order** (compression pen, then tension pen) → the "13 minutes of ink in 30 seconds" video.

### F. Personal seeds
- Birth date, a city's wind data, a song's loudness as the load. "The truss of your day."

### G. Themes where force matters (brainstorm 2026-10-13)
Series idea: group by force type → **Tension series** (one blue pen), **Compression series** (one red pen), **Equilibrium series** (both + balance).

**Tension-only (form-finding, force density method computes the shape)**
- Spider web (orb: radials + spiral, prestressed) — one blue pen, kid favourite.
- Soap film / bubbles — minimal surfaces, Plateau's 120° junctions; Frei Otto's soap-film models.
- Frei Otto cable nets / tents — Munich Olympic roof.
- Bicycle wheel — tensioned spokes around a compression rim (same idea as the arch-with-spokes piece).
- Suspension bridge cables, hammock, fishing net, sail, kite, trampoline / drum skin.

**Compression-only (funicular / thrust lines)**
- Hanging chain → inverted arch (Gaudí's hanging models, Sagrada Família).
- Stone arch with voussoirs + thrust line; Gothic flying buttresses; domes (Pantheon, Brunelleschi).
- Balanced stone cairns / rock stacking.

**Compression series — stones & arches (brainstorm 2026-10-15)** — one red pen.
1. **Granular force chains** (strongest). Random disk packing under gravity → contact forces form branching force chains: a few thick red veins, many near-idle grains. Truly compression-only and the solver decides the load paths. Physicists photograph this with photoelastic disks. Needs a new solver: contact network, compression-only (LP or iterative). Related: silo / Janssen effect (walls carry part of the weight).
2. **Four hinges — how a masonry arch fails.** Supports spread → thrust line leaves the thickness → 4 hinges → mechanism. Rigid-block contact equilibrium; physics picks where joints open. Ideal video. Story: Milanković solved the minimum-thickness arch problem in 1907, before he became famous for ice ages. Heyman's safe theorem: the arch stands if a thrust line fits inside.
3. **Thrust Network Analysis (Block, ETH).** Random plan boundary → compression-only vault + reciprocal force diagram (Maxwell lineage, same story as the magnetic diptych). Reference: Armadillo Vault (Venice 2016), dry-set stone shell, no mortar. Diptych: form beside force.
4. **Corbel arch + book-stacking problem.** Mycenae / Maya false arches, cantilevered courses. Max overhang grows with the harmonic series. Easy to generate and verify.
- Smaller: Gaudí's Colònia Güell hanging model (3D chain net), fan vault (King's College Chapel), igloo catenary dome, eggshell, Great Pyramid relieving chambers (gabled blocks over the King's Chamber), Guastavino / Catalan tile vaults.
- Start with force chains: new solver, but least "engineering drawing" and most "physics designs it".

**Both: tension + compression in one piece**
- Tensegrity (Snelson's Needle Tower): floating red struts in blue cables — perfect for the palette.
- Calder-style mobiles — hanging equilibrium, Bauhaus-adjacent art history.
- Bow & arrow, catapult, umbrella, tent poles + guy lines, tower crane.

**Nature (structure shaped by load)**
- Bones: Culmann's crane drawing vs. the femur's trabeculae (Culmann & Meyer story — graphic statics origin myth).
- Bird wing bone with an internal Warren truss (vulture metacarpal).
- Trees & roots under wind, leaf venation, bamboo, honeycomb, eggshell, radiolarians/diatoms (Haeckel), dandelion pappus.
- Crack patterns (dried mud, crackle glaze) — stress release; water droplets (surface tension).

**Polygon / low-poly (brainstorm 2026-10-15)**
Inspiration: Catmull & Parke's triangulated hand (1972, Pixar documentary). Rule: a mesh alone is decoration (same trap as fields) — it's Forzez only when force runs through the mesh or the mesh depends on the force. Old masters (Michelangelo, Dürer, Leonardo) are public domain → sellable.
1. **The Creation, as two cantilevers** (strongest). Both arms are triangulated trusses, fixed at the shoulder, self-weight: top chord blue, bottom red, physics colours it. Diptych / video: **The gap** (two separate structures) vs. **The touch** (a tiny contact makes one structure, forces redistribute across both bodies, equal and opposite at the fingertip). Line: "For every Forzez, an equal and opposite…"
2. **Your hand (Catmull homage)** — product. Photo → outline → masked domain (B.4) → Delaunay → truss holding something. Best version: parent's hand holding a child's hand. Gift, family brand. "Your hand, structurally verified."
3. **Adaptive mesh.** Solve → refine triangles where |N| is high → re-solve. Polygon density itself shows stress: the low-poly look is designed by the physics. Cleanest answer to the thesis.
4. **Contrapposto.** Standing figure (David-like pose), weight on one leg: red column vs. an almost idle leg.
5. **Praying hands (Dürer, 1508).** Two palms pressed together, pure compression → Compression series.
- Smaller: arm wrestling (one arm tension, one compression), climbing grip, handshake; low-poly animals under self-weight (elephant legs = red columns, giraffe neck = cantilever, bird wing truss — rhymes with the Culmann femur, kid favourite).
- Order: Creation first, then the hand product.

**Fracture & explosion (brainstorm 2026-10-15)** — test-bridge background; expands E. failure.
1. **Failure sequence** (strongest, almost free: a loop around the existing solver). Ramp load → first member over capacity drops out (compression: Euler buckling, tension: rupture, seeded strengths) → re-solve → repeat until mechanism. Print: members numbered + gradient in failure order; title block `Failure load 3.42 kN · first: #47, buckling`. Video: load to collapse. Social: "Which member fails first?" — answer in the next video.
2. **Lattice crack.** Dense spring/lattice net with seeded bond strengths; bonds over threshold break, re-solve → physics draws the crack path (dried mud / glass look), red-blue concentration at the crack tip. Not Voronoi fracture (that's a shader).
3. **Explosion.** Point blast pressure decaying with distance as the load; solver picks what fails; fragments = connected components after failure, flying ballistically. Print: "40 ms after the blast" freeze; slow-motion video.
4. **Buckling mode.** Global buckling eigenmode as a ghost behind the structure; compression members drawn slightly bowed. Plotter-friendly.
5. **Force-exploded view.** Engineering exploded drawing: each member moves away from its nodes in proportion to its force — the layout is designed by the force.
- Smaller: Prince Rupert's drop (compressed skin, tension core), domino chain reaction, ice cracking.
- Determinism: failure order is a topology decision from floats (breaks the integer-hash rule). Needs deterministic tie-break by index + margin, or store the order in the Forze Code.
- Start with the failure sequence.

**Human & play**
- Acrobat human pyramid, tightrope walker, climber on a wall (force vectors), seesaw, tug of war, house of cards, Jenga.
- Forth Bridge human cantilever demonstration (1887 photo) — redraw as forces.

**Famous structures (Series 01 candidates)**
- Lánchíd, Erzsébet híd, Forth Bridge, Golden Gate, Eiffel Tower, Millau, Sydney Harbour, Pont du Gard, Rialto.

**Fields (updated 2026-10-21)**
Rule: a field drawn on its own is `pts1` again (flow field, no solver). A field earns its place as the **load on a structure** ("the field is the weather"), and the structure answers in red/blue.
- **Black hole / tidal truss** (strongest of the three). A truss falling into a black hole: tidal acceleration relative to the CoM ≈ GM/r³·(3r̂r̂ᵀ − I)·d → stretches radially, squeezes tangentially. Radial members turn blue, ring members red, nobody told them to. Load is self-equilibrated (free fall) → solve free-free with 3 minimal constraints; reactions ≈ 0 is the built-in sanity check (title block: `R = 0.000 kN`). Video: approach → spaghettification, members fail one by one (ties into E. failure). Lensing distortion = renderer only, keep it out of the physics. Fits the **G-Forzez** series.
- **Kármán vortex street.** Point-vortex model (analytic, cheap, deterministic; stable spacing h/a ≈ 0.281) as wind load on a net, chimney or cable stay. Vortex shedding = alternating side loads → colours flip side to side; live wallpaper / video candidate. Engineering hook: helical strakes on chimneys, cable vibration. Story: Kármán Tódor was born in Budapest → "plotted in Budapest" tie-in. Don't claim Tacoma Narrows (the collapse was torsional flutter).
- **Magnetic field.** Dipole lines alone = flow field. Forzez versions: steel nodes pulled toward a magnet (strong distance falloff), structure answers; or a diptych "Field vs. Force" (dipole field lines beside a Michell truss — they rhyme visually). Story: Maxwell wrote both the field equations and "On reciprocal figures and diagrams of forces" (1864), a founding text of graphic statics → About / social content.
  - **Live magnet — phone magnetometer as the load** (added 2026-10-21). The measured counterpart of the simulated version: same ~1/r³ dipole falloff, but from a real fridge magnet. Inspiration: magnet-eyes (github.com/betomoedano/magnet-eyes — SwiftUI + Core Motion, ~60 Hz, low-pass, fixed baseline, ΔB = B − baseline).
    - Physics: phone flat on the table → baseline-subtracted ΔB_x, ΔB_y = one nodal force vector; re-solve every frame (tens of members, cheap). Flip the magnet → force flips → red and blue swap. A single vector = a load, not wallpaper → passes the field rule.
    - Mapping: 1/r³ means nothing, then everything in the last few cm → sqrt/log mapping + clamp + deadzone.
    - Sensor access: raw web `Magnetometer` (Generic Sensor API) only behind a Chromium flag (Android); iOS Safari exposes no raw field. Compass heading (`deviceorientationabsolute` / `webkitCompassHeading`) works everywhere but is a fused, filtered angle → load direction only, no magnitude. Full ΔB needs a native wrapper (Capacitor plugin / Swift). Prefer the uncalibrated sensor: OS bias estimation can absorb a static magnet. Strong neodymium can saturate the sensor.
    - Determinism: live input has no Forze Code by itself → record the ΔB(t) trace (a few hundred samples); the trace is the seed.
    - Video: split screen — hand + fridge magnet left, truss right. Magnet distance = load ramp → hooks into the failure sequence (members drop out in order). Working title: *Can a fridge magnet break a bridge?*
    - Placement: Forzez demo page / video, not the Truzme app (school-safe guardrail; laptops/Chromebooks usually have no magnetometer).
- Also: gravity orbits, pendulum / harmonograph traces, wind streamlines — same rule, load not wallpaper.

Top picks for first experiments: spider web, soap bubbles, hanging chain → arch, tensegrity, bicycle wheel, Calder mobile, Culmann femur, black-hole tidal truss, granular force chains, The Creation (gap vs. touch), failure sequence.

## Suggested order
1. Title block on the current net2 (small, immediately makes wallpapers/prints better).
2. Topology optimisation generator (`opt1`) — biggest question mark: is it as beautiful as expected?
3. Masked domains → text-as-truss.
4. PNG/SVG export at wallpaper and print sizes.
5. Plotter-order drawing animation → first video (ties into roadmap "First video").
6. Freeze first versions (fix trig guard, decide renderer freezing), then Forze Code.

## Rules that stay (from the original spec)
- Recipe, not model, in the link (`#fragment`, no backend).
- Published generator versions are frozen; fixes = new version; old generators stay in the bundle.
- Own PRNG: FNV-1a → mulberry32. Per-cell randomness from `hash(seed, channel, i, j)`; global draws always a fixed count.
- Topological decisions only from integer hash output.
- Opening a piece = new local model (`createLocalModel({ source: { kind: 'art', recipe } })`).
- Truzme stays school-safe; Forzez links one way ("Powered by Truzme").
