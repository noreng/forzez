# The Elements of Statics — plan (2026-10-25)
 
Byrne's Euclid (1847; c82.net/euclid by Nicholas Rougeux) as the template, applied to statics: axioms → propositions, proofs drawn in colour instead of letters.
Sample plates (Design canvas, private): https://claude.ai/artifact/KrD89rVzRxVRh55MxfujWw · Contents and progress: `elements-of-statics-toc.md`
- Rows 1–6: 23 draft plates (Caslon, cream paper) across all five books.
- Row 7: type study — Jost and IBM Plex versions of I.1 and V.8 (rejected: read as a university assignment).
- Row 8: refined Byrne, four layouts (page, spread, plate, grid) on the inverted chain.
- Row 9: plain modern, after Kronecker Wallis — white pages, grotesk (Hanken Grotesk), same four layouts. Current favourite direction.
- Row 10: on black, after the Taschen Byrne cover — bicycle wheel side plate.
## Home and naming (decided 2026-10-26: lives on forzez.com)
- The Elements of Statics lives on **Forzez**, not Truzme. Truzme may link to it from learning pages; Forzez keeps "Powered by Truzme".
- Naming collision to avoid: on Forzez, "Series" already means print collections (Series 01 — Arches, 02 — Trusses, 03 — Force Polygons). So Elements is not a "series" there.
- Proposal: a small publishing imprint inside Forzez — **Forzez Editions** (or Forzez Press). No. 1 *The Elements of Statics*, No. 2 *The Beauty of Trusses*. KW-style catalogue; one book, then the next, sold to the same readers.
- Inside the book: Books I–V and Propositions; a single page is a **Plate** ("Plate 5.3"). Shop items keep the Sheet No. vocabulary.
- Cross-links that make the site one thing: each plate links to the Studio pieces built on the same principle (Prop. 5.3 inverted chain ↔ Series 01 Arches; Book I force polygons ↔ Series 03), and each Studio piece links back to "the theorem behind it".
- Newsletter: "Feel the Forzez" carries one proposition per issue.
## Structure (~60 plates, ~60–80 printed pages)
See `elements-of-statics-toc.md` for the full list. Axioms (4) → Book I forces at a point → Book II forces in the plane → Book III bodies and supports → Book IV trusses → Book V cables and arches, plus side plates.
- Possible gap: a short book on what happens inside a beam (N, V, M diagrams; the string polygon is the moment diagram — Culmann).
- Out of scope (second volume): deflection, buckling, stress.
## Visual vocabulary (Byrne's toolbox, mapped to statics)
- **Arrows** — forces (solid), resultants/construction (dashed); a dashed coloured arrow = a force that would be needed but cannot exist (friction cone).
- **Coloured squares** — squares of magnitudes: Euclid I.47 → resultant of perpendicular forces.
- **Coloured wedges** — angles; equal angles share a colour (slope angle reappears between weight and normal). Lami: each wedge painted in the colour of the force opposite it.
- **Coloured rectangles** — force × arm as an area: lever balances when areas are equal; a couple's turn.
- **Coloured triangles** — moment = 2 × triangle area (Varignon: red + blue = black).
- **Turn arrow** (curved) — a couple / moment with no resultant; also a free rotation (three supports not enough).
- **Load areas** — spread load as a pale filled shape with small arrows; replaced by one arrow through its centroid.
- **Pole + rays** — force diagram with a pole; string pieces parallel to rays (graphic statics, Maxwell/Cremona lineage).
- **Beads** — counted weights (Stevin's wreath); proof by counting and symmetry.
- **Rope + wheel** — equal pulls on both sides (equal lines, one colour); the hanger leans along the bisector.
- **Plumb lines** — coloured line + bob per hanging; crossing point = centre of gravity.
- **Cone** — friction as a yellow wedge under the contact point; reaction must fall inside.
- **Mirror line** — chain below, arch above (inverted chain).
- **Flat colour planes** (black style) — a solid fill marks a region of meaning, e.g. the yellow load path through the bottom spokes of the wheel.
- Proof text uses small glyphs of each shape inline in typeset paragraphs, not stacked rows.
- Proof end marks: Q.E.D. (*quod erat demonstrandum*) closes a theorem, Q.E.F. (*quod erat faciendum*) closes a construction/problem; the plain modern style uses the small black square (∎) instead.
## Colour rule
- Books I–III: colour = **identity** (this force is red), like Byrne. Equal magnitudes share a colour (pulley).
- From Book IV: colour = **meaning** — red pushes (compression), blue pulls (tension), yellow = load. The switch is announced on the Book IV opener.
- Palette: red #C2311F, blue #1F4E96, yellow #E3A81B on cream / #DB9C0F on white, ink #151515–#1B1A17 (proof on paper before freezing). On black: red #D63A24, blue #2F6BC9, yellow #F2B71C, text #EDE6D6, ground #1B1A18.
- Byrne's style vocabulary: 4 colours × solid/dashed × thick/thin = 16 stroke styles. Keep to that set.
## Typography and page
**Decided 2026-11-14 (supersedes the "current favourite" below):** the web edition keeps the direction now built on forzez.com: cream paper (`bg` token), IBM Plex (Sans Condensed titles, Serif text, Mono numbers), layout B · the spread, Q.E.D. for theorems and Q.E.F. for problems. Plain modern and the Paper / Byrne / Night themes stay ideas, not the plan. The logo is out of scope for now.

- Reference: Kronecker Wallis, *Euclid's Elements. Completing Oliver Byrne's work* (designer Laia Guarro; 20 × 27 cm hardcover). Norbert likes its plain modern direction.
- Current favourite (2026-10-26): white pages, neutral grotesk (Hanken Grotesk in the PoC), page ratio 20:27, diagram dominant, small text, ragged right, hierarchy by position and weight (400/500 only), running heads and folios small and grey. Proof end mark: a small black square.
- Rejected: geometric/technical sans on top of an unchanged layout (big numeral + heavy rule + flex rows = template/homework look).
- No all-caps, no letter-spaced uppercase labels (reads as AI slop today). Sentence case everywhere.
- No summary boxes or title blocks in the footer — just the page number.
- Classic alternative kept on the canvas: refined Byrne in Caslon on yellowish paper (#F2EAD3).
- Black style (after the Taschen cover): for posters, covers, Instagram; reading pages stay light.
## Themes on the site (idea, 2026-10-27)
- A theme switcher on the web plates: **Paper** (white, grotesk — default), **Byrne** (cream, Caslon), **Night** (black, Caslon or grotesk).
- A theme is a full token set, not just a background: paper, ink, red, blue, yellow, muted text, and typeface. Colours are tuned per theme (yellow darker on white, blue brighter on black).
- Implementation: plates render with CSS custom properties (`var(--red)` etc., never hard-coded colours in the SVG); the switcher swaps a `data-theme` on `<html>`. Night follows `prefers-color-scheme: dark` by default; the choice persists in localStorage (per-viewer convenience only).
- Same tokens feed print: a poster or Print can be ordered in Paper, Byrne or Night — three products from one plate.
## Rendering rules (not needed for the PoC — required before production)
1. **No arrow may cover another arrow's head.** Draw in layers, never "one arrow = shaft + head" in source order:
   fills → background underlays → dashed construction lines → all shafts → all arrowheads → nodes/pins.
   So arrowheads are separate shapes (`<path>`/`<polygon>` computed from tip + direction), not SVG `<marker>`s (a marker is painted with its own line, so a later line can cover it). Applied on rows 8–9.
2. Shaft ends *inside* the head (stop ~half a head length before the tip), so butt-cap corners never poke out beside a sharp tip. Head size is a function of stroke weight.
3. Tip-to-tail polygons: heads sit at the vertex where the next shaft starts — rule 1 guarantees the next shaft goes under the head.
   Special case: a resultant and the last component share a tip (two heads on one point) — decide a convention (e.g. resultant head drawn last, or resultant tip offset/open head).
4. **Dashed over solid (Rougeux):** a dashed line crossing a filled shape lets the fill show through the gaps. Put a solid line in the paper colour under the dashed line (above the fill), so the dashes float.
5. **Constant stroke weight at every size** (Rougeux disabled stroke scaling for the poster): use `vector-effect="non-scaling-stroke"` or render plates at a fixed scale. The same thick/thin weights on web, cards and poster.
6. Exact geometry from the engine/solver, not hand-placed: angles, intersections, closing polygons computed, so every triangle actually closes.
7. Interactivity hooks for later: classes per style + `data-name` on shapes, `data-targets` on proof glyphs (Rougeux's pattern: hover a proof symbol → highlight shapes).
8. Paper-coloured fills (node rings, underlays) take the page's paper colour, never a hard-coded one. All colours come from theme tokens.
9. **A force arrow never lies on the edge of a same-coloured fill** (found on I.3: arrows vanished into the squares). Offset the fill outward by a small gap (~1.5–2.5× stroke width) so the arrow sits on paper. Applies to squares, rectangles and triangles built on a force.
## Web presentation (proposal, 2026-10-26)
- The canvas plates are mockups (fixed-size print pages in the Design canvas format), not production code. Port the decisions, not the files.
- **One plate = one data file, many renders.** A plate is a config (geometry from `@forzez/engine`, style tokens, statement + proof text with glyph references). Renderers: web page, print PDF (20 × 27 cm), Instagram card (1080 × 1350), poster.
- **Astro static pages (per `forzez-stack.md`):** each plate is pre-rendered to plain HTML + inline SVG at build time — no JS needed to read it, good SEO, fast. Proof text in MDX with a `<Glyph>` component that renders the small inline SVG.
- **Web layout = the spread, made responsive.** Desktop: figure large on one side (sticky while the text scrolls), statement + proof on the other. Mobile: figure first, then text. The web is not a fixed page; never show a 720 × 972 page image as the main view.
- **Progressive enhancement:** a tiny script links proof glyphs to shapes (hover/tap a glyph → its shape highlights, Rougeux pattern). Full interactivity later as a React island on the same SVG (drag handles, live solver), only on plates that earn it.
- **Every plate page:** previous/next proposition, "uses" links back to the axioms/propositions it rests on, the Studio piece built on it, newsletter signup, "get this as a poster", download print PDF, theme switcher.
- **URLs:** /elements (contents, only published plates), /elements/book-5, /elements/5-3-inverted-chain (stable, human-readable). If the imprint name sticks: /editions as the catalogue page.
## Interactive version
- One plate engine, not 60 apps: solver geometry + Byrne rendering rules; each plate is a config (draggable handles, what updates, live proof glyphs).
- Order: static web + carousels first (12-plate MVP), then the engine with one flagship interactive plate (string polygon: drag the pole), then 1–2 plates a month.
- With AI drafting, the whole book incl. interactivity is roughly 6–12 months of evenings; the bottleneck is engineering review of each plate, not drawing.
## Production pipeline
- Single source: HTML + SVG per plate (`@forzez/render` style). The same files go to web, Instagram cards (PNG export at 1080×1350) and print (PDF).
- Print: HTML → PDF via headless Chrome (`@page` size, bleed) or Paged.js for a book. Fonts embedded, vectors stay vectors.
- Colour: RGB on screen; print proof the four inks (red/blue are the risky ones). For riso/screen print the 4 colours are natural spot colours (one layer per colour) — the layer order from rule 1 maps directly to separations.
## Benchmark — Kronecker Wallis (researched 2026-10-26)
- Very small independent science publisher in Barcelona; founder and editor Jordi Anton. Sells direct from its own webshop, worldwide shipping from Barcelona.
- Catalogue of facsimiles and new editions of classic science texts (Newton's Principia and Opticks, Turing, Tesla, Curie, Gauss notebooks, Huygens, Apollo 13 checklist…), mostly €20–80.
- Launches big titles on Kickstarter: Euclid (Aug 22 – Sep 12, 2017) raised €258,139 from 1,560 backers, 224% of a €115,000 goal, average pledge ~€165. Earlier: Principia reprint, an astronomy collection.
- Euclid: books 1–6 keep Byrne's content with new vector graphics and typography; books 7–13 written by six mathematicians over ~1.5 years, with a new colour added.
- Posters: 14 A2 posters (cover + one per book), €15 each, €100 the set, archival paper.
- Press it got: Fast Company / Co.Design, It's Nice That, The Aperiodical, Obscura.
- Pattern to copy: design-press story → Kickstarter preorder → own shop → posters as the cheap entry product → next title sold to the same backers.
## Distribution plan (proposal, 2026-10-26)
1. **Now: free web + carousels, build the list.** One proposition per post, every page links to an email signup. The email list is what makes a Kickstarter work; aim for a few thousand addresses before launching.
2. **Early cash and validation: posters.** Axioms poster first, then one A2 poster per book (KW model: ~€15–25), plus plotted limited editions on Forzez as the premium tier.
3. **Book: Kickstarter preorder** once ~15–20 plates are finished and the list exists. Format idea: five booklets (one per book) in a slipcase, KW-style; preorder funds printing, no inventory risk.
4. **Press push with the launch:** design/maths blogs (the KW list above, Colossal, Open Culture, Hacker News). Story hooks: Byrne for statics, and the world-champion bridge builder author.
5. **Series: The Elements of Statics → The Beauty of Trusses.** Elements first (builds the visual language, the engine, the audience); Beauty of Trusses as the second campaign to the same backers.
6. **Option to keep open:** pitch the project to Kronecker Wallis as a statics companion to their Euclid once 10–15 plates are done. Trade-off: their audience and production vs. lower margin and less control.
- Expectation check: Euclid is "the most influential textbook ever"; statics is a smaller brand. Plan for a fraction of KW's €258k, not the same.
## Origin story — Oliver Byrne (researched 2026-10-25)
Source: MacTutor (mathshistory.st-andrews.ac.uk/Biographies/Byrne), Wikipedia.
- Irish, 1810–1880. Often labelled "civil engineer", but mainly a maths teacher and author who moved **toward** engineering: taught at the College of Civil Engineers in Putney (< 2 years), later wrote/edited practical engineering books (Dictionary of Machines, Mechanics, Engine Work and Engineering 1852; Essential Elements of Practical Mechanics 1867; first volume of Spons' Dictionary of Engineering 1869).
- 1849: accepted a government surveyor post in the Falkland Islands, but couldn't raise the passage money.
- Invented a calculating instrument and named it after himself: the "Byrnegraph" (1846).
- His engineering books paid the bills; his maths books didn't sell. The Euclid became famous long after his death.
- Hard life: arrested for a £30 debt (1839), gas explosion (1864), cab accident, publisher dispute left him without royalties. Died 1880 in Maidstone. In 1872 he remarked that his books and inventions only seemed to lead him into trouble.
- Parallel with Norbert: opposite crossings — Byrne maths → engineering, Norbert engineering → software. Same middle ground: pictures that prove things.
- Draft About line: *"Oliver Byrne went from mathematics to engineering and drew Euclid in colour. I went from engineering to software and drew statics the same way. We met in the middle: pictures that prove things."*
- Byrne's long s (ſ): skip it. Forzez's z is NOT from Byrne (truss → Truzme, forces → Forzez); at most a footnote rhyme.
