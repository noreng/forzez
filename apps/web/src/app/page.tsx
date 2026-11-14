import Link from "next/link";
import { Eyebrow, Pending, Sym, buttonClass, linkClass } from "@forzez/ui";
import { ContentsRow as Row } from "./_components/contents-row";
import { PAGES, findPage } from "./elements/_lib/content";
import { PUBLISHED } from "./articles/_lib/articles";

// Copy: docs/notes/brand-naming.md and forzez-puns-and-logo.md. The figure is the hero
// (DESIGN.md): the chain and the arch from Elements V.3, the same drawing as its plate.
const hero = findPage("v-3")!.page;
const plates = PAGES.length;

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
          </div>
        </div>
        <figure className="m-0">
          {hero.figure}
          <figcaption className="mt-4 text-center text-sm text-muted italic">
            <Link href={`/elements/${hero.slug}`} className={`not-italic ${linkClass}`}>
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
          <Row kicker="Articles" title="Statics you can play with" href="/articles">
            One structure per article, with a diagram you can push. {PUBLISHED[0].title} is up; the bicycle wheel and the hanging rope are next.
          </Row>
          <Row kicker="Studio" title="Structures the solver draws" href="/studio">
            Generative trusses: a seed makes the structure, the solver colours it. Series 01: Arches, plotted in ink, comes from here.
          </Row>
          <Row kicker="Films" title="Forzez Films No. 001" status="in the works">
            Films that run as code. The first: thirteen minutes of ink in thirty seconds.
          </Row>
        </ol>
      </section>

      {/* newsletter: no form until a list service is chosen */}
      <section className="flex flex-col gap-3 border-t border-rule-strong pt-10">
        <h2 className="font-display text-3xl leading-none">Feel the Forzez.</h2>
        <p className="max-w-[36rem]">One proposition per issue, and every new series first.</p>
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <Pending>signup opens with Series 01</Pending>
          <span className="text-muted italic">Hold your forzez.</span>
        </p>
      </section>

      <footer className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-rule pt-6 text-sm text-muted">
        <p className="italic">Every line carries a load.</p>
        <nav aria-label="More" className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/design" className={linkClass}>Design system</Link>
          <span>
            Powered by <a href="https://truzme.com" className={linkClass}>Truzme</a>
          </span>
        </nav>
      </footer>
    </main>
  );
}
