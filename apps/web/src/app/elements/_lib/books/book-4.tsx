// Book IV: Trusses. IV.1, IV.2 and IV.6 are ported from prototypes/elements-of-statics/project/Prop-IV-*.dc.html;
// the others are new. Every member force drawn here was solved joint by joint, so each colour is a true sign.
// From this book on, colour is meaning: compression red, tension blue, the load yellow.

import { Sym } from "@forzez/ui";
import { Arrow, Body, Circle, Curve, Dash, Dot, Figure, Joint, Member, MemberPath, Path, Pin, RightAngle, Roller, Stroke, Wheel } from "../figure";
import { Cite, Cor, Note, Ref } from "../proof";
import type { Page } from "../types";

const push = <Sym c="compression" label="red, a push" />;
const pull = <Sym c="tension" label="blue, a pull" />;
const load = <Sym c="load" label="yellow load" />;

/** Members in running text: thick bars in their meaning. */
const red = <Sym c="compression" weight="thick" label="red member, pushing" />;
const blue = <Sym c="tension" weight="thick" label="blue member, pulling" />;
const grey = <Sym c="member" weight="thick" label="grey member, carrying nothing" />;

/** A dashed ring round a joint, as in IV.1: the path `d` of a circle of radius r about (x, y). */

/**
 * IV.11: Michell's cantilever from a round support (centre cx, cy, radius R). Both families are
 * log-spirals r = R·e^|θ − θ0|, at +45° and −45° to every radius, so they cross square everywhere.
 * Spirals start on the circle at θ0 = ±γ·k/4 and run until they meet the opposite edge spiral;
 * the two edge spirals (from θ0 = ±γ) meet at the tip, R·e^γ from the centre.
 */
