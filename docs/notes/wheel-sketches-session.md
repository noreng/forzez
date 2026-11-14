# Wheel and ring sketches — session record (2026-10-27)

What came out of the claude.ai conversation that started with "what can you say about a bicycle wheel, statically?" and ended with six new Elements side plates sketched. The contents entries live in [`docs/elements/elements-of-statics-toc.md`](../elements/elements-of-statics-toc.md) (✏️ = sketched here, not on the canvas). This note is the engineering record behind them.

## Files

| Path | What |
| --- | --- |
| [`prototypes/wheel-sketches/`](../../prototypes/wheel-sketches/) | The nine chat widgets, verbatim, each wrapped as a standalone page. `index.html` links them. Frozen: don't edit; port. |

Widget colours are the chat host's palette (`#E24B4A` red, `#378ADD` blue, `#EF9F27` yellow), not `@forzez/tokens`. Map them to `compression` / `tension` / `force-3` when porting.

| # | Widget | Becomes |
| --- | --- | --- |
| 01 | Bicycle wheel, load + prestress sliders, spoke-tension bar chart | Side plate: the bicycle wheel (interactive version) |
| 02 | Hub polygon + rim node triangle | Same plate, joint detail |
| 03 | Bicycle vs wagon wheel, hub polygons traversed both ways | Side plate: the wagon wheel (diptych) |
| 04 | Half-wheel bridge + hub polygon closed by the load | Side plate: the half-wheel bridge — **geometry needs the fix below** |
| 05 | Spider web + four-arrow node polygon | Side plate: the spider web |
| 06 | Spoked-wheel roof plan + outer/inner ring node triangles | Side plate: the spoked-wheel roof |
| 07 | Hemispherical dome, plan + section, 51.8° split | Side plate: the Pantheon dome |
| 08 | Triangular truss + Cremona diagram | Book IV.V |
| 09 | Hanging chain + load line, pole, rays | Book V.I ("drag the pole" interactive plate) |

## The idea that ties them together

A ring, spokes and a hub, with red and blue swapped between variants:

| Structure | Spokes | Ring | Hub |
| --- | --- | --- | --- |
| Bicycle wheel | tension (prestressed) | compression | stands on the bottom spokes (they lose tension) |
| Wagon wheel | compression | tension (shrunk-on tyre) | stands on the bottom spoke, pushing |
| Half-wheel bridge | tension (no prestress) | compression (arch) | really hangs from the ties |
| Spoked-wheel roof | tension cables | outer compression, inner tension | — |
| Spider web | tension | tension (spiral) | — |

The hub polygon (equal pulls, closed n-gon) is the string polygon with the pole at the hub. It rhymes with IV.VI: reverse the loads and red and blue swap.

## Formulas (all checked numerically)

- Rim node of an n-spoke wheel: T = 2N·sin(π/n). Rim compression N = n·T₀/2π → 36 × 1000 N gives 5.73 kN.
- Spoked-wheel roof, 16 cables: ring force / cable force = 1 / (2·sin(π/16)) = 2.56.
- Cremona, 30° rafters, apex load W: rafter = W, tie = 0.866 W. In widget 08 the rafter lines are exactly as long as the load line (140), the tie is 121.2.
- Hanging chain, four loads of 30 units, first segment slope 44/50: H = 60·50/44 = 68.2, so the pole is at x = 170 + 68.2. Rays slope 60/68.2 and 30/68.2 match the segments.
- Dome, membrane hemisphere under self-weight: hoops change sign at 51.8° from the crown.
- Half-wheel bridge with m ties at equal angles: N = T / (2·sin(π/2m)), constant, no bending — **only if the chords are all equal** (see below).

## Mistakes made and fixed (don't repeat)

- **Bicycle widget v1 didn't run on mobile.** It used element IDs as implicit globals and declared its inputs after the first `update()` reference. v2 (widget 01) wraps everything in an IIFE, uses `getElementById` and explicit `addEventListener('input'|'change')`. Only v2 is kept.
- **Chain v1 had the pole on the wrong side.** The rays then can't be parallel to the segments. The pole sits on the side away from the sag. Only the fixed version is kept.
- **Half-wheel bridge (still open).** The widget puts ties at 15°, 45° … 165° and the supports at 0°/180°, so the end chords span 15°, not 30°. Solving the node at 165°: N = 2.59 T into the 135° chord, while the node at 135° holds that chord at 1.93 T. They disagree, so the end panels bend. Fix: put the supports on the node grid (e.g. ties at 30° … 150°, supports at 0°/180°, all chords 30°). Then every node gives 1.93 T.

## Model limits (say so on any plate)

- The bicycle load distribution is a Gaussian fit (σ ≈ 20°, amplitude W / Σ wᵢ·cos φᵢ, plus 3 % of W spread uniformly), not FEA. The shape is right, the numbers aren't exact. Bottom spokes go slack past ~3 kN at T₀ = 1000 N.
- 2D only. Real spokes are tangential (crossed lacing, carry torque) and splayed to two flanges (lateral stiffness); rear wheels are dished, so the drive side runs tighter.
- Spider web node polygon and the joint-equilibrium angles are schematic, exaggerated for legibility.

## Next steps for a Code session

1. Fix the half-wheel geometry, then compute every sketch from the engine (Elements rendering rule 6), not hand-placed coordinates.
2. Port to plates with tokens and the Elements rendering rules (separate arrowheads, not `<marker>`; no arrow on a same-coloured fill edge).
3. Bicycle wheel: replace the Gaussian with a real ring + spoke solve (prestress as initial strain), keep the two sliders.
4. Book V.I: build the "drag the pole" interactive plate on widget 09.
