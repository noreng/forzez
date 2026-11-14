import type { ReactNode } from "react";

/** "ax-2" for an axiom, a page slug ("i-4", "iv-1", "stevin") for a proposition or plate. */
export type RefId = string;

export type Axiom = { id: RefId; n: number; text: string; figure: ReactNode };

export type Book = {
  n: number;
  /** "Book the first" */
  name: string;
  /** "Of forces at a point" */
  subject: string;
};

export type Page = {
  /** URL slug: "<book in roman, lower case>-<n>" for propositions ("ii-3"), a word for plates ("stevin"). */
  slug: RefId;
  /** Book number; for a plate, the book it follows. */
  book: number;
  /** Proposition number within its book; 0 for plates. */
  n: number;
  kind: "Theorem" | "Problem" | "Plate";
  /** Plates only: the plate's own title ("The wreath of spheres"). */
  title?: string;
  /** Short name for contents and paging ("Three forces"). */
  short: string;
  /** The enunciation, in one sentence, set with a drop cap. */
  statement: string;
  figure: ReactNode;
  /** One line under the figure. */
  caption: string;
  /** The proof: paragraphs using Sym, Ref, Note, Cor. Q.E.D. is added by the page. */
  proof: ReactNode;
  /** Axioms and propositions the proof leans on; quoted under the proof. */
  refs: RefId[];
  /** Running head on the figure page, when the default ("Book the first. Of forces at a point.") does not fit. */
  head?: string;
  /** Set the whole spread on black (side plates). */
  dark?: boolean;
  /** No Q.E.D. (plates that only show). */
  noQed?: boolean;
};
