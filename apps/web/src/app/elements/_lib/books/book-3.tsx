// Book III: Bodies and supports. Propositions I, III and IX are ported from
// prototypes/elements-of-statics/project/Prop-III-*.dc.html; the rest are drawn here.


import { Sym } from "@forzez/ui";
import { Area, Arrow, Body, Clamp, Curve, Dash, Dot, Figure, Ground, Joint, LinesOfAction, Member, Path, Pin, Roller, Stroke, Turn, Wedge, Weight, Wheel } from "../figure";
import { Cor, Note, Ref, S } from "../proof";
import type { Page } from "../types";

const { r, b, y, k, d } = S;
const cone = <Sym c="force-3" kind="cone" label="yellow cone" />;

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
    slug: "iii-2", book: 3, n: 2, kind: "Theorem", short: "Pin, roller, fixed",
    statement: "A roller answers with one force, square to its track; a pin with a force in any direction; a fixed support with a force in any direction and a turn besides.",
    caption: "Three supports, and what each can answer.",
    figure: (
      <Figure viewBox="30 50 540 280" label="Above, three beam ends: one on a roller, one on a pin, one built into a wall. Below, the same ends cut free: the roller is replaced by a red upward force, the pin by a red upward and a blue level force, the wall by a red and a blue force and a yellow turn">
        <Member x1={50} y1={110} x2={150} y2={110} kind="beam" />
        <Member x1={220} y1={110} x2={320} y2={110} kind="beam" />
        <Member x1={390} y1={110} x2={490} y2={110} kind="beam" />
        <Roller x={150} y={110} />
        <Pin x={320} y={110} />
        <Clamp x={490} y1={66} y2={154} />
        <Dash x1={40} y1={190} x2={560} y2={190} w={0.8} dotted />
        <Member x1={50} y1={280} x2={150} y2={280} kind="beam" />
        <Member x1={220} y1={280} x2={320} y2={280} kind="beam" />
        <Member x1={390} y1={280} x2={490} y2={280} kind="beam" />
        <Turn d="M461,293.5 A32 32 0 0 0 510.6,304.5" x={510.6} y={304.5} ux={0.766} uy={-0.643} c="y" />
        <Arrow x1={150} y1={280} x2={150} y2={224} c="r" />
        <Arrow x1={320} y1={280} x2={320} y2={224} c="r" />
        <Arrow x1={320} y1={280} x2={366} y2={280} c="b" />
        <Arrow x1={490} y1={280} x2={490} y2={224} c="r" />
        <Arrow x1={490} y1={280} x2={536} y2={280} c="b" />
      </Figure>
    ),
    proof: (
      <>
        <p>A support is known by what it can answer. A roller can only push square to its track <Ref to="iii-3" />: {r}, one size to find.</p>
        <p>A pin holds a point but lets the body turn about it. Its answer may lean any way, so it is found in two parts: {r} and {b}.</p>
        <p>A fixed support holds the point and the direction both. It answers with {r}, {b} and a turn <Sym c="force-3" kind="arc" label="yellow turn" />, which no force through the support can give <Ref to="ii-3" />: three sizes to find.</p>
        <Cor>A body in the plane can move in three ways: across, up and down, and round. One, two, three: count the answers, and you know how many of these a support takes away.</Cor>
      </>
    ),
    refs: ["iii-3", "ii-3"],
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
    slug: "iii-4", book: 3, n: 4, kind: "Theorem", short: "The free body",
    statement: "Cut a structure loose from its supports and put in their place the forces they give; then the loads and these answers together close a force polygon, and their lines leave no turn.",
    caption: "A frame cut loose, and the polygon of its forces.",
    figure: (
      <Figure viewBox="30 70 510 360" label="A portal frame with its supports taken away: a yellow load presses down on its beam, a black wind pushes its left corner, a red force pushes up its right foot, and a blue force pushes its left foot up and to the left. A dashed line from the point where the two loads meet, and the lines of the red and blue forces, all pass through one point below the right foot. Beside it the four forces close a quadrilateral, with a dashed diagonal">
        <Path points="120,330 120,190 360,190 360,330" w={8} />
        <Dash x1={240} y1={190} x2={360} y2={390} />
        <Dash x1={180} y1={345} x2={360} y2={390} />
        <Dash x1={450} y1={110} x2={510} y2={210} />
        <Arrow x1={240} y1={86} x2={240} y2={172} c="y" />
        <Arrow x1={56} y1={190} x2={102} y2={190} c="k" />
        <Arrow x1={360} y1={415} x2={360} y2={344} c="r" />
        <Arrow x1={180} y1={345} x2={133.6} y2={333.4} c="b" />
        <Dot x={360} y={390} />
        <Arrow x1={450} y1={110} x2={450} y2={196} c="y" />
        <Arrow x1={450} y1={210} x2={496} y2={210} c="k" />
        <Arrow x1={510} y1={210} x2={510} y2={139} c="r" />
        <Arrow x1={510} y1={125} x2={463.6} y2={113.4} c="b" />
      </Figure>
    ),
    proof: (
      <>
        <p>Take the supports away and draw what they gave <Ref to="iii-2" />: the roller {r}, square to its track; the pin {b}, leaning however it must. What is left is a free body with four forces on it, two known and two to find.</p>
        <p>Laid tip to tail, {y}{k}{r}{b} come home <Ref to="i-2" />: nothing is left over across, nothing up or down. That is two conditions.</p>
        <p>A closed polygon can still turn the frame, as a couple does <Ref to="ii-3" />. So the lines must agree too. {y} + {k} = {d}, through the point where their lines meet <Ref to="ax-2" />; and {d}, {r}, {b} meet in one point below the foot <Ref to="i-1" label="I.1" />. That is the third: no turn.</p>
        <Cor>Three conditions, so three sizes can be found: here {r} and the two parts of {b}. A structure of any number of pieces, cut loose whole, answers to the same three.</Cor>
      </>
    ),
    refs: ["iii-2", "i-2", "ii-3", "ax-2", "i-1"],
  },
  {
    slug: "iii-5", book: 3, n: 5, kind: "Theorem", short: "The ladder",
    statement: "A ladder against a smooth wall feels three forces: its weight, the push of the wall, and the answer of the floor; the floor's answer leans to pass through the point where the other two meet, and the floor must be rough enough to give it.",
    caption: "A ladder, its three forces, and their triangle.",
    figure: (
      <Figure viewBox="40 50 520 410" label="A ladder leans from a rough floor against a smooth wall. Its black weight hangs from its middle, the red push of the wall is level, and their dashed lines meet above the middle. The blue answer of the floor comes up from inside a yellow cone below the foot and aims at the same point. Beside it, the three forces close a triangle">
        <Wedge d="M180,360 L130,446.6 A100 100 0 0 0 230,446.6 Z" c="y" />
        <Ground x1={60} x2={420} y={360} />
        <Ground x1={420} x2={420} y={60} y2={360} />
        <Dash x1={300} y1={230} x2={300} y2={100} />
        <Dash x1={420} y1={100} x2={300} y2={100} />
        <Dash x1={180} y1={360} x2={300} y2={100} />
        <Member x1={180} y1={360} x2={420} y2={100} kind="beam" w={6} />
        <Arrow x1={300} y1={230} x2={300} y2={296} c="k" />
        <Arrow x1={456.9} y1={100} x2={434} y2={100} c="r" />
        <Arrow x1={143.1} y1={440} x2={174.1} y2={372.7} c="b" />
        <Dot x={300} y={100} />
        <Arrow x1={540} y1={190} x2={540} y2={256} c="k" />
        <Arrow x1={540} y1={270} x2={517.1} y2={270} c="r" />
        <Arrow x1={503.1} y1={270} x2={534.1} y2={202.7} c="b" />
      </Figure>
    ),
    proof: (
      <>
        <p>A smooth wall can only push square to itself <Ref to="iii-1" />: {r} is level, and its line runs through the top of the ladder. The weight {k} hangs from the middle.</p>
        <p>Their lines meet above the middle. Three forces in balance meet in one point <Ref to="i-1" label="I.1" />, so {b} leaves the foot aiming there, and the triangle gives all three sizes.</p>
        <p>{b} leans, so the floor must hold the foot back as well as hold it up. It can, as long as {b} falls inside {cone}.</p>
        <Cor>Climb the ladder, and the weight moves toward the wall; the meeting point moves with it, and {b} leans further. A ladder that stands empty can slip with someone near the top.</Cor>
      </>
    ),
    refs: ["iii-1", "i-1"],
  },
  {
    slug: "iii-6", book: 3, n: 6, kind: "Problem", short: "Reactions of a beam",
    statement: "To find what each support of a simple beam carries: about the pin, the rectangle of the load equals the rectangle of the roller; and the pin carries what is left.",
    caption: "A beam on a pin and a roller, and two equal rectangles.",
    figure: (
      <Figure viewBox="40 30 420 380" label="A beam on a pin at the left and a roller at the right carries a yellow load a third of the way along. A blue force pushes up at the pin and a shorter red force at the roller. Below, a yellow rectangle as wide as the distance from the pin to the load and as tall as the load, and a red rectangle as wide as the whole span and as tall as the red force, have equal areas">
        <Area x={100} y={230} width={100} height={120} c="y" />
        <Area x={100} y={360} width={300} height={40} c="r" />
        <Dash x1={200} y1={174} x2={200} y2={230} />
        <Dash x1={400} y1={212} x2={400} y2={360} />
        <Pin x={100} y={170} />
        <Roller x={400} y={170} />
        <Member x1={80} y1={170} x2={420} y2={170} kind="beam" />
        <Arrow x1={200} y1={46} x2={200} y2={152} c="y" />
        <Arrow x1={100} y1={170} x2={100} y2={104} c="b" />
        <Arrow x1={400} y1={170} x2={400} y2={144} c="r" />
      </Figure>
    ),
    proof: (
      <>
        <p>Cut the beam loose <Ref to="iii-4" /> and take turnings about the pin, where {b} has no arm. Only {y} and {r} are left to turn the beam, and they must cancel <Ref to="ii-1" />: <Sym c="force-3" kind="rect" /> = <Sym c="force-1" kind="rect" /></p>
        <p>Here the load stands a third of the way along, so {r} is a third of {y}.</p>
        <p>Up equals down <Ref to="i-2" />: {b} + {r} = {y}, so {b} carries the other two thirds.</p>
        <Cor>Move the load to the middle, and each support takes half. Move it onto a support, and that support takes it all.</Cor>
      </>
    ),
    refs: ["iii-4", "ii-1", "i-2"],
  },
  {
    slug: "iii-7", book: 3, n: 7, kind: "Theorem", short: "Determinate and indeterminate",
    statement: "A body in the plane is held by three answers, and statics finds three; give it a fourth, and that answer may take any size, for statics alone cannot tell.",
    caption: "A beam on a pin and a roller, and the same beam on two pins.",
    figure: (
      <Figure viewBox="20 15 460 350" label="Above, a beam on a pin and a roller carries a black load at its middle; a red force pushes up at each end. Below, the same beam on two pins: the same red forces, and besides them two equal blue forces pulling the ends apart along the beam">
        <Pin x={100} y={130} />
        <Roller x={400} y={130} />
        <Member x1={100} y1={130} x2={400} y2={130} kind="beam" />
        <Arrow x1={250} y1={26} x2={250} y2={112} c="k" />
        <Arrow x1={100} y1={130} x2={100} y2={94} c="r" />
        <Arrow x1={400} y1={130} x2={400} y2={94} c="r" />
        <Dash x1={30} y1={187} x2={470} y2={187} w={0.8} dotted />
        <Pin x={100} y={310} />
        <Pin x={400} y={310} />
        <Member x1={100} y1={310} x2={400} y2={310} kind="beam" />
        <Arrow x1={250} y1={206} x2={250} y2={292} c="k" />
        <Arrow x1={100} y1={310} x2={100} y2={274} c="r" />
        <Arrow x1={400} y1={310} x2={400} y2={274} c="r" />
        <Arrow x1={100} y1={310} x2={54} y2={310} c="b" />
        <Arrow x1={400} y1={310} x2={446} y2={310} c="b" />
      </Figure>
    ),
    proof: (
      <>
        <p>Above: a pin and a roller give three answers <Ref to="iii-2" />, and the beam gives three conditions <Ref to="iii-4" />. {r} {r} are found, and the level answer of the pin is found too: it is nothing.</p>
        <p>Below: the roller becomes a pin, and a fourth answer appears. {b} and {b} are equal, opposite and on one line; such a pair may be added or taken away, and the beam never notices <Ref to="ax-3" />. Double them or halve them: every condition still holds.</p>
        <p>So statics finds {r} {r} but not {b}. How hard the pins pull is told only by how much the beam would stretch between them.</p>
        <Cor>Fewer than three answers, and the body moves; three whose lines meet in one point, and it still turns <Ref to="iii-9" />. More than three, and the extra ones must be found from the bending and stretching of the body, which belong to another book.</Cor>
      </>
    ),
    refs: ["iii-2", "iii-4", "ax-3", "iii-9"],
  },
  {
    slug: "iii-8", book: 3, n: 8, kind: "Theorem", short: "Toppling or sliding",
    statement: "A block pushed sideways stands only while the answer of the floor falls inside its cone and inside its foot: outside the cone it slides, outside the foot it topples.",
    caption: "A low block slides; a tall one topples.",
    figure: (
      <Figure viewBox="10 100 520 335" label="Two blocks on a rough floor, each pushed from the left by a black force and pulled down by its blue weight. A dashed line through the point where these two meet shows where the floor must answer. Under the low, wide block the line lands inside the foot but leans outside the yellow cone, and the block slides. Under the tall, narrow block it leans less, inside the cone, but lands beyond the foot, and the block tips over its corner">
        <Wedge d="M160,330 L122.9,422.8 A100 100 0 0 0 197.1,422.8 Z" c="y" />
        <Wedge d="M460,330 L422.9,422.8 A100 100 0 0 0 497.1,422.8 Z" c="y" faint />
        <Body x={70} y={250} width={140} height={80} shade={2} />
        <Body x={360} y={110} width={80} height={220} shade={2} />
        <Ground x1={20} x2={510} y={330} />
        <Dash x1={70} y1={290} x2={140} y2={290} knockout />
        <Dash x1={140} y1={290} x2={160} y2={330} knockout />
        <Dash x1={360} y1={130} x2={400} y2={130} knockout />
        <Dash x1={400} y1={130} x2={400} y2={220} knockout />
        <Dash x1={400} y1={130} x2={460} y2={330} knockout />
        <Turn d="M465.4,275.6 A60 60 0 0 1 494.4,304.6" x={494.4} y={304.6} ux={0.423} uy={0.906} />
        <Arrow x1={20} y1={290} x2={56} y2={290} c="k" />
        <Arrow x1={140} y1={290} x2={140} y2={312} c="b" />
        <Arrow x1={200.2} y1={410.5} x2={166.3} y2={342.5} c="r" w={4} s={2} dashed />
        <Arrow x1={222} y1={310} x2={250} y2={310} c="k" w={3} s={1.5} />
        <Arrow x1={310} y1={130} x2={346} y2={130} c="k" />
        <Arrow x1={400} y1={220} x2={400} y2={266} c="b" />
        <Arrow x1={483} y1={406.6} x2={464} y2={343.4} c="r" w={4} s={2} dashed />
        <Dot x={140} y={290} />
        <Dot x={400} y={130} />
      </Figure>
    ),
    proof: (
      <>
        <p>Each block feels three forces: the push {k}, its weight {b}, and the floor {r}. The first two meet in a point, so {r} must pass through it <Ref to="i-1" label="I.1" />; its line is fixed before the floor has a say.</p>
        <p>Left: the line lands inside the foot, but leans past {cone} <Ref to="iii-1" />. <Sym c="force-1" kind="dashed" label="dashed red force" /> is asked of a floor that cannot give it, and the block slides.</p>
        <p>Right: the push is weaker and higher. The line leans less, inside the cone, but it lands beyond the foot, where the block no longer touches the floor. The floor can only answer under the block, so the block turns about its corner <Sym c="ink" kind="arc" />.</p>
        <Cor>Push lower, or make the block wider, and it slides before it topples; push higher, or make it taller, and it topples first.</Cor>
      </>
    ),
    refs: ["i-1", "iii-1"],
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
  {
    slug: "iii-10", book: 3, n: 10, kind: "Theorem", short: "The Gerber beam",
    statement: "Put a hinge into a beam for every support beyond two, and the beam falls apart into simple pieces, each of which statics solves alone: first the piece that hangs, then the piece it hangs from.",
    caption: "A beam on three supports with one hinge, and its two pieces apart.",
    figure: (
      <Figure viewBox="20 15 520 395" label="Above, a beam on a pin and two rollers, with a hinge in its second span, carries a yellow load between the hinge and the last roller. Below, the beam is taken apart at the hinge. The short piece carries the load and is held up by two equal blue forces, one at the hinge and one at its roller. The long piece takes the hinge force back as an equal blue force pressing down at its overhanging end; a red force pushes up at its roller and a black force pulls down at its pin">
        <Pin x={60} y={150} />
        <Roller x={220} y={150} />
        <Roller x={460} y={150} />
        <Member x1={60} y1={150} x2={460} y2={150} kind="beam" />
        <Arrow x1={390} y1={26} x2={390} y2={132} c="y" />
        <Joint x={320} y={150} />
        <Dash x1={30} y1={218} x2={530} y2={218} w={0.8} dotted />
        <Pin x={60} y={360} />
        <Roller x={220} y={360} />
        <Roller x={500} y={360} />
        <Member x1={60} y1={360} x2={320} y2={360} kind="beam" />
        <Member x1={360} y1={360} x2={500} y2={360} kind="beam" />
        <Arrow x1={430} y1={236} x2={430} y2={342} c="y" />
        <Arrow x1={320} y1={296} x2={320} y2={342} c="b" />
        <Arrow x1={60} y1={318.5} x2={60} y2={342} c="k" />
        <Arrow x1={220} y1={360} x2={220} y2={276.5} c="r" />
        <Arrow x1={360} y1={360} x2={360} y2={314} c="b" />
        <Arrow x1={500} y1={360} x2={500} y2={314} c="b" />
        <Joint x={320} y={360} />
        <Joint x={360} y={360} />
      </Figure>
    ),
    proof: (
      <>
        <p>Three supports give four answers, one too many <Ref to="iii-7" />. A hinge can carry no turn, so it gives one more condition, and the count comes right again.</p>
        <p>Cut at the hinge. The short piece hangs from the hinge and stands on one roller: a simple beam with the load in its middle, so {b} = {b}, each half of {y} <Ref to="iii-6" />.</p>
        <p>What the hinge gives the short piece, it takes from the long one, equal and opposite <Ref to="ax-4" />: {b} presses down on the end of the overhang. Turnings about the roller then give {k}, and it pulls down, for the overhang lifts the far end and the pin must hold it. {r} carries the rest, more than {b} itself.</p>
        <Note>Heinrich Gerber patented the hinged beam in 1866.</Note>
      </>
    ),
    refs: ["iii-7", "iii-6", "ax-4"],
  },
  {
    slug: "iii-11", book: 3, n: 11, kind: "Theorem", short: "The cantilever bridge",
    statement: "Two arms, each balanced on its pier and tied down at its outer end, reach out over the gap, and a short span hung between their tips carries the load: the span is a simple beam, and each arm is a lever.",
    caption: "A cantilever bridge, and its three pieces apart.",
    figure: (
      <Figure viewBox="10 20 560 370" label="Above, a bridge of three pieces: two arms on piers, their outer ends tied down to blocks, and a short span hung on hinges between their tips, carrying a yellow load. Below, the pieces apart. The span is held up by two equal blue forces at its ends. Each arm takes an equal blue force down at its tip, a black pull down at its tied end, and a red push up from its pier">
        <Stroke x1={50} y1={130} x2={50} y2={146} />
        <Stroke x1={530} y1={130} x2={530} y2={146} />
        <Weight x={35} y={146} width={30} height={22} />
        <Weight x={515} y={146} width={30} height={22} />
        <Ground x1={25} x2={75} y={168} />
        <Ground x1={505} x2={555} y={168} />
        <Pin x={170} y={130} />
        <Roller x={410} y={130} />
        <Member x1={50} y1={130} x2={530} y2={130} kind="beam" />
        <Arrow x1={290} y1={30} x2={290} y2={112} c="y" />
        <Joint x={250} y={130} />
        <Joint x={330} y={130} />
        <Dash x1={20} y1={205} x2={560} y2={205} w={0.8} dotted />
        <Pin x={145} y={340} />
        <Roller x={435} y={340} />
        <Member x1={25} y1={340} x2={225} y2={340} kind="beam" />
        <Member x1={250} y1={340} x2={330} y2={340} kind="beam" />
        <Member x1={355} y1={340} x2={555} y2={340} kind="beam" />
        <Arrow x1={290} y1={240} x2={290} y2={322} c="y" />
        <Arrow x1={250} y1={340} x2={250} y2={306} c="b" />
        <Arrow x1={330} y1={340} x2={330} y2={306} c="b" />
        <Arrow x1={225} y1={288} x2={225} y2={322} c="b" />
        <Arrow x1={355} y1={288} x2={355} y2={322} c="b" />
        <Arrow x1={25} y1={304} x2={25} y2={322} c="k" />
        <Arrow x1={555} y1={304} x2={555} y2={322} c="k" />
        <Arrow x1={145} y1={340} x2={145} y2={274} c="r" />
        <Arrow x1={435} y1={340} x2={435} y2={274} c="r" />
        <Joint x={225} y={340} />
        <Joint x={250} y={340} />
        <Joint x={330} y={340} />
        <Joint x={355} y={340} />
      </Figure>
    ),
    proof: (
      <>
        <p>The span hangs on two hinges with the load in its middle: {b} = {b}, each half of {y} <Ref to="iii-6" />. Each tip takes its half back, pressing down <Ref to="ax-4" />.</p>
        <p>Each arm is a lever on its pier <Ref to="ii-1" />: {b} at the tip turns it one way, {k} at the tied end the other, and their rectangles are equal. The longer the anchor arm, the less it must be tied down.</p>
        <p>The pier carries both: {r} = {b} + {k}. It is the Gerber beam built large, one hinge for each support beyond two <Ref to="iii-10" />.</p>
        <Note>In 1887, to show how the Forth Bridge would stand, its engineers sat two men on chairs, arms out and sticks braced against the chairs, the outer ends tied down to piles of bricks. Kaichi Watanabe sat on a plank slung between the sticks.</Note>
      </>
    ),
    refs: ["iii-6", "ax-4", "ii-1", "iii-10"],
  },
];
