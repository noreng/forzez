// Book III: Bodies and supports. Ported from prototypes/elements-of-statics/project/Prop-III-*.dc.html.
// The book is a selection: propositions keep the prototype's numbers (I, III, IX).

import { Sym } from "@forzez/ui";
import { Arrow, Body, Curve, Dash, Dot, Figure, Ground, LinesOfAction, Member, Pin, Stroke, Wedge, Wheel } from "../figure";
import { Cor, Ref, S } from "../proof";
import type { Page } from "../types";

const { r, b, y } = S;

export const BOOK_3: Page[] = [
  {
    slug: "iii-1", book: 3, n: 1, kind: "Theorem", short: "The friction cone",
    statement: "A rough floor can answer any push that falls inside its cone. A push that falls outside it, the floor cannot answer, and the body slides.",
    caption: "Two pushes on a rough floor: one inside the cone, one outside.",
    figure: (
      <Figure viewBox="40 120 410 290" label="Two light blocks on a rough floor, each with a yellow wedge below the contact point showing the cone the floor can answer within. The left block is pushed steeply; the red answer of the floor lies inside its cone and the block stays. The right block is pushed at a shallow angle; the answer it would need, dashed red, falls outside the cone, and the block slides">
        <Wedge d="M130,300 L80,386.6 A100 100 0 0 0 180,386.6 Z" c="y" />
        <Wedge d="M340,300 L290,386.6 A100 100 0 0 0 390,386.6 Z" c="y" />
        <Body x={90} y={230} width={80} height={70} shade={2} />
        <Body x={300} y={230} width={80} height={70} shade={2} />
        <Ground x1={50} x2={440} y={300} />
        <Arrow x1={84.1} y1={133.4} x2={106.4} y2={216.5} c="k" />
        <Arrow x1={218.1} y1={207.6} x2={288.5} y2={257} c="k" />
        <Arrow x1={153.3} y1={386.9} x2={133.6} y2={313.5} c="r" />
        <Arrow x1={413.7} y1={351.7} x2={349.4} y2={306.6} c="r" w={4} s={2} dashed />
        <Arrow x1={386} y1={265} x2={414} y2={265} c="k" w={3} s={1.5} />
      </Figure>
    ),
    proof: (
      <>
        <p>A light block feels two forces: the push, and the answer of the floor. The answer must be equal, opposite, and on the same line as the push <Ref to="ax-1" />.</p>
        <p>A smooth floor can only answer straight up. A rough one can lean, but no further than <Sym c="force-3" kind="cone" label="yellow cone" /> allows. Inside it, {r} holds. Outside, <Sym c="force-1" kind="dashed" label="dashed red force" /> is asked of a floor that has none to give.</p>
        <p>Note that how hard you push does not matter, only where it points. Push twice as hard at the same angle, and the floor answers twice as hard.</p>
        <Cor>Tilt the floor until its slope matches the cone: a block laid on it is just about to slide. That angle is the whole of friction.</Cor>
      </>
    ),
    refs: ["ax-1"],
  },
  {
    slug: "iii-3", book: 3, n: 3, kind: "Problem", short: "The inclined roller",
    statement: "A roller can only answer square to its own slope. Tilt the roller, and the answer tilts with it; the pin at the other end must follow.",
    caption: "A roller on a slope fixes the line of its answer.",
    figure: (
      <Figure viewBox="40 30 430 280" label="A beam on a pin at the left and a roller on a 45 degree slope at the right carries a yellow load. The red answer of the roller is square to its slope; its line meets the line of the load at a point above the beam, and the blue answer of the pin aims at the same point. Beside it, the three forces close a triangle">
        <Body points="383,289.6 439.6,233 439.6,289.6" shade={2} />
        <Dash x1={200} y1={243} x2={200} y2={50} />
        <Dash x1={400} y1={250} x2={200} y2={50} />
        <Dash x1={80} y1={250} x2={200} y2={50} />
        <Stroke x1={383} y1={289.6} x2={439.6} y2={233} />
        <Pin x={80} y={250} half={16} height={26} gap={6} over={10} />
        <Member x1={80} y1={250} x2={400} y2={250} kind="beam" />
        <Wheel x={405.7} y={255.7} r={8} w={2} />
        <Arrow x1={200} y1={170} x2={200} y2={229} c="y" />
        <Arrow x1={400} y1={250} x2={364.9} y2={214.9} c="r" />
        <Arrow x1={80} y1={250} x2={117.8} y2={187} c="b" />
        <Dot x={200} y={50} />
        <Arrow x1={395} y1={115} x2={432.8} y2={52} c="b" />
        <Arrow x1={440} y1={160} x2={404.9} y2={124.9} c="r" />
        <Arrow x1={440} y1={40} x2={440} y2={146} c="y" />
      </Figure>
    ),
    proof: (
      <>
        <p>A roller cannot hold anything along its slope; it would roll. So its answer stands square to the slope, and its line is known before anything is solved.</p>
        <p>The beam feels three forces: {y} {r} {b} The first two lines meet above the beam, so the third must aim there too <Ref to="i-1" label="Book I, Prop. I" />, and the triangle gives all three sizes.</p>
        <Cor>A level roller makes the pin answer straight up as well. Tilt it, and the pin begins to lean, though nobody touched the pin.</Cor>
      </>
    ),
    refs: ["i-1"],
  },
  {
    slug: "iii-9", book: 3, n: 9, kind: "Theorem", short: "Three supports not enough",
    statement: "Three supports hold a body fast, unless their three lines meet in one point. Then the body may turn about that point, and nothing in the supports can stop it.",
    caption: "Three rollers whose lines meet in one point.",
    figure: (
      <Figure viewBox="100 30 300 230" maxWidth="35rem" label="A plate rests on three rollers. The red, blue and yellow lines along which the rollers can push all meet in one point above the plate, where a curved arrow shows that the plate is free to turn">
        <Body x={120} y={140} width={240} height={80} shade={2} />
        <LinesOfAction
          lines={[
            [160, 220, 240, 60, "r"],
            [320, 220, 240, 60, "b"],
            [360, 180, 240, 60, "y"],
          ]}
        />
        <Stroke x1={134} y1={222.7} x2={173.4} y2={242.3} />
        <Stroke x1={306.6} y1={242.3} x2={346} y2={222.7} />
        <Stroke x1={354.3} y1={205.5} x2={385.5} y2={174.3} />
        <Wheel x={156.9} y={226.3} c="r" r={7} />
        <Wheel x={323.1} y={226.3} c="b" r={7} />
        <Wheel x={364.9} y={184.9} c="y" r={7} />
        <Curve d="M217.4,51.8 A24 24 0 0 1 262.6,51.8" w={2.5} />
        <Arrow x1={261.6} y1={49} x2={262.6} y2={51.8} c="k" w={2.5} s={1.25} />
        <Dot x={240} y={60} />
      </Figure>
    ),
    proof: (
      <>
        <p>Each roller can push only along its own line: <Sym c="force-1" kind="dashed" /> <Sym c="force-2" kind="dashed" /> <Sym c="force-3" kind="dashed" /> All three pass through the black point, so about that point not one of them has an arm <Ref to="ii-1" label="Book II, Prop. I" />.</p>
        <p>Any load that would turn the plate about the point finds no answer. Three supports, three numbers, and still a mechanism.</p>
        <Cor>Three parallel lines meet too, at infinity: a plate on three level rollers slides away sideways. Counting supports is not enough; their lines must be looked at.</Cor>
      </>
    ),
    refs: ["ii-1"],
  },
];
