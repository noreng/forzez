import type { Metadata } from "next";
import { fontWeight, radius, stroke, text, theme, type ColorRole } from "@forzez/tokens";

export const metadata: Metadata = { title: "Design system" };

const groups: { title: string; roles: [ColorRole, string][] }[] = [
  {
    title: "Surfaces and text",
    roles: [
      ["bg", "Page background (Byrne's paper)"],
      ["surface", "Panels, diagram stage, cards"],
      ["sunken", "Inline code, wells, inactive tracks"],
      ["ink", "Body text, primary buttons, outlines"],
      ["muted", "Secondary text, captions, axis labels"],
      ["rule", "Hairlines and dividers"],
      ["rule-strong", "Running-head rule, table totals"],
      ["grid", "Dot grid behind diagrams"],
    ],
  },
  {
    title: "Interaction and status",
    roles: [
      ["accent", "Links, selected state, focus ring"],
      ["on-accent", "Text on accent fills"],
      ["ok", "Equilibrium, success"],
      ["bad", "Not in equilibrium, errors"],
      ["warn", "Warnings, unstable"],
    ],
  },
  {
    title: "Forces, in order of appearance",
    roles: [
      ["force-1", "First force (Byrne red)"],
      ["force-2", "Second force (Byrne blue)"],
      ["force-3", "Third force: strokes and fills (Byrne yellow)"],
      ["force-3-text", "Third force: text, readable on paper"],
      ["force-4", "Fourth force"],
      ["resultant", "Resultant R, dashed"],
    ],
  },
  {
    title: "Statics meaning",
    roles: [
      ["tension", "Member in tension (pulls)"],
      ["compression", "Member in compression (pushes)"],
      ["load", "Applied load"],
      ["reaction", "Support reaction"],
      ["member", "Unloaded or neutral member"],
    ],
  },
];

function Swatch({ role, mode }: { role: ColorRole; mode: "light" | "dark" }) {
  return (
    <div data-theme={mode} className="flex items-center gap-2 bg-bg px-2 py-1.5 font-data text-xs text-muted">
      <span
        className="size-7 shrink-0 rounded-sm border border-rule"
        style={{ background: `var(--fz-${role})` }}
      />
      <span className="tabular-nums">{theme[mode][role]}</span>
    </div>
  );
}

function Arrow({ y, w, cls, label }: { y: number; w: string; cls: string; label: string }) {
  const sw = Number(w);
  const h = 4 + sw * 2.6;
  return (
    <g className={cls}>
      <line x1={20} y1={y} x2={300 - h} y2={y} strokeWidth={sw} stroke="currentColor" />
      <path d={`M300,${y}L${300 - h},${y - h / 2}L${300 - h},${y + h / 2}Z`} fill="currentColor" />
      <text x={316} y={y + 4} className="fill-muted font-data" fontSize={11}>
        {label}
      </text>
    </g>
  );
}

