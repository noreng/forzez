# forzez design

forzez teaches statics with diagrams you can touch. The look is **Euclid × Erők**:
the colours of Oliver Byrne's *Elements of Euclid* (red, blue, yellow on paper,
colours in place of letters) and the calm, scroll-driven explainer style of
*Erők egyensúlya*.

Live reference: `/design` in `apps/web` (`pnpm dev`, then http://localhost:3000/design).
Token source: [`packages/tokens/src/tokens.ts`](packages/tokens/src/tokens.ts).

## Principles

1. **Colour carries meaning.** A colour names a force or a state. If a colour means
   nothing, use ink or muted instead.
2. **The diagram is the hero.** Text explains what the diagram shows; it never
   competes with it. Keep chrome quiet: hairlines, paper, no shadows.
3. **Numbers are data.** Every number with a unit is set in `font-data` with
   tabular figures. Copy is English: decimal point and a true minus (`−7.5 kN`).
4. **Readable in both themes.** Every colour is a role with a light and a dark
   value. Never write a hex value in a component.

## Colour roles

Use the role, never the palette value. In Tailwind: `bg-<role>`, `text-<role>`,
`border-<role>`, `fill-<role>`, `stroke-<role>`. In CSS: `var(--fz-<role>)`.
In TypeScript/SVG: `cssVar("<role>")` from `@forzez/tokens`.

| Role | Meaning |
| --- | --- |
| `bg`, `surface`, `sunken` | page, panels/diagram stage, wells and inline code |
| `ink`, `muted` | text and outlines; secondary text |
| `rule`, `rule-strong`, `grid` | hairlines; running-head rule and totals; diagram dot grid |
| `accent`, `on-accent`, `focus` | links, selection, focus ring; text on accent |
| `ok`, `bad`, `warn` | equilibrium / not in equilibrium / unstable |
| `force-1` … `force-4` | generic forces in order of appearance: red, blue, yellow, teal |
| `force-3-text` | yellow is too light for text; use this for the third force in prose |
| `resultant` | resultant R (ink, dashed) |
| `tension`, `compression` | member forces: **blue pulls, red pushes** — never swap |
| `load`, `reaction`, `member` | applied loads (yellow), support reactions (teal), neutral members |

Rules:

- A force keeps its colour across the diagram, the text, the sliders and the tables.
- In prose, refer to a force with its colour: a short colour bar plus the label
  (`F₁`), as in Byrne. Never a colour bar alone without a label (accessibility).
- When forces are generic (an equilibrium of three forces), use `force-1…4`.
  When they have structural meaning (truss members), use `tension`/`compression`.

## Typography

Current pairing: **Plex** (one superfamily, so the three roles agree). It is a
starting point: it will be revisited against real pages, and changing it only
touches `font`/`fontWeight` in tokens and the `next/font` imports in
`apps/web/src/app/layout.tsx`. Alternatives are compared in `design/fonts/`.

| Token | Face | Use |
| --- | --- | --- |
| `font-display` | IBM Plex Sans Condensed 600 | page titles, chapter numerals (`III.` in `force-1`), section headings |
| `font-text` | IBM Plex Serif 400/600, italic | reading text, ledes (italic, muted) |
| `font-data` | IBM Plex Mono 400/600 | numbers, units, buttons, sliders, labels, eyebrows |

- `font-display`, `font-text`, `font-data` set both family and the role's weight;
  add `font-semibold` etc. only for deliberate emphasis.
- Type scale: `text-xs` … `text-4xl` (see tokens). Body is `text-base` (17px).
- Eyebrows and running heads: `<Eyebrow>` (`font-data text-sm text-muted`), sentence case.
- Always load the `latin-ext` subset (Hungarian ő, ű). Plex has no Greek on
  Google Fonts: Σ, α, Δ fall back to the system font. Set real formulas with a
  maths font when we build the formula component.

## Diagrams

- Stage: `surface` background with the `grid` dot pattern (20 units, r 0.9).
- Strokes (SVG user units): `stroke-force` 3.6, `stroke-resultant` 2 (dashed 6 4),
  `stroke-member` 9 (round caps), `stroke-hair` 1 for lines of action (dashed 3 5).
- Arrowheads are filled triangles, sized from the stroke (≈ 4 + 2.6 × stroke).
- y is up in the model; flip only when writing SVG coordinates.
- Bodies are a light `body` fill without outline.

## Components

`@forzez/ui` (`packages/ui/src`). Use these before writing new markup:

| Component | Use |
| --- | --- |
| `Button` | `variant` primary (ink fill) / secondary (ink outline) / ghost (underlined); `size` sm / md |
| `Slider` | labelled range with live value; `tone` 1–4 colours it as that force, `"ink"` for neutral |
| `Readout`, `ReadoutRow` | live values in a diagram corner (ΣFx, ΣFy, ΣM), right-aligned digits |
| `Badge` | status: `ok` equilibrium, `bad` not in equilibrium, `warn` unstable |
| `ForceRef` | a force named in text: colour bar + label (`<ForceRef tone={2}>F₂</ForceRef>`) |
| `Live` | a number computed from the diagram, inline in text |
| `Eyebrow`, `Hint` | label above a title; side note with a rule |
| `ThemeToggle`, `ThemeScript` | light/dark switch (moon in light, sun in dark), fixed top right in the root layout; `ThemeScript` in `<head>` applies a saved choice before paint. No saved choice = follow the system |
| `ForceArrow`, `DotGrid` | SVG: force arrow with head and label; dot grid behind a diagram |

Reference page: `/lab/equilibrium` (the Equilibrium of forces explainer).

## Anti-slop

forzez should look like a well-made textbook, not like a generated landing page.
These patterns give AI-made UI away; avoid them even when they look "polished".
`pnpm check:design` catches the mechanical ones.

**Type**

- No UPPERCASE text: not in labels, eyebrows, badges, buttons, table heads or
  headings. Use sentence case. (Checked: `uppercase`, `text-transform`.)
- No letter-spaced small labels (`tracking-[0.16em]` and friends). Checked.
- Headings in sentence case ("Force triangle", not "Force Triangle").
- No font families outside the three roles; never name a family in a component.

**Visuals**

- No hex, rgb or named colours in components or pages. Add a role to tokens. Checked.
- No shadows, gradients, glows, blur or glass. Checked.
- Radius 2–3px, at most 6px. No pills, no `rounded-xl` cards. Checked.
- No emoji, and no decorative icons next to headings or list items.
- Red and blue mean forces (or tension and compression), never decoration.
- No generic three-card feature grids, hero sections with a stock tagline, or
  illustrations where a real diagram could be. The diagram is the hero.

**Copy**

- Plain, specific sentences. Say what the reader sees and does
  ("Turn F₂ and watch which row breaks"), not what the product is.
- No marketing words: *unlock, seamless, elevate, empower, delve, journey,
  supercharge, game-changing, cutting-edge*.
- No exclamation marks, no rhetorical questions as headings, no filler openers
  ("In this section, we will…").
- Numbers are real and computed from the model, never placeholder stats.
