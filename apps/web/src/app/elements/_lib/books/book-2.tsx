// Book II: Forces in the plane. Ported from prototypes/elements-of-statics/project/Prop-II-*.dc.html.
// Built like Book I: figures only use parts from ../figure, proofs only use pieces from ../proof and Sym.

import { Sym } from "@forzez/ui";
import { Area, Arrow, Body, Dash, Dot, Figure, Ground, Joint, Member, Path, Stroke, Turn, Weight, Wheel } from "../figure";
import { Cor, NW, Note, Ref, S } from "../proof";
import type { Page } from "../types";

const { r, b, k } = S;

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
];
