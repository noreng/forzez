#!/usr/bin/env node
// Mechanical part of the DESIGN.md "Anti-slop" rules. Scans app and ui source
// (not packages/tokens, which is where raw values are allowed to live).
// Usage: pnpm check:design      Exit 1 on any violation.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dirs = ["apps", "packages/ui/src"];
const exts = /\.(tsx?|css|mdx?)$/;
const skipDir = /^(node_modules|\.next|dist|out|public)$/;

const rules = [
  { name: "uppercase text", re: /(^|["'`\s])uppercase(["'`\s]|$)|text-transform\s*:\s*uppercase|textTransform/ },
  { name: "letter-spaced label", re: /tracking-(\[|wide|wider|widest)|letter-spacing\s*:\s*0?\.\d|letterSpacing/ },
  { name: "raw colour (use a token role)", re: /#[0-9a-fA-F]{3,8}\b(?![-\w])|\b(rgba?|hsla?|oklch)\(/ },
  { name: "shadow / gradient / blur", re: /\b(shadow|drop-shadow|bg-gradient|bg-linear|bg-radial|bg-conic|blur|backdrop)-|box-shadow|linear-gradient|radial-gradient/ },
  { name: "large radius / pill", re: /\brounded-(xl|2xl|3xl|4xl|full)\b/ },
  { name: "emoji", re: /\p{Extended_Pictographic}/u },
  { name: "marketing word", re: /\b(unlock|seamless(ly)?|elevate|empower|delve|supercharge|game-changing|cutting-edge)\b/i },
];

// lines that are comments: rules describe the patterns there
const isComment = (l) => /^\s*(\/\/|\/\*|\*|<!--)/.test(l);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (!skipDir.test(name)) yield* walk(p);
    } else if (exts.test(name) && !/AGENTS\.md$/.test(name)) yield p;
  }
}

const hits = [];
for (const d of dirs) {
  for (const file of walk(join(root, d))) {
    readFileSync(file, "utf8").split("\n").forEach((line, i) => {
      if (isComment(line)) return;
      for (const r of rules) if (r.re.test(line)) hits.push(`${relative(root, file)}:${i + 1}  ${r.name}\n    ${line.trim()}`);
    });
  }
}

if (hits.length) {
  console.error(`Anti-slop check failed (${hits.length}). See DESIGN.md → Anti-slop.\n`);
  console.error(hits.join("\n"));
  process.exit(1);
}
console.log("Anti-slop check passed.");
