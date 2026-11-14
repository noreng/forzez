import type { Metadata } from "next";
import Link from "next/link";
import { Sym } from "@forzez/ui";
import { AXIOMS, BOOKS, PROPS, roman } from "./_lib/content";
import { Spread } from "./_lib/spread";

export const metadata: Metadata = {
  title: "The Elements of Statics",
  description: "Statics in the manner of Byrne's Euclid: coloured diagrams in place of letters.",
};

export default function ElementsIndex() {
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
          <p className="mt-8 text-muted italic">Everything that follows is built from these four, and from nothing else.</p>
        </>
      }
      right={
        <div className="mx-auto w-full max-w-[30rem]">
          {BOOKS.map((book) => (
            <section key={book.n}>
              <h2 className="font-display text-xl">{book.name}.</h2>
              <p className="text-muted italic">{book.subject}.</p>
              <ol className="mt-5 flex list-none flex-col p-0">
                {PROPS.filter((p) => p.book === book.n).map((p) => (
                  <li key={p.slug} className="border-b border-rule first:border-t">
                    <Link href={`/elements/${p.slug}`} className="group grid grid-cols-[3ch_minmax(0,1fr)] gap-3 py-2.5">
                      <span className="font-display">{roman(p.n)}.</span>
                      <span>
                        <span className="group-hover:underline">{p.short}</span>
                        <span className="block text-sm text-muted">{p.statement}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          ))}
          <p className="mt-6 text-sm text-muted italic">Books II to V are still being set.</p>
        </div>
      }
    />
  );
}
