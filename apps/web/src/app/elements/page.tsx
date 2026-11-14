import type { Metadata } from "next";
import Link from "next/link";
import { Sym } from "@forzez/ui";
import { AXIOMS, BOOKS, PLATES, propsOf, roman } from "./_lib/content";
import { Spread } from "./_lib/spread";
import type { Page } from "./_lib/types";

export const metadata: Metadata = {
  title: "The Elements of Statics",
  description: "Statics in the manner of Byrne's Euclid: coloured diagrams in place of letters.",
};

/** One line of the contents: number, short name, and the enunciation under it. */
function Entry({ page, mark }: { page: Page; mark: string }) {
  return (
    <li className="border-b border-rule first:border-t">
      <Link href={`/elements/${page.slug}`} className="group grid grid-cols-[3.5ch_minmax(0,1fr)] gap-3 py-2.5">
        <span className="font-display">{mark}</span>
        <span>
          <span className="group-hover:underline">{page.kind === "Plate" ? (page.title ?? page.short) : page.short}</span>
          <span className="block text-sm text-muted">{page.statement}</span>
        </span>
      </Link>
    </li>
  );
}

export default function ElementsIndex() {
  const books = BOOKS.map((book) => ({ book, props: propsOf(book.n) })).filter((b) => b.props.length);
  return (
    <Spread
      headLeft="The Elements of Statics"
      headRight="Contents"
      left={
        <>
          <h1 className="mt-10 font-display text-4xl leading-none min-[1000px]:mt-12">The Elements of Statics</h1>
          <p className="mt-3 text-md text-muted italic">with coloured diagrams in place of letters</p>
          <p className="mt-5" aria-hidden>
            <Sym c="force-1" /> <Sym c="force-2" /> <Sym c="force-3" /> <Sym c="ink" />
          </p>

          <h2 className="mt-12 font-display text-xl">Axioms.</h2>
          <ol className="mt-4 flex list-none flex-col gap-6 p-0">
            {AXIOMS.map((a) => (
              <li key={a.id} id={a.id} className="grid scroll-mt-6 grid-cols-[minmax(0,9rem)_minmax(0,1fr)] items-center gap-5">
                {a.figure}
                <p>
                  <span className="mr-1 font-display">{roman(a.n)}.</span> {a.text}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-8 mb-12 text-muted italic">Everything that follows is built from these four, and from nothing else.</p>
        </>
      }
      right={
        <div className="mx-auto flex w-full max-w-[30rem] flex-col gap-10 min-[1000px]:max-h-[calc(100svh-10rem)] min-[1000px]:overflow-y-auto min-[1000px]:pr-2">
          {books.map(({ book, props }) => (
            <section key={book.n}>
              <h2 className="font-display text-xl">{book.name}.</h2>
              <p className="text-muted italic">{book.subject}.</p>
              <ol className="mt-4 flex list-none flex-col p-0">
                {props.map((p) => <Entry key={p.slug} page={p} mark={`${roman(p.n)}.`} />)}
              </ol>
            </section>
          ))}
          {PLATES.length ? (
            <section>
              <h2 className="font-display text-xl">Plates.</h2>
              <ol className="mt-4 flex list-none flex-col p-0">
                {PLATES.map((p) => <Entry key={p.slug} page={p} mark="" />)}
              </ol>
            </section>
          ) : null}
        </div>
      }
    />
  );
}
