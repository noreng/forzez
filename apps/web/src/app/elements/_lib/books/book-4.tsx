// Book IV: Trusses. Ported from prototypes/elements-of-statics/project/Prop-IV-*.dc.html.
// The book is a selection: propositions keep the prototype's numbers (I, II, VI).
// From this book on, colour is meaning: compression red, tension blue, the load yellow.

import { Sym } from "@forzez/ui";
import { Arrow, Curve, Dash, Dot, Figure, Joint, Member, Path, Pin, Roller, Stroke } from "../figure";
import { Cite, Cor, Note, Ref } from "../proof";
import type { Page } from "../types";

const push = <Sym c="compression" label="red, a push" />;
const pull = <Sym c="tension" label="blue, a pull" />;
const load = <Sym c="load" label="yellow load" />;

export const BOOK_4: Page[] = [
  {
    slug: "iv-1", book: 4, n: 1, kind: "Problem", short: "The method of joints",
    statement: "Cut any joint of a truss free, and Book I solves it.",
    caption: "A truss, and its top joint cut free.",
    figure: (
      <Figure viewBox="0 0 580 490" label="A triangular truss on a pin and a roller carries a yellow load at its apex; the two rafters are red, the tie is blue. Below, the apex joint is cut free with the load and two red member forces pushing into it, and beside it the same three forces close a triangle">
        <Member x1={90} y1={230} x2={290} y2={90} kind="compression" />
        <Member x1={490} y1={230} x2={290} y2={90} kind="compression" />
        <Member x1={90} y1={230} x2={490} y2={230} kind="tension" />
        <Pin x={90} y={230} />
        <Roller x={490} y={230} />
        <Arrow x1={290} y1={12} x2={290} y2={69} c="y" />
        <Arrow x1={90} y1={306} x2={90} y2={285} c="y" />
        <Arrow x1={490} y1={306} x2={490} y2={285} c="y" />
        <Curve d="M326,90 A36 36 0 1 1 254,90 A36 36 0 1 1 326,90" w={1.2} dashed />
        <Joint x={90} y={230} />
        <Joint x={490} y={230} />
        <Joint x={290} y={90} />
        <Dash x1={40} y1={320} x2={540} y2={320} w={0.8} dotted />
        <Arrow x1={150} y1={342} x2={150} y2={390} c="y" />
        <Arrow x1={71.9} y1={472.5} x2={134.4} y2={422.5} c="r" />
        <Arrow x1={228.1} y1={472.5} x2={165.6} y2={422.5} c="r" />
        <Dot x={150} y={410} r={6} />
        <Arrow x1={420} y1={330} x2={420} y2={466} c="y" />
        <Arrow x1={420} y1={480} x2={502.8} y2={413.8} c="r" />
        <Arrow x1={513.7} y1={405} x2={430.9} y2={338.8} c="r" />
      </Figure>
    ),
    proof: (
      <>
        <Note><i>From this Book on, colour is meaning:</i> {push} pushes, {pull} pulls, {load} is the load.</Note>
        <p>Cut the top joint free: three forces at one point, which is Book I, Proposition I.</p>
        <p>{load} is known; the two <Sym c="compression" label="red member forces" /> lie along the members. Close the triangle, and its sides are the member forces.</p>
        <p>Arrows into the joint push {push}; arrows away from it pull {pull}.</p>
        <Note>Joint by joint, a whole bridge is a chain of closed polygons.</Note>
      </>
    ),
    refs: ["i-1"],
  },
  {
    slug: "iv-2", book: 4, n: 2, kind: "Theorem", short: "Why triangles",
    statement: "A square of pinned bars folds under the lightest push. Add one diagonal and it stands: a truss is made of triangles because only the triangle cannot change its shape.",
    caption: "A square folds; a square with one diagonal stands.",
    figure: (
      <Figure viewBox="0 50 420 195" label="Left: a square of four pinned bars pushed sideways at a top corner leans over into a dashed parallelogram. Right: the same square with one diagonal stands; the top bar and the right post turn red, the diagonal turns blue, and the two remaining bars carry nothing">
        <Path points="60,200 180,200 210,80 90,80" w={1.5} dashed closed />
        <Path points="60,200 60,80 180,80 180,200 60,200" w={6} />
        <Stroke x1={260} y1={200} x2={380} y2={200} w={2} />
        <Stroke x1={260} y1={200} x2={260} y2={80} w={2} />
        <Member x1={260} y1={80} x2={380} y2={80} kind="compression" />
        <Member x1={380} y1={80} x2={380} y2={200} kind="compression" />
        <Member x1={380} y1={80} x2={260} y2={200} kind="tension" />
        <Pin x={60} y={200} half={14} height={24} gap={7} over={10} />
        <Roller x={180} y={200} half={12} height={17} gap={7} drop={10} over={8} wheelR={3.5} wheelX={7} wheelY={4} wheelW={1.5} />
        <Pin x={260} y={200} half={14} height={24} gap={7} over={10} />
        <Roller x={380} y={200} half={12} height={17} gap={7} drop={10} over={8} wheelR={3.5} wheelX={7} wheelY={4} wheelW={1.5} />
        <Arrow x1={12} y1={80} x2={39} y2={80} c="y" />
        <Arrow x1={212} y1={80} x2={239} y2={80} c="y" />
        <Joint x={60} y={200} r={6} />
        <Joint x={180} y={200} r={6} />
        <Joint x={180} y={80} r={6} />
        <Joint x={60} y={80} r={6} />
        <Joint x={260} y={200} r={6} />
        <Joint x={380} y={200} r={6} />
        <Joint x={380} y={80} r={6} />
        <Joint x={260} y={80} r={6} />
      </Figure>
    ),
    proof: (
      <>
        <p>Four bars and four pins leave the square one way to move: the corners stay pinned, the angles do not. No bar is stretched or squeezed by leaning over, so no bar resists it.</p>
        <p>The diagonal cuts the square into two triangles, and three bars fix three sides, which fix the angles <Cite>Euclid I.8</Cite>. Now the push must stretch {pull} or squeeze {push} them, and they answer.</p>
        <Note>Note the two thin bars: in this square, under this push, they carry nothing. That is Proposition III.</Note>
      </>
    ),
    refs: [],
  },
  {
    slug: "iv-6", book: 4, n: 6, kind: "Theorem", short: "Reverse the loads",
    statement: "Reverse every load on a truss, and every member keeps its size but changes its sense: red and blue trade places, and nothing else changes.",
    caption: "The same truss under a load, and under the load reversed.",
    figure: (
      <Figure viewBox="40 0 400 440" maxWidth="27.5rem" label="Two copies of the same triangular truss. Above, the load presses down at the apex: the rafters are red and the tie is blue. Below, the load pulls up at the apex: the rafters are blue and the tie is red">
        <Member x1={80} y1={170} x2={240} y2={60} kind="compression" />
        <Member x1={400} y1={170} x2={240} y2={60} kind="compression" />
        <Member x1={80} y1={170} x2={400} y2={170} kind="tension" />
        <Member x1={80} y1={400} x2={240} y2={290} kind="tension" />
        <Member x1={400} y1={400} x2={240} y2={290} kind="tension" />
        <Member x1={80} y1={400} x2={400} y2={400} kind="compression" />
        <Dash x1={50} y1={222} x2={430} y2={222} w={0.8} dotted />
        <Pin x={80} y={170} half={16} height={26} gap={8} over={8} />
        <Roller x={400} y={170} half={14} height={20} gap={8} drop={9} over={6} wheelR={3.5} wheelX={7} wheelY={4} wheelW={1.5} />
        <Pin x={80} y={400} half={16} height={26} gap={8} over={8} />
        <Roller x={400} y={400} half={14} height={20} gap={8} drop={9} over={6} wheelR={3.5} wheelX={7} wheelY={4} wheelW={1.5} />
        <Arrow x1={240} y1={8} x2={240} y2={39} c="y" />
        <Arrow x1={240} y1={282} x2={240} y2={251} c="y" />
        <Joint x={80} y={170} />
        <Joint x={400} y={170} />
        <Joint x={240} y={60} />
        <Joint x={80} y={400} />
        <Joint x={400} y={400} />
        <Joint x={240} y={290} />
      </Figure>
    ),
    proof: (
      <>
        <p>Every joint is three forces closing a triangle <Ref to="i-1" label="Book I, Prop. I" />. Turn every arrow round, and each triangle still closes, with the same sides.</p>
        <p>So each member keeps its size, and only its sense flips: <Sym c="compression" label="red, a push" /> ⇄ <Sym c="tension" label="blue, a pull" /></p>
        <Cor>A roof under snow and the same roof under wind suction see the same numbers, with the colours swapped. A rafter that only ever learned to push may not enjoy being pulled.</Cor>
      </>
    ),
    refs: ["i-1"],
  },
];
