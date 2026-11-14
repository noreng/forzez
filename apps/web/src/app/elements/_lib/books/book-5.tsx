// Book V: Of cables and arches. Ported from prototypes/elements-of-statics/project/Prop-V-*.dc.html.
// Figures only use parts from ../figure, proofs only pieces from ../proof and Sym (see book-1.tsx).

import { Sym } from "@forzez/ui";
import { ArchRing, Area, Arrow, Curve, Dash, Dot, Figure, Ground, Joint, Knockout, Member, Path, Pin, Roller, Stroke, Wedge, Weight } from "../figure";
import { Cor, Note, Ref } from "../proof";
import type { Page } from "../types";

/** The seven panel points of the chain and arch in V.3 and V.8. */
const XS = [105, 150, 195, 240, 285, 330, 375];

const chain = <Sym c="tension" label="blue chain" />;
const arch = <Sym c="compression" weight="thick" label="red arch" />;
const level = <Sym c="tension" weight="thin" label="level blue ray, the horizontal pull" />;
const thrust = <Sym c="compression" weight="thin" label="red line of thrust" />;
const load = <Sym c="load" kind="arrow" dir="down" label="yellow load" />;

/** The stone arch of V.4 and V.6: a half ring about (240, 260), radii 152 and 188. */
const RING = { x: 240, y: 260, ri: 152, ro: 188 };

/** V.4: the eight inner joints of nine equal stones, intrados to extrados. */
const JOINTS4: [number, number, number, number][] = [
  [97.2, 208, 63.3, 195.7], [123.6, 162.3, 96, 139.2], [164, 128.4, 146, 97.2], [213.6, 110.3, 207.4, 74.9],
  [266.4, 110.3, 272.6, 74.9], [316, 128.4, 334, 97.2], [356.4, 162.3, 384, 139.2], [382.8, 208, 416.7, 195.7],
];
/** V.4: each stone's weight, on the vertical through its centre, ending above the extrados. */
const STONES4: [number, number][] = [
  [72.8, 174], [93, 142.8], [130.9, 106.9], [181.9, 81.2], [240, 72], [298.1, 81.2], [349.1, 106.9], [387, 142.8], [407.2, 174],
];
/** V.4: the line of thrust, where the push crosses each radial joint (every 2.5°); 8.5 inside at its closest. */
const THRUST4 = "60.5,260 63.4,252.3 66.3,244.8 69.4,237.5 72.4,230.5 75.6,223.6 78.9,216.8 82.2,210.2 85.6,203.8 89.1,197.5 92.7,191.3 96.4,185.2 100.2,179.3 104.1,173.4 108.1,167.6 112.2,161.9 116.5,156.3 120.9,150.8 125.4,145.4 130.1,140 134.9,134.8 139.9,129.6 145.2,124.5 150.6,119.6 156.2,114.8 162,110.2 168.1,105.8 174.4,101.6 180.9,97.6 187.7,94 194.6,90.7 201.8,87.9 209.2,85.5 216.8,83.5 224.4,82.1 232.2,81.3 240,81 247.8,81.3 255.6,82.1 263.2,83.5 270.8,85.5 278.2,87.9 285.4,90.7 292.3,94 299.1,97.6 305.6,101.6 311.9,105.8 318,110.2 323.8,114.8 329.4,119.6 334.8,124.5 340.1,129.6 345.1,134.8 349.9,140 354.6,145.4 359.1,150.8 363.5,156.3 367.8,161.9 371.9,167.6 375.9,173.4 379.8,179.3 383.6,185.2 387.3,191.3 390.9,197.5 394.4,203.8 397.8,210.2 401.1,216.8 404.4,223.6 407.6,230.5 410.6,237.5 413.7,244.8 416.6,252.3 419.5,260";
/** V.6: the line of thrust at collapse, load 0.567 of the arch's weight at 60° from the left foot. */
const THRUST6 = "77.5,260 79.9,253 82.3,246.2 84.7,239.6 87.2,233.1 89.6,226.7 92.1,220.4 94.5,214.1 97,208 99.6,201.8 102.1,195.7 104.7,189.6 107.4,183.4 110,177.2 112.8,170.9 115.6,164.5 118.5,158 121.4,151.3 124.5,144.5 127.6,137.4 130.9,130 134.4,122.4 138,114.4 141.9,106 146,97.2 154,94.7 162,92.7 170,91 178,89.7 186,88.9 194,88.4 201.9,88.3 209.8,88.5 217.5,89.1 225.1,90.1 232.6,91.3 240,92.9 247.2,94.7 254.3,96.8 261.2,99.1 267.9,101.6 274.5,104.3 280.9,107.2 287.2,110.3 293.3,113.5 299.3,116.8 305.1,120.3 310.9,123.9 316.4,127.6 321.9,131.4 327.3,135.3 332.5,139.4 335.7,141.9 337.7,143.6 342.8,147.8 347.8,152.2 352.7,156.7 357.6,161.4 362.3,166.1 367,171 371.7,176.1 376.3,181.3 380.8,186.7 385.3,192.3 389.7,198 394.1,203.9 398.5,210 402.8,216.4 407,223 411.3,229.8 415.5,236.9 419.7,244.3 423.8,252 428,260";
/** V.6: the four hinges (intrados, extrados, intrados, extrados) and the three cracks that open opposite them. */
const HINGES6: [number, number][] = [[99.6, 201.8], [146, 97.2], [335.7, 141.9], [428, 260]];
const CRACKS6: [number, number, number, number][] = [[99.6, 201.8, 66.3, 188.1], [164, 128.4, 146, 97.2], [335.7, 141.9, 358.3, 113.9]];

