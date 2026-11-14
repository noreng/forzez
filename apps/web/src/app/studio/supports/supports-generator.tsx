"use client";

import { useMemo } from "react";
import { Readout, ReadoutRow, Slider } from "@forzez/ui";
import { Check, GeneratorLayout, Group, RecipeBox, SeedField, useRecipeState } from "../_lib/controls";
import { SupportsFigure } from "../_lib/figures";
import { SUPPORTS_DEFAULT, parseSupportsRecipe, supportsGen, supportsRecipe, type SupportsState } from "../_lib/supports.ts";

// the seed is cleaned before it is hashed, so the picture always matches its recipe
const withSeed = (s: SupportsState) => ({ ...s, seed: s.seed || "truzme" });
const recipeOf = (s: SupportsState) => supportsRecipe(withSeed(s));

export function SupportsGenerator({ head }: { head: React.ReactNode }) {
  const [st, setSt] = useRecipeState<SupportsState>(SUPPORTS_DEFAULT, recipeOf, parseSupportsRecipe);
  const set = <K extends keyof SupportsState>(k: K) => (v: SupportsState[K]) => setSt((s) => ({ ...s, [k]: v }));
  const points = useMemo(() => supportsGen(withSeed(st)), [st]);
  const recipe = recipeOf(st);
  const loaded = points.filter((p) => p.Fx || p.Fy).length;

  const plate = (
    <figure className="m-0 flex flex-col gap-3">
      <div className="overflow-hidden rounded border border-rule">
        <SupportsFigure points={points} title={`Seeded supports ${recipe}: ${points.length} pins on a 20 by 20 grid`} />
      </div>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <span className="text-sm text-muted italic">Each pin carries one load. Its reaction is the same force, reversed.</span>
        <Readout className="grid grid-cols-2 gap-x-6">
          <ReadoutRow label="pins" value={points.length} />
          <ReadoutRow label="loaded" value={loaded} />
          <ReadoutRow label="grid" value="1.0" unit="m" />
          <ReadoutRow label="max load" value="1.000" unit="kN" />
        </Readout>
      </figcaption>
    </figure>
  );

  const controls = (
    <>
      <SeedField value={st.seed} onChange={set("seed")} />
      <Group title="Field">
        <Slider label="Parts" value={st.c} min={1} max={6} onChange={set("c")} format={(v) => `${v} of 6`} />
        <Slider label="Noise" value={st.j} min={0} max={10} onChange={set("j")} />
        <Slider label="Fill" value={st.f} min={30} max={100} step={5} onChange={set("f")} format={(v) => `${v}%`} />
      </Group>
      <Group title="Supports">
        <Check label="Turn each pin to its reaction" checked={st.ra} onChange={set("ra")} />
      </Group>
      <RecipeBox recipe={recipe} />
    </>
  );

  return <GeneratorLayout head={head} plate={plate} controls={controls} />;
}
