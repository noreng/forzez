# forzez — notes for agents

pnpm monorepo. `apps/web` is the Next.js app for forzez.com; `packages/tokens` holds the design tokens, `packages/ui` the shared React components.
Next.js here is v16 — read `apps/web/AGENTS.md` and the docs in `node_modules/next/dist/docs/` before writing Next code.

## Design rules (read DESIGN.md before any UI work)

- Reuse `@forzez/ui` components (list in DESIGN.md) before writing new markup.
- All colours, fonts, radii and strokes come from `@forzez/tokens`. Never write a hex/rgb/named colour in a component.
  Tailwind only has forzez roles (`bg-surface`, `text-force-1`, `stroke-tension`, `font-data` …); default palettes are disabled.
- Need a new colour? Add a role to `packages/tokens/src/tokens.ts` (light + dark), then run `pnpm --filter @forzez/tokens build`.
  Never edit `packages/tokens/tokens.css` by hand.
- Forces keep one colour everywhere: `force-1` red, `force-2` blue, `force-3` yellow (`force-3-text` in prose), `force-4` teal.
  Truss members: `tension` blue, `compression` red — never swap.
- Copy is English. Numbers with units use `font-data`, tabular figures, decimal point, true minus (−).
- Fonts are the three roles `font-display` / `font-text` / `font-data` (currently IBM Plex). Never name a family in a component.
- Follow the **Anti-slop** rules in DESIGN.md: no UPPERCASE text, no letter-spaced labels, no shadows/gradients,
  no marketing copy. Run `pnpm check:design` before finishing UI work.
- Check new UI on `/design`-style pages in both light and dark (`data-theme="dark"` on any element forces dark for its subtree).

## Layout

- `prototypes/` are frozen reference HTML from claude.ai artifacts. Don't edit them; port them into `apps/web` instead.
- `design/directions/` holds the direction study that chose "Euclid × Erők".
- `docs/specs/` holds product specs. `truzme-art-spec.md` is the origin of the generative art: seeded recipes, determinism rules,
  and the frozen `pts1` generator (with a golden output hash). Read it with `forzez-generative-plan.md` before generator work.
- `docs/elements/` is the plan for *The Elements of Statics*: `elements-of-statics.md` (decisions, colour rule,
  rendering rules, roadmap) and `elements-of-statics-toc.md` (the full contents), plus sketch notes such as `cable-plates.md` (cable drafts A–E). Read both before Elements work;
  the site's contents page mirrors the toc in `apps/web/src/app/elements/_lib/plan.ts`.
- `docs/notes/` holds the product and brand notes from the claude.ai "Forzez.com" project. Open the one that fits the task:
  - `forzez-roadmap.md`: next steps and guardrails (Truzme stays school-safe, no shop before demand).
  - `forzez-stack.md`: proposed stack (Cloudflare, Stripe, plotter station). Says Astro; the repo is Next.js, and the repo wins.
  - `forzez-generative-plan.md`: generative art thesis, net1/net2 recipes, determinism rules, ideas backlog.
  - `truss-art-net-session.md`: how net1/net2 were built (algorithms, hash channels, recipe grammar, verification,
    fingerprints, porting caveats). Prototype: `prototypes/truzme-art-net/`; check: `pnpm check:truss-art`.
  - `wheel-sketches-session.md`: bicycle wheel, wagon wheel, half-wheel bridge, spider web, spoked roof, Pantheon,
    Cremona, hanging chain — formulas, checks, mistakes, an open half-wheel geometry fix. Widgets: `prototypes/wheel-sketches/`.
  - `forzez-films.md`: films as live code (`frame(recipe, t)`), synth, render tool, frame QA.
  - `forzez-sitemap.md`: site structure: Editions / Articles / Studio / Films, URLs, the menu by stage, home order.
    Articles are stand-alone interactive essays and never mix with Editions (book-like, with proofs).
  - `forzez-site-models.md`: catalogue structure (Studio / Editions / Custom × formats), product vocabulary, business models.
  - `brand-naming.md`, `forzez-puns-and-logo.md`: brand copy, microcopy, taglines, logo variants.
- When a decision changes, update the note in the repo. The repo copy is the source of truth.