export const BOOK_5: Page[] = [
  {
    slug: "v-1", book: 5, n: 1, kind: "Problem", short: "The hanging chain",
    statement: "To hang a chain under equal weights: stack the weights into a line, set a pole across from it, and lay each piece of chain parallel to its ray; the level ray is the pull that every piece shares.",
    caption: "A chain under four equal weights, and the five rays that shape it.",
    figure: (
      <Figure viewBox="10 40 550 178" label="Left: a blue chain hung between two blocks carries four equal yellow weights, its middle piece level. Right: the four weights stacked into one vertical yellow line, with five rays from a pole on its far side; each piece of chain is parallel to one ray, and the level ray is drawn in blue">
        <Weight x={18} y={72} width={22} height={36} />
        <Weight x={340} y={72} width={22} height={36} />
        {[50, 90, 170, 210].map((y) => <Dash key={`r${y}`} x1={540} y1={130} x2={420} y2={y} />)}
        <Stroke x1={540} y1={130} x2={420} y2={130} c="b" w={3} />
        <Path points="40,90 100,130 160,150 220,150 280,130 340,90" c="b" w={5} />
        {[[100, 130], [160, 150], [220, 150], [280, 130]].map(([x, y]) => (
          <Arrow key={`w${x}`} x1={x} y1={y + 6} x2={x} y2={y + 24} c="y" w={5} s={2} />
        ))}
        {[50, 90, 130, 170].map((y) => <Arrow key={`l${y}`} x1={420} y1={y} x2={420} y2={y + 26} c="y" w={5} s={2} />)}
        {[[40, 90], [100, 130], [160, 150], [220, 150], [280, 130], [340, 90]].map(([x, y]) => <Joint key={`j${x}`} x={x} y={y} r={4} />)}
        <Joint x={540} y={130} r={6} />
      </Figure>
    ),
    proof: (
      <>
        <p>Each knot holds a weight and two pulls, and the three close a triangle <Ref to="i-1" label="I.1" />. Neighbouring knots share a piece of chain, so their triangles share a ray, and all of them meet at one pole: the string polygon <Ref to="ii-5" label="II.5" />, with every weight the same.</p>
        <p>Every ray runs from the pole to the load line, so every pull has the same level part, {level}. Only the upright part grows, by one weight at each knot, from the middle out; so the pieces steepen toward the supports, and the pull is greatest there.</p>
        <p>Move the pole away from the load line: every ray lies flatter, {level} grows, and the chain hangs flatter. To hang it dead level the pole would have to go to infinity, and so would the pull.</p>
        <Cor>Set the pole on the other side of the load line and the same rays draw the chain upside down: an arch <Ref to="v-3" />.</Cor>
      </>
    ),
    refs: ["i-1", "ii-5", "v-3"],
  },
  {
    slug: "v-2", book: 5, n: 2, kind: "Theorem", short: "The suspension cable",
    statement: "A cable that carries a load spread evenly along the level, as a bridge deck is, hangs in a parabola: twice as far from its lowest point, it hangs four times as deep.",
    caption: "A deck hung from a cable, and one piece of the cable cut free.",
    figure: (
      <Figure viewBox="0 60 480 240" label="A blue cable hangs between two red towers, held back by blue stays, and carries a level deck on eleven thin blue hangers; a pale yellow band under the deck is its even load. From the lowest point to the last hanger, a piece of cable is marked: the dashed tangent at its end meets the dashed level line through the lowest point halfway along the piece, where a black arrow shows the weight of the deck it carries">
        <Area x={60} y={243} width={360} height={30} c="y" opacity={0.3} />
        <Area x={240} y={243} width={150} height={30} c="y" opacity={0.3} />
        {[75, 105, 135, 165, 195, 225, 255, 285, 315, 345, 375, 405].map((x) => (
          <Arrow key={`q${x}`} x1={x} y1={246} x2={x} y2={259} c="y" w={3} s={1.2} />
        ))}
        <Weight x={8} y={266} width={24} height={24} />
        <Weight x={448} y={266} width={24} height={24} />
        <Ground x1={0} x2={480} y={291} />
        <Member x1={60} y1={70} x2={60} y2={290} kind="compression" w={6} />
        <Member x1={420} y1={70} x2={420} y2={290} kind="compression" w={6} />
        <Stroke x1={60} y1={80} x2={20} y2={266} c="b" w={3} />
        <Stroke x1={420} y1={80} x2={460} y2={266} c="b" w={3} />
        {[[90, 116.7], [120, 146.7], [150, 170], [180, 186.7], [210, 196.7], [240, 200], [270, 196.7], [300, 186.7], [330, 170], [360, 146.7], [390, 116.7]].map(([x, y]) => (
          <Stroke key={`h${x}`} x1={x} y1={y} x2={x} y2={237} c="b" w={1.5} />
        ))}
        <Dash x1={240} y1={200} x2={330} y2={200} />
        <Dash x1={315} y1={200} x2={408} y2={96.7} />
        <Curve d="M60,80 Q240,320 420,80" c="b" w={5} />
        <Stroke x1={50} y1={240} x2={430} y2={240} w={6} />
        <Arrow x1={315} y1={205} x2={315} y2={219} c="k" w={4} s={1.5} />
        <Dot x={315} y={200} r={4.5} />
        <Joint x={240} y={200} r={4} />
        <Joint x={390} y={116.7} r={4} />
        <Joint x={60} y={80} r={5} />
        <Joint x={420} y={80} r={5} />
      </Figure>
    ),
    proof: (
      <>
        <p>Cut out the piece of cable from its lowest point to any other. Three forces hold it: at the bottom the level pull, the same in every piece <Ref to="v-1" />; at the cut the pull along the cable; and the deck it carries, <Sym c="load" kind="rect" faint label="yellow band of deck" />, which acts as one force <Sym c="ink" label="black force" /> through its middle <Ref to="ii-4" label="II.4" />.</p>
        <p>Three forces in balance meet in one point <Ref to="i-1" label="I.1" />, so the tangent at the cut, <Sym c="ink" kind="dashed" label="dashed tangent" />, crosses the level line halfway along the piece. Its slope is the sag over half the piece; it is also the deck over the level pull, which grows with the piece. So the sag grows twice with the length: twice as far, four times as deep. That is the parabola.</p>
        <Note>A chain under its own weight is loaded along its length, not along the level; more of it hangs at the steep ends, and it takes a slightly different curve, the catenary. For a shallow sag the eye cannot tell them apart.</Note>
      </>
    ),
    refs: ["v-1", "ii-4", "i-1"],
  },
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
    slug: "v-4", book: 5, n: 4, kind: "Theorem", short: "The thrust line",
    statement: "The line of thrust of an arch is the string polygon of its own weights, turned over; if one such line can be drawn wholly within the thickness of the arch, the arch will stand.",
    caption: "Nine stones, their weights, and one line of thrust inside them.",
    figure: (
      <Figure viewBox="30 18 420 252" label="A semicircular stone arch of nine equal stones stands on the ground. Above each stone a small yellow arrow shows its weight. A red line of thrust runs from one foot to the other, everywhere inside the thickness of the stones">
        <ArchRing {...RING} />
        {JOINTS4.map(([x1, y1, x2, y2], i) => <Knockout key={`j${i}`} x1={x1} y1={y1} x2={x2} y2={y2} w={2.5} />)}
        <Ground x1={30} x2={450} y={261.5} />
        <Path points={THRUST4} c="r" w={4} />
        {STONES4.map(([x, y], i) => <Arrow key={`w${i}`} x1={x} y1={y - 44} x2={x} y2={y - 18} c="y" w={4} s={1.5} />)}
      </Figure>
    ),
    proof: (
      <>
        <p>Each stone is pushed by its two neighbours and pulled down by its weight, {load}. Take the weights in order and draw their string polygon <Ref to="ii-5" label="II.5" />, turned over as the chain turns into the arch <Ref to="v-3" />: that is a line of thrust, {thrust}, the path of the push from stone to stone.</p>
        <p>Where {thrust} crosses a joint, the push passes through the face of the joint, so the two stones are pressed together across all of it and need no mortar. Stone cannot pull; here it is never asked to.</p>
        <p>The line is not the only one: another pole gives another line, flatter or deeper <Ref to="v-1" />. It does not matter which the arch really uses. If one line fits inside the stones, the arch is safe.</p>
        <Note>This is Heyman’s safe theorem. It asks of stone only what stone does well: it does not crush, it does not slide, and it cannot pull.</Note>
      </>
    ),
    refs: ["ii-5", "v-3", "v-1"],
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
    slug: "v-6", book: 5, n: 6, kind: "Theorem", short: "Four hinges",
    statement: "An arch falls only when its line of thrust touches its edges at four points, inside and outside in turn: there four hinges open, and the stones become three blocks that can move.",
    caption: "The arch of Prop. IV at the moment of collapse: four hinges.",
    figure: (
      <Figure viewBox="30 18 420 252" label="The semicircular stone arch of Proposition IV carries a yellow load a third of the way round from its left foot. The red line of thrust touches the inner edge low on the left, the outer edge under the load, the inner edge on the right haunch, and the outer edge at the right foot; a ring marks each of these four hinges, and the arch is cracked through at the first three">
        <ArchRing {...RING} />
        {CRACKS6.map(([x1, y1, x2, y2], i) => <Knockout key={`c${i}`} x1={x1} y1={y1} x2={x2} y2={y2} w={3} />)}
        <Ground x1={30} x2={450} y={261.5} />
        <Path points={THRUST6} c="r" w={4} />
        <Arrow x1={146} y1={22} x2={146} y2={74} c="y" w={6} s={2} />
        {HINGES6.map(([x, y], i) => <Joint key={`h${i}`} x={x} y={y} r={5} w={2} />)}
      </Figure>
    ),
    proof: (
      <>
        <p>Where the line of thrust touches an edge, the whole push goes through one corner of the joint. Nothing holds the far side shut, so the joint may open there and turn about that corner, like a hinge <Sym c="ink" kind="dot" label="hinge" />.</p>
        <p>Let the supports spread a little. The crown sinks, the line is pressed against the edges, and three hinges open, one at the crown and one on each side. The arch still stands: three hinges make a three-hinged arch, which can still find its balance <Ref to="v-5" />.</p>
        <p>A fourth needs more: supports that keep moving, or a load off the middle, as here {load}. The line is pushed until no line fits inside <Ref to="v-4" />, and it touches the edges four times, outside and inside in turn. Four hinges cut the arch into three blocks, and three blocks on the ground make a linkage that moves: the arch folds.</p>
        <Note>In the figure the load is 0.57 of the arch’s own weight; a little less, and a line still fits. Milanković found the thinnest arch that can stand at all in 1907, long before the ice ages made him famous.</Note>
      </>
    ),
    refs: ["v-4", "v-5"],
  },
  {
    slug: "v-7", book: 5, n: 7, kind: "Problem", short: "Gaudí’s hanging model",
    statement: "To shape a vault: hang chains from a board where the columns will stand, load them with bags as heavy as the parts of the building they stand for, and turn the model over.",
    caption: "Chains and bags hung from a board, and the building they draw, standing on it.",
    figure: (
      <Figure viewBox="30 0 420 384" label="A heavy ink board runs across the middle. Below it, a blue chain hangs from two points with two heavy bags and three light bags on threads; its end pieces lean steeply. Above the board, its mirror image is a red frame of two leaning columns and a low vault, pressed down by yellow loads as heavy as the bags">
        <Ground x1={40} x2={440} y={200} />
        <Path points="80,200 150,316.7 195,341.7 240,350 285,341.7 330,316.7 400,200" c="b" w={5} />
        {[[150, 316.7, 340], [330, 316.7, 340], [195, 341.7, 358], [240, 350, 366], [285, 341.7, 358]].map(([x, y1, y2]) => (
          <Stroke key={`t${x}`} x1={x} y1={y1} x2={x} y2={y2} c="b" w={1.5} />
        ))}
        <Weight x={141} y={340} width={18} height={20} />
        <Weight x={321} y={340} width={18} height={20} />
        <Weight x={190} y={358} width={10} height={12} />
        <Weight x={235} y={366} width={10} height={12} />
        <Weight x={280} y={358} width={10} height={12} />
        <Path points="80,200 150,83.3 195,58.3 240,50 285,58.3 330,83.3 400,200" c="r" w={8} />
        <Arrow x1={150} y1={6.3} x2={150} y2={67.8} c="y" w={4} s={1.5} />
        <Arrow x1={330} y1={6.3} x2={330} y2={67.8} c="y" w={4} s={1.5} />
        <Arrow x1={195} y1={29.3} x2={195} y2={42.8} c="y" w={4} s={1.5} />
        <Arrow x1={240} y1={21} x2={240} y2={34.5} c="y" w={4} s={1.5} />
        <Arrow x1={285} y1={29.3} x2={285} y2={42.8} c="y" w={4} s={1.5} />
        {[[150, 316.7], [195, 341.7], [240, 350], [285, 341.7], [330, 316.7], [150, 83.3], [195, 58.3], [240, 50], [285, 58.3], [330, 83.3]].map(([x, y]) => (
          <Joint key={`j${x}-${y}`} x={x} y={y} r={4} />
        ))}
      </Figure>
    ),
    proof: (
      <>
        <p>Each chain finds its own string polygon <Ref to="ii-5" label="II.5" />; no knot is told where to go. A heavy bag, <Sym c="muted" kind="square" label="bag of shot" />, bends the chain hard; a light one bends it gently.</p>
        <p>Turn the model over <Ref to="v-3" />: every {chain} becomes {arch}, and every bag becomes a load {load} pressing where it hung. The straight pieces between the board and the heavy bags lean, so the columns lean too: they stand along the push, not along the plumb line.</p>
        <p>Where several chains meet in one knot, their pulls still close a polygon <Ref to="i-2" label="I.2" />, now in space. So a net of chains finds a whole vault at once, ribs, columns and all.</p>
        <Note>Gaudí designed the church of the Colònia Güell this way, with strings and small bags of shot, and studied the model upside down in photographs. Its crypt stands on leaning columns.</Note>
      </>
    ),
    refs: ["ii-5", "v-3", "i-2"],
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
