# The Elements of Statics — Contents

✅ = written (a page on forzez.com/elements; the first 24 were drafted on the canvas) · ✏️ = sketched in chat, not on the canvas yet · ⬜ = not started
Canvas: https://claude.ai/artifact/KrD89rVzRxVRh55MxfujWw · Plan and rules: `elements-of-statics.md`

**Progress: 53 of 65** (+10 sketched in chat, 2026-11-14; cable sketches A–E not yet counted in the 65). Books I–V are complete; front matter and side plates remain.

The site's contents page is built from `apps/web/src/app/elements/_lib/plan.ts`; keep the two in step.

## Front matter
- ✅ Title page and Axioms I–IV
- ⬜ Introduction: how to read a plate (colours instead of letters)
- ⬜ Colour key: identity colours (Books I–III), meaning colours (Books IV–V)
- ⬜ About: Byrne, and this book
## Book I — Forces at a point
- ✅ I. Three forces in balance meet in one point
- ✅ II. The force polygon
- ✅ III. Pythagoras of forces
- ✅ IV. The inclined plane
- ✅ V. Lami's theorem
- ✅ VI. The pulley
- ✅ VII. Balance by counting (resolving along two lines): four forces on a square grid — blue (4,3), red (−2,3), black (−2,−2), yellow (0,−4); each split into unit steps drawn as short thick arrows; across 4 = 4, up/down 6 = 6. Drawn in the plain-modern (white, Hanken Grotesk) style: `KW-Prop-I-7.dc.html`. Page number still a placeholder.
- ✅ VIII. Components in any frame: turn the axes and the components change, the force does not (same arrow, same square on it — ties to Prop. III)
- ✅ IX. A weight hung on two strings
- ✅ Side plate: Stevin's wreath of spheres
## Book II — Forces in the plane
- ✅ I. The lever
- ✅ II. Varignon's theorem
- ✅ III. The couple
- ✅ IV. Spread loads
- ✅ V. The string polygon
- ✅ VI. Centre of gravity by hanging
- ✅ VII. Resultant of parallel forces
- ✅ VIII. Moving a force: a force and a couple
- ✅ IX. Any set of forces reduced to one (a few arrows in any directions → force polygon gives size and direction, string polygon gives the line)
- ✅ X. Balance in the plane: both polygons close
- ✅ XI. Centre of gravity of composite shapes
## Book III — Bodies and supports
- ✅ I. The friction cone
- ✅ II. Supports: pin, roller, fixed
- ✅ III. The inclined roller: it can only answer square to its own slope (turn the roller, turn the reaction; the pin must follow)
- ✅ IV. The free body: a whole structure cut loose (loads + reactions; ΣFx = ΣFy = ΣM = 0, drawn as closed polygons)
- ✅ V. The three-force body: a ladder against a wall
- ✅ VI. Reactions of a simple beam
- ✅ VII. Determinate and indeterminate
- ✅ VIII. Toppling or sliding
- ✅ IX. Three supports that are not enough: their lines meet in one point (or are all parallel), and the body turns about it
- ✅ X. The Gerber beam: one hinge for every extra support, and the beam falls apart into simple pieces that each solve alone
- ✅ XI. The cantilever bridge: two anchored arms and a span hung between them (Forth Bridge human model, 1887)
## Book IV — Trusses
- ✅ I. The method of joints
- ✅ II. Why triangles: a rigid truss (a square without a diagonal is a mechanism)
- ✅ III. Members that carry nothing
- ✅ IV. Ritter's section
- ✅ V. Cremona's diagram — every joint polygon glued into one figure, each member drawn once. Smallest case sketched: triangular roof truss, apex load, 30° rafters → rafters = W (red), tie = 0.87 W (blue); the apex joint is the big triangle, each support joint is half of it.
- ✅ VI. Reverse the loads: every member keeps its size, red and blue swap
- ✅ VII. Double the load, double every member force
- ✅ VIII. Two loads together equal each load alone, added (superposition; candidate for a three-layer transparent overlay: load A + load B = A and B)
- ✅ IX. Warren, Pratt and Howe
- ✅ X. The bridge — every member from the four axioms
- ✅ XI. The lightest truss (Michell, 1904): red and blue members cross at right angles everywhere; the cantilever from a round support grows spirals (ties to the Forzez topology-optimisation generator)
## Book V — Cables and arches
- ✅ I. The hanging chain — four equal weights, load line + pole + five rays; each ray parallel to one cable segment, the horizontal ray is H. Pole sits on the side away from the cable's sag direction (first sketch had it on the wrong side). Moving the pole out → bigger H, flatter cable (the planned "drag the pole" interactive plate).
- ✅ II. The suspension cable
- ✅ III. The inverted chain is an arch
- ✅ IV. The thrust line
- ✅ V. The semicircle: a three-hinged half circle under a crown load; the thrust is half the load at crown and springings, but it runs along the chords, so the circle bends
- ✅ VI. Four hinges: how an arch fails
- ✅ VII. Gaudí's hanging model
- ✅ VIII. The funicular truss: chain and arch in one, no thrust on the supports (Brunel's Royal Albert Bridge, 1859)
- Proposed cable plates (✏️, placement open — see `cable-plates.md`):
  - ✏️ C. Like triangles: each segment and its ray make like triangles, run : drop = H : V (Euclid VI.4). The lemma the others cite.
  - ✏️ A. Where nothing hangs, the rope is straight: zero step on the load line → one ray → one line (Euclid I.14).
  - ✏️ B. The chain is the limit of its polygons: 1, 3, 7, 15 equal beads closing on the catenary, measured gap under each (Euclid XII.2).
  - ✏️ D. The parabola drawn by its tangents: end tangents meet at twice the sag; crossed equal divisions wrap the curve (pairs with V.II).
  - ✏️ E. The heavy side sinks: unequal loads tip the rope; one H within each state, but H changes between states.
## Side plates
- ⬜ Maxwell, 1864: reciprocal figures
- ⬜ Culmann's crane and the femur
- ✅ The bicycle wheel: a red rim held round by prestressed blue spokes; the hub stands on its bottom spokes, which pull less (after Jobst Brandt). Drawn in the black "Taschen cover" style. Chat sketch adds: hub polygon of equal pulls (closed n-gon), rim node T = 2N·sin(π/n), rim compression N = n·T₀/2π (≈ 5.7 kN for 36 × 1000 N), interactive load slider (bottom spokes go slack past ~3 kN; simplified Gaussian distribution, not FEA).
- ✏️ The wagon wheel — diptych with the bicycle wheel: shrunk-on iron tyre (blue) squeezes wooden spokes (red); hub stands on the bottom spoke, pushing. Same hub polygon, arrows run the other way (rhymes with IV.VI: reverse the loads, red and blue swap).
- ✏️ The half-wheel bridge — semicircular arch with radial ties to a central hub carrying the load. Equal ties → uniform radial pull → the semicircle is funicular, constant N = T / (2·sin(π/2m)), no bending (contrast with V.V, where the bare semicircle bends). Hub polygon = half a 2m-gon closed by the yellow load as a diameter. Here the hub really hangs from the top spokes (no prestress) — diptych with the bicycle wheel. Supports get a small inward horizontal thrust. Test-bridge hook.
- ✏️ The spider web — pure tension, one blue pen. Web node on a radial: outer radial pulls more than the inner one, the two spiral threads take the difference (closed four-arrow polygon).
- ✏️ The spoked-wheel roof — bicycle wheel lying flat (stadium roofs): outer compression ring, inner tension ring, radial cables. Outer node: blue cable + two red ring forces; inner node: same triangle, all blue. With 16 cables ring force ≈ 2.6 × cable force.
- ✏️ The Pantheon dome — membrane hemisphere under self-weight: meridians all compression; hoops compress above 51.8° from the crown and pull below (lower dome cracked along meridians); oculus ring pure compression. Plan + section, red/blue split at the 51.8° line.
- ⬜ The spaghetti bridge: the author's competition bridge, every member coloured
- ⬜ Szabadság híd, Budapest (1896): three bridges that look like one — two cantilever arms and a 46.9 m drop-in span in the 175 m middle opening (verify the hinge details against a structural source before drawing)