export default function DesignPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-4 pb-24 sm:px-8">
      <div className="flex justify-between border-b border-rule-strong pt-4 pb-2.5 font-data text-xs uppercase tracking-[0.16em] text-muted">
        <span>forzez</span>
        <span>Design system</span>
      </div>

      <header className="flex flex-col gap-3">
        <p className="font-data text-xs uppercase tracking-[0.16em] text-muted">Tokens · Euclid × Erők</p>
        <h1 className="font-display text-4xl leading-none">
          <span className="mr-3 text-force-1">I.</span>Tokens
        </h1>
        <p className="max-w-2xl text-md text-muted italic">
          Colours in place of letters. Every colour, typeface and stroke on forzez comes from
          <code className="mx-1 rounded-sm bg-sunken px-1 font-data text-sm not-italic">@forzez/tokens</code>
          and is used through its role, never as a raw value.
        </p>
      </header>

      {groups.map((g) => (
        <section key={g.title} className="flex flex-col gap-3">
          <h2 className="font-display text-xl">{g.title}</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-rule text-left font-data text-xs text-muted">
                  <th className="py-2 pr-4 font-normal">Role</th>
                  <th className="py-2 pr-4 font-normal">Light</th>
                  <th className="py-2 pr-4 font-normal">Dark</th>
                  <th className="py-2 font-normal">Use for</th>
                </tr>
              </thead>
              <tbody>
                {g.roles.map(([role, use]) => (
                  <tr key={role} className="border-b border-rule">
                    <td className="py-2 pr-4 font-data text-xs whitespace-nowrap">--fz-{role}</td>
                    <td className="py-2 pr-4"><Swatch role={role} mode="light" /></td>
                    <td className="py-2 pr-4"><Swatch role={role} mode="dark" /></td>
                    <td className="py-2">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl">Typefaces</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col gap-2 border-t border-rule-strong pt-3">
            <span className="font-data text-xs text-muted">font-display · IBM Plex Sans Condensed {fontWeight["font-display-weight"]}</span>
            <span className="font-display text-3xl leading-none">Egyensúly</span>
            <span className="text-sm text-muted">Titles, section headings, chapter numerals. One weight.</span>
          </div>
          <div className="flex flex-col gap-2 border-t border-rule-strong pt-3">
            <span className="font-data text-xs text-muted">font-text · IBM Plex Serif</span>
            <span className="text-lg">Két erő akkor tart <em>egyensúlyt</em>, ha egyenlő nagyok.</span>
            <span className="text-sm text-muted">Reading text, ledes (italic), captions.</span>
          </div>
          <div className="flex flex-col gap-2 border-t border-rule-strong pt-3">
            <span className="font-data text-xs text-muted">font-data · IBM Plex Mono</span>
            <span className="font-data text-md tabular-nums">ΣFx = −0,00 kN</span>
            <span className="text-sm text-muted">Numbers, units, controls, labels.</span>
          </div>
        </div>
        <div className="mt-2 flex flex-col">
          {Object.entries(text).reverse().map(([k, v]) => (
            <div key={k} className="grid grid-cols-[15ch_1fr] items-baseline gap-4 border-b border-rule py-1.5">
              <span className="font-data text-xs text-muted">{k.replace("text-", "")} · {v}</span>
              <span className={k >= "text-xl" ? "font-display leading-tight" : ""} style={{ fontSize: `var(--fz-${k})` }}>
                Erők egyensúlya
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl">Strokes</h2>
        <div className="overflow-x-auto rounded border border-rule bg-surface">
          <svg viewBox="0 0 440 150" className="block w-full min-w-[440px]" role="img" aria-label="Stroke widths for forces, resultant and members">
            <line x1={20} y1={30} x2={300} y2={30} stroke="var(--fz-member)" strokeWidth={stroke["stroke-member"]} strokeLinecap="round" />
            <text x={316} y={34} className="fill-muted font-data" fontSize={11}>member · {stroke["stroke-member"]}</text>
            <Arrow y={65} w={stroke["stroke-force"]} cls="text-force-1" label={`force · ${stroke["stroke-force"]}`} />
            <Arrow y={95} w={stroke["stroke-force"]} cls="text-tension" label="tension" />
            <g className="text-resultant">
              <line x1={20} y1={125} x2={290} y2={125} strokeWidth={stroke["stroke-resultant"]} stroke="currentColor" strokeDasharray="6 4" />
              <path d="M300,125L289,120L289,130Z" fill="currentColor" />
            </g>
            <text x={316} y={129} className="fill-muted font-data" fontSize={11}>resultant · {stroke["stroke-resultant"]}</text>
          </svg>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-xl">Radius</h2>
        <div className="flex flex-wrap gap-6 font-data text-xs text-muted">
          {Object.entries(radius).map(([k, v]) => (
            <div key={k} className="flex items-center gap-3">
              <span className="size-12 border border-rule-strong bg-surface" style={{ borderRadius: v }} />
              {k} · {v}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