const MI = { cx: 80, cy: 160, R: 46, g: Math.PI / 2, n: 4 };
const r1 = (v: number) => Math.round(v * 10) / 10;
function spiral(t0: number, t1: number): [number, number][] {
  const steps = Math.max(2, Math.ceil(Math.abs(t1 - t0) / 0.04));
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = t0 + ((t1 - t0) * i) / steps, r = MI.R * Math.exp(Math.abs(t - t0));
    return [r1(MI.cx + r * Math.cos(t)), r1(MI.cy - r * Math.sin(t))] as [number, number];
  });
}
const KS = Array.from({ length: 2 * MI.n + 1 }, (_, i) => i - MI.n);
/** Blue family: leaves the circle at θ0 and winds clockwise, down to the lower edge. */
const MI_PULL = KS.filter((k) => k > -MI.n).map((k) => { const t = (MI.g * k) / MI.n; return { k, pts: spiral(t, (t - MI.g) / 2) }; });
/** Red family: the mirror image, winding anticlockwise up to the upper edge. */
const MI_PUSH = KS.filter((k) => k < MI.n).map((k) => { const t = (MI.g * k) / MI.n; return { k, pts: spiral(t, (t + MI.g) / 2) }; });
const MI_TIP = r1(MI.cx + MI.R * Math.exp(MI.g));

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
    slug: "iv-3", book: 4, n: 3, kind: "Theorem", short: "Members that carry nothing",
    statement: "Where only two members meet at an unloaded joint, and not in one line, both carry nothing; where three meet and two of them lie in one line, the third carries nothing.",
    caption: "One load, and seven members that carry nothing.",
    figure: (
      <Figure viewBox="20 105 400 175" label="A rectangular truss of four panels on a pin and a roller carries one yellow load hanging from the middle of its bottom chord. The bottom chord and the two inner diagonals are blue, the middle of the top chord and the two end diagonals are red, and the five posts and the two outer pieces of the top chord are thin and grey. Dashed rings mark the two top corners, the two bottom joints beside the load, and the top of the middle post">
        <Member x1={60} y1={140} x2={140} y2={140} kind="member" w={3} />
        <Member x1={300} y1={140} x2={380} y2={140} kind="member" w={3} />
        <Member x1={60} y1={220} x2={60} y2={140} kind="member" w={3} />
        <Member x1={140} y1={220} x2={140} y2={140} kind="member" w={3} />
        <Member x1={220} y1={220} x2={220} y2={140} kind="member" w={3} />
        <Member x1={300} y1={220} x2={300} y2={140} kind="member" w={3} />
        <Member x1={380} y1={220} x2={380} y2={140} kind="member" w={3} />
        <Member x1={60} y1={220} x2={380} y2={220} kind="tension" />
        <Member x1={140} y1={140} x2={300} y2={140} kind="compression" />
        <Member x1={60} y1={220} x2={140} y2={140} kind="compression" />
        <Member x1={380} y1={220} x2={300} y2={140} kind="compression" />
        <Member x1={140} y1={140} x2={220} y2={220} kind="tension" />
        <Member x1={300} y1={140} x2={220} y2={220} kind="tension" />
        <Circle x={60} y={140} w={1.2} dashed />
        <Circle x={380} y={140} w={1.2} dashed />
        <Circle x={140} y={220} w={1.2} dashed />
        <Circle x={300} y={220} w={1.2} dashed />
        <Circle x={220} y={140} w={1.2} dashed />
        <Pin x={60} y={220} />
        <Roller x={380} y={220} />
        <Arrow x1={220} y1={228} x2={220} y2={250} c="y" />
        {[60, 140, 220, 300, 380].map((x) => <Joint key={`t${x}`} x={x} y={140} r={6} />)}
        {[60, 140, 220, 300, 380].map((x) => <Joint key={`b${x}`} x={x} y={220} r={6} />)}
      </Figure>
    ),
    proof: (
      <>
        <p>At a top corner only two members meet, and nothing else touches the joint. Two forces balance only when they lie on one line <Ref to="ax-1" />; these do not, so each is nothing, and the corner is bare.</p>
        <p>Where the bottom chord runs straight through an unloaded joint, resolve across the chord <Ref to="i-7" label="Book I, Prop. VII" />. The two chord forces have nothing across it, so the post has nothing to answer: it is {grey}. The same holds at the top of the middle post, where the top chord runs straight through.</p>
        <p>So of seventeen members, seven are grey. The load reaches the supports through the other ten, {red} and {blue}.</p>
        <Cor>A grey member is not idle. It keeps a joint in place, holds a long red member straight so that it does not buckle, and wakes as soon as the load moves.</Cor>
      </>
    ),
    refs: ["ax-1", "i-7"],
  },
  {
    slug: "iv-4", book: 4, n: 4, kind: "Problem", short: "Ritter’s section",
    statement: "To find the force in one member of a truss, cut the truss in two through three members, and take turnings about the point where the other two meet.",
    caption: "A cut through three members, and the joint where two of them meet.",
    figure: (
      <Figure viewBox="20 100 430 190" label="A bridge truss of six panels, one panel deep, carries five equal yellow loads on its bottom chord. A dotted line cuts it in the third panel, through the top chord, a diagonal and the bottom chord; the part right of the cut is pale. At the cut a red arrow pushes on the top chord and two blue arrows pull on the diagonal and the bottom chord. A dashed ring marks the top joint where the top chord and the diagonal meet">
        <Member x1={240} y1={200} x2={420} y2={200} kind="tension" w={6} opacity={0.25} />
        <Member x1={240} y1={200} x2={240} y2={140} kind="member" w={2.5} opacity={0.25} />
        <Member x1={240} y1={140} x2={360} y2={140} kind="compression" w={6} opacity={0.25} />
        <Member x1={300} y1={200} x2={300} y2={140} kind="compression" w={6} opacity={0.25} />
        <Member x1={360} y1={200} x2={360} y2={140} kind="tension" w={6} opacity={0.25} />
        <Member x1={360} y1={140} x2={420} y2={200} kind="compression" w={6} opacity={0.25} />
        <Member x1={300} y1={140} x2={240} y2={200} kind="tension" w={6} opacity={0.25} />
        <Member x1={360} y1={140} x2={300} y2={200} kind="tension" w={6} opacity={0.25} />
        <Member x1={210} y1={140} x2={240} y2={140} kind="compression" w={6} opacity={0.25} />
        <Member x1={210} y1={170} x2={240} y2={200} kind="tension" w={6} opacity={0.25} />
        <Member x1={210} y1={200} x2={240} y2={200} kind="tension" w={6} opacity={0.25} />
        <Member x1={60} y1={200} x2={210} y2={200} kind="tension" w={6} />
        <Member x1={120} y1={200} x2={120} y2={140} kind="tension" w={6} />
        <Member x1={120} y1={140} x2={210} y2={140} kind="compression" w={6} />
        <Member x1={180} y1={200} x2={180} y2={140} kind="compression" w={6} />
        <Member x1={60} y1={200} x2={120} y2={140} kind="compression" w={6} />
        <Member x1={120} y1={140} x2={180} y2={200} kind="tension" w={6} />
        <Member x1={180} y1={140} x2={210} y2={170} kind="tension" w={6} />
        <Dash x1={210} y1={112} x2={210} y2={232} w={1} dotted />
        <Circle x={180} y={140} r={16} w={1.2} dashed />
        <Pin x={60} y={200} />
        <Roller x={420} y={200} />
        <Arrow x1={240} y1={140} x2={222.5} y2={140} c="r" w={4} s={1.5} />
        <Arrow x1={211} y1={171} x2={218} y2={178} c="b" w={4} s={1.5} />
        <Arrow x1={211} y1={200} x2={222} y2={200} c="b" w={4} s={1.5} />
        {[120, 180].map((x) => <Arrow key={x} x1={x} y1={207} x2={x} y2={224} c="y" w={5} s={1.6} />)}
        {[240, 300, 360].map((x) => <Arrow key={x} x1={x} y1={207} x2={x} y2={224} c="y" w={5} s={1.6} opacity={0.25} />)}
        <Arrow x1={60} y1={284} x2={60} y2={262} c="y" w={5} s={1.6} />
        <Arrow x1={420} y1={284} x2={420} y2={262} c="y" w={5} s={1.6} opacity={0.25} />
        {[60, 120, 180, 240, 300, 360, 420].map((x) => <Joint key={`b${x}`} x={x} y={200} r={5} />)}
        {[120, 180, 240, 300, 360].map((x) => <Joint key={`t${x}`} x={x} y={140} r={5} />)}
      </Figure>
    ),
    proof: (
      <>
        <p>The part left of the cut is a body in balance: its loads, its support, and the three cut members, which now act on it as forces along their own lines <Ref to="ii-10" label="Book II, Prop. X" />.</p>
        <p>About the ringed joint, the <Sym c="compression" weight="thick" label="red top chord" /> and the <Sym c="tension" weight="thick" label="blue diagonal" /> have no arm: they pass through it. Only the <Sym c="tension" weight="thick" label="blue bottom chord" /> and the yellow forces turn, so the bottom chord alone must balance their turning <Ref to="ii-1" label="Book II, Prop. I" />.</p>
        <p>The support brings up two and a half loads, two panels out; one load hangs one panel out. That turns by 2½ × 2 − 1 × 1 = 4, in loads times panels. The truss is one panel deep, so the bottom chord pulls with 4 loads. About the bottom joint just past the cut, where the bottom chord and the diagonal meet, the top chord pushes with 2½ × 3 − 1 × 2 − 1 × 1 = 4½.</p>
        <Cor>When the other two are parallel, as the chords are, they meet nowhere; then resolve across them. Of the two and a half loads, two are already spent, so the diagonal takes the last half and pulls with ½ × √2 ≈ 0.71.</Cor>
        <Note>August Ritter, 1862. One cut, one equation, one member, without walking the truss joint by joint <Ref to="iv-1" />.</Note>
      </>
    ),
    refs: ["ii-10", "ii-1", "iv-1"],
  },
  {
    slug: "iv-5", book: 4, n: 5, kind: "Problem", short: "Cremona’s diagram",
    statement: "Draw the force polygons of all the joints of a truss as one figure, in which every member appears once.",
    caption: "A roof truss, and the one figure that holds all its joints.",
    figure: (
      <Figure viewBox="30 40 630 275" label="Left: a triangular roof truss with thirty degree red rafters and a blue tie carries a yellow load at its apex, and two yellow reactions push up under the supports. Right: a pale equilateral triangle with a vertical yellow side for the load, two red sides parallel to the rafters, and a blue line parallel to the tie, from its left corner to the middle of the yellow side">
        <Body points="620,70 620,230 481.4,150" />
        <Member x1={60} y1={230} x2={240} y2={126.1} kind="compression" />
        <Member x1={420} y1={230} x2={240} y2={126.1} kind="compression" />
        <Member x1={60} y1={230} x2={420} y2={230} kind="tension" />
        <Pin x={60} y={230} />
        <Roller x={420} y={230} />
        <Arrow x1={240} y1={50} x2={240} y2={105.1} c="y" />
        <Arrow x1={60} y1={306} x2={60} y2={285} c="y" />
        <Arrow x1={420} y1={306} x2={420} y2={285} c="y" />
        <Joint x={60} y={230} />
        <Joint x={420} y={230} />
        <Joint x={240} y={126.1} />
        <Member x1={620} y1={70} x2={481.4} y2={150} kind="compression" w={6} />
        <Member x1={481.4} y1={150} x2={620} y2={230} kind="compression" w={6} />
        <Member x1={481.4} y1={150} x2={620} y2={150} kind="tension" w={6} />
        <Stroke x1={620} y1={70} x2={620} y2={230} c="y" w={6} />
        <Dot x={620} y={70} r={4} />
        <Dot x={620} y={230} r={4} />
        <Dot x={620} y={150} r={4} />
        <Dot x={481.4} y={150} r={4} />
      </Figure>
    ),
    proof: (
      <>
        <p>Each joint closes its own polygon <Ref to="iv-1" />. At the apex, {load} and two {red} close a triangle. The rafters rise at 30°, so its angles are all 60°: it is equilateral, and each rafter pushes with exactly the load.</p>
        <p>At each support, half the load comes up, and the rafter and the tie close a triangle with it. That triangle is half of the big one, cut along its height, and the height is the tie: {blue} pulls with √3⁄2 ≈ 0.87 of the load.</p>
        <p>A member pushes its two joints alike, equal and opposite <Ref to="ax-4" />, so the two triangles that hold it can share that side. Glue them along it, and the three triangles become one figure: every member drawn once, the load and both reactions on one yellow line <Ref to="i-2" label="Book I, Prop. II" />.</p>
        <Note>Maxwell found such reciprocal figures in 1864; Luigi Cremona made them a drawing-board method in 1872.</Note>
      </>
    ),
    refs: ["iv-1", "ax-4", "i-2"],
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
  {
    slug: "iv-7", book: 4, n: 7, kind: "Theorem", short: "Double the load",
    statement: "Double every load on a truss, and every member force doubles: each member keeps its colour and grows twice as strong.",
    caption: "The same truss under one load, and under twice that load.",
    figure: (
      <Figure viewBox="25 45 370 380" maxWidth="27.5rem" label="Two copies of a triangulated truss of three panels, each with one yellow load hanging a third of the way along. In the lower copy the load arrow is twice as long, and every member, red or blue, is drawn twice as thick as its twin above">
        <Member x1={60} y1={150} x2={160} y2={150} kind="tension" w={3} />
        <Member x1={160} y1={150} x2={260} y2={150} kind="tension" w={4.5} />
        <Member x1={260} y1={150} x2={360} y2={150} kind="tension" w={1.5} />
        <Member x1={110} y1={63.4} x2={210} y2={63.4} kind="compression" w={6} />
        <Member x1={210} y1={63.4} x2={310} y2={63.4} kind="compression" w={3} />
        <Member x1={60} y1={150} x2={110} y2={63.4} kind="compression" w={6} />
        <Member x1={110} y1={63.4} x2={160} y2={150} kind="tension" w={6} />
        <Member x1={160} y1={150} x2={210} y2={63.4} kind="tension" w={3} />
        <Member x1={210} y1={63.4} x2={260} y2={150} kind="compression" w={3} />
        <Member x1={260} y1={150} x2={310} y2={63.4} kind="tension" w={3} />
        <Member x1={310} y1={63.4} x2={360} y2={150} kind="compression" w={3} />
        <Member x1={60} y1={340} x2={160} y2={340} kind="tension" w={6} />
        <Member x1={160} y1={340} x2={260} y2={340} kind="tension" w={9} />
        <Member x1={260} y1={340} x2={360} y2={340} kind="tension" w={3} />
        <Member x1={110} y1={253.4} x2={210} y2={253.4} kind="compression" w={12} />
        <Member x1={210} y1={253.4} x2={310} y2={253.4} kind="compression" w={6} />
        <Member x1={60} y1={340} x2={110} y2={253.4} kind="compression" w={12} />
        <Member x1={110} y1={253.4} x2={160} y2={340} kind="tension" w={12} />
        <Member x1={160} y1={340} x2={210} y2={253.4} kind="tension" w={6} />
        <Member x1={210} y1={253.4} x2={260} y2={340} kind="compression" w={6} />
        <Member x1={260} y1={340} x2={310} y2={253.4} kind="tension" w={6} />
        <Member x1={310} y1={253.4} x2={360} y2={340} kind="compression" w={6} />
        <Dash x1={30} y1={220} x2={390} y2={220} w={0.8} dotted />
        <Pin x={60} y={150} />
        <Roller x={360} y={150} />
        <Pin x={60} y={340} />
        <Roller x={360} y={340} />
        <Arrow x1={160} y1={158} x2={160} y2={176} c="y" />
        <Arrow x1={160} y1={348} x2={160} y2={398} c="y" />
        <Joint x={60} y={150} r={6} />
        <Joint x={160} y={150} r={6} />
        <Joint x={260} y={150} r={6} />
        <Joint x={360} y={150} r={6} />
        <Joint x={110} y={63.4} r={6} />
        <Joint x={210} y={63.4} r={6} />
        <Joint x={310} y={63.4} r={6} />
        <Joint x={60} y={340} r={6} />
        <Joint x={160} y={340} r={6} />
        <Joint x={260} y={340} r={6} />
        <Joint x={360} y={340} r={6} />
        <Joint x={110} y={253.4} r={6} />
        <Joint x={210} y={253.4} r={6} />
        <Joint x={310} y={253.4} r={6} />
      </Figure>
    ),
    proof: (
      <>
        <p>Every joint balances when its loads and member forces close a polygon <Ref to="iv-1" />. Double every side of every polygon: each still closes, each side still runs along its member, and each arrow still points the same way.</p>
        <p>So doubled forces balance doubled loads. A truss of triangles has only one way to balance <Ref to="iii-7" label="Book III, Prop. VII" />, so this is it: every {red} stays red, every {blue} stays blue, twice as strong.</p>
        <Cor>Any factor will do: a third of the load, a third of every force. With the factor −1 it is Proposition VI <Ref to="iv-6" />.</Cor>
        <Note>True while the truss keeps its shape. Real members stretch a little, and a slender red one may buckle before the load has doubled.</Note>
      </>
    ),
    refs: ["iv-1", "iii-7", "iv-6"],
  },
  {
    slug: "iv-8", book: 4, n: 8, kind: "Theorem", short: "Superposition",
    statement: "Two loads on a truss together make in each member the sum of the forces each makes alone, a push counted against a pull.",
    caption: "Load A, load B, and both together: each member adds its two forces.",
    figure: (
      <Figure viewBox="25 45 310 470" maxWidth="27.5rem" label="Three copies of a triangulated truss of three panels, member thickness following the force. Above, a yellow load hangs a third of the way along; in the middle, an equal load hangs two thirds of the way along; below, both loads hang together. The two middle diagonals are blue in one copy and red in the other, and in the bottom copy they are thin and grey">
        <Member x1={60} y1={130} x2={140} y2={130} kind="tension" w={3} />
        <Member x1={140} y1={130} x2={220} y2={130} kind="tension" w={4.5} />
        <Member x1={220} y1={130} x2={300} y2={130} kind="tension" w={1.5} />
        <Member x1={100} y1={60.7} x2={180} y2={60.7} kind="compression" w={6} />
        <Member x1={180} y1={60.7} x2={260} y2={60.7} kind="compression" w={3} />
        <Member x1={60} y1={130} x2={100} y2={60.7} kind="compression" w={6} />
        <Member x1={100} y1={60.7} x2={140} y2={130} kind="tension" w={6} />
        <Member x1={140} y1={130} x2={180} y2={60.7} kind="tension" w={3} />
        <Member x1={180} y1={60.7} x2={220} y2={130} kind="compression" w={3} />
        <Member x1={220} y1={130} x2={260} y2={60.7} kind="tension" w={3} />
        <Member x1={260} y1={60.7} x2={300} y2={130} kind="compression" w={3} />
        <Member x1={60} y1={300} x2={140} y2={300} kind="tension" w={1.5} />
        <Member x1={140} y1={300} x2={220} y2={300} kind="tension" w={4.5} />
        <Member x1={220} y1={300} x2={300} y2={300} kind="tension" w={3} />
        <Member x1={100} y1={230.7} x2={180} y2={230.7} kind="compression" w={3} />
        <Member x1={180} y1={230.7} x2={260} y2={230.7} kind="compression" w={6} />
        <Member x1={60} y1={300} x2={100} y2={230.7} kind="compression" w={3} />
        <Member x1={100} y1={230.7} x2={140} y2={300} kind="tension" w={3} />
        <Member x1={140} y1={300} x2={180} y2={230.7} kind="compression" w={3} />
        <Member x1={180} y1={230.7} x2={220} y2={300} kind="tension" w={3} />
        <Member x1={220} y1={300} x2={260} y2={230.7} kind="tension" w={6} />
        <Member x1={260} y1={230.7} x2={300} y2={300} kind="compression" w={6} />
        <Member x1={60} y1={470} x2={140} y2={470} kind="tension" w={4.5} />
        <Member x1={140} y1={470} x2={220} y2={470} kind="tension" w={9} />
        <Member x1={220} y1={470} x2={300} y2={470} kind="tension" w={4.5} />
        <Member x1={100} y1={400.7} x2={180} y2={400.7} kind="compression" w={9} />
        <Member x1={180} y1={400.7} x2={260} y2={400.7} kind="compression" w={9} />
        <Member x1={60} y1={470} x2={100} y2={400.7} kind="compression" w={9} />
        <Member x1={100} y1={400.7} x2={140} y2={470} kind="tension" w={9} />
        <Member x1={140} y1={470} x2={180} y2={400.7} kind="member" w={2.5} />
        <Member x1={180} y1={400.7} x2={220} y2={470} kind="member" w={2.5} />
        <Member x1={220} y1={470} x2={260} y2={400.7} kind="tension" w={9} />
        <Member x1={260} y1={400.7} x2={300} y2={470} kind="compression" w={9} />
        <Dash x1={30} y1={200} x2={330} y2={200} w={0.8} dotted />
        <Dash x1={30} y1={370} x2={330} y2={370} w={0.8} dotted />
        {[130, 300, 470].map((y) => <Pin key={`p${y}`} x={60} y={y} />)}
        {[130, 300, 470].map((y) => <Roller key={`r${y}`} x={300} y={y} />)}
        <Arrow x1={140} y1={138} x2={140} y2={154} c="y" w={5} />
        <Arrow x1={220} y1={308} x2={220} y2={324} c="y" w={5} />
        <Arrow x1={140} y1={478} x2={140} y2={494} c="y" w={5} />
        <Arrow x1={220} y1={478} x2={220} y2={494} c="y" w={5} />
        <Joint x={60} y={130} r={5} />
        <Joint x={140} y={130} r={5} />
        <Joint x={220} y={130} r={5} />
        <Joint x={300} y={130} r={5} />
        <Joint x={100} y={60.7} r={5} />
        <Joint x={180} y={60.7} r={5} />
        <Joint x={260} y={60.7} r={5} />
        <Joint x={60} y={300} r={5} />
        <Joint x={140} y={300} r={5} />
        <Joint x={220} y={300} r={5} />
        <Joint x={300} y={300} r={5} />
        <Joint x={100} y={230.7} r={5} />
        <Joint x={180} y={230.7} r={5} />
        <Joint x={260} y={230.7} r={5} />
        <Joint x={60} y={470} r={5} />
        <Joint x={140} y={470} r={5} />
        <Joint x={220} y={470} r={5} />
        <Joint x={300} y={470} r={5} />
        <Joint x={100} y={400.7} r={5} />
        <Joint x={180} y={400.7} r={5} />
        <Joint x={260} y={400.7} r={5} />
      </Figure>
    ),
    proof: (
      <>
        <p>At each joint the forces under load A balance, and so do the forces under load B. A balanced set may be added, and the joint never notices <Ref to="ax-3" />. Along each member the two forces lie on one line, so they add as lengths, a push counting against a pull <Ref to="ax-2" />.</p>
        <p>So the sums balance both loads together, and a truss of triangles has only one balance <Ref to="iii-7" label="Book III, Prop. VII" />: the sums are the answer. Each middle diagonal is {blue} under one load and {red} of the same size under the other, so together it is {grey}.</p>
        <p>Count it on the top chord: under A its left half pushes with 0.77 of a load and its right half with 0.38; under B the other way round. Together both halves push with 1.15.</p>
        <Cor>Solve a truss once for a unit load at each joint, and every loading is a sum of those answers <Ref to="iv-7" />. That is how a bridge is checked for a lorry standing anywhere on its deck.</Cor>
      </>
    ),
    refs: ["ax-3", "ax-2", "iii-7", "iv-7"],
  },
  {
    slug: "iv-9", book: 4, n: 9, kind: "Theorem", short: "Warren, Pratt and Howe",
    statement: "Under the same loads, the diagonals of a Pratt truss pull, the diagonals of a Howe truss push, and the diagonals of a Warren truss take turns.",
    caption: "Pratt, Howe and Warren, on one span under the same three loads.",
    figure: (
      <Figure viewBox="15 25 350 450" maxWidth="27.5rem" label="Three trusses of the same span and depth, each on a pin and a roller with three equal yellow loads on the bottom chord. Above, the Pratt truss: its inner diagonals fall towards the middle and are blue, and its middle post is grey. In the middle, the Howe truss: its inner diagonals rise towards the middle and are red, and its posts are blue. Below, the Warren truss, triangles without posts: its diagonals are red and blue in turn">
        <Member x1={50} y1={110} x2={120} y2={110} kind="tension" w={5} />
        <Member x1={120} y1={110} x2={190} y2={110} kind="tension" w={5} />
        <Member x1={190} y1={110} x2={260} y2={110} kind="tension" w={5} />
        <Member x1={260} y1={110} x2={330} y2={110} kind="tension" w={5} />
        <Member x1={120} y1={110} x2={120} y2={40} kind="tension" w={5} />
        <Member x1={120} y1={40} x2={190} y2={40} kind="compression" w={5} />
        <Member x1={190} y1={110} x2={190} y2={40} kind="member" w={2.5} />
        <Member x1={190} y1={40} x2={260} y2={40} kind="compression" w={5} />
        <Member x1={260} y1={110} x2={260} y2={40} kind="tension" w={5} />
        <Member x1={50} y1={110} x2={120} y2={40} kind="compression" w={5} />
        <Member x1={260} y1={40} x2={330} y2={110} kind="compression" w={5} />
        <Member x1={120} y1={40} x2={190} y2={110} kind="tension" w={5} />
        <Member x1={260} y1={40} x2={190} y2={110} kind="tension" w={5} />
        <Member x1={50} y1={270} x2={120} y2={270} kind="tension" w={5} />
        <Member x1={120} y1={270} x2={190} y2={270} kind="tension" w={5} />
        <Member x1={190} y1={270} x2={260} y2={270} kind="tension" w={5} />
        <Member x1={260} y1={270} x2={330} y2={270} kind="tension" w={5} />
        <Member x1={120} y1={270} x2={120} y2={200} kind="tension" w={5} />
        <Member x1={120} y1={200} x2={190} y2={200} kind="compression" w={5} />
        <Member x1={190} y1={270} x2={190} y2={200} kind="tension" w={5} />
        <Member x1={190} y1={200} x2={260} y2={200} kind="compression" w={5} />
        <Member x1={260} y1={270} x2={260} y2={200} kind="tension" w={5} />
        <Member x1={50} y1={270} x2={120} y2={200} kind="compression" w={5} />
        <Member x1={260} y1={200} x2={330} y2={270} kind="compression" w={5} />
        <Member x1={120} y1={270} x2={190} y2={200} kind="compression" w={5} />
        <Member x1={260} y1={270} x2={190} y2={200} kind="compression" w={5} />
        <Member x1={50} y1={430} x2={120} y2={430} kind="tension" w={5} />
        <Member x1={120} y1={430} x2={190} y2={430} kind="tension" w={5} />
        <Member x1={190} y1={430} x2={260} y2={430} kind="tension" w={5} />
        <Member x1={260} y1={430} x2={330} y2={430} kind="tension" w={5} />
        <Member x1={50} y1={430} x2={85} y2={360} kind="compression" w={5} />
        <Member x1={85} y1={360} x2={120} y2={430} kind="tension" w={5} />
        <Member x1={85} y1={360} x2={155} y2={360} kind="compression" w={5} />
        <Member x1={120} y1={430} x2={155} y2={360} kind="compression" w={5} />
        <Member x1={155} y1={360} x2={190} y2={430} kind="tension" w={5} />
        <Member x1={155} y1={360} x2={225} y2={360} kind="compression" w={5} />
        <Member x1={190} y1={430} x2={225} y2={360} kind="tension" w={5} />
        <Member x1={225} y1={360} x2={260} y2={430} kind="compression" w={5} />
        <Member x1={225} y1={360} x2={295} y2={360} kind="compression" w={5} />
        <Member x1={260} y1={430} x2={295} y2={360} kind="tension" w={5} />
        <Member x1={295} y1={360} x2={330} y2={430} kind="compression" w={5} />
        <Dash x1={20} y1={172} x2={360} y2={172} w={0.8} dotted />
        <Dash x1={20} y1={332} x2={360} y2={332} w={0.8} dotted />
        {[110, 270, 430].map((y) => <Pin key={`p${y}`} x={50} y={y} />)}
        {[110, 270, 430].map((y) => <Roller key={`r${y}`} x={330} y={y} />)}
        {[110, 270, 430].flatMap((y) => [120, 190, 260].map((x) => <Arrow key={`l${x}-${y}`} x1={x} y1={y + 8} x2={x} y2={y + 22} c="y" w={4} s={1.6} />))}
        <Joint x={50} y={110} r={5} />
        <Joint x={120} y={110} r={5} />
        <Joint x={190} y={110} r={5} />
        <Joint x={260} y={110} r={5} />
        <Joint x={330} y={110} r={5} />
        <Joint x={120} y={40} r={5} />
        <Joint x={190} y={40} r={5} />
        <Joint x={260} y={40} r={5} />
        <Joint x={50} y={270} r={5} />
        <Joint x={120} y={270} r={5} />
        <Joint x={190} y={270} r={5} />
        <Joint x={260} y={270} r={5} />
        <Joint x={330} y={270} r={5} />
        <Joint x={120} y={200} r={5} />
        <Joint x={190} y={200} r={5} />
        <Joint x={260} y={200} r={5} />
        <Joint x={50} y={430} r={5} />
        <Joint x={120} y={430} r={5} />
        <Joint x={190} y={430} r={5} />
        <Joint x={260} y={430} r={5} />
        <Joint x={330} y={430} r={5} />
        <Joint x={85} y={360} r={5} />
        <Joint x={155} y={360} r={5} />
        <Joint x={225} y={360} r={5} />
        <Joint x={295} y={360} r={5} />
      </Figure>
    ),
    proof: (
      <>
        <p>In each panel the diagonal carries the shear: what the support brings up, less the loads already passed <Ref to="iv-4" />. Left of the middle that shear is upward, so the diagonal must hold up the side of the panel nearer the middle.</p>
        <p>A diagonal that falls towards the middle holds that side up by hanging it from the top: {blue}, Pratt’s. A diagonal that rises towards the middle holds the same side up by propping it from below: {red}, Howe’s, and its posts take the pull instead. Even Pratt’s end posts lean the Howe way, and push.</p>
        <p>Warren’s diagonals lean one way and then the other, so they pull and push in turn, all across the span.</p>
        <Note>Howe’s truss dates from 1840 and Pratt’s from 1844. A long red member is the one that buckles, so Pratt’s puts the pull in the long diagonals and keeps the push in the short posts and chords.</Note>
      </>
    ),
    refs: ["iv-4"],
  },
  {
    slug: "iv-10", book: 4, n: 10, kind: "Problem", short: "The bridge",
    statement: "Find every member force of a bridge truss from the four axioms alone, one joint at a time.",
    caption: "A bridge truss under its deck: every member in its colour and its strength.",
    figure: (
      <Figure viewBox="5 120 430 150" label="A six-panel bridge truss with a polygonal top chord, on a pin and a roller, carries five equal yellow loads on its bottom chord. The top chord and end posts are thick and red, the bottom chord thick and blue, and the posts and diagonals thinner and blue; each member's thickness follows its force, and the two middle diagonals are the thinnest">
        <Member x1={40} y1={220} x2={100} y2={220} kind="tension" w={5} />
        <Member x1={100} y1={220} x2={160} y2={220} kind="tension" w={5} />
        <Member x1={160} y1={220} x2={220} y2={220} kind="tension" w={5.6} />
        <Member x1={220} y1={220} x2={280} y2={220} kind="tension" w={5.6} />
        <Member x1={280} y1={220} x2={340} y2={220} kind="tension" w={5} />
        <Member x1={340} y1={220} x2={400} y2={220} kind="tension" w={5} />
        <Member x1={100} y1={220} x2={100} y2={164} kind="tension" w={2.8} />
        <Member x1={100} y1={164} x2={160} y2={144} kind="compression" w={5.8} />
        <Member x1={160} y1={220} x2={160} y2={144} kind="tension" w={2.2} />
        <Member x1={160} y1={144} x2={220} y2={136} kind="compression" w={5.7} />
        <Member x1={220} y1={220} x2={220} y2={136} kind="tension" w={2.6} />
        <Member x1={220} y1={136} x2={280} y2={144} kind="compression" w={5.7} />
        <Member x1={280} y1={220} x2={280} y2={144} kind="tension" w={2.2} />
        <Member x1={280} y1={144} x2={340} y2={164} kind="compression" w={5.8} />
        <Member x1={340} y1={220} x2={340} y2={164} kind="tension" w={2.8} />
        <Member x1={40} y1={220} x2={100} y2={164} kind="compression" w={6.3} />
        <Member x1={340} y1={164} x2={400} y2={220} kind="compression" w={6.3} />
        <Member x1={100} y1={164} x2={160} y2={220} kind="tension" w={2.4} />
        <Member x1={160} y1={144} x2={220} y2={220} kind="tension" w={1.6} />
        <Member x1={280} y1={144} x2={220} y2={220} kind="tension" w={1.6} />
        <Member x1={340} y1={164} x2={280} y2={220} kind="tension" w={2.4} />
        <Pin x={40} y={220} />
        <Roller x={400} y={220} />
        {[100, 160, 220, 280, 340].map((x) => <Arrow key={x} x1={x} y1={228} x2={x} y2={244} c="y" w={4} s={1.6} />)}
        <Joint x={40} y={220} r={5} />
        <Joint x={100} y={220} r={5} />
        <Joint x={160} y={220} r={5} />
        <Joint x={220} y={220} r={5} />
        <Joint x={280} y={220} r={5} />
        <Joint x={340} y={220} r={5} />
        <Joint x={400} y={220} r={5} />
        <Joint x={100} y={164} r={5} />
        <Joint x={160} y={144} r={5} />
        <Joint x={220} y={136} r={5} />
        <Joint x={280} y={144} r={5} />
        <Joint x={340} y={164} r={5} />
      </Figure>
    ),
    proof: (
      <>
        <p>Each member is pinned at both ends and loaded nowhere between, so it pushes or pulls only along itself <Ref to="ax-1" />, and its two joints feel it equally and oppositely <Ref to="ax-4" />. Cut it, and put a balanced pair in its place, one force on each joint: the truss never notices <Ref to="ax-3" />.</p>
        <p>Cut the whole bridge free: the two supports share the five loads, two and a half each <Ref to="iii-6" label="Book III, Prop. VI" />. At the left support only the end post and the bottom chord are unknown; close the triangle <Ref to="ax-2" />. Then the first post, the first top joint, the next bottom joint: each meets at most two unknowns, and each closes a polygon <Ref to="i-2" label="Book I, Prop. II" />.</p>
        <p>Walk in from both ends. The middle post is found from either side, and the last joint closes by itself, because the bridge as a whole was already in balance.</p>
        <p>The end posts push hardest, with 3.66 loads each. The two middle diagonals pull with less than a tenth of a load: the bent top chord carries almost all the shear.</p>
        <Note>Nothing here is more than Book I. A bridge is a few dozen triangles, closed one after another <Ref to="iv-1" />.</Note>
      </>
    ),
    refs: ["ax-1", "ax-4", "ax-3", "iii-6", "ax-2", "i-2", "iv-1"],
  },
  {
    slug: "iv-11", book: 4, n: 11, kind: "Theorem", short: "The lightest truss",
    statement: "In the lightest truss that carries a load to a support, the red and blue members cross at right angles everywhere; carried from a round support, they grow into spirals.",
    caption: "A load carried from a round support: two families of spirals, crossing square.",
    figure: (
      <Figure viewBox="20 75 310 165" label="A pale disc on the left is the support. From its right side two families of spirals sweep out to a single point that carries a hanging yellow load. The blue family, edged by a thick upper spiral, pulls; the red family, edged by a thick lower spiral, pushes. Every blue spiral crosses every red one at a right angle, marked at one crossing">
        <Wheel x={MI.cx} y={MI.cy} r={MI.R} fill="body" />
        {MI_PULL.map(({ k, pts }) => <MemberPath key={`b${k}`} points={pts} kind="tension" w={k === MI.n ? 5 : 2.5} />)}
        {MI_PUSH.map(({ k, pts }) => <MemberPath key={`r${k}`} points={pts} kind="compression" w={k === -MI.n ? 5 : 2.5} />)}
        <RightAngle points="154.5,166.4 160.9,160 154.5,153.6" />
        <Arrow x1={MI_TIP} y1={168} x2={MI_TIP} y2={196} c="y" w={5} />
        <Joint x={MI_TIP} y={MI.cy} r={5} />
      </Figure>
    ),
    proof: (
      <>
        <p>Every member pushes or pulls only along itself <Ref to="ax-1" />, and the material it needs is its force times its length. Weigh a truss by adding these up.</p>
        <p>Michell let the ground round the support shift a little, so that no line anywhere stretches or shrinks by more than one small fraction. The load does a fixed work in that shift, and no member can take up more than its force times its length times the fraction. So no truss is lighter than that work allows, and a truss reaches the bound only if every {blue} lies where the ground stretches most, and every {red} where it shrinks most.</p>
        <p>At any point the line of most stretch and the line of most shrink are square to each other, so the members of the lightest truss cross square. Round a circle that must not move, those lines are spirals at 45° to every radius, each turning as fast as it grows, and every red spiral meets every blue one square.</p>
        <Note>A. G. M. Michell, 1904. The figure draws the shape of his answer with a few of its spirals; the true optimum is a dense net of them.</Note>
      </>
    ),
    refs: ["ax-1"],
  },
];
