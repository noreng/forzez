"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button, buttonClass, cx } from "@forzez/ui";
import { randomSeed } from "./seed.ts";

/**
 * Settings that live in the address: the recipe is written to `location.hash` on every change and read back on
 * load, so a link opens the same piece. Starts from the default so the server and the first client render agree.
 */
export function useRecipeState<S>(initial: S, toRecipe: (s: S) => string, parse: (text: string) => S | null) {
  const [state, setState] = useState(initial);
  const loaded = useRef(false);
  useEffect(() => {
    const read = () => {
      const parsed = parse(window.location.hash);
      if (parsed) setState(parsed);
    };
    read();
    loaded.current = true;
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [parse]);
  const recipe = toRecipe(state);
  useEffect(() => {
    if (loaded.current) window.history.replaceState(null, "", `#${recipe}`);
  }, [recipe]);
  return [state, setState] as const;
}

/** A labelled group of settings, like a section of a drawing's title block. */
export function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="m-0 flex min-w-0 flex-col gap-1.5 border-0 border-t border-rule p-0 pt-3">
      <legend className="float-left mb-1.5 w-full p-0 font-data text-sm text-muted">{title}</legend>
      {children}
    </fieldset>
  );
}

/** One choice out of a few, as buttons: the chosen one is filled. */
export function Choice<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
          className={buttonClass(o.value === value ? "primary" : "secondary", "sm")}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 font-data text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="size-4 accent-ink" />
      {label}
    </label>
  );
}

/** The seed: any word or a random one. Only a–z and 0–9 count; the rest is dropped from the recipe. */
export function SeedField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <label className="flex min-w-0 flex-1 items-center gap-2.5 font-data text-sm">
        <span className="w-[8.5ch] shrink-0">Seed</span>
        <input
          type="text"
          value={value}
          spellCheck={false}
          autoComplete="off"
          onChange={(e) => onChange(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 24))}
          className="min-w-0 flex-1 rounded border border-rule bg-surface px-2 py-1.5 text-ink focus:border-ink focus:outline-none"
        />
      </label>
      <Button variant="secondary" size="sm" onClick={() => onChange(randomSeed())}>
        New seed
      </Button>
    </div>
  );
}

/** The recipe as text, with a copy button. The same text in the address opens the same piece. */
export function RecipeBox({ recipe }: { recipe: string }) {
  const [copied, setCopied] = useState(false);
  const code = useRef<HTMLElement>(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${recipe}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // clipboard blocked: select the text so it can be copied by hand
      if (code.current) window.getSelection()?.selectAllChildren(code.current);
    }
  };
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-data text-sm text-muted">Recipe</span>
      <div className="flex items-stretch gap-2">
        <code ref={code} className="min-w-0 flex-1 rounded bg-sunken px-2 py-1.5 font-data text-sm break-all text-ink">
          {recipe}
        </code>
        <Button variant="secondary" size="sm" onClick={copy} className={cx("w-[10ch]")}>
          {copied ? "Copied" : "Copy link"}
        </Button>
      </div>
    </div>
  );
}

/** Page frame for a generator: title on top, the plate on the left, the settings on the right. */
export function GeneratorLayout({ head, plate, controls }: { head: ReactNode; plate: ReactNode; controls: ReactNode }) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-5 pt-24 pb-16 sm:px-8 min-[1000px]:pt-28">
      {head}
      <div className="grid grid-cols-1 items-start gap-8 min-[900px]:grid-cols-[minmax(0,1.25fr)_minmax(19rem,1fr)]">
        <div className="min-w-0 min-[900px]:sticky min-[900px]:top-20">{plate}</div>
        <div className="flex min-w-0 flex-col gap-5">{controls}</div>
      </div>
    </main>
  );
}
