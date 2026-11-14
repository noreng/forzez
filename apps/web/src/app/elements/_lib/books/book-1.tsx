// Book I: Of forces at a point. Ported from prototypes/elements-of-statics/project/Prop-I-*.dc.html.
// This file is the model for the other books: figures only use parts from ../figure,
// proofs only use pieces from ../proof and Sym.

import { Sym } from "@forzez/ui";
import { Area, Arrow, Body, Curve, Dash, Dot, Figure, Grid, Ground, RightAngle, Stroke, Wedge, Weight, Wheel } from "../figure";
import { Cite, Cor, NW, Note, Ref, S } from "../proof";
import type { Page } from "../types";

const { r, b, y, k, d } = S;
const yAngle = <Sym c="force-3" kind="wedge" label="yellow angle" />;

/** n unit steps of one force, as arrows in a row (Prop. VII). */
const steps = (c: "force-1" | "force-2" | "force-3" | "ink", dir: "up" | "down" | "left" | "right", n: number) =>
  Array.from({ length: n }, (_, i) => <Sym key={`${c}${dir}${i}`} c={c} kind="arrow" dir={dir} />);

export const BOOK_1: Page[] = [
  {
    slug: "i-1", book: 1, n: 1, kind: "Theorem", short: "Three forces",
    statement: "If three forces, not parallel, hold a body in balance, their lines of action meet in one point; and drawn one after another, the three forces close a triangle.",
    caption: "Three forces in balance, and their triangle.",
    figure: (
      <Figure viewBox="0 0 580 420" label="A body held by a red, a blue and a yellow force whose dashed lines of action meet in one point; beside it the same three forces placed tip to tail close a triangle">
        <Body points="115,135 255,145 225,255 170,265 110,200" />
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
        <Area points="170,316 266,316 266,412 170,412" c="r" />
        <Area points="282,300 410,300 410,172 282,172" c="b" />
        <Area points="157.2,290.4 253.2,162.4 125.2,66.4 29.2,194.4" c="k" />
        <RightAngle points="254,300 254,288 266,288" />
        <Arrow x1={170} y1={300} x2={257.6} y2={183.2} c="k" />
        <Arrow x1={170} y1={300} x2={252} y2={300} c="r" />
        <Arrow x1={266} y1={300} x2={266} y2={186} c="b" />
      </Figure>
    ),
    proof: (
      <>
        <p>{r} + {b} = {k}, and the three close a right-angled triangle. <Ref to="ax-2" /></p>
        <p><Sym c="force-1" kind="square" /> + <Sym c="force-2" kind="square" /> = <Sym c="ink" kind="square" /> <Cite>Euclid I.47</Cite></p>
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
        <Body points="60,360 420,360 420,152" />
        <Wedge d="M60,360 L120,360 A60 60 0 0 0 112,330 Z" c="y" />
        <Ground x1={40} x2={440} y={360} />
        <Stroke x1={60} y1={360} x2={420} y2={152} />
        <Body points="232,260.7 284,230.7 264,196.1 212,226.1" shade={2} />
        <Wedge d="M248,228.4 L265,257.8 A34 34 0 0 1 248,262.4 Z" c="y" />
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
        <p>{yAngle} at the foot = {yAngle} at the block, for their arms are perpendicular, pair by pair: the ground to the weight, the slope to the press.</p>
        <p><NW>{r} = {k} × sin {yAngle},</NW> <NW>{b} = {k} × cos {yAngle}</NW></p>
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
        <Wedge d="M170,190 L200.6,164.3 A40 40 0 0 1 170,230 Z" c="r" faint />
        <Wedge d="M170,190 L170,230 A40 40 0 0 1 132.4,176.3 Z" c="b" faint />
        <Wedge d="M170,190 L132.4,176.3 A40 40 0 0 1 200.6,164.3 Z" c="y" faint />
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
        <Ground x1={150} x2={270} y={40} />
        <Stroke x1={240} y1={170} x2={205.1} y2={40} />
        <Wheel x={240} y={170} r={46} />
        <Curve d="M190,330 L190,170 A50 50 0 0 1 283.3,145 L383.3,318.2" />
        <Weight x={170} y={330} width={40} height={40} />
        <Weight x={374} y={318} width={18} height={18} />
        <Ground x1={355} x2={415} y={337} />
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
  {
    slug: "i-7", book: 1, n: 7, kind: "Theorem", short: "Balance by counting",
    statement: "As many steps right as left, as many up as down: laid end to end, the forces come home.",
    caption: "Four forces counted on a grid, and their walk back to the start.",
    figure: (
      <Figure viewBox="-100 -130 440 290" label="Four forces from one point on a square grid: blue goes four squares right and three up, red two left and three up, black two left and two down, yellow four straight down. Coloured dashed lines drop each tip onto the axes. To the right the same four arrows are laid tip to tail on the grid; the walk starts and ends at the same marked point.">
        <Grid x0={-90} y0={-120} x1={330} y1={150} step={30} />
        <Stroke x1={-90} y1={0} x2={120} y2={0} w={1.2} />
        <Stroke x1={0} y1={-120} x2={0} y2={150} w={1.2} />
        <Curve d="M120,0 L120,-90 L0,-90" c="b" w={1.6} dashed />
        <Curve d="M-60,0 L-60,-90 L0,-90" c="r" w={1.6} dashed />
        <Curve d="M-60,0 L-60,60 L0,60" c="k" w={1.6} dashed />
        <Arrow x1={0} y1={0} x2={108.8} y2={-81.6} c="b" />
        <Arrow x1={0} y1={0} x2={-52.2} y2={-78.4} c="r" />
        <Arrow x1={0} y1={0} x2={-50.1} y2={50.1} c="k" />
        <Arrow x1={0} y1={0} x2={0} y2={106} c="y" />
        <Arrow x1={180} y1={90} x2={288.8} y2={8.4} c="b" />
        <Arrow x1={300} y1={0} x2={247.8} y2={-78.4} c="r" />
        <Arrow x1={240} y1={-90} x2={189.9} y2={-39.9} c="k" />
        <Arrow x1={180} y1={-30} x2={180} y2={67} c="y" />
        <Wheel x={180} y={90} r={9} w={2} />
        <Dot x={180} y={90} r={3.4} />
        <Wheel x={0} y={0} r={5} w={1.8} />
      </Figure>
    ),
    proof: (
      <>
        <p><NW>{steps("force-2", "right", 4)}</NW> = <NW>{steps("force-1", "left", 2)}{steps("ink", "left", 2)}</NW></p>
        <p><NW>{steps("force-2", "up", 3)}{steps("force-1", "up", 3)}</NW> = <NW>{steps("force-3", "down", 4)}{steps("ink", "down", 2)}</NW></p>
        <p><Sym c="ink" kind="dot" label="the marked point" /> start = end</p>
      </>
    ),
    refs: [],
  },
];
