# Cable plates — sketches from chat (2026-10-28)

Companion to `elements-of-statics.md` and `elements-of-statics-toc.md`.
Five plate drafts (A–E) on hanging cables, plus the interactive "form and force" series they grew out of.
All were sketched in a claude.ai chat as inline widgets; none is on the canvas or the site yet (✏️ in the toc).

What already exists on the site and overlaps:
- **I.IX Two strings** (`i-9`): one knot, one weight, the force triangle. Same as series step 1 below.
- **V.I The hanging chain** (`v-1`): equal weights, load line, pole, rays parallel to segments, one shared level pull. Same as series step 2.
- **V.II The suspension cable** (`v-2`): parabola via the tangent at a cut meeting the level line halfway. Draft D is a different, constructive route to the same curve.

Nothing on the site yet covers: the zero-load case (A), the catenary as a limit (B), the similar-triangle lemma (C), the crossed-tangent construction (D), or unequal loads (E).

## The interactive series ("form and force")

One widget, form on top, force diagram below. Segments blue (tension), loads yellow, pole black, H dashed.
Tap a segment to highlight it together with its ray.

1. **Two strings.** Slider moves the knot along the span (25–75 %). The triangle closes in exactly one way.
2. **Equal loads.** Three segments, two equal weights: symmetric trapezoid; the middle ray is level, so the middle segment carries exactly H.
3. **Unequal loads.** Slider sets the right weight from **0 to 3 W**. The symmetric state stays as a dashed ghost. At 0 the two rays coincide and the two right segments fall into one straight line (→ draft A).
4. **Many loads.** Same rope length, same total weight, split into 1–24 equal beads. The polygon closes on the catenary (dashed); the rays become a fan (→ draft B).

### Model (important for steps 2–4)
- The rope has a **fixed length** and the weights hang at **fixed points along it**. That extra condition is what makes the shape unique.
  Without it, any pole on the same level line closes the force diagram and the sag is free — that is V.I's "drag the pole".
  Here the rope length picks the pole; in V.I the reader picks it.
- Unknowns: H and V (vertical pull at the left support). Walk the segments: segment i has pull (H, Vᵢ), Vᵢ₊₁ = Vᵢ − Wᵢ,
  direction (H, Vᵢ)/|·|, length Lᵢ. Solve span and level-support closure for (H, V) with Newton, keeping H > 0 (step halving).
- Readouts: H, Tᵢ (or T at supports / at the bottom for step 4), both support reactions, all in units of W.

## Drafts A–E

Style: plain modern (white page, Hanken Grotesk / Plex per the site, proof text with inline glyphs, ∎ end mark).
Colour: Book V meaning colours — blue tension, yellow load, nothing red. Segments are told apart Byrne's way:
the glyph is a tiny copy of the whole figure with one part inked and the rest grey. Check on paper that this reads at ~16 px.

### C — Like triangles (the lemma; place first)
- **Statement.** Each segment of a hanging rope and its ray make like triangles: the run of the segment is to its drop as the horizontal pull is to the upright part of its pull.
- **Figure.** Three-segment rope, loads 1 W and 2 W. Pale fill under the first segment (run × drop) and the same pale fill under its ray (H × V₁) in the force diagram; a second pair in another pale fill for the last segment.
- **Proof.** At every knot three forces close a triangle (I.1), so the pull in a segment runs along it. Its ray splits into H, the same for every ray, and an upright part on the load line. The two triangles share a right angle and the slope angle, so they are alike.
- **Euclid hook.** VI.4 (equiangular triangles have proportional sides). This is *why* ray ∥ segment; A, B, D cite it.

### A — Where nothing hangs, the rope is straight
- **Statement.** A knot that carries no weight does not bend the rope: the segments on either side of it lie in one straight line.
- **Figure.** Three-segment rope, loads 1 W and 0. Force diagram with a zero-length step on the load line.
- **Proof.** Nothing hangs from the knot, so its step on the load line has no length. The two rays run from the pole to the same point: they are one ray. Each segment is parallel to its ray (C), so the two segments lie in one line.
- **Euclid hook.** I.14 (angles summing to two right angles → one straight line), reached through the force diagram.
- **Why it matters.** "Every kink is a load; every straight run carries none." Good opener for the cable book, and exactly what makes V.III (inverted chain) work.

