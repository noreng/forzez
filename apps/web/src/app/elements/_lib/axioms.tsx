import { Arrow, Body, Dash, Dot, Figure } from "./figure";
import type { Axiom } from "./types";

// prototypes/elements-of-statics/project/Main.dc.html
export const AXIOMS: Axiom[] = [
  {
    id: "ax-1", n: 1,
    text: "Two forces hold a body in balance when they are equal, opposite, and on one line.",
    figure: (
      <Figure viewBox="0 0 260 130" label="Two equal and opposite red forces on one line hold a body in balance">
        <Body x={95} y={40} width={70} height={50} />
        <Dash x1={14} y1={65} x2={246} y2={65} w={1} />
        <Arrow x1={110} y1={65} x2={44} y2={65} c="r" w={5} />
        <Arrow x1={150} y1={65} x2={216} y2={65} c="r" w={5} />
      </Figure>
    ),
  },
  {
    id: "ax-2", n: 2,
    text: "Two forces at a point act as one: the diagonal of the parallelogram they span.",
    figure: (
      <Figure viewBox="0 0 260 130" label="A red and a blue force at a point combine into the black diagonal of their parallelogram">
        <Dash x1={90} y1={30} x2={230} y2={10} w={1} />
        <Dash x1={200} y1={100} x2={230} y2={10} w={1} />
        <Arrow x1={60} y1={118} x2={223} y2={14} c="k" w={3} s={1.2} />
        <Arrow x1={60} y1={118} x2={85} y2={43} c="r" w={5} />
        <Arrow x1={60} y1={118} x2={186} y2={102} c="b" w={5} />
        <Dot x={60} y={118} r={4} />
      </Figure>
    ),
  },
  {
    id: "ax-3", n: 3,
    text: "A balanced set of forces may be added or taken away; the body never notices.",
    figure: (
      <Figure viewBox="0 0 260 130" label="A yellow load on a body is unchanged when a balanced pair of blue forces is added">
        <Body x={95} y={50} width={70} height={50} />
        <Arrow x1={130} y1={6} x2={130} y2={34} c="y" w={5} />
        <Arrow x1={112} y1={75} x2={50} y2={75} c="b" w={5} opacity={0.45} />
        <Arrow x1={148} y1={75} x2={210} y2={75} c="b" w={5} opacity={0.45} />
      </Figure>
    ),
  },
  {
    id: "ax-4", n: 4,
    text: "Whatever one body does to another, the other does back: equal, and opposite.",
    figure: (
      <Figure viewBox="0 0 260 130" label="Two bodies press on each other with equal and opposite red forces">
        <Body x={20} y={40} width={80} height={50} />
        <Body x={160} y={40} width={80} height={50} shade={2} />
        <Arrow x1={134} y1={65} x2={116} y2={65} c="r" w={5} />
        <Arrow x1={126} y1={65} x2={144} y2={65} c="r" w={5} />
      </Figure>
    ),
  },
];
