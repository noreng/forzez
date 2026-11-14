"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Badge, Readout, ReadoutRow, Slider } from "@forzez/ui";
import { Check, Choice, GeneratorLayout, Group, RecipeBox, SeedField, useRecipeState } from "../_lib/controls";
import { NetFigure, type NetStyle } from "../_lib/figures";
import { NET_DEFAULT, generate, netRecipe, netStats, parseNetRecipe, solve, type NetState } from "../_lib/net.ts";

const recipeOf = (s: NetState) => netRecipe({ ...s, seed: s.seed || "truzme" });

const FORMS = [
  { value: 0 as const, label: "Wave" },
  { value: 1 as const, label: "Arch" },
  { value: 2 as const, label: "Swirl" },
];

export function NetGenerator({ head }: { head: React.ReactNode }) {
  const [st, setSt] = useRecipeState<NetState>(NET_DEFAULT, recipeOf, parseNetRecipe);
  const [style, setStyle] = useState<NetStyle>("line");
  const [showLoads, setShowLoads] = useState(true);
  const [showSupports, setShowSupports] = useState(true);
  const set = <K extends keyof NetState>(k: K) => (v: NetState[K]) => setSt((s) => ({ ...s, [k]: v }));

  // the solve takes up to ~100 ms on big nets: let the sliders run ahead of it
  const deferred = useDeferredValue(st);
  const solved = useMemo(() => {
    const model = generate({ ...deferred, seed: deferred.seed || "truzme" });
    const forces = model ? solve(model) : null;
    return { model, forces, stats: model && forces ? netStats(model, forces) : null };
  }, [deferred]);
  const recipe = recipeOf(st);
  const kN = (v: number) => v.toFixed(3);

  const plate = (
    <figure className="m-0 flex flex-col gap-3">
      <div className="overflow-hidden rounded border border-rule">
        {solved.model && solved.forces ? (
          <NetFigure
            model={solved.model}
            forces={solved.forces}
            style={style}
            loads={showLoads}
            supports={showSupports}
            title={`Truss ${recipe}: blue members pull, red members push`}
          />
        ) : (
          <div className="flex aspect-square items-center justify-center bg-surface">
            <Badge tone="warn">unstable: try another seed</Badge>
          </div>
        )}
      </div>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <span className="text-sm text-muted italic">Blue pulls, red pushes. The thicker the line, the larger the force.</span>
        {solved.stats ? (
          <Readout className="grid grid-cols-2 gap-x-6">
            <ReadoutRow label="nodes" value={solved.stats.nodes} />
            <ReadoutRow label="members" value={solved.stats.members} />
            <ReadoutRow label="reactions" value={solved.stats.reactions} />
            <ReadoutRow label="indeterminacy" value={solved.stats.indeterminacy} />
            <ReadoutRow label="pull / push" value={`${solved.stats.tension} / ${solved.stats.compression}`} />
            <ReadoutRow label="max |N|" value={kN(solved.stats.max)} unit="kN" />
            <ReadoutRow label="worst ΣF" value={kN(solved.stats.residual)} unit="kN" />
          </Readout>
        ) : null}
      </figcaption>
    </figure>
  );

  const controls = (
    <>
      <SeedField value={st.seed} onChange={set("seed")} />
      <Group title="Shape">
        <Choice
          label="Generator"
          value={st.gen}
          onChange={set("gen")}
          options={[
            { value: 2, label: "Bands · net2" },
            { value: 1, label: "Grid · net1" },
          ]}
        />
        {st.gen === 2 ? (
          <>
            <Choice label="Form" value={st.m} onChange={set("m")} options={FORMS} />
            <Slider label="Curve" value={st.a} min={0} max={10} onChange={set("a")} />
            <Slider label="Rows" value={st.d} min={2} max={10} onChange={set("d")} />
          </>
        ) : null}
        <Slider label="Fill" value={st.f} min={50} max={100} step={5} onChange={set("f")} format={(v) => `${v}%`} />
        <Slider label="Jitter" value={st.w} min={0} max={10} onChange={set("w")} />
      </Group>
      <Group title="Loads">
        <Slider label="Field" value={st.c} min={1} max={6} onChange={set("c")} format={(v) => `${v} of 6`} />
        <Slider label="Loaded" value={st.l} min={10} max={100} step={10} onChange={set("l")} format={(v) => `${v}%`} />
        {st.gen === 2 ? <Slider label="Gravity" value={st.g} min={0} max={10} onChange={set("g")} format={(v) => `${v * 10}%`} /> : null}
      </Group>
      <Group title="Supports">
        <Slider label="Count" value={st.s} min={2} max={6} onChange={set("s")} />
        <Check label="Tilted rollers" checked={st.ra} onChange={set("ra")} />
      </Group>
      <Group title="Drawing (not in the recipe)">
        <Choice
          label="Drawing style"
          value={style}
          onChange={setStyle}
          options={[
            { value: "line", label: "Line" },
            { value: "plotter", label: "Plotter" },
          ]}
        />
        <div className="flex flex-wrap gap-x-6 gap-y-1.5">
          <Check label="Loads" checked={showLoads} onChange={setShowLoads} />
          <Check label="Supports" checked={showSupports} onChange={setShowSupports} />
        </div>
      </Group>
      <RecipeBox recipe={recipe} />
    </>
  );

  return <GeneratorLayout head={head} plate={plate} controls={controls} />;
}
