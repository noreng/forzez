import type { Metadata } from "next";
import Link from "next/link";
import { Sym, cx } from "@forzez/ui";
import { AXIOMS, PAGES, roman } from "./_lib/content";
import { PLAN, type PlanEntry } from "./_lib/plan";
import { Spread } from "./_lib/spread";

export const metadata: Metadata = {
  title: "The Elements of Statics",
  description: "Statics in the manner of Byrne's Euclid: coloured diagrams in place of letters.",
};

const written = new Set(["contents", ...PAGES.map((p) => p.slug)]);
const isWritten = (e: PlanEntry) => !!e.slug && written.has(e.slug);
const all = PLAN.flatMap((s) => s.entries);
const count = {
  written: all.filter(isWritten).length,
  sketched: all.filter((e) => !isWritten(e) && e.status === "sketched").length,
  total: all.length,
};

/** One line of the contents. Written entries link; the rest are muted and say how far they are. */
function Entry({ entry }: { entry: PlanEntry }) {
  const done = isWritten(entry);
  const row = "grid grid-cols-[3.5ch_minmax(0,1fr)_auto] items-baseline gap-3 py-2";
  const inner = (
    <>
      <span className="font-display">{entry.mark ? `${entry.mark}.` : ""}</span>
      <span className={done ? "group-hover:underline" : "text-muted"}>{entry.title}</span>
      {done ? null : (
        <span className="font-data text-xs whitespace-nowrap text-muted">
          {entry.status === "sketched" ? "sketched" : "not yet written"}
        </span>
      )}
    </>
  );
  return (
    <li className="border-b border-rule first:border-t">
      {done && entry.slug !== "contents" ? (
        <Link href={`/elements/${entry.slug}`} className={cx("group", row)}>{inner}</Link>
      ) : (
        <div className={row} aria-disabled={!done || undefined}>{inner}</div>
      )}
    </li>
  );
}

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
          <p className="mt-8 mb-12 text-muted italic">Everything that follows is built from these four, and from nothing else.</p>
        </>
      }
      right={
        <div className="mx-auto flex w-full max-w-[30rem] flex-col gap-10 min-[1000px]:max-h-[calc(100svh-10rem)] min-[1000px]:overflow-y-auto min-[1000px]:pr-2">
          <p className="font-data text-sm text-muted">
            {count.written} of {count.total} written · {count.sketched} sketched
          </p>
          {PLAN.map((section) => (
            <section key={section.id} aria-labelledby={`toc-${section.id}`}>
              <h2 id={`toc-${section.id}`} className="font-display text-xl">{section.title}.</h2>
              {section.subject ? <p className="text-muted italic">{section.subject}.</p> : null}
              <ol className="mt-4 flex list-none flex-col p-0">
                {section.entries.map((entry) => <Entry key={`${section.id}-${entry.mark}-${entry.title}`} entry={entry} />)}
              </ol>
            </section>
          ))}
        </div>
      }
    />
  );
}
