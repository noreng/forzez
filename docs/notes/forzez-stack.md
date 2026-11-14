# Forzez — tech stack (proposal, 2026-10-13)

> Snapshot from the claude.ai project. **Partly superseded:** the repo uses Next.js (`apps/web`), not Astro. The monorepo, Cloudflare, Stripe and plotter-station parts still stand as proposals.

Built around the engine and many custom mini apps; the shop is just a cart at the end.

## Monorepo (pnpm workspace + Turborepo)
- `@forzez/engine` — Truzme's structural engine (shared / lifted). Single source of truth.
- `@forzez/render` — SVG, canvas, plot export (occlusion + contour fill, ported from the Python prototype).
- `@forzez/code` — Forze Code encode/decode (compressed, versioned model format).

## Frontend: Astro + React islands
- Marketing, gallery, series pages: static, fast, SEO.
- Each mini app is an island on its own page: configurator, Forze Code viewer, "watch it draw", R3F 3D plotter.
- Switch to Next.js only if accounts / dynamic pages start to dominate.

## Backend: Cloudflare
- Pages + Workers (API, webhooks), D1 (waitlist, orders, Originals queue), R2 (print files, Forze Code models, content-addressed).
- A3 @300dpi raster may exceed Worker CPU → measure; fallback = Queues + small render container.

## Shop: Stripe, not Shopify
- Every order is a unique artwork; Shopify is catalog-first.
- Stripe Checkout + Stripe Tax → webhook → Worker renders file to R2 → Prodigi/Gelato API (Prints) or Originals queue.
- Not Lemon Squeezy / Paddle (digital goods only).
- Accountant before first live order (EU VAT OSS, UK shipping, family plotters).

## Accounts
- None at first: email + order number + magic link. Later: Better Auth on D1 or Clerk.

## Other
- Email: Resend. Analytics: Cloudflare Web Analytics or Plausible (cookieless).

## Plotter station
- Raspberry Pi next to the plotter polls the API's Originals queue → downloads SVG → vpype + axicli → reports back ("plotted by …"). vpype stays in Python.

## Build order
1. Monorepo + Astro + landing + waitlist (D1).
2. `@forzez/render` + "watch it draw" island (also the video source).
3. Forze Code + configurator.
4. Stripe + POD integration.
5. Plotter station + Originals.
