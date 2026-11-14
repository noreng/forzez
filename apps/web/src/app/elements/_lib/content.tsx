// The Elements of Statics: everything the pages read. Content lives in ./books/*,
// ./axioms and ./plates; this file only orders it.

import { AXIOMS } from "./axioms";
import { BOOK_1 } from "./books/book-1";
import { BOOK_2 } from "./books/book-2";
import { BOOK_3 } from "./books/book-3";
import { BOOK_4 } from "./books/book-4";
import { BOOK_5 } from "./books/book-5";
import { PLATE_STEVIN, PLATE_WHEEL } from "./books/plates";
import { refLong, roman } from "./refs";
import type { Book, Page, RefId } from "./types";

export { AXIOMS };
export { roman, refHref, refLabel, refLong } from "./refs";

export const BOOKS: Book[] = [
  { n: 1, name: "Book the first", subject: "Of forces at a point" },
  { n: 2, name: "Book the second", subject: "Of forces in the plane" },
  { n: 3, name: "Book the third", subject: "Of bodies and supports" },
  { n: 4, name: "Book the fourth", subject: "Of trusses" },
  { n: 5, name: "Book the fifth", subject: "Of cables and arches" },
];

/** Reading order: plates sit where the book places them. */
export const PAGES: Page[] = [...BOOK_1, ...PLATE_STEVIN, ...BOOK_2, ...BOOK_3, ...BOOK_4, ...BOOK_5, ...PLATE_WHEEL];

export const propsOf = (book: number) => PAGES.filter((p) => p.book === book && p.kind !== "Plate");
export const PLATES = PAGES.filter((p) => p.kind === "Plate");

export function findPage(slug: string) {
  const i = PAGES.findIndex((p) => p.slug === slug);
  return i < 0 ? null : { page: PAGES[i], prev: PAGES[i - 1] ?? null, next: PAGES[i + 1] ?? null };
}

/** Text of a referenced axiom or page, for the notes under a proof. */
export function refText(id: RefId): { label: string; text: string } {
  if (id.startsWith("ax-")) return { label: refLong(id), text: AXIOMS.find((a) => a.id === id)?.text ?? "" };
  const p = PAGES.find((q) => q.slug === id);
  return { label: p?.kind === "Plate" ? (p.title ?? "Plate") : refLong(id), text: p?.statement ?? "" };
}

/** Name of a page in paging and contents: "IV" or a plate's title. */
export const pageNumber = (p: Page) => (p.kind === "Plate" ? "Plate" : `${roman(p.book)}.${p.n}`);
