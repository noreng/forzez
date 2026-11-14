// The Elements of Statics: axioms and propositions.
// Text and figures follow prototypes/elements-of-statics (Main, Prop-I-1 … Prop-I-6).

import type { ReactNode } from "react";
import Link from "next/link";
import { Sym } from "@forzez/ui";
import { Arrow, Dash, Dot, Figure, body, col, ink, paper } from "./figure";

/* ---------------- references: (Ax. II), (Prop. I) ---------------- */

export type RefId = `ax-${1 | 2 | 3 | 4}` | `i-${number}`;

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
export const roman = (n: number) => ROMAN[n] ?? String(n);

export function refLabel(id: RefId) {
  const [kind, n] = id.split("-");
  return kind === "ax" ? `Ax. ${roman(Number(n))}` : `Prop. ${roman(Number(n))}`;
}
export function refHref(id: RefId) {
  return id.startsWith("ax-") ? `/elements#${id}` : `/elements/${id}`;
}

/** An inline reference to an axiom or proposition, as in a book: italic, in brackets. */
export function Ref({ to }: { to: RefId }) {
  return (
    <span className="text-muted italic">
      (<Link href={refHref(to)} className="underline decoration-rule underline-offset-3 hover:decoration-ink">{refLabel(to)}</Link>)
    </span>
  );
}

const Cor = ({ children }: { children: ReactNode }) => (
  <p><i>Corollary.</i> {children}</p>
);
/** Keeps a symbol and its operator on one line. */
const NW = ({ children }: { children: ReactNode }) => <span className="whitespace-nowrap">{children}</span>;
const Note = ({ children }: { children: ReactNode }) => <p className="text-muted">{children}</p>;

const r = <Sym c="force-1" />, b = <Sym c="force-2" />, y = <Sym c="force-3" />, k = <Sym c="ink" />;
const d = <Sym c="ink" kind="dashed" label="dashed resultant" />;

/* ---------------- axioms ---------------- */

export type Axiom = { id: RefId; n: number; text: string; figure: ReactNode };

export const AXIOMS: Axiom[] = [
  {
    id: "ax-1", n: 1,
    text: "Two forces hold a body in balance when they are equal, opposite, and on one line.",
    figure: (
      <Figure viewBox="0 0 260 130" label="Two equal and opposite red forces on one line hold a body in balance">
        <rect x="95" y="40" width="70" height="50" fill={body} />
        <Dash x1={14} y1={65} x2={246} y2={65} w={1} />
        <Arrow x1={110} y1={65} x2={44} y2={65} c="r" w={5} />
        <Arrow x1={150} y1={65} x2={216} y2={65} c="r" w={5} />
      </Figure>
    ),
  },
  {
    id: "ax-2", n: 2,
    text: "Two forces at a point act as one: the diagonal of the parallelogram they span.",
    figure: (
      <Figure viewBox="0 0 260 130" label="A red and a blue force at a point combine into the black diagonal of their parallelogram">
        <Dash x1={90} y1={30} x2={230} y2={10} w={1} />
        <Dash x1={200} y1={100} x2={230} y2={10} w={1} />
        <Arrow x1={60} y1={118} x2={223} y2={14} c="k" w={3} s={1.2} />
        <Arrow x1={60} y1={118} x2={85} y2={43} c="r" w={5} />
        <Arrow x1={60} y1={118} x2={186} y2={102} c="b" w={5} />
        <Dot x={60} y={118} r={4} />
      </Figure>
    ),
  },
  {
    id: "ax-3", n: 3,
    text: "A balanced set of forces may be added or taken away; the body never notices.",
    figure: (
      <Figure viewBox="0 0 260 130" label="A yellow load on a body is unchanged when a balanced pair of blue forces is added">
        <rect x="95" y="50" width="70" height="50" fill={body} />
        <Arrow x1={130} y1={6} x2={130} y2={34} c="y" w={5} />
        <Arrow x1={112} y1={75} x2={50} y2={75} c="b" w={5} opacity={0.45} />
        <Arrow x1={148} y1={75} x2={210} y2={75} c="b" w={5} opacity={0.45} />
      </Figure>
    ),
  },
  {
    id: "ax-4", n: 4,
    text: "Whatever one body does to another, the other does back: equal, and opposite.",
    figure: (
      <Figure viewBox="0 0 260 130" label="Two bodies press on each other with equal and opposite red forces">
        <rect x="20" y="40" width="80" height="50" fill={body} />
        <rect x="160" y="40" width="80" height="50" fill={ink} fillOpacity={0.16} />
        <Arrow x1={134} y1={65} x2={116} y2={65} c="r" w={5} />
        <Arrow x1={126} y1={65} x2={144} y2={65} c="r" w={5} />
      </Figure>
    ),
  },
];

