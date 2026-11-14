// Plates: Plate-Stevin.dc.html (after Book I) and Black-Wheel.dc.html (side plate, on black).
// Figures only use parts from ../figure, proofs only pieces from ../proof and Sym (see book-1.tsx).

import { Sym } from "@forzez/ui";
import { Arrow, Beads, Body, Curve, Dot, Figure, Spokes, Stroke, Wedge, Wheel } from "../figure";
import { Cor, Note, Ref } from "../proof";
import type { Page } from "../types";

const RED_BEADS: [number, number][] = [
  [82.2, 248.5], [95.9, 238.5], [109.7, 228.5], [123.4, 218.5], [137.2, 208.5], [150.9, 198.5], [164.7, 188.5], [178.4, 178.5],
  [192.2, 168.5], [205.9, 158.5], [219.7, 148.5], [233.4, 138.5], [247.2, 128.5], [260.9, 118.5], [274.7, 108.5], [288.4, 98.5],
];
const BLUE_BEADS: [number, number][] = [
  [311.3, 103.0], [320.4, 117.6], [329.5, 132.1], [338.6, 146.7], [347.7, 161.2], [356.8, 175.8],
  [365.9, 190.3], [375.0, 204.9], [384.1, 219.4], [393.1, 233.9], [402.2, 248.5],
];
const HANGING_BEADS: [number, number][] = [
  [407.3, 270.7], [401.3, 287.7], [391.4, 301.8], [378.9, 313.7], [365.1, 323.4], [349.1, 332.0], [333.3, 338.5], [316.3, 344.0],
  [299.4, 348.1], [283.1, 350.9], [265.0, 353.0], [247.9, 353.9], [230.8, 353.9], [213.7, 352.9], [195.7, 350.7], [179.4, 347.8],
  [162.6, 343.6], [145.6, 338.1], [129.9, 331.5], [114.0, 322.8], [100.3, 313.1], [88.0, 301.2], [78.3, 287.0], [72.6, 269.9],
];

export const PLATE_STEVIN: Page[] = [
  {
    slug: "stevin", book: 1, n: 0, kind: "Plate", title: "The wreath of spheres", short: "Stevin’s wreath",
    head: "Plate. Simon Stevin, 1586.",
    statement: "A loop of equal beads hung over two slopes does not move. If it did, it would move for ever.",
    caption: "Sixteen beads on the long slope hold eleven on the short one.",
    figure: (
      <Figure viewBox="50 70 380 300" label="A loop of equal beads draped over a triangle with a long gentle slope on the left and a short steep slope on the right. Sixteen red beads lie on the long slope, eleven blue beads on the short slope, and pale beads hang in a symmetric loop below">
        <Body points="80,260 400,260 300,100" />
        <Curve d="M72.6,269.9 L82.2,248.5 L288.4,98.5 L300,91 L311.3,103 L402.2,248.5 L407.3,270.7 A168 92 0 0 1 72.6,269.9" w={1.2} />
        <Beads at={RED_BEADS} c="r" />
        <Beads at={BLUE_BEADS} c="b" />
        <Beads at={HANGING_BEADS} pale />
      </Figure>
    ),
    proof: (
      <>
        <p>The loop cannot run by itself: a world where beads circle for ever would be a machine for nothing.</p>
        <p>The hanging part is the same on both sides; take it away <Ref to="ax-3" /> and the rest still stands. Therefore <Sym c="force-1" kind="dot" count={7} label="red beads" /> on the long slope pull as hard as <Sym c="force-2" kind="dot" count={4} label="blue beads" /> on the short one.</p>
        <p>Many beads on a gentle slope, few on a steep one: the pull along a slope grows with its steepness, just as <Ref to="i-4" label="Prop. IV" /> found with wedges.</p>
        <Note>Stevin had it carved on his title page: wonder, and yet no wonder.</Note>
      </>
    ),
    refs: ["ax-3", "i-4"],
    noQed: true,
  },
];

export const PLATE_WHEEL: Page[] = [
  {
    slug: "wheel", book: 5, n: 0, kind: "Plate", title: "The bicycle wheel", short: "The bicycle wheel",
    head: "Side plate.", dark: true,
    statement: "Spokes that push by pulling less.",
    caption: "Only the spokes above the ground notice the rider.",
    figure: (
      <Figure viewBox="40 30 400 460" maxWidth="28rem" label="A wheel on the ground: a thick red rim, twenty-four blue spokes, a pale hub. The five spokes above the contact point are drawn thin and dashed, and the slice of the wheel they span is filled yellow. A yellow arrow from the ground pushes up at the contact point">
        <Wedge d="M240,230 L323,373.8 A166 166 0 0 1 157,373.8 Z" c="y" />
        <Spokes x={240} y={230} n={24} r0={24} r1={172} slack={[4, 5, 6, 7, 8]} />
        <Curve d="M60,230 A180 180 0 1 0 420,230 A180 180 0 1 0 60,230" c="r" w={14} />
        <Dot x={240} y={230} r={22} c="k" />
        <Wheel x={240} y={230} r={5} w={0} />
        <Stroke x1={60} y1={417} x2={420} y2={417} w={1.5} />
        <Arrow x1={240} y1={482} x2={240} y2={434.6} c="y" w={6} s={1.8} />
      </Figure>
    ),
    proof: (
      <>
        <p>A spoke can only pull. Pull every spoke tight first, and the few at the bottom can carry the rider by pulling less.</p>
        <p>Tightening the spokes squeezes the rim <Sym c="compression" label="red rim" /> and stretches every spoke <Sym c="tension" weight="thin" label="blue spoke" />: a wheel in balance with nothing on it. Put a rider on the hub. The ground pushes up at one point, and only the spokes above it notice: they lose part of their pull <Sym c="tension" kind="dashed" label="slackened spoke" />, and the rest hardly change. So the hub stands on its bottom spokes as if they were struts, though no spoke ever pushes.</p>
        <Cor>Load it past its prestress and a bottom spoke goes slack. Prestress is borrowed compression, and it must be paid back.</Cor>
        <Note>After Jobst Brandt, <i>The Bicycle Wheel</i>, 1981.</Note>
      </>
    ),
    refs: [],
  },
];
