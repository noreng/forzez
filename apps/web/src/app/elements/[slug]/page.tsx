import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BOOKS, PAGES, findPage, pageNumber, refHref, refText, roman } from "../_lib/content";
import { PageNav } from "../_lib/page-nav";
import { Spread } from "../_lib/spread";
import type { Page } from "../_lib/types";

export function generateStaticParams() {
  return PAGES.map((p) => ({ slug: p.slug }));
}

const heading = (p: Page) => (p.kind === "Plate" ? (p.title ?? p.short) : `Proposition ${roman(p.n)}.`);

export async function generateMetadata({ params }: PageProps<"/elements/[slug]">): Promise<Metadata> {
  const found = findPage((await params).slug);
  if (!found) return {};
  const { page } = found;
  return { title: page.kind === "Plate" ? heading(page) : `Prop. ${pageNumber(page)} · ${page.short}`, description: page.statement };
}

// Reading params suspends; known slugs are prerendered in full, so the fallback only shows
// for an unknown slug on its way to the 404.
export default function ElementsPage({ params }: PageProps<"/elements/[slug]">) {
  return (
    <Suspense fallback={<main className="flex-1" />}>
      <ElementsSpread params={params} />
    </Suspense>
  );
}

const target = (p: Page | null) => (p ? { href: `/elements/${p.slug}`, n: p.kind === "Plate" ? "Plate" : pageNumber(p), short: p.short } : null);

async function ElementsSpread({ params }: { params: PageProps<"/elements/[slug]">["params"] }) {
  const found = findPage((await params).slug);
  if (!found) notFound();
  const { page, prev, next } = found;
  const book = BOOKS.find((b) => b.n === page.book)!;
  const plate = page.kind === "Plate";

  return (
    <Spread
      dark={page.dark}
      headLeft="The Elements of Statics"
      headRight={page.head ?? (plate ? `Plate. After Book ${roman(page.book)}.` : `${book.name}. ${book.subject}.`)}
      left={
        <>
          <h1 className="mt-10 font-display text-3xl leading-none min-[1000px]:mt-12">{heading(page)}</h1>
          <p className="mt-1 italic">{plate ? page.short : page.kind}.</p>

          <p className="mt-7 text-md leading-relaxed hyphens-auto first-letter:float-left first-letter:mt-[0.06em] first-letter:mr-[0.12em] first-letter:font-display first-letter:text-[3.5em] first-letter:leading-[0.82] first-letter:text-force-1 min-[1000px]:text-justify">
            {page.statement}
          </p>

          <div className="mt-7 flex flex-col gap-3 leading-relaxed">{page.proof}</div>
          {/* a theorem ends "which was to be shown", a problem "which was to be done" */}
          {page.noQed ? null : <p className="mt-4 text-right font-display">{page.kind === "Problem" ? "Q.E.F." : "Q.E.D."}</p>}

          <div className="min-h-10 flex-1" />

          {page.refs.length ? (
            <aside aria-label="Referenced" className="flex max-w-[24rem] flex-col gap-1.5 border-t border-rule pt-3 text-sm text-muted italic">
              {page.refs.map((id) => {
                const { label, text } = refText(id);
                return (
                  <p key={id}>
                    <Link href={refHref(id)} className="underline decoration-rule underline-offset-3 hover:decoration-ink">{label}.</Link> {text}
                  </p>
                );
              })}
            </aside>
          ) : null}

          <PageNav prev={target(prev)} next={target(next)} />
        </>
      }
      right={
        <figure className="m-0">
          {page.figure}
          <figcaption className="mt-6 text-center text-sm text-muted italic">{page.caption}</figcaption>
        </figure>
      }
    />
  );
}
