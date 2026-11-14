// Generates tokens.css from src/tokens.ts.  `--check` fails if tokens.css is stale.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { font, fontWeight, motion, radius, space, stroke, text, theme } from "../src/tokens.ts";

const out = fileURLToPath(new URL("../tokens.css", import.meta.url));
const decl = (obj: Record<string, string>, indent = "  ") =>
  Object.entries(obj).map(([k, v]) => `${indent}--fz-${k}: ${v};`).join("\n");

const css = `/* GENERATED from src/tokens.ts — do not edit by hand. Run: pnpm --filter @forzez/tokens build */

:root {
  color-scheme: light;
${decl(font)}
${decl(fontWeight)}
${decl(text)}
${decl(space)}
${decl(radius)}
${decl(stroke)}
${decl(motion)}
${decl(theme.light)}
}

/* Explicit light, also for a subtree inside a dark page */
[data-theme="light"] {
  color-scheme: light;
${decl(theme.light)}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
${decl(theme.dark, "    ")}
  }
}

/* Explicit dark, also for a subtree inside a light page */
[data-theme="dark"] {
  color-scheme: dark;
${decl(theme.dark)}
}
`;

if (process.argv.includes("--check")) {
  const current = existsSync(out) ? readFileSync(out, "utf8") : "";
  if (current !== css) {
    console.error("tokens.css is out of date. Run: pnpm --filter @forzez/tokens build");
    process.exit(1);
  }
  console.log("tokens.css is up to date.");
} else {
  writeFileSync(out, css);
  console.log(`Wrote ${out}`);
}
