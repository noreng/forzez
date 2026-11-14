// Pieces for writing proofs. Every page's proof uses these, so the look of references,
// corollaries and notes is defined once.

import type { ReactNode } from "react";
import Link from "next/link";
import { Sym } from "@forzez/ui";
import { refHref, refLabel } from "./refs";
import type { RefId } from "./types";

/** An inline reference, as in a book: italic, in brackets, linked. `label` overrides "Prop. IV". */
export function Ref({ to, label }: { to: RefId; label?: string }) {
  return (
    <span className="text-muted italic">
      (<Link href={refHref(to)} className="underline decoration-rule underline-offset-3 hover:decoration-ink">{label ?? refLabel(to)}</Link>)
    </span>
  );
}

/** "Corollary. …" */
export const Cor = ({ children }: { children: ReactNode }) => <p><i>Corollary.</i> {children}</p>;

/** A remark in muted text: history, intuition, a credit. */
export const Note = ({ children }: { children: ReactNode }) => <p className="text-muted">{children}</p>;

/** Keeps a symbol and its operator on one line ("× sin ∠"). */
export const NW = ({ children }: { children: ReactNode }) => <span className="whitespace-nowrap">{children}</span>;

/** A citation outside the book: italic, muted, in brackets ("Euclid I.47"). */
export const Cite = ({ children }: { children: ReactNode }) => <span className="text-muted italic">({children})</span>;

/** Shorthands for the four forces as symbols in text. */
export const S = {
  r: <Sym c="force-1" />,
  b: <Sym c="force-2" />,
  y: <Sym c="force-3" />,
  k: <Sym c="ink" />,
  /** dashed resultant */
  d: <Sym c="ink" kind="dashed" label="dashed resultant" />,
};
