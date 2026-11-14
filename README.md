# forzez

Monorepo for forzez: the forzez.com app, plus the prototypes and design work behind it.

```
apps/
  web/          Next.js app, deployed to forzez.com (Vercel)
packages/       shared code (e.g. statics/truss solver, UI) — empty for now
prototypes/     interactive HTML prototypes imported from claude.ai artifacts
design/         exports from Claude Design (closes 2026-12-14)
docs/           specs and notes from the Claude chat project
```

## Develop

```bash
pnpm install
pnpm dev        # runs apps/web on http://localhost:3000
pnpm build
```

## Deploy (Vercel)

One Vercel project per app in `apps/`:

1. Import `noreng/forzez` in Vercel.
2. Set **Root Directory** to `apps/web` (framework: Next.js is auto-detected;
   pnpm workspaces are detected from the root lockfile).
3. Add the `forzez.com` and `www.forzez.com` domains under Project → Domains,
   and point DNS at Vercel as it instructs.

A second app later (e.g. `apps/lab` on `lab.forzez.com`) is just another Vercel project
with its own Root Directory pointing at that folder.
