/**
 * forzez design tokens — single source of truth.
 *
 * Direction "B · Euclid × Erők": Byrne's red / blue / yellow from The Elements
 * of Statics, with the IBM Plex pairing: Plex Sans Condensed titles, Plex Serif
 * for reading, Plex Mono for controls and numbers.
 *
 * Every token becomes a CSS custom property `--fz-<name>` in tokens.css
 * (run `pnpm --filter @forzez/tokens build` after editing this file).
 */

/** Raw palette. Components never use these directly — use `theme` roles. */
export const palette = {
  paper50: "#FCFBF7",
  paper100: "#F5F2EA",
  paper150: "#EDE9DF",
  paper200: "#E3DED1",
  paper300: "#D9D3C4",
  stone300: "#A09B8F",
  stone600: "#5E5A50",
  ink900: "#1B1A17",
  ink100: "#EAE6DC",
  night700: "#312E28",
  night800: "#262420",
  night900: "#1B1A16",
  night950: "#141310",
  night990: "#0F0E0C",

  byrneRed: "#C2311F",
  byrneRedLight: "#E5573F",
  byrneBlue: "#1F4E96",
  byrneBlueLight: "#7399DC",
  byrneYellow: "#D99A0E",
  byrneYellowLight: "#EBB43A",
  byrneYellowDeep: "#8A5F00",
  teal: "#0C8580",
  tealLight: "#3CC4B8",
  green: "#2C7A3D",
  greenLight: "#6BC47F",
  crimson: "#B42335",
  crimsonLight: "#FF6B7D",
} as const;

const p = palette;

/** Colour roles, per theme. Keys become `--fz-<key>`. */
export const theme = {
  light: {
    // surfaces & text
    bg: p.paper100,
    surface: p.paper50,
    sunken: p.paper150,
    ink: p.ink900,
    muted: p.stone600,
    rule: p.paper300,
    "rule-strong": p.ink900,
    grid: p.paper200,
    body: "rgba(27, 26, 23, 0.07)",
    // interaction
    accent: p.byrneBlue,
    "on-accent": p.paper50,
    focus: p.byrneBlue,
    // status
    ok: p.green,
    bad: p.crimson,
    warn: p.byrneYellowDeep,
    // statics: generic forces (in order of appearance)
    "force-1": p.byrneRed,
    "force-2": p.byrneBlue,
    "force-3": p.byrneYellow,
    "force-3-text": p.byrneYellowDeep,
    "force-4": p.teal,
    resultant: p.ink900,
    // statics: meaning
    tension: p.byrneBlue,
    compression: p.byrneRed,
    load: p.byrneYellow,
    reaction: p.teal,
    member: p.paper300,
  },
  dark: {
    bg: p.night950,
    surface: p.night900,
    sunken: p.night990,
    ink: p.ink100,
    muted: p.stone300,
    rule: p.night700,
    "rule-strong": p.ink100,
    grid: p.night800,
    body: "rgba(234, 230, 220, 0.06)",
    accent: p.byrneBlueLight,
    "on-accent": p.night950,
    focus: p.byrneBlueLight,
    ok: p.greenLight,
    bad: p.crimsonLight,
    warn: p.byrneYellowLight,
    "force-1": p.byrneRedLight,
    "force-2": p.byrneBlueLight,
    "force-3": p.byrneYellowLight,
    "force-3-text": p.byrneYellowLight,
    "force-4": p.tealLight,
    resultant: p.ink100,
    tension: p.byrneBlueLight,
    compression: p.byrneRedLight,
    load: p.byrneYellowLight,
    reaction: p.tealLight,
    member: p.night700,
  },
} as const;

export type ColorRole = keyof typeof theme.light;

/**
 * Font stacks: the "Plex" pairing (title · text · numbers).
 * `--nf-*` are set by next/font in apps; outside Next the family name is used
 * directly (load it from Google Fonts). Always load latin-ext: Hungarian needs ő and ű.
 * Plex has no Greek on Google Fonts, so Σ, α, Δ fall back to the system mono/serif.
 * Changing the pairing = edit these stacks + the weights below + next/font in apps/web layout.
 */
export const font = {
  "font-display": `var(--nf-display, "IBM Plex Sans Condensed"), "Arial Narrow", system-ui, sans-serif`,
  "font-text": `var(--nf-text, "IBM Plex Serif"), Georgia, "Times New Roman", serif`,
  "font-data": `var(--nf-data, "IBM Plex Mono"), ui-monospace, "SFMono-Regular", Menlo, monospace`,
} as const;

/** Weight each role is set in. Load exactly these weights (plus 600 for text/data emphasis). */
export const fontWeight = {
  "font-display-weight": "600",
  "font-text-weight": "400",
  "font-data-weight": "400",
} as const;

/** Type scale (rem). Body is text-base (17px). */
export const text = {
  "text-xs": "0.75rem",
  "text-sm": "0.875rem",
  "text-base": "1.0625rem",
  "text-md": "1.1875rem",
  "text-lg": "1.4375rem",
  "text-xl": "1.875rem",
  "text-2xl": "2.5rem",
  "text-3xl": "3.25rem",
  "text-4xl": "4.25rem",
} as const;

export const space = {
  "space-1": "4px",
  "space-2": "8px",
  "space-3": "12px",
  "space-4": "16px",
  "space-5": "24px",
  "space-6": "32px",
  "space-7": "48px",
  "space-8": "64px",
} as const;

export const radius = {
  "radius-sm": "2px",
  radius: "3px",
  "radius-lg": "6px",
} as const;

/** SVG stroke widths in user units, for diagrams. */
export const stroke = {
  "stroke-hair": "1",
  "stroke-force": "3.6",
  "stroke-resultant": "2",
  "stroke-member": "9",
} as const;

export const motion = {
  ease: "cubic-bezier(0.2, 0.7, 0.2, 1)",
  "dur-fast": "120ms",
  dur: "200ms",
  "dur-slow": "350ms",
} as const;

/** `cssVar("force-1")` → `"var(--fz-force-1)"`, for inline styles and SVG. */
export function cssVar(name: string): string {
  return `var(--fz-${name})`;
}
