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

/**
 * Class for a link in text: ink with an underline that is always visible.
 * Grey never means "link", and links never rely on hover alone.
 */
export const linkClass = "text-ink underline decoration-muted underline-offset-3 transition-colors duration-150 ease-fz hover:decoration-ink";

/** Something that is not there yet ("in the works"): said in words, with a dashed outline, never by greying the title. */
export function Pending({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cx("inline-block rounded-sm border border-dashed border-rule-strong px-1.5 py-1 font-data text-xs leading-none whitespace-nowrap text-muted", className)}>
      {children}
    </span>
  );
}
