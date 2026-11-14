import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@forzez/ui";
import { ContentsRow as Row } from "../_components/contents-row";
import { NetFigure, SupportsFigure } from "./_lib/figures";
import { generate, parseNetRecipe, solve } from "./_lib/net.ts";
import { parseSupportsRecipe, supportsGen } from "./_lib/supports.ts";

export const metadata: Metadata = {
  title: "Studio",
  description: "Generative trusses: a seed and a few settings make a structure, and the solver decides how it looks.",
};

// Hand-picked recipes, drawn at build time. The first four are the fingerprinted samples from
// docs/notes/truss-art-net-session.md, so the gallery doubles as a visible check of the port.
const NET_PIECES = [
  { recipe: "net2.truzme.m1.a7.d4.c3.f100.l60.g5.s2.w3.ra", name: "Arch" },
  { recipe: "net2.truzme.m0.a7.d4.c3.f100.l60.g5.s2.w3.ra", name: "Wave" },
  { recipe: "net2.truzme.m2.a7.d6.c3.f100.l60.g5.s2.w3.ra", name: "Swirl" },
  { recipe: "net1.truzme.c3.f85.l60.s3.w3.ra", name: "Grid" },
];
const PIN_PIECES = [
  { recipe: "pts1.truzme.c3.j1.f100.ra", name: "Field of pins" },
  { recipe: "pts1.steel.c5.j0.f60.ra", name: "Thinned field" },
];

export default function Studio() {
  const pieces = [
    ...NET_PIECES.map(({ recipe, name }) => {
      const model = generate(parseNetRecipe(recipe)!)!;
      const forces = solve(model)!;
      return {
        recipe,
        name,
        href: `/studio/net#${recipe}`,
        figure: <NetFigure model={model} forces={forces} title={`${name}: ${recipe}`} />,
      };
    }),
    ...PIN_PIECES.map(({ recipe, name }) => ({
      recipe,
      name,
      href: `/studio/supports#${recipe}`,
      figure: <SupportsFigure points={supportsGen(parseSupportsRecipe(recipe)!)} title={`${name}: ${recipe}`} />,
    })),
  ];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-14 px-5 pt-24 pb-16 sm:px-8 min-[1000px]:pt-28">
      <header className="flex flex-col gap-3">
        <Eyebrow>Studio</Eyebrow>
        <h1 className="font-display text-4xl leading-none">Structures the solver draws.</h1>
        <p className="max-w-[40rem] text-md text-muted italic">
          A seed and a few settings make a truss; the physics decides how it looks. The same recipe always draws the
          same piece, so a link is enough to keep one.
        </p>
        <p className="font-data text-sm text-muted">2 generators · {pieces.length} pieces below · 0 drawn by hand</p>
      </header>

      <section className="flex flex-col gap-6">
        <h2 className="font-display text-xl">Make your own</h2>
        <ol className="m-0 list-none p-0">
          <Row kicker="Generator net" title="A truss the solver draws" href="/studio/net">
            One connected truss, bent into a wave, an arch or a swirl. The solver colours every member: blue pulls, red pushes.
          </Row>
          <Row kicker="Generator pts1" title="A field of pins" href="/studio/supports">
            Four hundred pins, each turned to meet its load. The first generator, frozen so its recipes never change.
          </Row>
          <Row kicker="Series 01" title="Arches" status="in the works">
            Numbered sheets from these generators, plotted in ink by our family.
          </Row>
        </ol>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-display text-xl">From the generators</h2>
        <ul className="m-0 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 min-[1000px]:grid-cols-3">
          {pieces.map((p) => (
            <li key={p.recipe}>
              <Link href={p.href} className="group flex flex-col gap-2.5">
                <span className="block overflow-hidden rounded border border-rule transition-colors duration-150 ease-fz group-hover:border-ink">
                  {p.figure}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-display text-lg underline decoration-muted underline-offset-4 group-hover:decoration-ink">
                    {p.name}
                  </span>
                  <span className="font-data text-xs break-all text-muted">{p.recipe}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
