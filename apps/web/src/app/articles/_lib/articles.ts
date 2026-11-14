// Articles: stand-alone interactive essays, grouped on shelves (docs/notes/forzez-sitemap.md).
// Not Editions: no proofs, no fixed order. An entry without a slug is in the works.

export type Article = {
  /** the idea it is about, shown as the row's kicker */
  idea: string;
  title: string;
  /** one sentence that is interesting on its own */
  hook: string;
  slug?: string;
};

export type Shelf = { id: string; title: string; articles: Article[] };

export const SHELVES: Shelf[] = [
  {
    id: "balance",
    title: "Balance",
    articles: [
      {
        idea: "The force triangle",
        title: "Equilibrium of forces",
        hook: "From one force to the force triangle, one scroll at a time.",
        slug: "equilibrium",
      },
    ],
  },
  {
    id: "cables",
    title: "Cables and chains",
    articles: [
      {
        idea: "Form and force",
        title: "The hanging rope",
        hook: "Hang one weight, then two, then twenty-four: the rope finds the curve of the hanging chain by itself.",
      },
    ],
  },
  {
    id: "wheels",
    title: "Wheels and rings",
    articles: [
      {
        idea: "Prestress",
        title: "The bicycle wheel",
        hook: "The hub does not hang from the top spokes. It stands on the bottom ones.",
      },
      {
        idea: "Rings and spokes",
        title: "Red and blue swap places",
        hook: "A wagon wheel, a stadium roof and a spider web: the same ring and hub, with tension and compression traded.",
      },
    ],
  },
  {
    id: "domes",
    title: "Arches and domes",
    articles: [
      {
        idea: "Hoop forces",
        title: "The Pantheon",
        hook: "Below 51.8° from the crown, the rings of a dome stop pushing and start to pull.",
      },
    ],
  },
];

export const ARTICLES = SHELVES.flatMap((s) => s.articles);
export const PUBLISHED = ARTICLES.filter((a) => a.slug);
