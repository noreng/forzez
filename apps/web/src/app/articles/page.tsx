import type { Metadata } from "next";
import { Eyebrow } from "@forzez/ui";
import { ContentsRow } from "../_components/contents-row";
import { ARTICLES, PUBLISHED, SHELVES } from "./_lib/articles";

export const metadata: Metadata = {
  title: "Articles",
  description: "Statics you can play with: stand-alone interactive essays on balance, cables, wheels and domes.",
};

const coming = ARTICLES.length - PUBLISHED.length;

/** The articles archive: shelves as a numbered contents list, with honest counts (after abakcus.com). */
export default function ArticlesIndex() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-5 pt-24 pb-16 sm:px-8 min-[1000px]:pt-28">
      <header className="grid gap-6 min-[1000px]:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] min-[1000px]:items-end">
        <div className="flex flex-col gap-4">
          <Eyebrow>Articles</Eyebrow>
          <h1 className="font-display text-4xl leading-none">Statics you can play with.</h1>
          <p className="max-w-[32rem] text-md text-muted italic">
            One structure per article, a story and a diagram you can push. For the proofs, see The Elements.
          </p>
        </div>
        <p className="font-data text-sm text-muted min-[1000px]:text-right">
          {PUBLISHED.length} {PUBLISHED.length === 1 ? "article" : "articles"} · {coming} in the works · {SHELVES.length} shelves · 0 ads
        </p>
      </header>

      {SHELVES.map((shelf, i) => (
        <section key={shelf.id} aria-labelledby={`shelf-${shelf.id}`} className="flex flex-col gap-4">
          <h2 id={`shelf-${shelf.id}`} className="flex items-baseline gap-3 font-display text-xl">
            <span className="font-data text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
            {shelf.title}
          </h2>
          <ol className="m-0 list-none p-0">
            {shelf.articles.map((a) => (
              <ContentsRow
                key={a.title}
                kicker={a.idea}
                title={a.title}
                href={a.slug ? `/articles/${a.slug}` : undefined}
                status={a.slug ? undefined : "in the works"}
              >
                {a.hook}
              </ContentsRow>
            ))}
          </ol>
        </section>
      ))}
    </main>
  );
}
