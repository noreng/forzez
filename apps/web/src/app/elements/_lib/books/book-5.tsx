// Book V: Of cables and arches. Ported from prototypes/elements-of-statics/project/Prop-V-*.dc.html.
// Figures only use parts from ../figure, proofs only pieces from ../proof and Sym (see book-1.tsx).

import { Sym } from "@forzez/ui";
import { Arrow, Curve, Dash, Figure, Joint, Knockout, Member, Path, Pin, Roller, Stroke, Wedge, Weight } from "../figure";
import { Note, Ref } from "../proof";
import type { Page } from "../types";

/** The seven panel points of the chain and arch in V.3 and V.8. */
const XS = [105, 150, 195, 240, 285, 330, 375];

const chain = <Sym c="tension" label="blue chain" />;
const arch = <Sym c="compression" weight="thick" label="red arch" />;

export const BOOK_5: Page[] = [
  {
    slug: "v-3", book: 5, n: 3, kind: "Theorem", short: "The chain and the arch",
    statement: "As the chain hangs, so the arch stands, upside down. Every pull in the chain becomes a push in the arch, and nothing else changes.",
    caption: "A hanging chain, and the same shape turned over into an arch.",
    figure: (
      <Figure viewBox="20 36 440 330" label="Between two abutments, a blue chain hangs below a dashed mirror line, carrying seven equal yellow weights. Above the line, its mirror image is a red arch carrying the same seven yellow loads pressing down">
        <Weight x={38} y={182} width={22} height={36} />
        <Weight x={420} y={182} width={22} height={36} />
        <Dash x1={30} y1={200} x2={450} y2={200} w={1} dotted />
        <Path points="60,200 105,248.1 150,282.5 195,303.1 240,310 285,303.1 330,282.5 375,248.1 420,200" c="b" w={5} />
        <Path points="60,200 105,151.9 150,117.5 195,96.9 240,90 285,96.9 330,117.5 375,151.9 420,200" c="r" w={8} />
        {[248.1, 282.5, 303.1, 310, 303.1, 282.5, 248.1].map((y, i) => (
          <Arrow key={`c${i}`} x1={XS[i]} y1={y + 6} x2={XS[i]} y2={y + 24} c="y" w={5} s={2} />
        ))}
        {[151.9, 117.5, 96.9, 90, 96.9, 117.5, 151.9].map((y, i) => (
          <Arrow key={`a${i}`} x1={XS[i]} y1={y - 46} x2={XS[i]} y2={y - 20} c="y" w={5} s={2} />
        ))}
        {[248.1, 282.5, 303.1, 310, 303.1, 282.5, 248.1, 151.9, 117.5, 96.9, 90, 96.9, 117.5, 151.9].map((y, i) => (
          <Joint key={`j${i}`} x={XS[i % 7]} y={y} r={4} />
        ))}
      </Figure>
    ),
    proof: (
      <>
        <p>The chain finds its own shape: every knot is three forces in balance <Ref to="i-1" label="Book I, Prop. I" />, so the chain is the string polygon of its weights <Ref to="ii-5" label="Book II, Prop. V" />.</p>
        <p>Turn the picture over, then reverse every force. Balance survives both, so the loads point down again, and {chain} becomes {arch} with the same size, the opposite sense.</p>
        <p>A chain can only pull, so it never bends; an arch of this shape is only ever pushed, so its stones never need mortar.</p>
        <Note><i>Ut pendet continuum flexile, sic stabit contiguum rigidum inversum.</i> Robert Hooke, 1675.</Note>
      </>
    ),
    refs: ["i-1", "ii-5"],
  },
  {
    slug: "v-5", book: 5, n: 5, kind: "Theorem", short: "The semicircle",
    statement: "A half circle, hinged at its feet and its crown and loaded at the crown, carries the load along two straight chords, not along the circle. Where chord and circle part, the arch must bend.",
    caption: "A three-hinged half circle, and the chords that really carry its load.",
    figure: (
      <Figure viewBox="30 10 420 300" label="A red semicircular arch with hinges at both feet and at the crown carries a yellow load at the crown. Dashed red chords run straight from each foot to the crown; the pale red crescents between chords and arch show where the arch bends, widest at the 45 degree points">
        <Wedge d="M70,260 A170 170 0 0 1 240,90 L70,260 Z" c="r" opacity={0.12} />
        <Wedge d="M240,90 A170 170 0 0 1 410,260 L240,90 Z" c="r" opacity={0.12} />
        <Knockout x1={70} y1={260} x2={240} y2={90} />
        <Knockout x1={410} y1={260} x2={240} y2={90} />
        <Member x1={70} y1={260} x2={240} y2={90} kind="compression" w={3} dashed />
        <Member x1={410} y1={260} x2={240} y2={90} kind="compression" w={3} dashed />
        <Stroke x1={119.8} y1={139.8} x2={155} y2={175} w={1.5} />
        <Stroke x1={116.3} y1={143.3} x2={123.3} y2={136.3} w={1.5} />
        <Stroke x1={151.5} y1={178.5} x2={158.5} y2={171.5} w={1.5} />
        <Stroke x1={360.2} y1={139.8} x2={325} y2={175} w={1.5} />
        <Stroke x1={356.7} y1={136.3} x2={363.7} y2={143.3} w={1.5} />
        <Stroke x1={321.5} y1={171.5} x2={328.5} y2={178.5} w={1.5} />
        <Curve d="M70,260 A170 170 0 0 1 240,90 A170 170 0 0 1 410,260" c="r" w={7} />
        <Pin x={70} y={260} half={14} height={24} />
        <Pin x={410} y={260} half={14} height={24} />
        <Arrow x1={240} y1={20} x2={240} y2={69} c="y" w={6} s={2} />
        <Joint x={70} y={260} />
        <Joint x={410} y={260} />
        <Joint x={240} y={90} />
      </Figure>
    ),
    proof: (
      <>
        <p>Each half is hinged at both ends and loaded at neither, so it is a two-force body: the force runs straight from hinge to hinge <Ref to="ax-1" />, along the dashed chord. By symmetry each chord takes half the load upward, so it carries the load divided by √2.</p>
        <p>At the foot and at the crown the circle runs at 45° to the chord, and the push along the arch is exactly half the load. Halfway up, the circle runs parallel to <Sym c="compression" kind="dashed" label="the dashed red chord" /> and carries all of it, but stands far from it: the gap times the force is the bending.</p>
        <Note>The circle is the shape the eye likes. The chords are the shape the load likes. An arch that follows the load needs no bending at all <Ref to="v-3" />.</Note>
      </>
    ),
    refs: ["ax-1", "v-3"],
  },
  {
    slug: "v-8", book: 5, n: 8, kind: "Theorem", short: "The funicular truss",
    statement: "Tie an arch and a chain of the same shape to the same two ends, and join them with posts. The arch pushes out as hard as the chain pulls in, so the supports feel no thrust at all.",
    caption: "An arch and a chain tied together: a truss that sits on a roller.",
    figure: (
      <Figure viewBox="30 60 420 240" label="A lens-shaped truss: a red arch above and a blue chain below meet at both ends, joined by seven red posts. Seven equal yellow loads press on the arch. The truss rests on a pin and a roller">
        {[[165, 235], [140, 260], [125, 275], [120, 280], [125, 275], [140, 260], [165, 235]].map(([y1, y2], i) => (
          <Member key={`p${i}`} x1={XS[i]} y1={y1} x2={XS[i]} y2={y2} kind="compression" w={3.5} />
        ))}
        <Path points="60,200 105,235 150,260 195,275 240,280 285,275 330,260 375,235 420,200" c="b" w={5} />
        <Path points="60,200 105,165 150,140 195,125 240,120 285,125 330,140 375,165 420,200" c="r" w={8} />
        <Pin x={60} y={200} half={14} height={25} gap={7} />
        <Roller x={420} y={200} half={14} height={19} gap={7} />
        {[121, 96, 81, 76, 81, 96, 121].map((y, i) => (
          <Arrow key={`l${i}`} x1={XS[i]} y1={y} x2={XS[i]} y2={y + 24} c="y" w={5} s={2} />
        ))}
        <Joint x={60} y={200} r={6} />
        <Joint x={420} y={200} r={6} />
      </Figure>
    ),
    proof: (
      <>
        <p>Both curves are the string polygon of equal loads <Ref to="ii-5" label="Book II, Prop. V" />, one standing, one hanging <Ref to="v-3" />. The posts hand half of every load down to the chain, so each curve carries half.</p>
        <p>Same shape, same share, so the same thrust: at each end {arch} pushes outward exactly as hard as {chain} pulls inward, and the two cancel inside the truss.</p>
        <p>What is left for the supports is only the weight, straight down: an arch that sits on a roller.</p>
        <Note>Brunel’s Royal Albert Bridge at Saltash (1859) is this proposition in wrought iron. Book IV meets Book V here.</Note>
      </>
    ),
    refs: ["ii-5", "v-3"],
  },
];
