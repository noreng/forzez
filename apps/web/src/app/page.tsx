import type { ReactNode } from "react";
import Link from "next/link";
import { Eyebrow, Sym, buttonClass } from "@forzez/ui";
import { PAGES, findPage } from "./elements/_lib/content";

// Copy: docs/notes/brand-naming.md and forzez-puns-and-logo.md. The figure is the hero
// (DESIGN.md): the chain and the arch from Elements V.3, the same drawing as its plate.
const hero = findPage("v-3")!.page;
const plates = PAGES.length;

/** One line of "on forzez": what it is, a sentence, and where it goes (or that it is coming). */
function Row({ kicker, title, children, href, status }: { kicker: string; title: string; children: ReactNode; href?: string; status?: string }) {
  const inner = (
    <>
      <span className="font-data text-sm text-muted">{kicker}</span>
      <span>
        <span className={href ? "font-display text-xl group-hover:underline" : "font-display text-xl text-muted"}>{title}</span>
        <span className="mt-1 block text-muted">{children}</span>
      </span>
      {/* on phones the whole row is the link; the arrow only shows where it has its own column */}
      <span className={href ? "hidden font-data text-sm text-muted sm:inline" : "font-data text-sm whitespace-nowrap text-muted"}>{href ? "→" : status}</span>
    </>
  );
  const row = "grid grid-cols-1 gap-x-8 gap-y-1 py-5 sm:grid-cols-[11rem_minmax(0,1fr)_auto] sm:items-baseline";
  return (
    <li className="border-b border-rule first:border-t">
      {href ? <Link href={href} className={`group ${row}`}>{inner}</Link> : <div className={row}>{inner}</div>}
    </li>
  );
}

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-24 px-5 pt-24 pb-16 sm:px-8 min-[1000px]:pt-28">
      {/* hero: the claim on one side, the drawing that proves it on the other */}
      <section className="grid items-center gap-12 min-[1000px]:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="flex flex-col gap-5">
          <Eyebrow>forzez · say it like “forces”</Eyebrow>
          <h1 className="font-display text-4xl leading-none">Tour de Forzez.</h1>
          <p className="max-w-[34rem] text-md">
            Real structures, calculated by physics and drawn line by line in ink. Bridges, arches, trusses.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/elements" className={buttonClass("primary")}>Read The Elements of Statics</Link>
            <Link href="/lab/equilibrium" className={buttonClass("ghost")}>See forces in balance</Link>
          </div>
        </div>
        <figure className="m-0">
          {hero.figure}
          <figcaption className="mt-4 text-center text-sm text-muted italic">
            <Link href={`/elements/${hero.slug}`} className="underline decoration-rule underline-offset-3 hover:decoration-ink">
              Book V, Prop. III
            </Link>
            : as the chain hangs, so the arch stands.
          </figcaption>
        </figure>
      </section>

      {/* manifesto and the colour key */}
      <section className="grid gap-10 border-t border-rule-strong pt-10 min-[1000px]:grid-cols-2">
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-3xl leading-none">Form follows Forzez.</h2>
          <p className="max-w-[30rem] text-muted italic">Sullivan said form follows function. We’d add: function follows forces.</p>
        </div>
        <ul className="m-0 flex list-none flex-col gap-3 p-0 text-md">
          <li><Sym c="compression" weight="thick" label="red member" /> Red pushes.</li>
          <li><Sym c="tension" weight="thick" label="blue member" /> Blue pulls.</li>
          <li><Sym c="load" weight="thick" label="yellow load" /> Yellow carries the load.</li>
          <li className="text-muted">Nothing is decoration.</li>
        </ul>
      </section>

      {/* what is here, as a contents list rather than cards */}
      <section className="flex flex-col gap-6">
        <h2 className="font-display text-xl">On forzez</h2>
        <ol className="m-0 list-none p-0">
          <Row kicker="Editions, No. 1" title="The Elements of Statics" href="/elements">
            Statics in the manner of Byrne’s Euclid: five books, {plates} plates, colours in place of letters.
          </Row>
          <Row kicker="The lab" title="Equilibrium of forces" href="/lab/equilibrium">
            From one force to the force triangle, one scroll at a time.
          </Row>
          <Row kicker="Studio" title="Series 01: Arches" status="in the works">
            Real structures, calculated by the engine behind Truzme and plotted in ink by our family.
          </Row>
        </ol>
      </section>

      {/* newsletter: no form until a list service is chosen */}
      <section className="flex flex-col gap-3 border-t border-rule-strong pt-10">
        <h2 className="font-display text-3xl leading-none">Feel the Forzez.</h2>
        <p className="max-w-[36rem]">One proposition per issue, and every new series first. The list opens with the first series.</p>
        <p className="font-data text-sm text-muted">Hold your forzez.</p>
      </section>

      <footer className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-rule pt-6 text-sm text-muted">
        <p className="italic">Every line carries a load.</p>
        <nav aria-label="More" className="flex flex-wrap gap-x-6 gap-y-2 font-data">
          <Link href="/design" className="hover:text-ink">Design system</Link>
          <a href="https://truzme.com" className="hover:text-ink">Powered by Truzme</a>
        </nav>
      </footer>
    </main>
  );
}
