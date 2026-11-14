"use client";

import type { ReactNode } from "react";
import { Eyebrow, ForceRef, Hint } from "@forzez/ui";
import { LiveText, LiveValue } from "./context";

const F1 = <ForceRef tone={1}>F₁</ForceRef>;
const F2 = <ForceRef tone={2}>F₂</ForceRef>;
const F3 = <ForceRef tone={3}>F₃</ForceRef>;

function ComponentTable() {
  const rows = [
    { f: "F1", label: "F₁", cls: "text-force-1" },
    { f: "F2", label: "F₂", cls: "text-force-2" },
    { f: "F3", label: "F₃", cls: "text-force-3-text" },
  ];
  const cell = "py-0.5 pr-4 text-right";
  return (
    <table className="mb-4 border-collapse font-data text-sm tabular-nums">
      <thead>
        <tr className="border-b border-rule text-muted">
          <th className="py-0.5 pr-4" />
          <th className={`${cell} font-normal`}>F<sub>x</sub></th>
          <th className={`${cell} font-normal`}>F<sub>y</sub></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.f} className={r.cls}>
            <td className="py-0.5 pr-4 font-semibold">{r.label}</td>
            <td className={cell}><LiveText k={`${r.f}x`} /></td>
            <td className={cell}><LiveText k={`${r.f}y`} /></td>
          </tr>
        ))}
        <tr className="border-t border-ink font-semibold">
          <td className="py-0.5 pr-4">Σ</td>
          <td className={cell}><LiveText k="Sx" /></td>
          <td className={cell}><LiveText k="Sy" /></td>
        </tr>
      </tbody>
    </table>
  );
}

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="mb-2 font-display text-xl leading-tight">{children}</h2>
);

/** Step text, keyed by step id (see STEPS in model.ts). */
export const CONTENT: Record<string, ReactNode> = {
  title: (
    <>
      <Eyebrow>Statics · Chapter 1</Eyebrow>
      <h1 className="mt-3 mb-4 font-display text-3xl leading-none min-[860px]:text-4xl">
        <span className="mr-[0.2em] text-force-1">I.</span>Equilibrium
      </h1>
      <p className="text-muted italic">From a single force to the force triangle, up to the doorstep of the method of joints.</p>
      <p>Scroll down. The diagram follows the text, and wherever a slider appears, you are in control.</p>
    </>
  ),
  one: (
    <>
      <H2>One force</H2>
      <p>A single force acts on the body: {F1} = 10 kN, pointing right.</p>
      <p>Nothing balances it. The resultant is the force itself, and the body starts to accelerate in its direction. The dashed outline shows where it is heading.</p>
    </>
  ),
  components: (
    <>
      <H2>Resolving into components</H2>
      <p>An inclined force can be written as two perpendicular forces: a horizontal and a vertical component. Together they do exactly what the original force does to the body.</p>
      <p>
        F<sub>x</sub> = F·cos α = <LiveValue k="F1x" /> kN
        <br />
        F<sub>y</sub> = F·sin α = <LiveValue k="F1y" /> kN
      </p>
      <p>Turn it all the way round. The sign gives the direction: left and down are negative.</p>
      <Hint>
        From now on, ΣF<sub>x</sub> and ΣF<sub>y</sub> in the top left corner mean exactly this: the sum of the horizontal and the vertical components of all forces.
      </Hint>
    </>
  ),
  two: (
    <>
      <H2>Two forces</H2>
      <p>Put an equal {F2} against {F1}. The resultant disappears: ΣF<sub>x</sub> = 10 − 10 = 0, ΣF<sub>y</sub> = 0.</p>
      <p>Two forces are in equilibrium when they are equal in size, opposite in direction, and <em>act along the same line</em>. We will come back to that last condition.</p>
    </>
  ),
  "two-try": (
    <>
      <H2>Try it</H2>
      <p>Turn {F2} or change its size. The resultant comes straight back: right now R = <LiveValue k="R" /> kN.</p>
      <p>There is only one position of equilibrium: 180° and 10 kN. If you lose it, the <em>back to equilibrium</em> button restores it.</p>
    </>
  ),
  couple: (
    <>
      <H2>A couple</H2>
      <p>The third condition is easy to miss. Shift the two forces apart, keeping them parallel. ΣF<sub>x</sub> and ΣF<sub>y</sub> are still zero, yet the body is not at rest: it <em>turns</em>.</p>
      <p>This is a couple. Its moment is M = F·d, now <LiveValue k="M" /> kNm. Pull the arm back to zero and the turning stops.</p>
      <Hint>equilibrium: ΣF<sub>x</sub> = 0, ΣF<sub>y</sub> = 0, ΣM = 0</Hint>
    </>
  ),
  three: (
    <>
      <H2>Three forces</H2>
      <p>{F1}, {F2}, {F3}: three directions, three magnitudes, and still in equilibrium.</p>
      <p>The dashed lines are the lines of action. Three non-parallel forces can only be in equilibrium if their lines of action meet in a single point. Here that point is the centre, so there is no moment.</p>
    </>
  ),
  "three-components": (
    <>
      <H2>Why zero?</H2>
      <p>Resolve all three. The horizontal components cancel out, and so do the vertical ones:</p>
      <ComponentTable />
      <p>This is equilibrium in a form you can calculate: two equations, ΣF<sub>x</sub> = 0 and ΣF<sub>y</sub> = 0. Turn {F2} and watch which row breaks.</p>
    </>
  ),
  triangle: (
    <>
      <H2>The force triangle</H2>
      <p>The same thing as a drawing: chain the forces so that each one starts where the previous one ended.</p>
      <p>If the forces are in equilibrium, the chain closes. There is no gap, so there is no resultant.</p>
    </>
  ),
  "triangle-try": (
    <>
      <H2>Open it up</H2>
      <p>Drag the <em>chain</em> slider back and forth: the same three forces, drawn two ways.</p>
      <p>Then reach for {F3}. The triangle opens, and the gap is filled exactly by the resultant: R = <LiveValue k="R" /> kN.</p>
      <p>It works the other way round, too. If you know two forces, closing the triangle gives you the third. Graphic statics is built on this.</p>
    </>
  ),
  joint: (
    <>
      <H2>A joint</H2>
      <p>Swap the disc for a joint, and the forces for three bars pulling on it. The same three forces, the same closed triangle.</p>
      <p>
        That is all the method of joints is: for every joint, write ΣF<sub>x</sub> = 0 and ΣF<sub>y</sub> = 0. Two equations per joint, so two unknown bar forces.{" "}
        <a href="https://truzme.com" target="_blank" rel="noopener" className="underline decoration-muted underline-offset-3 hover:decoration-ink">
          Truzme
        </a>{" "}
        does exactly this, joint by joint.
      </p>
    </>
  ),
};
