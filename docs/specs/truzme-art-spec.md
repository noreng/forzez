# Truzme Art — spec (2026-10-12)

Origin: written in the claude.ai Truzme project before the art direction moved to Forzez. Imported 2026-11-14.

**Read with `docs/notes/forzez-generative-plan.md`, which supersedes parts of this:**
- Home: Forzez (forzez.com), not a `/art` page on truzme.com. Truzme stays school-safe; Forzez links one way ("Powered by Truzme").
- Thesis got stricter: *the physics designs it, not just paints it.* `pts1` fails that test (a pin on a loaded node only mirrors the load) and stays a reference, not a flagship. The connected generators `net1` / `net2` came after this spec.
- How net1/net2 were built (algorithms, verification, porting caveats): `docs/notes/truss-art-net-session.md`.
- Colour convention: compression red, tension blue (decided 2026-10-13). The mini-truss prototype already used it.

The determinism rules and the frozen `pts1` reference below still hold.

Prototypes: `prototypes/pts1-seeded-supports/`, `prototypes/reaction-grid/`, `prototypes/mini-truss-grid/`, and the later `prototypes/truzme-art-net/` (net1 + net2).

## Idea

Generative art made of real truss models. Pre-built generators with a seeded random source; the user tweaks a few parameters, and a **seed** makes their piece stable: reproducible and shareable. Every piece opens in Truzme as a real, solvable model.

What makes it Truzme-specific: load directions, support orientations and (with members) tension/compression colouring are engineering results, not decoration.

## Core rules

1. **Recipe, not model, in the link.** A piece is `generator + version + seed + params`, e.g. `pts1.truzme.c3.j1.f100.ra`: a few dozen characters, in a URL fragment, no backend. The model itself is ~40–100 kB of Project code.
2. **Versions are frozen.** Once a generator version is published, its code never changes. Any fix or tweak is a new version (`pts2`). Old recipes must render identically forever, so old generators stay in the bundle. Once a piece is sold, this is a promise to the buyer, not just hygiene.
3. **Own PRNG.** `Math.random` is not seedable. Seed string → FNV-1a 32-bit hash → mulberry32.
4. **Independent random streams.** Global structure comes from one PRNG that always draws a fixed number of values (always 6 field components; `complexity` only chooses how many to use). Per-cell randomness comes from a hash of `(seed, channel, i, j)`, not a shared sequence. Moving one slider then changes only its own layer, not the whole picture: tuning, not re-rolling.
5. **Float determinism.** `Math.sin/cos/exp` aren't bit-specified across engines (V8 vs SpiderMonkey). Round outputs (forces to 0.001, angles to 0.1°). **Topological decisions** (keep or drop a node, add or omit a member, choose a template) come from integer hash output, never from a trig value near a threshold.
6. **Stability.** Once generators place members: either build only from stable templates, or use the solver as a filter (unstable → deterministic next candidate, recorded so reproduction matches).
7. **Opening a piece** in Truzme creates a new local model (`createLocalModel({ source: { kind: 'art', recipe } })`), then it's an ordinary editable truss.

## Project code facts used (schema 1.1.0)

- `supports[].angle`: optional, degrees CCW. On a roller it changes the restrained direction; **on a pin it only changes the drawing.**
- `nodalLoads[].mode`: drawing only. Default `push` = arrow head at the node; `pull` = tail at the node, pointing away.
- Members: `{ id, from, to, section, material }`. Roller: `{ x: false, y: true }` (+ `angle`).
- Units: m, mm, kN, N/mm², mm², kg/m³. Material S235 (#F9DC85), section CHS 114.3×6 (#FF908D), copied from Norbert's first sample.

## `pts1` — seeded support points (frozen reference)

Source: `prototypes/pts1-seeded-supports/index.html`. Don't change it; a fix is `pts2`.

20×20 grid, 1 m spacing, nodes at x = i, y = 19 − j. Each kept node gets a pin support and one nodal load (push). Load magnitudes are normalised so the largest is 1 kN.

| Param | Range | Meaning |
| --- | --- | --- |
| `seed` | a–z, 0–9 | lowercased, other characters stripped |
| `c` | 1–6 | field components used (of 6 always drawn) |
| `j` | 0–10 | per-node angle noise, ±j/20 · π |
| `f` | 30–100, step 5 | fill: share of nodes kept (hash channel 2) |
| `ra` / `r0` | | pin rotated to the reaction, or upright |

Recipe: `pts1.<seed>.c<c>.j<j>.f<f>.<ra|r0>`.

Field components: type 0 wave (sinusoid across a direction θ), 1 vortex (Gaussian), 2 source/sink (Gaussian). Hash channels: 1 angle noise, 2 fill.

Support alignment: the pin is rotated so the reaction points from its base to the node; the push load arrives from the opposite side, so load, node, reaction and base sit on one axis per cell.

Output: node ids 1..n in grid order, support id = node id, `angle` omitted when 0, loads only where Fx or Fy ≠ 0 (sequential ids).

**Golden check:** `gen({ seed: 'truzme', c: 3, j: 1, f: 100, ra: true })` returns 400 points, and the first 16 hex characters of SHA-256 over `JSON.stringify` of that array are `f025aad1e623f423` (Node 22, 2026-11-14). Any port of `pts1` must reproduce this.

## Unseeded prototypes (2026-10-04, not versioned)

- **Reaction grid** (`prototypes/reaction-grid/`): 20×20, 1 m, pin + load per node; six fixed fields (vortex, wave, dipole, flow, radial, spiral) with one parameter `k`. Loads normalised to max 1 kN. Known mismatch: the preview draws loads as pull, the exported code has no `mode` (push).
- **Mini trusses** (`prototypes/mini-truss-grid/`): 20×20 cells, each a 3-member triangle: pin at (i+0.2, Y+0.15), roller at (i+0.8, Y+0.15), apex at (i+0.5+lean·0.3·cos a, Y+0.15+h), h = 0.5 or 0.2+0.45·m. Load at the apex, `mode: "pull"` when Fy > 0. The preview solves each triangle by statics and colours tension blue, compression red, width ∝ |N|; that colouring was the most striking part, and led to the connected `net` generators.

## Product questions (status 2026-10-12; see the Forzez notes for later answers)

- Share = recipe link + image. People share pictures, so client-side PNG export is needed.
- Control: a few curated sliders per generator. Fewer is better for "my piece" ownership.
- Seed format: random base36 vs word seeds (`steel-vortex-42`) for sharing.
- Gallery without a backend: hand-picked recipes in a static list.
- Scale: 400 points ≈ 40 kB of Project code; mini trusses are 1200 nodes and 1200 members. Check how Truzme renders and solves at that size.
