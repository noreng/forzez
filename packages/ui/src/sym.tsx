import { cssVar } from "@forzez/tokens";

type SymRole = "force-1" | "force-2" | "force-3" | "force-4" | "ink";
const colourName: Record<SymRole, string> = {
  "force-1": "red", "force-2": "blue", "force-3": "yellow", "force-4": "teal", ink: "black",
};

type SymProps = {
  /** Colour role of the force, square or angle. */
  c: SymRole;
  /**
   * bar: a force · dashed: a resultant or helper line · square: the square on a force ·
   * wedge: an angle
   */
  kind?: "bar" | "dashed" | "square" | "wedge";
  /** Lighter fill, for painted angles. */
  faint?: boolean;
  /** Spoken name; defaults to e.g. "red force". */
  label?: string;
};

/**
 * Byrne's coloured symbol in running text: a short bar stands in for a force, a square
 * for the square on it, a wedge for an angle. Sized in em, so it follows the text.
 */
export function Sym({ c, kind = "bar", faint, label }: SymProps) {
  const fill = cssVar(c);
  const name = label ?? `${colourName[c]} ${kind === "bar" ? "force" : kind === "dashed" ? "line" : kind === "square" ? "square" : "angle"}`;
  const common = { role: "img", "aria-label": name, className: "inline-block align-[-0.08em] mx-[0.12em]" } as const;

  if (kind === "square")
    return (
      <svg {...common} viewBox="0 0 18 18" width="0.9em" height="0.9em">
        <rect x="1" y="1" width="16" height="16" fill={fill} />
      </svg>
    );
  if (kind === "wedge")
    return (
      <svg {...common} viewBox="0 0 26 18" width="1.35em" height="0.9em">
        <path d="M1,17 L25,17 A24 24 0 0 0 21.8,5 Z" fill={fill} fillOpacity={faint ? 0.55 : 1} />
      </svg>
    );
  return (
    <svg {...common} viewBox="0 0 40 14" width="2.2em" height="0.75em" className="mx-[0.12em] inline-block align-[0.02em]">
      <line x1="2" y1="7" x2="38" y2="7" stroke={fill} strokeWidth={kind === "dashed" ? 3 : 5} strokeDasharray={kind === "dashed" ? "6 4" : undefined} />
    </svg>
  );
}
