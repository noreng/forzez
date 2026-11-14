# Prototypes

Snapshots of claude.ai artifacts, imported read-only on 2026-11-14. "Last updated" is the date of the published version that was copied (taken from its version timestamp).

| Slug | Original title | Original artifact | Last updated | Kind | How to open |
| --- | --- | --- | --- | --- | --- |
| [erok-egyensulya](erok-egyensulya/) | Erők egyensúlya | https://claude.ai/artifact/QQPaa7rEKaZ7gzme87fB6Z | 2026-09-20 | Single HTML page | Open `index.html` in a browser |
| [elements-of-statics](elements-of-statics/) | The Elements of Statics | https://claude.ai/artifact/KrD89rVzRxVRh55MxfujWw | 2026-11-14 | Design-type project, 36 pages (`project/*.dc.html`) + `project/canvas.json` | View at original link (the `.dc.html` pages need the Design type's runtime, which was not copied) |
| [truss-rebuild-review](truss-rebuild-review/) | Truss rebuild review | https://claude.ai/artifact/1iheTrGfHEQuzNCnTVjM2g | 2026-11-14 | Single HTML page | Open `index.html` in a browser |
| [funicular-truss-editor](funicular-truss-editor/) | Funicular Truss Editor | https://claude.ai/artifact/3sZT5UHKNpZtbcFvsXt5Ye | 2026-10-09 | Single HTML page | Open `index.html` in a browser |
| [michell-truss-generator](michell-truss-generator/) | Michell Truss Generator | https://claude.ai/artifact/Y3YyMvtYAezBkpSpXHQwHD | 2026-10-09 | Single HTML page | Open `index.html` in a browser |
| [inclined-roller-supports](../docs/specs/inclined-roller-supports.md) | Inclined roller supports | https://claude.ai/artifact/DzUaLyApAxkCMfC391veK7 | 2026-10-10 | Docs-type document, exported as Markdown | Moved to `docs/specs/` |
| [stability-forces-spec](../docs/specs/stability-forces-spec.md) | Stability + Forces panels — spec | https://claude.ai/artifact/9gMK2UQ1P6NFgXN5bxMS1m | 2026-09-25 | Docs-type document, exported as Markdown | Moved to `docs/specs/` |
| [canvas-render-labor](canvas-render-labor/) | Canvas Render Labor | https://claude.ai/artifact/R7YRRr8aC5g28EoVWKVnE4 | 2026-10-20 | Single HTML page | Open `index.html` in a browser |
| [truzme-art-net](truzme-art-net/) | Truzme Art net1 | https://claude.ai/artifact/8UXW91s8vFDmE2mRZ2xo18 | 2026-10-12 | Single HTML page (net1 grid + net2 wave/arch/swirl generators, truss solver) | Open `index.html` in a browser; `pnpm check:truss-art` runs its core in Node. Record: [`docs/notes/truss-art-net-session.md`](../docs/notes/truss-art-net-session.md) |
| [pts1-seeded-supports](pts1-seeded-supports/) | pts1 seeded supports (chat widget) | none: inline chat widget, 2026-10-12 | 2026-10-12 | Single HTML page, wrapped standalone | Open `index.html` in a browser |
| [reaction-grid](reaction-grid/) | Reaction grid (chat widget) | none: inline chat widget, 2026-10-04 | 2026-10-04 | Single HTML page, wrapped standalone | Open `index.html` in a browser |
| [mini-truss-grid](mini-truss-grid/) | Mini truss grid (chat widget) | none: inline chat widget, 2026-10-04 | 2026-10-04 | Single HTML page, wrapped standalone | Open `index.html` in a browser |

Notes

- Design and Docs artifacts were created from claude.ai Artifact types. Only the user's own content was copied; the type runtime (`artifact-type/**`, the type's `SKILL.md` and `index.html`) was skipped.
- The Docs exports render date and mention chips as plain text.
- The three "chat widget" rows were inline widgets in a claude.ai chat, never published as artifacts (added 2026-11-14). Their code is verbatim; only a page wrapper was added that re-declares the chat host's CSS variables and hides its icon font. UI text is Hungarian, as in the chat. Spec: `docs/specs/truzme-art-spec.md`.
- `pts1-seeded-supports` is a frozen generator: its output must never change (golden check in the spec).
