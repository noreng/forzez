// The planned contents of the whole book (docs/elements/elements-of-statics-toc.md, 65 entries).
// An entry with a `slug` that has a page in PAGES is written; the rest show on the
// contents page as sketched or not yet written. Write a page, add its slug here.

export type PlanStatus = "sketched" | "planned";

export type PlanEntry = {
  /** "I", "XI"; empty for plates and front matter. */
  mark?: string;
  title: string;
  /** Page slug once written ("i-1", "stevin"); "contents" for this page itself. */
  slug?: string;
  /** How far an entry is while it has no page yet: sketched in chat, or not started. */
  status?: PlanStatus;
};

export type PlanSection = { id: string; title: string; subject?: string; entries: PlanEntry[] };

const e = (mark: string, title: string, slug?: string, status: PlanStatus = "planned"): PlanEntry =>
  ({ mark, title, slug, status });

export const PLAN: PlanSection[] = [
  {
    id: "front", title: "Front matter",
    entries: [
      e("", "Title page and axioms I–IV", "contents"),
      e("", "Introduction: how to read a plate"),
      e("", "Colour key: identity colours, meaning colours"),
      e("", "About: Byrne, and this book"),
    ],
  },
  {
    id: "book-1", title: "Book the first", subject: "Of forces at a point",
    entries: [
      e("I", "Three forces in balance meet in one point", "i-1"),
      e("II", "The force polygon", "i-2"),
      e("III", "Pythagoras of forces", "i-3"),
      e("IV", "The inclined plane", "i-4"),
      e("V", "Lami’s theorem", "i-5"),
      e("VI", "The pulley", "i-6"),
      e("VII", "Balance by counting", "i-7"),
      e("VIII", "Components in any frame", "i-8"),
      e("IX", "A weight hung on two strings", "i-9"),
      e("", "Plate: Stevin’s wreath of spheres", "stevin"),
    ],
  },
  {
    id: "book-2", title: "Book the second", subject: "Of forces in the plane",
    entries: [
      e("I", "The lever", "ii-1"),
      e("II", "Varignon’s theorem", "ii-2"),
      e("III", "The couple", "ii-3"),
      e("IV", "Spread loads", "ii-4"),
      e("V", "The string polygon", "ii-5"),
      e("VI", "Centre of gravity by hanging", "ii-6"),
      e("VII", "Resultant of parallel forces", "ii-7"),
      e("VIII", "Moving a force: a force and a couple", "ii-8"),
      e("IX", "Any set of forces reduced to one", "ii-9"),
      e("X", "Balance in the plane: both polygons close", "ii-10"),
      e("XI", "Centre of gravity of composite shapes", "ii-11"),
    ],
  },
  {
    id: "book-3", title: "Book the third", subject: "Of bodies and supports",
    entries: [
      e("I", "The friction cone", "iii-1"),
      e("II", "Supports: pin, roller, fixed", "iii-2"),
      e("III", "The inclined roller", "iii-3"),
      e("IV", "The free body: a whole structure cut loose", "iii-4"),
      e("V", "The three-force body: a ladder against a wall", "iii-5"),
      e("VI", "Reactions of a simple beam", "iii-6"),
      e("VII", "Determinate and indeterminate", "iii-7"),
      e("VIII", "Toppling or sliding", "iii-8"),
      e("IX", "Three supports that are not enough", "iii-9"),
      e("X", "The Gerber beam", "iii-10"),
      e("XI", "The cantilever bridge", "iii-11"),
    ],
  },
  {
    id: "book-4", title: "Book the fourth", subject: "Of trusses",
    entries: [
      e("I", "The method of joints", "iv-1"),
      e("II", "Why triangles", "iv-2"),
      e("III", "Members that carry nothing", "iv-3"),
      e("IV", "Ritter’s section", "iv-4"),
      e("V", "Cremona’s diagram", "iv-5", "sketched"),
      e("VI", "Reverse the loads", "iv-6"),
      e("VII", "Double the load, double every member force", "iv-7"),
      e("VIII", "Two loads together: superposition", "iv-8"),
      e("IX", "Warren, Pratt and Howe", "iv-9"),
      e("X", "The bridge: every member from the four axioms", "iv-10"),
      e("XI", "The lightest truss (Michell, 1904)", "iv-11"),
    ],
  },
  {
    id: "book-5", title: "Book the fifth", subject: "Of cables and arches",
    entries: [
      e("I", "The hanging chain", "v-1", "sketched"),
      e("II", "The suspension cable", "v-2"),
      e("III", "The inverted chain is an arch", "v-3"),
      e("IV", "The thrust line", "v-4"),
      e("V", "The semicircle", "v-5"),
      e("VI", "Four hinges: how an arch fails", "v-6"),
      e("VII", "Gaudí’s hanging model", "v-7"),
      e("VIII", "The funicular truss", "v-8"),
    ],
  },
  {
    id: "side", title: "Side plates",
    entries: [
      e("", "Maxwell, 1864: reciprocal figures"),
      e("", "Culmann’s crane and the femur"),
      e("", "The bicycle wheel", "wheel"),
      e("", "The wagon wheel", undefined, "sketched"),
      e("", "The half-wheel bridge", undefined, "sketched"),
      e("", "The spider web", undefined, "sketched"),
      e("", "The spoked-wheel roof", undefined, "sketched"),
      e("", "The Pantheon dome", undefined, "sketched"),
      e("", "The spaghetti bridge"),
      e("", "Szabadság híd, Budapest (1896)"),
    ],
  },
];
