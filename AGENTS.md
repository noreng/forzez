# forzez — notes for agents

pnpm monorepo. `apps/web` is the Next.js app for forzez.com; `packages/tokens` holds the design tokens.
Next.js here is v16 — read `apps/web/AGENTS.md` and the docs in `node_modules/next/dist/docs/` before writing Next code.

## Design rules (read DESIGN.md before any UI work)

- All colours, fonts, radii and strokes come from `@forzez/tokens`. Never write a hex/rgb/named colour in a component.
  Tailwind only has forzez roles (`bg-surface`, `text-force-1`, `stroke-tension`, `font-data` …); default palettes are disabled.
- Need a new colour? Add a role to `packages/tokens/src/tokens.ts` (light + dark), then run `pnpm --filter @forzez/tokens build`.
  Never edit `packages/tokens/tokens.css` by hand.
- Forces keep one colour everywhere: `force-1` red, `force-2` blue, `force-3` yellow (`force-3-text` in prose), `force-4` teal.
  Truss members: `tension` blue, `compression` red — never swap.
- Numbers with units use `font-data`, tabular figures, decimal comma in Hungarian copy.
- Fonts are the three roles `font-display` / `font-text` / `font-data` (currently IBM Plex). Never name a family in a component.
- Check new UI on `/design`-style pages in both light and dark (`data-theme="dark"` on any element forces dark for its subtree).

## Layout

- `prototypes/` are frozen reference HTML from claude.ai artifacts. Don't edit them; port them into `apps/web` instead.
- `design/directions/` holds the direction study that chose "Euclid × Erők".
- `docs/specs/` holds product specs.
