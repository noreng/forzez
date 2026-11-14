import type { RefId } from "./types";

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
export const roman = (n: number) => ROMAN[n] ?? String(n);

/** "ax-2" → "Ax. II"; "i-4" → "Prop. IV"; a plate slug → "Plate". */
export function refLabel(id: RefId) {
  const m = /^(ax|[ivx]+)-(\d+)$/.exec(id);
  if (!m) return "Plate";
  return m[1] === "ax" ? `Ax. ${roman(Number(m[2]))}` : `Prop. ${roman(Number(m[2]))}`;
}

/** Full name for notes: "Book II, Prop. III". */
export function refLong(id: RefId) {
  const m = /^(ax|[ivx]+)-(\d+)$/.exec(id);
  if (!m) return "Plate";
  return m[1] === "ax" ? `Ax. ${roman(Number(m[2]))}` : `Book ${m[1].toUpperCase()}, Prop. ${roman(Number(m[2]))}`;
}

export function refHref(id: RefId) {
  return id.startsWith("ax-") ? `/elements#${id}` : `/elements/${id}`;
}
