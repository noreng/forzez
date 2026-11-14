import type { ReactNode } from "react";
import { cx } from "./cx";
import { toneColor, toneText, type Tone } from "./tone";

/**
 * A force named in running text, Byrne-style: a short colour bar plus its label.
 * Never use the colour alone; the label keeps it readable without colour.
 */
export function ForceRef({ tone, children }: { tone: Exclude<Tone, "ink">; children: ReactNode }) {
  return (
    <b className="font-semibold whitespace-nowrap" style={{ color: toneText(tone) }}>
      <span
        aria-hidden
        className="mr-[0.18em] inline-block h-[0.2em] w-[0.85em] rounded-[1px] align-[0.24em]"
        style={{ background: toneColor(tone) }}
      />
      {children}
    </b>
  );
}

/** A number computed live from the diagram, inline in the text. */
export function Live({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm bg-sunken px-[0.35em] py-[0.05em] font-data text-[0.82em] whitespace-nowrap tabular-nums">
      {children}
    </span>
  );
}

/** Small label above a title or section. Sentence case, never uppercase. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("font-data text-sm text-muted", className)}>{children}</div>;
}

/** Side note: a rule, a definition, an instruction for the reader. */
export function Hint({ children }: { children: ReactNode }) {
  return <p className="border-l-2 border-rule pl-3 font-data text-sm text-muted">{children}</p>;
}
