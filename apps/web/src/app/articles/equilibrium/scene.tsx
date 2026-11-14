"use client";

import { cssVar, stroke } from "@forzez/tokens";
import { DotGrid, ForceArrow } from "@forzez/ui";
import { FORCES, PX_PER_KN, SUB, TONE, fmt, type Frame } from "./model";

const role = (f: (typeof FORCES)[number]) => `force-${TONE[f]}`;
const labelRole = (f: (typeof FORCES)[number]) => (TONE[f] === 3 ? "force-3-text" : role(f));
const HAIR = Number(stroke["stroke-hair"]);

/** Draws one frame. Model y is up; every y is negated on the way to SVG. */
export function SceneSvg({ frame, now, reduceMotion }: { frame: Frame; now: number; reduceMotion: boolean }) {
  const { V, chain, fs, Rx, Ry, R, M, verts, ox, oy } = frame;
  const bodyR = V("bodyR"), bodyOp = V("bodyOp");
  const lines = V("lines") * (1 - chain), mem = V("members"), cmp = Math.max(0, V("comps")) * (1 - chain);

  // F1 angle arc
  const arcA = V("arc") * fs[0].op;
  const a1 = Math.atan2(fs[0].uy, fs[0].ux), aEnd = a1 < 0 ? a1 + 2 * Math.PI : a1, rA = 26;

  // ghost: where the body is heading (translation from ΣF, rotation from ΣM)
  const gW = V("ghost") * (1 - chain) * bodyOp;
  const moving = R > 0.05 || Math.abs(M) > 0.05;
  let ghost: { op: number; tf: string } | null = null;
  if (gW > 0.01 && moving && !reduceMotion) {
    const ph = (now / 1700) % 1, e = ph * ph;
    const tr = R > 0.05 ? 70 * Math.min(1, 0.35 + R / 8) * e : 0;
    const rot = Math.abs(M) > 0.05 ? -Math.sign(M) * 80 * Math.min(1, 0.3 + Math.abs(M) / 6) * e : 0;
    ghost = { op: gW * 0.9 * (1 - ph), tf: `translate(${(Rx / R) * tr || 0},${-((Ry / R) * tr) || 0}) rotate(${rot})` };
  }

  const rAlpha = V("resOp") * Math.min(1, Math.max(0, (R - 0.05) / 0.8));
  const muted = cssVar("muted"), ink = cssVar("ink");

  return (
    <svg
      viewBox="-185 -125 370 250"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Forces acting on a body"
      className="absolute inset-0 block size-full overflow-visible"
    >
      <DotGrid />

      <g opacity={V("axes")} stroke={muted} strokeWidth={0.8}>
        <line x1={-175} y1={0} x2={175} y2={0} />
        <line x1={0} y1={115} x2={0} y2={-115} />
        <text x={172} y={-5} textAnchor="end" stroke="none" fill={muted} fontSize={11} className="font-data italic">x</text>
        <text x={6} y={-106} stroke="none" fill={muted} fontSize={11} className="font-data italic">y</text>
      </g>

      {/* members (joint step) */}
      {fs.map((q) => (
        <line key={`m${q.f}`} x1={0} y1={0} x2={q.ux * 200} y2={-q.uy * 200} opacity={mem * q.op}
          stroke={cssVar("member")} strokeWidth={Number(stroke["stroke-member"])} strokeLinecap="round" />
      ))}

      {/* lines of action */}
      {fs.map((q) => (
        <line key={`l${q.f}`} opacity={Math.max(0, lines * q.op * 0.8)}
          x1={q.px - q.ux * 400} y1={-(q.py - q.uy * 400)} x2={q.px + q.ux * 400} y2={-(q.py + q.uy * 400)}
          stroke={cssVar(role(q.f))} strokeWidth={HAIR} strokeDasharray="3 5" />
      ))}

      {/* force polygon fill */}
      <polygon points={verts.map((v) => `${v[0] + ox},${-(v[1] + oy)}`).join(" ")} fill={ink} opacity={Math.max(0, V("polyFill") * chain * 0.09)} />

      {/* ghost */}
      {ghost ? (
        <g opacity={ghost.op} transform={ghost.tf} fill="none" stroke={muted} strokeWidth={1.2} strokeDasharray="3 3">
          <circle cx={0} cy={0} r={bodyR} />
          <line x1={0} y1={-bodyR * 0.45} x2={0} y2={-bodyR * 0.82} />
        </g>
      ) : null}

      {/* body */}
      <g opacity={bodyOp}>
        <circle cx={0} cy={0} r={bodyR} fill={cssVar("body")} />
        <line x1={0} y1={-bodyR * 0.45} x2={0} y2={-bodyR * 0.82} stroke={ink} strokeWidth={1.6} strokeLinecap="round" />
        <circle cx={0} cy={0} r={3} fill={cssVar("surface")} stroke={ink} strokeWidth={1.2} />
      </g>

      {/* components: projections onto x and y from each force's tail */}
      {fs.map((q, i) => {
        const tx = q.px * (1 - chain) + (ox + verts[i][0]) * chain;
        const ty = q.py * (1 - chain) + (oy + verts[i][1]) * chain;
        const ex = tx + q.fx * PX_PER_KN, ey = ty + q.fy * PX_PER_KN;
        const ca = cmp * Math.min(1, q.op * 1.6);
        if (ca < 0.01) return null;
        const c = cssVar(role(q.f));
        return (
          <g key={`c${q.f}`} opacity={0.75}>
            <ForceArrow x1={tx} y1={-ty} x2={ex} y2={-ty} role={role(q.f)} labelRole={labelRole(q.f)} width={1.6} head={9} opacity={ca}
              label={Math.abs(q.fx) > 0.6 ? fmt(q.fx) : ""} labelSize={9.5} />
            <ForceArrow x1={tx} y1={-ty} x2={tx} y2={-ey} role={role(q.f)} labelRole={labelRole(q.f)} width={1.6} head={9} opacity={ca}
              label={Math.abs(q.fy) > 0.6 ? fmt(q.fy) : ""} labelSize={9.5} />
            <line x1={ex} y1={-ty} x2={ex} y2={-ey} stroke={c} strokeWidth={0.8} strokeDasharray="2 3" opacity={ca * 0.7} />
            <line x1={tx} y1={-ey} x2={ex} y2={-ey} stroke={c} strokeWidth={0.8} strokeDasharray="2 3" opacity={ca * 0.7} />
          </g>
        );
      })}

      <path opacity={arcA} fill="none" stroke={cssVar("force-1")} strokeWidth={HAIR}
        d={`M${rA},0 A${rA},${rA} 0 ${aEnd > Math.PI ? 1 : 0} 0 ${rA * Math.cos(aEnd)},${-rA * Math.sin(aEnd)}`} />
      <text opacity={arcA} x={(rA + 10) * Math.cos(aEnd / 2)} y={-(rA + 10) * Math.sin(aEnd / 2) + 4} fill={muted} fontSize={11} className="font-data italic">α</text>

      {/* forces */}
      {fs.map((q, i) => {
        const tx = q.px * (1 - chain) + (ox + verts[i][0]) * chain;
        const ty = q.py * (1 - chain) + (oy + verts[i][1]) * chain;
        return (
          <ForceArrow key={`f${q.f}`} x1={tx} y1={-ty} x2={tx + q.fx * PX_PER_KN} y2={-(ty + q.fy * PX_PER_KN)}
            role={role(q.f)} labelRole={labelRole(q.f)} opacity={Math.min(1, q.op * 1.6)}
            label={`F${SUB[q.f]} ${fmt(q.m * q.op)} kN`} />
        );
      })}

      <circle cx={ox} cy={-oy} r={2.5} fill={ink} opacity={chain * Math.min(1, fs[0].op)} />

      <ForceArrow x1={ox} y1={-oy} x2={ox + Rx * PX_PER_KN} y2={-(oy + Ry * PX_PER_KN)} role="resultant"
        width={Number(stroke["stroke-resultant"])} dashed opacity={rAlpha} label={`R ${fmt(R)}`} />
    </svg>
  );
}