### B — The chain is the limit of its polygons (showpiece)
- **Statement.** Hang a rope from two points with equal beads spaced evenly along it. The more beads, the closer the rope comes to the curve of the hanging chain, and its fan of forces to a fan without gaps.
- **Figure.** Four small multiples: 1, 3, 7, 15 beads. Each has the true catenary dashed behind the polygon, its fan below (one yellow load line with tick marks), and a caption with the measured gap.
- **Gap.** Largest vertical distance between polygon and catenary, as % of span. **Compute it from the drawing, don't hard-code it.** The catenary parameter a comes from bisection on 2a·sinh(S/2a) = rope length.
- **Proof.** The total weight stays the same, so the load line keeps its length; only its steps grow shorter. Each new step adds a ray to the fan, each ray a segment to the polygon. With every doubling of the beads the gap to the curve shrinks, as the numbers under the figures show.
- **Euclid hook.** XII.2 (exhaustion: inscribed polygons closing in on the circle). The four-up layout is a visual rhyme on its own.
- **Notes story.** Galileo guessed the free chain was a parabola; Jungius showed it isn't (1669); Johann Bernoulli, Leibniz and Huygens found the catenary in 1691.
- **The distinction to keep straight:** weight even *along the rope* → catenary (this plate). Weight even *along the span* → parabola (V.II, D). Currently no site plate shows the catenary.

### D — The parabola drawn by its tangents (string art)
- **Statement.** For a cable that carries an even load along its span, draw the tangents at its two ends; they meet at twice the sag. Divide both into the same number of equal parts and join them crosswise: the lines wrap the curve of the cable.
- **Figure.** Supports A, B level; tangent point C at depth 2f below the chord midpoint (dashed tangents). n = 8: join A + u(C − A) to C + u(B − C) for u = k/n. Blue parabola y = 4f·u(1 − u) over it. Below, an even load line (n equal steps) with its fan.
- **Proof.** Each crossing line reaches across half the span, and its slope falls by the same step from one line to the next. The rays of an even load line do the same: one pole, equal steps. So every line is parallel to a ray and is one side of a string polygon; with finer steps the polygon closes on the curve.
- **Hook.** Apollonius rather than Euclid (also: quadratic Bézier construction). Very plotter-friendly.
- **Placement.** Pair with V.II as a second plate on the same curve, or fold into V.II's figure. Open question: the even deck load is shown only through the equal fan steps; a pale load band would make it explicit but fights the string lines.

### E — The heavy side sinks
- **Statement.** Load one knot more and the rope swings toward it. In the force diagram the load line grows and the pole moves, but there is still one horizontal pull, shared by every segment.
- **Figure.** Diptych in one: the equal-load state (1 W, 1 W) as a grey dashed ghost behind the unequal state (1 W, 2 W); both force diagrams overlaid, the ghost's in grey.
- **Proof.** Each state is its own string polygon with its own pole, and one pole means one H for all segments. The rope cannot stretch, so its knots slide toward the heavy side and every angle changes. H changes from H₁ to H₂ (print both, computed).
- **Correction from the chat.** An earlier list said "H does not change". Wrong: H differs *between* the two states; what holds is one H *within* each state. Don't assert the direction of the change in prose — compute it and let the sentence follow the numbers.

## Placement (open)
- The written Book V pages have slugs `v-1` … `v-8`, so renumbering is not free. Options:
  1. Insert C and A as new V.I–V.II and shift the rest (cleanest reading order, breaks slugs/links).
  2. Keep Book V numbering; add C, A, B as side plates or as an appendix to Book V ("Of the hanging rope").
  3. Fold C into V.I's proof, A into V.III's, D into V.II's; keep B and E as side plates.
- Suggested reading order regardless: C → A → (V.I) → B → (V.II + D) → E → V.III.
- When a decision is made: update `elements-of-statics-toc.md` **and** `apps/web/src/app/elements/_lib/plan.ts` together.
