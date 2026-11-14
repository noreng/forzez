import { cssVar } from "@forzez/tokens";

/** A force in order of appearance (1–4), or plain ink for neutral controls. */
export type Tone = 1 | 2 | 3 | 4 | "ink";

/** Stroke/fill colour for a tone (diagrams, slider accent). */
export function toneColor(tone: Tone): string {
  return tone === "ink" ? cssVar("ink") : cssVar(`force-${tone}`);
}

/** Colour for text in a tone. The third force uses force-3-text: yellow is too light for text. */
export function toneText(tone: Tone): string {
  if (tone === "ink") return cssVar("ink");
  return tone === 3 ? cssVar("force-3-text") : cssVar(`force-${tone}`);
}
