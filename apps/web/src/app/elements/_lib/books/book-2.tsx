// Book II: Forces in the plane. Ported from prototypes/elements-of-statics/project/Prop-II-*.dc.html.
// Built like Book I: figures only use parts from ../figure, proofs only use pieces from ../proof and Sym.

import { Sym } from "@forzez/ui";
import { Area, Arrow, Body, Dash, Dot, Figure, Ground, Joint, Member, Path, Stroke, Turn, Weight, Wheel } from "../figure";
import { Cor, NW, Note, Ref, S } from "../proof";
import type { Page } from "../types";

const { r, b, y, k, d } = S;

export const BOOK_2: Page[] = [
  {
    slug: "ii-1", book: 2, n: 1, kind: "Theorem", short: "The lever",
    statement: "A lever balances when each force, multiplied by its distance from the pivot, makes the same rectangle.",
    caption: "A lever, and the two equal rectangles under it.",
    figure: (
      <Figure viewBox="20 20 440 300" label="A beam on a pivot carries a large red force near the pivot and a small blue force twice as far away. Below the beam, a red rectangle as wide as the short arm and as tall as the red force, and a blue rectangle as wide as the long arm and as tall as the blue force, have equal areas">
        <Area x={100} y={200} width={100} height={100} c="r" />
        <Area x={200} y={200} width={200} height={50} c="b" />
        <Dash x1={100} y1={156} x2={100} y2={200} />
        <Dash x1={400} y1={156} x2={400} y2={200} />
        <Path points="200,154 184,184 216,184" closed />
        <Ground x1={168} x2={232} y={187} />
        <Member x1={40} y1={150} x2={440} y2={150} kind="beam" />
        <Arrow x1={100} y1={40} x2={100} y2={132} c="r" />
        <Arrow x1={400} y1={93} x2={400} y2={132} c="b" />
      </Figure>
    ),
    proof: (
      <>
        <p><NW>{r} × its arm = <Sym c="force-1" kind="square" /></NW> <NW>{b} × its arm = <Sym c="force-2" kind="rect" /></NW></p>
        <p><Sym c="force-1" kind="square" /> = <Sym c="force-2" kind="rect" /> so neither side turns the beam more than the other.</p>
        <p>Half the force, twice the arm: the rectangle changes shape, never size.</p>
        <Note>Archimedes asked for a place to stand. A long enough rectangle would do.</Note>
      </>
    ),
    refs: [],
  },
  {
    slug: "ii-2", book: 2, n: 2, kind: "Theorem", short: "Varignon’s theorem",
    statement: "About any point, the turning of a resultant equals the turnings of its parts together. Each turning is a triangle with its apex at the point.",
    caption: "Two forces, their resultant, and a triangle for each turning.",
    figure: (
      <Figure viewBox="100 90 370 270" label="A red and a blue force at one point and their black resultant; a pivot point stands to the right, and thin lines join it to the start and to each arrow tip, making three triangles">
        <Body points="430,330 140,300 400,110" />
        <Stroke x1={430} y1={330} x2={140} y2={300} w={1.5} />
        <Stroke x1={430} y1={330} x2={340} y2={260} c="r" w={1.5} />
        <Stroke x1={430} y1={330} x2={200} y2={150} c="b" w={1.5} />
        <Stroke x1={430} y1={330} x2={400} y2={110} w={1.5} />
        <Dash x1={340} y1={260} x2={400} y2={110} knockout />
        <Dash x1={200} y1={150} x2={400} y2={110} knockout />
        <Arrow x1={140} y1={300} x2={388.7} y2={118.3} c="k" />
        <Arrow x1={140} y1={300} x2={326.3} y2={262.7} c="r" />
        <Arrow x1={140} y1={300} x2={194.8} y2={163} c="b" />
        <Dot x={140} y={300} />
        <Joint x={430} y={330} />
        <Dot x={430} y={330} r={2} />
      </Figure>
    ),
    proof: (
      <>
        <p><Sym c="force-1" kind="triangle" /> + <Sym c="force-2" kind="triangle" /> = <Sym c="ink" kind="triangle" /></p>
        <p>All three triangles share the side from the pivot to the start of the forces. On that side, their heights add just as the forces do <Ref to="ax-2" />, so their areas add too.</p>
        <Cor>Split a force any way you like; the turning about any point stays the same.</Cor>
      </>
    ),
    refs: ["ax-2"],
  },
  {
    slug: "ii-3", book: 2, n: 3, kind: "Theorem", short: "The couple",
    statement: "Two equal, opposite, parallel forces have no resultant; they only turn. Their turning is the rectangle of one force and the distance between them, wherever the pair is placed.",
    caption: "Two equal, opposite forces, and the rectangle of their turning.",
    figure: (
      <Figure viewBox="0 30 480 375" label="A body pushed up by a red force at its left end and down by an equal red force at its right end; a curved black arrow shows the turn, and a red rectangle below spans the distance between the two forces">
        <Body x={80} y={150} width={320} height={60} />
        <Area x={120} y={352} width={240} height={46} c="r" />
        <Dash x1={120} y1={40} x2={120} y2={346} knockout />
        <Dash x1={360} y1={40} x2={360} y2={346} knockout />
        <Turn d="M179.4,145 A70 70 0 0 1 293.6,135" x={293.6} y={135} ux={0.643} uy={0.766} />
        <Arrow x1={120} y1={300} x2={120} y2={222} c="r" />
        <Arrow x1={360} y1={58} x2={360} y2={136} c="r" />
      </Figure>
    ),
    proof: (
      <>
        <p><Sym c="force-1" kind="arrow" dir="up" /> + <Sym c="force-1" kind="arrow" dir="down" /> = nothing that pushes, for they are equal and opposite;</p>
        <p>yet not on one line <Ref to="ax-1" label="Ax. I fails" />, so they leave a turn: <Sym c="ink" kind="arc" /> = <Sym c="force-1" kind="rect" /></p>
        <p>Slide the pair along the body, turn it, or trade force for distance: as long as the rectangle keeps its size, the body cannot tell the difference.</p>
        <Note>Every steering wheel and every screwdriver knows this proposition.</Note>
      </>
    ),
    refs: ["ax-1"],
  },
  {
    slug: "ii-4", book: 2, n: 4, kind: "Theorem", short: "Spread loads",
    statement: "A load spread along a beam acts as one force: as large as the area of the load, and passing through its centre.",
    caption: "An even load and a triangular load, each replaced by one force.",
    figure: (
      <Figure viewBox="0 30 480 365" label="Two beams. The upper carries an even yellow block of load, replaced by one black arrow through its middle. The lower carries a yellow triangle of load rising to the right, replaced by a shorter black arrow at two thirds of its length">
        <Area x={80} y={110} width={320} height={50} c="y" opacity={0.35} />
        <Area points="80,350 400,350 400,270" c="y" opacity={0.35} />
        <Dash x1={240} y1={110} x2={240} y2={166} knockout />
        <Dash x1={293.3} y1={296.7} x2={293.3} y2={356} knockout />
        {[100, 140, 180, 220, 260, 300, 340, 380].map((x) => (
          <Arrow key={x} x1={x} y1={114} x2={x} y2={157} c="y" w={3} s={1.2} />
        ))}
        <Arrow x1={200} y1={322} x2={200} y2={349} c="y" w={3} s={1.2} />
        <Arrow x1={240} y1={312} x2={240} y2={349} c="y" w={3} s={1.2} />
        <Arrow x1={280} y1={302} x2={280} y2={349} c="y" w={3} s={1.2} />
        <Arrow x1={320} y1={292} x2={320} y2={349} c="y" w={3} s={1.2} />
        <Arrow x1={360} y1={282} x2={360} y2={349} c="y" w={3} s={1.2} />
        <Stroke x1={60} y1={170} x2={420} y2={170} w={6} />
        <Stroke x1={60} y1={360} x2={420} y2={360} w={6} />
        <Arrow x1={240} y1={40} x2={240} y2={96} c="k" />
        <Arrow x1={293.3} y1={240.7} x2={293.3} y2={282.7} c="k" />
        <Dot x={240} y={135} r={4} />
        <Dot x={293.3} y={323.3} r={4} />
        <Stroke x1={80} y1={380} x2={400} y2={380} w={1.2} />
        <Stroke x1={80} y1={373} x2={80} y2={387} w={1.2} />
        <Stroke x1={293.3} y1={373} x2={293.3} y2={387} w={1.2} />
        <Stroke x1={400} y1={373} x2={400} y2={387} w={1.2} />
        <Stroke x1={186.7} y1={376} x2={186.7} y2={384} w={1.2} />
      </Figure>
    ),
    proof: (
      <>
        <p>
          <NW><Sym c="force-3" kind="rect" faint /> = {k}</NW> through its middle;{" "}
          <NW><Sym c="force-3" kind="triangle" faint /> = {k}</NW> two thirds along.
        </p>
        <p>Each small arrow is a force <Ref to="ax-2" label="Ax. II adds them two by two" />, and the pile of them is the area. The black arrow turns the beam about any point exactly as the whole pile does <Ref to="ii-2" />, so it must stand at the centre.</p>
        <Note>Snow on a roof, water in a tank, people on a bridge: one arrow each, if you know where to put it.</Note>
      </>
    ),
    refs: ["ax-2", "ii-2"],
  },
  {
    slug: "ii-5", book: 2, n: 5, kind: "Problem", short: "The string polygon",
    statement: "To find the shape of a string carrying weights: stack the weights into a line, choose a pole, and draw rays. Every piece of the string runs parallel to a ray.",
    caption: "A string under three weights, and the rays that shape it.",
    figure: (
      <Figure viewBox="16 40 500 185" label="Left: a string hung between two supports carries a red, a blue and a yellow weight. Right: the three weights stacked into one vertical line, with four thin rays from a pole to its ends and joints; each piece of the string is parallel to one ray">
        <Weight x={24} y={86} width={16} height={28} />
        <Weight x={340} y={48} width={16} height={28} />
        <Dash x1={40} y1={100} x2={340} y2={62} />
        <Path points="40,100 100,142 180,150 260,126 340,62" w={3} />
        <Arrow x1={100} y1={150} x2={100} y2={184} c="r" />
        <Arrow x1={180} y1={158} x2={180} y2={176} c="b" />
        <Arrow x1={260} y1={134} x2={260} y2={160} c="y" />
        <Dot x={100} y={142} r={4.5} />
        <Dot x={180} y={150} r={4.5} />
        <Dot x={260} y={126} r={4.5} />
        <Stroke x1={500} y1={130} x2={400} y2={60} w={1.5} />
        <Stroke x1={500} y1={130} x2={400} y2={120} w={1.5} />
        <Stroke x1={500} y1={130} x2={400} y2={160} w={1.5} />
        <Stroke x1={500} y1={130} x2={400} y2={210} w={1.5} />
        <Arrow x1={400} y1={160} x2={400} y2={196} c="y" />
        <Arrow x1={400} y1={120} x2={400} y2={146} c="b" />
        <Arrow x1={400} y1={60} x2={400} y2={106} c="r" />
        <Joint x={500} y={130} r={6} />
      </Figure>
    ),
    proof: (
      <>
        <p>Each knot holds three forces: a weight and two pulls of the string. By <Ref to="i-1" label="I.1" /> they close a triangle, and here every triangle shares the pole.</p>
        <p>So <Sym c="ink" weight="thin" label="piece of string" /> in the string ∥ <Sym c="ink" weight="hair" label="ray" /> from the pole, and the length of the ray is the pull in that piece.</p>
        <p>Move the pole and the string sags more or less; the weights are the same, only the pull changes.</p>
        <Cor>Turn the figure upside down, and the string becomes an arch that stands in pure compression. Gaudí hung his churches this way. (Book V.)</Cor>
      </>
    ),
    refs: ["i-1"],
  },
  {
    slug: "ii-6", book: 2, n: 6, kind: "Problem", short: "The centre of gravity",
    statement: "To find the centre of gravity of any flat body: hang it twice, from two points, and draw the plumb line each time. Where the lines cross is the centre.",
    caption: "A plate hung twice; its two plumb lines cross at the centre.",
    figure: (
      <Figure viewBox="40 0 410 415" maxWidth="28rem" label="Above, the same irregular plate hangs first from one pin with a red plumb line, then from another pin with a blue plumb line. Below, the plate lies flat with both lines drawn dashed; they cross at a single black point">
        <Ground x1={90} x2={170} y={4} />
        <Ground x1={310} x2={390} y={4} />
        <Stroke x1={130} y1={4} x2={130} y2={40} w={1.5} />
        <Stroke x1={350} y1={4} x2={350} y2={40} w={1.5} />
        <Body points="132.4,20.9 212,113 193.7,188.6 120.9,203.7 53.7,151 58.2,72.1" />
        <Body points="287.7,194.1 281,72.6 341.7,24 408.5,56.5 429.6,139.3 377.7,199" />
        <Arrow x1={130} y1={40} x2={130} y2={231.9} c="r" w={2.5} s={1.3} />
        <Arrow x1={350} y1={40} x2={350} y2={231.9} c="b" w={2.5} s={1.3} />
        <Wheel x={130} y={40} r={5} w={2} />
        <Wheel x={177.4} y={181} r={4} w={1.5} />
        <Wheel x={350} y={40} r={5} w={2} />
        <Wheel x={301.3} y={180.5} r={4} w={1.5} />
        <Body points="150,270 270,250 325,305 300,375 220,405 155,360" />
        <Stroke x1={147.9} y1={271.6} x2={292.8} y2={360} c="r" dash="7 5" knockout={4.5} />
        <Stroke x1={329.9} y1={312.8} x2={163.4} y2={331.2} c="b" dash="7 5" knockout={4.5} />
        <Wheel x={165} y={282} r={4} w={1.5} />
        <Wheel x={310} y={315} r={4} w={1.5} />
        <Dot x={233} y={323.5} r={6} />
      </Figure>
    ),
    proof: (
      <>
        <p>At rest, the body feels only two forces: the pin holding it up and its own weight. By <Ref to="ax-1" /> they lie on one line, so the weight hangs straight below the pin, along the plumb line.</p>
        <p>The centre is somewhere on <Sym c="force-1" kind="dashed" label="red plumb line" /> and somewhere on <Sym c="force-2" kind="dashed" label="blue plumb line" />; two lines meet once. <Sym c="ink" kind="dot" label="centre of gravity" /></p>
        <Cor>A third hanging adds nothing but reassurance: its line passes through the same point.</Cor>
      </>
    ),
    refs: ["ax-1"],
  },
  {
    slug: "ii-7", book: 2, n: 7, kind: "Theorem", short: "Parallel forces",
    statement: "Two parallel forces pointing the same way act as one: as large as both together, on the line that divides the distance between them inversely as the forces.",
    caption: "Two parallel forces, their resultant, and two equal rectangles.",
    figure: (
      // red 90 at 100, blue 60 at 400, resultant 150 at 220: 120 × 90 = 180 × 60
      <Figure viewBox="40 80 420 270" label="A beam pressed down by a large red force near its left end and a smaller blue force near its right end. A dashed black force, as long as both, stands between them, nearer the red one. Below the beam a red rectangle and a blue rectangle of equal area meet on the dashed force's line">
        <Area x={100} y={290} width={120} height={45} c="r" />
        <Area x={220} y={290} width={180} height={30} c="b" />
        <Dash x1={100} y1={254} x2={100} y2={290} />
        <Dash x1={220} y1={254} x2={220} y2={290} />
        <Dash x1={400} y1={254} x2={400} y2={290} />
        <Member x1={60} y1={250} x2={440} y2={250} kind="beam" />
        <Arrow x1={220} y1={96} x2={220} y2={232} c="k" dashed />
        <Arrow x1={100} y1={156} x2={100} y2={232} c="r" />
        <Arrow x1={400} y1={186} x2={400} y2={232} c="b" />
      </Figure>
    ),
    proof: (
      <>
        <p>In size, {r} + {b} = {d}: parallel and pointing the same way, they add as lengths.</p>
        <p>About the point where {d} stands, {r} turns the beam one way and {b} the other, and <Sym c="force-1" kind="rect" /> = <Sym c="force-2" kind="rect" />, so their turnings cancel <Ref to="ii-1" />. The resultant turns about any point as the two together do <Ref to="ii-2" />, here not at all; so it has no arm there, and passes through it.</p>
        <Note>This is the lever of Proposition I turned over: hold the beam at that point with {d} reversed, and it balances.</Note>
        <Cor>If the forces point opposite ways, the resultant is their difference and stands outside them, beyond the larger. If they are also equal, there is no resultant at all, only a couple <Ref to="ii-3" />.</Cor>
      </>
    ),
    refs: ["ii-1", "ii-2", "ii-3"],
  },
  {
    slug: "ii-8", book: 2, n: 8, kind: "Theorem", short: "Moving a force",
    statement: "A force may be moved off its line to any point, if a couple is added whose turning is the rectangle of the force and the distance it was moved.",
    caption: "A force moved sideways leaves a turn behind.",
    figure: (
      <Figure viewBox="20 50 530 300" label="Left: a body pressed down by a red force near its left end; at a second point to the right, an equal red force down and a dashed equal red force up have been added. A red rectangle below spans the distance between the two lines. Right: the same body with only the red force at the second point and a curved black arrow turning it">
        <Body x={40} y={150} width={200} height={50} />
        <Area x={70} y={300} width={120} height={40} c="r" />
        <Dash x1={70} y1={200} x2={70} y2={300} />
        <Arrow x1={70} y1={70} x2={70} y2={136} c="r" />
        <Arrow x1={190} y1={70} x2={190} y2={136} c="r" />
        <Arrow x1={190} y1={280} x2={190} y2={214} c="r" dashed />
        <Body x={330} y={150} width={200} height={50} />
        <Turn d="M456,136.4 A60 60 0 0 0 364,136.4" x={364} y={136.4} ux={-0.643} uy={0.766} />
        <Arrow x1={480} y1={70} x2={480} y2={136} c="r" />
      </Figure>
    ),
    proof: (
      <>
        <p>At the new point add {r} down and <Sym c="force-1" kind="dashed" label="dashed red force" /> up: equal, opposite and on one line, so the body never notices <Ref to="ax-3" />.</p>
        <p>The old {r} and the dashed one are equal, opposite and parallel: a couple <Ref to="ii-3" />, whose turning <Sym c="ink" kind="arc" /> = <Sym c="force-1" kind="rect" />, the force times the distance between the two lines.</p>
        <p>What remains is {r} at the new point, and the turn.</p>
        <Note>Turn a nut with a spanner and the bolt feels both: a twist, and a push to the side.</Note>
        <Cor>Read backwards: a force and a couple are one force, moved sideways until the rectangle is used up.</Cor>
      </>
    ),
    refs: ["ax-3", "ii-3"],
  },
  {
    slug: "ii-9", book: 2, n: 9, kind: "Problem", short: "Reduced to one",
    statement: "To reduce any forces in a plane to one: draw them tip to tail for its size and direction; then draw their string polygon, whose first and last pieces meet on its line.",
    caption: "Three forces, their force polygon, and the string that places the resultant.",
    figure: (
      // force polygon 440,60 480,110 430,145 466,200, pole 540,135; first and last string pieces meet at 195.8,191.9
      <Figure viewBox="10 45 550 300" label="Left: a string with three knots carries a red, a blue and a yellow force pulling in different directions. Its first and last pieces, extended as dashed lines, meet below the string, and a dashed black force hangs from that point. Right: the three forces tip to tail with a dashed black side from start to end, and thin rays from a pole to every corner; each piece of the string is parallel to one ray">
        <Dash x1={60} y1={90} x2={195.8} y2={191.9} />
        <Dash x1={270} y1={126.7} x2={195.8} y2={191.9} />
        <Path points="24,63 60,90 170,135.8 270,126.7 303.8,97" w={3} />
        <Stroke x1={540} y1={135} x2={440} y2={60} w={1.5} />
        <Stroke x1={540} y1={135} x2={480} y2={110} w={1.5} />
        <Stroke x1={540} y1={135} x2={430} y2={145} w={1.5} />
        <Stroke x1={540} y1={135} x2={466} y2={200} w={1.5} />
        <Arrow x1={195.8} y1={191.9} x2={219.3} y2={318.1} c="k" dashed />
        <Arrow x1={440} y1={60} x2={463.4} y2={186.2} c="k" dashed />
        <Arrow x1={60} y1={90} x2={91.3} y2={129.1} c="r" />
        <Arrow x1={170} y1={135.8} x2={131.5} y2={162.8} c="b" />
        <Arrow x1={270} y1={126.7} x2={298.3} y2={170} c="y" />
        <Arrow x1={440} y1={60} x2={471.3} y2={99.1} c="r" />
        <Arrow x1={480} y1={110} x2={441.5} y2={137} c="b" />
        <Arrow x1={430} y1={145} x2={458.3} y2={188.3} c="y" />
        <Dot x={195.8} y={191.9} r={4} />
        <Joint x={540} y={135} r={6} />
      </Figure>
    ),
    proof: (
      <>
        <p>{r}{b}{y} tip to tail, and {d} from the start to the end: that is the size and direction of the one force <Ref to="i-2" label="I.2" />. It does not yet say where it acts.</p>
        <p>For that, pick a pole, draw rays, and hang a string whose pieces run parallel to the rays, its knots on the lines of the forces <Ref to="ii-5" />. Each force parts into pulls along the two pieces at its knot. Along every inner piece, two equal and opposite pulls meet, and cancel <Ref to="ax-3" />.</p>
        <p>Only the pulls along the first and the last piece are left. Two forces act as one through the point where their lines meet <Ref to="ax-2" />, and that one is {d}.</p>
        <Note>Graphic statics in one figure: no numbers, only parallels. Culmann made it an engineer’s method in his <i>Die graphische Statik</i> (1866).</Note>
      </>
    ),
    refs: ["ax-2", "ax-3", "i-2", "ii-5"],
  },
  {
    slug: "ii-10", book: 2, n: 10, kind: "Theorem", short: "Balance in the plane",
    statement: "Forces in a plane are in balance when their force polygon closes and their string polygon closes too.",
    caption: "Four forces in balance: two closed polygons.",
    figure: (
      // force polygon 410,130 514,91 540,208 423,221 back to 410,130; pole 470,160; string sides ∥ rays
      <Figure viewBox="10 15 550 360" label="Left: four forces, red, blue, yellow and black, push inward on the four corners of a closed quadrilateral string polygon. Right: the same four forces tip to tail close a quadrilateral, with thin rays from a pole inside it to each corner; each side of the string polygon is parallel to one ray">
        <Path points="130,235 190.2,140.6 269.1,194.7 208,274" w={3} closed />
        <Stroke x1={470} y1={160} x2={410} y2={130} w={1.5} />
        <Stroke x1={470} y1={160} x2={514} y2={91} w={1.5} />
        <Stroke x1={470} y1={160} x2={540} y2={208} w={1.5} />
        <Stroke x1={470} y1={160} x2={423} y2={221} w={1.5} />
        <Arrow x1={26} y1={274} x2={116.9} y2={239.9} c="r" />
        <Arrow x1={164.2} y1={23.6} x2={187.2} y2={126.9} c="b" />
        <Arrow x1={386.1} y1={181.7} x2={283} y2={193.2} c="y" />
        <Arrow x1={221} y1={365} x2={210} y2={287.9} c="k" />
        <Arrow x1={410} y1={130} x2={500.9} y2={95.9} c="r" />
        <Arrow x1={514} y1={91} x2={537} y2={194.3} c="b" />
        <Arrow x1={540} y1={208} x2={436.9} y2={219.5} c="y" />
        <Arrow x1={423} y1={221} x2={412} y2={143.9} c="k" />
        <Joint x={470} y={160} r={6} />
      </Figure>
    ),
    proof: (
      <>
        <p>{r}{b}{y}{k} tip to tail come home, so together they push the body nowhere <Ref to="i-2" label="I.2" />. That alone still leaves room for a turn.</p>
        <p>So draw the string polygon <Ref to="ii-9" />. Its first and last pieces run parallel to the same ray, for the force polygon closed; the two forces left along them are equal and opposite. On one line they cancel <Ref to="ax-1" />; apart, they make a couple <Ref to="ii-3" />.</p>
        <p>Here the last piece runs into the first: the string closes, and nothing is left over.</p>
        <Note>The two closings are the two conditions of balance in the plane: no push, and no turn.</Note>
        <Cor>A closed force polygon with an open string polygon cannot move the body anywhere, but it turns it.</Cor>
      </>
    ),
    refs: ["ax-1", "i-2", "ii-3", "ii-9"],
  },
  {
    slug: "ii-11", book: 2, n: 11, kind: "Theorem", short: "Composite shapes",
    statement: "The centre of gravity of a body made of pieces lies on the line joining the centres of the pieces, and divides it inversely as their weights.",
    caption: "An L in two pieces, their weights, and the centre between them.",
    figure: (
      // red 80 × 260 = 20 800 at 140,170; blue 260 × 60 = 15 600 at 310,270; centre 212.9,212.9 (3 : 4 along the join)
      <Figure viewBox="70 25 400 400" maxWidth="30rem" label="An L-shaped plate made of a tall red rectangle and a long blue one. A dashed line joins the centres of the two pieces; a black point on it, outside the plate in the corner of the L, is the centre of gravity. Below, a red weight and a smaller blue weight hang on the lines of their centres, and a dashed black weight as large as both hangs on the line of the black point">
        <Area points="100,40 180,40 180,300 100,300" c="r" />
        <Area points="180,240 440,240 440,300 180,300" c="b" />
        <Dash x1={140} y1={170} x2={310} y2={270} knockout />
        <Dash x1={140} y1={170} x2={140} y2={322} knockout />
        <Dash x1={310} y1={270} x2={310} y2={322} knockout />
        <Dash x1={212.9} y1={212.9} x2={212.9} y2={322} knockout />
        <Arrow x1={212.9} y1={322} x2={212.9} y2={399} c="k" dashed />
        <Arrow x1={140} y1={322} x2={140} y2={360} c="r" />
        <Arrow x1={310} y1={322} x2={310} y2={347} c="b" />
        <Wheel x={140} y={170} r={4} w={1.5} />
        <Wheel x={310} y={270} r={4} w={1.5} />
        <Dot x={212.9} y={212.9} r={6} />
      </Figure>
    ),
    proof: (
      <>
        <p>Each piece is an even load, so its weight acts at its own middle, as large as its area <Ref to="ii-4" />: {r} at the red centre, {b} at the blue.</p>
        <p>Two parallel weights act as one, {d}, as large as both, on the line that divides their distance inversely as they are <Ref to="ii-7" />. It crosses the dashed line between the centres at <Sym c="ink" kind="dot" label="centre of gravity" /></p>
        <p>Turn the body as you will: the weights stay at the two centres, and the point that divides the dashed line stays where it is. Every plumb line passes through it, so it is the centre of gravity <Ref to="ii-6" />.</p>
        <Note>The centre need not lie in the body: here it sits in the empty corner of the L.</Note>
        <Cor>A hole is a piece of negative weight: its arrow points up, and the centre moves away from it along the same line.</Cor>
      </>
    ),
    refs: ["ii-4", "ii-6", "ii-7"],
  },
];