/* ---------------- propositions ---------------- */

export type Prop = {
  slug: `i-${number}`;
  book: number;
  n: number;
  kind: "Theorem" | "Problem";
  /** Short name for contents and links. */
  short: string;
  statement: string;
  figure: ReactNode;
  caption: string;
  proof: ReactNode;
  /** Axioms and propositions the proof leans on; printed as notes under the proof. */
  refs: RefId[];
};

export const BOOKS = [{ n: 1, name: "Book the first", subject: "Of forces at a point" }];

export const PROPS: Prop[] = [
  {
    slug: "i-1", book: 1, n: 1, kind: "Theorem", short: "Three forces",
    statement: "If three forces, not parallel, hold a body in balance, their lines of action meet in one point; and drawn one after another, the three forces close a triangle.",
    caption: "Three forces in balance, and their triangle.",
    figure: (
      <Figure viewBox="0 0 580 420" label="A body held by a red, a blue and a yellow force whose dashed lines of action meet in one point; beside it the same three forces placed tip to tail close a triangle">
        <polygon points="115,135 255,145 225,255 170,265 110,200" fill={body} />
        <Dash x1={180} y1={190} x2={120} y2={140} />
        <Dash x1={180} y1={190} x2={250} y2={150} />
        <Dash x1={180} y1={190} x2={172} y2={262} />
        <Arrow x1={120} y1={140} x2={41} y2={74} c="r" />
        <Arrow x1={250} y1={150} x2={343} y2={97} c="b" />
        <Arrow x1={172} y1={262} x2={161.5} y2={386} c="y" />
        <Dot x={180} y={190} />
        <Arrow x1={500} y1={300} x2={414.8} y2={229} c="r" />
        <Arrow x1={404} y1={220} x2={503.8} y2={162.9} c="b" />
        <Arrow x1={516} y1={156} x2={501.5} y2={286.1} c="y" />
      </Figure>
    ),
    proof: (
      <>
        <p>{r} + {b} = {d} <Ref to="ax-2" /></p>
        <p>{d} + {y} = 0, for the body is in balance.</p>
        <p>Therefore {y} lies on the line of {d} <Ref to="ax-1" /> and passes through the point where {r} and {b} meet.</p>
        <p>And placed tip to tail, {r}{b}{y} end where they began.</p>
      </>
    ),
    refs: ["ax-1", "ax-2"],
  },
  {
    slug: "i-2", book: 1, n: 2, kind: "Theorem", short: "The force polygon",
    statement: "Any number of forces at one point are in balance when, drawn tip to tail, they close a polygon.",
    caption: "Four forces at a point, and their closed polygon.",
    figure: (
      <Figure viewBox="0 0 580 380" label="Four forces red, blue, yellow and black act at one point; beside them the same forces placed tip to tail close a quadrilateral, with dashed diagonals folding pairs of forces into one">
        <Arrow x1={150} y1={200} x2={52} y2={147} c="r" />
        <Arrow x1={150} y1={200} x2={186} y2={83} c="b" />
        <Arrow x1={150} y1={200} x2={256.7} y2={235.6} c="y" />
        <Arrow x1={150} y1={200} x2={104.4} y2={336.7} c="k" />
        <Dot x={150} y={200} r={6} />
        <Dash x1={420} y1={330} x2={350} y2={140} w={1.5} />
        <Dash x1={420} y1={330} x2={470} y2={180} w={1.5} />
        <Arrow x1={420} y1={330} x2={322.3} y2={276.7} c="r" />
        <Arrow x1={310} y1={270} x2={345.9} y2={153.4} c="b" />
        <Arrow x1={350} y1={140} x2={456.7} y2={175.6} c="y" />
        <Arrow x1={470} y1={180} x2={424.4} y2={316.7} c="k" />
      </Figure>
    ),
    proof: (
      <>
        <p>{r} + {b} = the first {d} <Ref to="ax-2" /></p>
        <p>that {d} + {y} = the second {d} <Ref to="ax-2" /></p>
        <p>and that {d} + {k} = 0 <Ref to="ax-1" />, so the last side returns to the first point.</p>
        <Note>The polygon is Proposition I, repeated: every dashed diagonal folds two forces into one.</Note>
        <Cor>Leave one side out, and the gap is the force that would balance the rest.</Cor>
      </>
    ),
    refs: ["ax-1", "ax-2", "i-1"],
  },
  {
    slug: "i-3", book: 1, n: 3, kind: "Theorem", short: "Pythagoras of forces",
    statement: "When two forces act at right angles, the square on their resultant equals the squares on the two forces together.",
    caption: "Two forces at right angles, and the squares on them.",
    figure: (
      <Figure viewBox="10 50 420 380" maxWidth="30rem" label="A red and a blue force at right angles, placed tip to tail, with their black resultant; a red square stands on the red force, a blue square on the blue force, and a black square on the resultant">
        <polygon points="170,316 266,316 266,412 170,412" fill={col("r")} />
        <polygon points="282,300 410,300 410,172 282,172" fill={col("b")} />
        <polygon points="157.2,290.4 253.2,162.4 125.2,66.4 29.2,194.4" fill={ink} />
        <polyline points="254,300 254,288 266,288" fill="none" stroke={ink} strokeWidth={1.5} />
        <Arrow x1={170} y1={300} x2={257.6} y2={183.2} c="k" />
        <Arrow x1={170} y1={300} x2={252} y2={300} c="r" />
        <Arrow x1={266} y1={300} x2={266} y2={186} c="b" />
      </Figure>
    ),
    proof: (
      <>
        <p>{r} + {b} = {k}, and the three close a right-angled triangle. <Ref to="ax-2" /></p>
        <p><Sym c="force-1" kind="square" /> + <Sym c="force-2" kind="square" /> = <Sym c="ink" kind="square" /> <span className="text-muted italic">(Euclid I.47)</span></p>
        <Note>Forces add as arrows, never as numbers: three and four make five, not seven.</Note>
        <Note>Euclid’s forty-seventh, put to work.</Note>
      </>
    ),
    refs: ["ax-2"],
  },
  {
    slug: "i-4", book: 1, n: 4, kind: "Theorem", short: "The inclined plane",
    statement: "On a slope, the weight of a body parts into a push along the slope and a press into it; and the angle of the slope reappears between the weight and the press.",
    caption: "A block on a slope; its weight parts in two.",
    figure: (
      <Figure viewBox="20 120 440 260" label="A block on a slope; its black weight splits into a red force along the slope and a blue force into the slope. A yellow wedge marks the slope angle at the foot of the slope, and an equal yellow wedge marks the angle between the weight and the blue force">
        <polygon points="60,360 420,360 420,152" fill={body} />
        <path d="M60,360 L120,360 A60 60 0 0 0 112,330 Z" fill={col("y")} />
        <line x1="40" y1="360" x2="440" y2="360" stroke={ink} strokeWidth={2.5} />
        <line x1="60" y1="360" x2="420" y2="152" stroke={ink} strokeWidth={2.5} />
        <polygon points="232,260.7 284,230.7 264,196.1 212,226.1" fill={ink} fillOpacity={0.18} />
        <path d="M248,228.4 L265,257.8 A34 34 0 0 1 248,262.4 Z" fill={col("y")} />
        <Dash x1={196} y1={258.4} x2={248} y2={348.4} knockout />
        <Dash x1={300} y1={318.4} x2={248} y2={348.4} knockout />
        <Arrow x1={248} y1={228.4} x2={248} y2={334.4} c="k" />
        <Arrow x1={248} y1={228.4} x2={208.1} y2={251.4} c="r" />
        <Arrow x1={248} y1={228.4} x2={293} y2={306.3} c="b" />
        <Dot x={248} y={228.4} />
      </Figure>
    ),
    proof: (
      <>
        <p>{r} + {b} = {k} <Ref to="ax-2" /></p>
        <p><Sym c="force-3" kind="wedge" label="yellow angle" /> at the foot = <Sym c="force-3" kind="wedge" label="yellow angle" /> at the block, for their arms are perpendicular, pair by pair: the ground to the weight, the slope to the press.</p>
        <p><NW>{r} = {k} × sin <Sym c="force-3" kind="wedge" label="yellow angle" />,</NW> <NW>{b} = {k} × cos <Sym c="force-3" kind="wedge" label="yellow angle" /></NW></p>
        <Cor>The steeper the slope, the larger the wedge, the more of the weight runs downhill. At a right angle, all of it does.</Cor>
      </>
    ),
    refs: ["ax-2"],
  },
  {
    slug: "i-5", book: 1, n: 5, kind: "Theorem", short: "Lami’s theorem",
    statement: "When three forces at a point are in balance, each is as the sine of the angle between the other two.",
    caption: "Each force faces the angle painted in its colour.",
    figure: (
      <Figure viewBox="40 90 430 230" label="Three forces at a point, red, blue and yellow, in balance. Each force faces a wedge between the other two, painted in its own colour. Beside them the three forces close a triangle">
        <path d="M170,190 L200.6,164.3 A40 40 0 0 1 170,230 Z" fill={col("r")} fillOpacity={0.55} />
        <path d="M170,190 L170,230 A40 40 0 0 1 132.4,176.3 Z" fill={col("b")} fillOpacity={0.55} />
        <path d="M170,190 L132.4,176.3 A40 40 0 0 1 200.6,164.3 Z" fill={col("y")} fillOpacity={0.55} />
        <Arrow x1={170} y1={190} x2={82.5} y2={158.1} c="r" />
        <Arrow x1={170} y1={190} x2={260.1} y2={114.4} c="b" />
        <Arrow x1={170} y1={190} x2={170} y2={297.2} c="y" />
        <Dot x={170} y={190} />
        <Arrow x1={450.1} y1={178.7} x2={450.1} y2={286} c="y" />
        <Arrow x1={349.3} y1={263.3} x2={439.4} y2={187.7} c="b" />
        <Arrow x1={450} y1={300} x2={362.5} y2={268.1} c="r" />
      </Figure>
    ),
    proof: (
      <>
        <p>
          <NW>{r} : sin <Sym c="force-1" kind="wedge" faint label="red angle" /></NW> = <NW>{b} : sin <Sym c="force-2" kind="wedge" faint label="blue angle" /></NW> = <NW>{y} : sin <Sym c="force-3" kind="wedge" faint label="yellow angle" /></NW>
        </p>
        <p>The three forces close a triangle <Ref to="i-1" />. Each corner of that triangle is what its wedge leaves of a straight angle, and an angle and what it leaves have the same sine. The rule of sines in the triangle does the rest.</p>
        <Note>Each force is painted on the angle it does not touch. Bernard Lamy, 1687.</Note>
      </>
    ),
    refs: ["i-1"],
  },
  {
    slug: "i-6", book: 1, n: 6, kind: "Theorem", short: "The pulley",
    statement: "A rope over a smooth pulley pulls equally on both sides; and the pulley hangs along the line that halves the angle between them.",
    caption: "A pulley leans where the rope tells it to.",
    figure: (
      <Figure viewBox="130 30 300 350" maxWidth="26rem" label="A pulley hangs from a ceiling on a tilted rod. A rope runs over it: one end straight down to a weight, the other slanting down to an anchor. Two equal blue arrows show the rope's pulls on the pulley, and a red arrow along the rod balances them">
        <line x1="150" y1="40" x2="270" y2="40" stroke={ink} strokeWidth={2.5} />
        <line x1="240" y1="170" x2="205.1" y2="40" stroke={ink} strokeWidth={2.5} />
        <circle cx="240" cy="170" r="46" fill={paper} stroke={ink} strokeWidth={2.5} />
        <path d="M190,330 L190,170 A50 50 0 0 1 283.3,145 L383.3,318.2" fill="none" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
        <rect x="170" y="330" width="40" height="40" fill={ink} fillOpacity={0.3} />
        <rect x="374" y="318" width="18" height="18" fill={ink} fillOpacity={0.3} />
        <line x1="355" y1="337" x2="415" y2="337" stroke={ink} strokeWidth={2.5} />
        <Dash x1={240} y1={224} x2={267} y2={270.8} />
        <Dash x1={267} y1={216.8} x2={267} y2={270.8} />
        <Dash x1={240} y1={170} x2={267} y2={270.8} knockout />
        <Arrow x1={240} y1={170} x2={240} y2={210} c="b" />
        <Arrow x1={240} y1={170} x2={260} y2={204.7} c="b" />
        <Arrow x1={240} y1={170} x2={216.6} y2={82.7} c="r" />
        <Dot x={240} y={170} />
      </Figure>
    ),
    proof: (
      <>
        <p>{b} = {b} for a smooth wheel cannot hold the rope back on either side; equal lines, one colour.</p>
        <p>{b} + {b} + {r} = 0 <Ref to="i-1" /> and two equal sides make a rhombus, whose diagonal halves the angle.</p>
        <Note>The rod is not drawn crooked: it leans because the rope does.</Note>
        <Cor>Pass the rope round more wheels, and a weight hung on n strands asks only one n-th of itself from your hand.</Cor>
      </>
    ),
    refs: ["i-1"],
  },
];

export function findProp(slug: string) {
  const i = PROPS.findIndex((p) => p.slug === slug);
  return i < 0 ? null : { prop: PROPS[i], prev: PROPS[i - 1] ?? null, next: PROPS[i + 1] ?? null };
}

/** Text of a referenced axiom or proposition, for the notes under a proof. */
export function refText(id: RefId): string {
  if (id.startsWith("ax-")) return AXIOMS.find((a) => a.id === id)?.text ?? "";
  return PROPS.find((p) => p.slug === id)?.statement ?? "";
}
