import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BOOKS, PROPS, findProp, refHref, refLabel, refText, roman } from "../_lib/content";
import { PageNav } from "../_lib/page-nav";
import { Spread } from "../_lib/spread";

export function generateStaticParams() {
  return PROPS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/elements/[slug]">): Promise<Metadata> {
  const found = findProp((await params).slug);
  if (!found) return {};
  const { prop } = found;
  return { title: `Prop. ${roman(prop.book)}.${prop.n} · ${prop.short}`, description: prop.statement };
}

// Reading params suspends; known slugs are prerendered in full, so the fallback only shows
// for an unknown slug on its way to the 404.
export default function PropositionPage({ params }: PageProps<"/elements/[slug]">) {
  return (
    <Suspense fallback={<main className="flex-1" />}>
      <Proposition params={params} />
    </Suspense>
  );
}

async function Proposition({ params }: { params: PageProps<"/elements/[slug]">["params"] }) {
  const found = findProp((await params).slug);
  if (!found) notFound();
  const { prop, prev, next } = found;
  const book = BOOKS.find((b) => b.n === prop.book)!;

  return (
    <Spread
      headLeft="The Elements of Statics"
      headRight={`${book.name}. ${book.subject}.`}
      left={
        <>
          <h1 className="mt-10 font-display text-3xl leading-none min-[1000px]:mt-12">Proposition {roman(prop.n)}.</h1>
          <p className="mt-1 italic">{prop.kind}.</p>

          <p className="mt-7 text-md leading-relaxed hyphens-auto first-letter:float-left first-letter:mt-[0.06em] first-letter:mr-[0.12em] first-letter:font-display first-letter:text-[3.5em] first-letter:leading-[0.82] first-letter:text-force-1 min-[1000px]:text-justify">
            {prop.statement}
          </p>

          <div className="mt-7 flex flex-col gap-3 leading-relaxed">{prop.proof}</div>
          <p className="mt-4 text-right font-display">Q.E.D.</p>

          <div className="min-h-10 flex-1" />

          {prop.refs.length ? (
            <aside aria-label="Referenced" className="flex max-w-[24rem] flex-col gap-1.5 border-t border-rule pt-3 text-sm text-muted italic">
              {prop.refs.map((id) => (
                <p key={id}>
                  <Link href={refHref(id)} className="underline decoration-rule underline-offset-3 hover:decoration-ink">{refLabel(id)}.</Link> {refText(id)}
                </p>
              ))}
            </aside>
          ) : null}

          <PageNav
            prev={prev ? { href: `/elements/${prev.slug}`, n: roman(prev.n), short: prev.short } : null}
            next={next ? { href: `/elements/${next.slug}`, n: roman(next.n), short: next.short } : null}
          />
        </>
      }
      right={
        <figure className="m-0">
          {prop.figure}
          <figcaption className="mt-6 text-center text-sm text-muted italic">{prop.caption}</figcaption>
        </figure>
      }
    />
  );
}
