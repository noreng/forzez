import { cssVar } from "@forzez/tokens";

export type SymRole = "force-1" | "force-2" | "force-3" | "force-4" | "ink" | "muted" | "tension" | "compression" | "load" | "reaction" | "member";
const colourName: Record<SymRole, string> = {
  "force-1": "red", "force-2": "blue", "force-3": "yellow", "force-4": "teal", ink: "black", muted: "grey",
  tension: "blue", compression: "red", load: "yellow", reaction: "teal", member: "grey",
};

export type SymKind =
  | "bar" // a force
  | "dashed" // a resultant or helper line
  | "square" // the square on a force
  | "rect" // a rectangle (a moment, an area of load)
  | "triangle" // a turning triangle, a load triangle
  | "wedge" // an angle
  | "cone" // a friction cone
  | "arc" // a turning
  | "dot" // a joint, a bead
  | "arrow"; // a force with its direction: use `dir`

type SymProps = {
  /** Colour role. */
  c: SymRole;
  kind?: SymKind;
  /** Lighter fill (painted angles, areas). */
  faint?: boolean;
  /** Bar thickness: hair 1.5 · thin 3 · normal 5 · thick 7. */
  weight?: "hair" | "thin" | "normal" | "thick";
  /** Direction of an `arrow`. */
  dir?: "up" | "down" | "left" | "right";
  /** Number of dots for `dot` (a row of beads). */
  count?: number;
  /** Spoken name; defaults to e.g. "red force". */
  label?: string;
};

const nouns: Record<SymKind, string> = {
  bar: "force", dashed: "line", square: "square", rect: "rectangle", triangle: "triangle", wedge: "angle",
  cone: "cone", arc: "turning", dot: "point", arrow: "force",
};
const strokeW = { hair: 1.5, thin: 3, normal: 5, thick: 7 };
const rot = { right: 0, down: 90, left: 180, up: -90 };

/**
 * Byrne's coloured symbol in running text: a short bar stands in for a force, a square
 * for the square on it, a wedge for an angle, and so on. Sized in em, so it follows the text.
 */
export function Sym({ c, kind = "bar", faint, weight = "normal", dir = "right", count = 1, label }: SymProps) {
  const fill = cssVar(c);
  const op = faint ? 0.6 : 1;
  const name = label ?? `${colourName[c]} ${nouns[kind]}${count > 1 ? `s, ${count}` : ""}${kind === "arrow" ? ` ${dir}` : ""}`;
  const a = { role: "img", "aria-label": name, className: "mx-[0.12em] inline-block" } as const;

  switch (kind) {
    case "square":
      return <svg {...a} viewBox="0 0 18 18" width="0.9em" height="0.9em" style={{ verticalAlign: "-0.08em" }}><rect x="1" y="1" width="16" height="16" fill={fill} fillOpacity={op} /></svg>;
    case "rect":
      return <svg {...a} viewBox="0 0 36 14" width="1.8em" height="0.7em" style={{ verticalAlign: "0.02em" }}><rect width="36" height="14" fill={fill} fillOpacity={op} /></svg>;
    case "triangle":
      return <svg {...a} viewBox="0 0 36 14" width="1.8em" height="0.7em" style={{ verticalAlign: "0.02em" }}><polygon points="0,14 36,14 36,0" fill={fill} fillOpacity={op} /></svg>;
    case "wedge":
      return <svg {...a} viewBox="0 0 26 18" width="1.35em" height="0.9em" style={{ verticalAlign: "-0.08em" }}><path d="M1,17 L25,17 A24 24 0 0 0 21.8,5 Z" fill={fill} fillOpacity={faint ? 0.55 : 1} /></svg>;
    case "cone":
      return <svg {...a} viewBox="0 0 26 18" width="1.35em" height="0.9em" style={{ verticalAlign: "-0.08em" }}><path d="M13,1 L3,17 A19 19 0 0 0 23,17 Z" fill={fill} fillOpacity={op} /></svg>;
    case "arc":
      return <svg {...a} viewBox="0 0 30 20" width="1.5em" height="1em" style={{ verticalAlign: "-0.15em" }}><path d="M3,17 A13 13 0 0 1 25,9" fill="none" stroke={fill} strokeWidth={2.5} /><path d="M25,9 l-6,-1 l3,6 z" fill={fill} /></svg>;
    case "dot": {
      const w = 13 * count + 1;
      return (
        <svg {...a} viewBox={`0 0 ${w} 14`} width={`${(w / 14) * 0.7}em`} height="0.7em" style={{ verticalAlign: "0.02em" }}>
          {Array.from({ length: count }, (_, i) => <circle key={i} cx={7 + 13 * i} cy="7" r="5.5" fill={fill} fillOpacity={op} />)}
        </svg>
      );
    }
    case "arrow":
      return (
        <svg {...a} viewBox="0 0 22 22" width="1.1em" height="1.1em" style={{ verticalAlign: "-0.2em" }}>
          <g transform={`rotate(${rot[dir]} 11 11)`}>
            <line x1="1" y1="11" x2="12" y2="11" stroke={fill} strokeWidth={5} />
            <path d="M10,4 L21,11 L10,18 Z" fill={fill} />
          </g>
        </svg>
      );
    default: {
      const dashed = kind === "dashed";
      return (
        <svg {...a} viewBox="0 0 40 14" width="2.2em" height="0.75em" style={{ verticalAlign: "0.02em" }}>
          <line x1="2" y1="7" x2="38" y2="7" stroke={fill} strokeOpacity={op} strokeWidth={dashed ? 3 : strokeW[weight]} strokeDasharray={dashed ? "6 4" : undefined} />
        </svg>
      );
    }
  }
}
