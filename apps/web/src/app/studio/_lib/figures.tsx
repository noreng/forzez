import { cx } from "@forzez/ui";
import type { NetModel } from "./net.ts";
import { SUPPORTS_N, type SupportPoint } from "./supports.ts";

// Drawings for the Studio generators: plain SVG from the model, colours from token roles only.
// Sizes are in model units scaled from "pixels at a 600 px plate", so a thumbnail is the same picture smaller.

export type NetStyle = "line" | "plotter";

const mixWithRule = (role: string, share: number) => `color-mix(in srgb, var(--fz-${role}) ${Math.round(share * 100)}%, var(--fz-rule))`;

/** A solved net: members coloured by force (blue pulls, red pushes), width and strength by √(|N| / max). */
export function NetFigure({
  model,
  forces,
  style = "line",
  loads = true,
  supports = true,
  title,
  className,
}: {
  model: NetModel;
  forces: number[];
  style?: NetStyle;
  loads?: boolean;
  supports?: boolean;
  title: string;
  className?: string;
}) {
  const P = model.P;
  const xs = model.nodes.map((g) => P[g].x), ys = model.nodes.map((g) => P[g].y);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const span = Math.max(x1 - x0, y1 - y0) + 3, cx0 = (x0 + x1) / 2, cy0 = (y0 + y1) / 2;
  const px = span / 600;
  const X = (x: number) => +(x - cx0).toFixed(3);
  const Y = (y: number) => +(cy0 - y).toFixed(3);
  const mx = Math.max(1e-9, ...forces.map(Math.abs));
  const order = forces.map((_, k) => k).sort((a, b) => Math.abs(forces[a]) - Math.abs(forces[b]));

  const members = order.map((k) => {
    const [p, q] = model.members[k], A = P[p], B = P[q], N = forces[k], t = Math.sqrt(Math.abs(N) / mx);
    const role = N > 0 ? "tension" : "compression";
    if (style === "line") {
      const stroke = t < 0.08 ? "var(--fz-rule)" : mixWithRule(role, Math.min(1, 0.25 + t));
      return <line key={k} x1={X(A.x)} y1={Y(A.y)} x2={X(B.x)} y2={Y(B.y)} style={{ stroke }} strokeWidth={(0.7 + 4.6 * t) * px} />;
    }
    // plotter: one pen width, one to three parallel passes by force
    const dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
    const pass = t < 0.08 ? 1 : 1 + Math.round(2 * t), gap = 1.7 * px;
    return (
      <g key={k} style={{ stroke: t < 0.08 ? "var(--fz-muted)" : `var(--fz-${role})` }} strokeOpacity={t < 0.08 ? 0.45 : 0.9} strokeWidth={px}>
        {Array.from({ length: pass }, (_, s) => {
          const o = (s - (pass - 1) / 2) * gap;
          return <line key={s} x1={X(A.x + nx * o)} y1={Y(A.y + ny * o)} x2={X(B.x + nx * o)} y2={Y(B.y + ny * o)} />;
        })}
      </g>
    );
  });

  return (
    <svg
      viewBox={`${-span / 2} ${-span / 2} ${span} ${span}`}
      role="img"
      aria-label={title}
      className={cx("block aspect-square w-full bg-surface", className)}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>{title}</title>
      {members}
      {style === "line" ? (
        <g className="fill-ink">
          {model.nodes.map((g) => (
            <circle key={g} cx={X(P[g].x)} cy={Y(P[g].y)} r={1.3 * px} />
          ))}
        </g>
      ) : null}
      {loads ? (
        <g className="fill-muted stroke-muted" strokeWidth={px}>
          {model.loads.map((l) => {
            const m = Math.hypot(l.Fx, l.Fy), dx = l.Fx / m, dy = l.Fy / m, len = 0.85 * m;
            if (len < 0.12) return null;
            const hx = P[l.g].x - dx * 0.07, hy = P[l.g].y - dy * 0.07, s = 0.13;
            const head = [
              [hx, hy],
              [hx - dx * s - dy * s * 0.45, hy - dy * s + dx * s * 0.45],
              [hx - dx * s + dy * s * 0.45, hy - dy * s - dx * s * 0.45],
            ];
            return (
              <g key={l.g}>
                <line x1={X(hx - dx * len)} y1={Y(hy - dy * len)} x2={X(hx)} y2={Y(hy)} />
                <polygon points={head.map(([a, b]) => `${X(a)},${Y(b)}`).join(" ")} />
              </g>
            );
          })}
        </g>
      ) : null}
      {supports ? (
        <g className="fill-none stroke-ink" strokeWidth={1.2 * px}>
          {model.supports.map((s) => {
            const p = P[s.g], a = (s.ang * Math.PI) / 180, dn = [Math.sin(a), -Math.cos(a)], pp = [Math.cos(a), Math.sin(a)], h = 0.42;
            const at = (d: number, w: number) => [X(p.x + dn[0] * d + pp[0] * w), Y(p.y + dn[1] * d + pp[1] * w)];
            const pt = (d: number, w: number) => at(d, w).join(",");
            const bd = s.type === "roller" ? h + 0.12 : h;
            const [b0, b1] = [at(bd, -h * 0.85), at(bd, h * 0.85)];
            return (
              <g key={s.g}>
                <polygon className="fill-surface" points={[pt(0, 0), pt(h, -h * 0.6), pt(h, h * 0.6)].join(" ")} />
                <line x1={b0[0]} y1={b0[1]} x2={b1[0]} y2={b1[1]} />
                {s.type === "pin"
                  ? [-2, -1, 0, 1, 2].map((k) => {
                      const [u, v] = at(bd, k * h * 0.32), [u2, v2] = at(bd + 0.13, k * h * 0.32 - 0.1);
                      return <line key={k} x1={u} y1={v} x2={u2} y2={v2} />;
                    })
                  : [-0.2, 0.2].map((w) => {
                      const [u, v] = at(h + 0.06, w);
                      return <circle key={w} cx={u} cy={v} r={0.055} />;
                    })}
              </g>
            );
          })}
        </g>
      ) : null}
    </svg>
  );
}

/** pts1: one pin per cell, turned to its reaction, with its load arriving from the other side. */
export function SupportsFigure({ points, title, className }: { points: SupportPoint[]; title: string; className?: string }) {
  const N = SUPPORTS_N, gr = 0.13, px = N / 600;
  const r = (v: number) => +v.toFixed(3);
  return (
    <svg
      viewBox={`0 0 ${N} ${N}`}
      role="img"
      aria-label={title}
      className={cx("block aspect-square w-full bg-surface", className)}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>{title}</title>
      {points.map((p, k) => {
        const X = p.x + 0.5, Y = N - 1 - p.y + 0.5, t = (p.ang * Math.PI) / 180, c = Math.cos(t), sn = Math.sin(t);
        const L = (lx: number, ly: number) => `${r(X + lx * c - ly * sn)},${r(Y - (lx * sn + ly * c))}`;
        const m = Math.hypot(p.Fx, p.Fy);
        let arrow = null;
        if (m > 0.02) {
          const l = m * 0.45, ux = p.Fx / m, uy = p.Fy / m, hl = Math.min(4 * px * 1.5, l * 0.4);
          const cy = -uy;
          arrow = (
            <g className="fill-ink stroke-ink" strokeWidth={1.4 * px * 1.5}>
              <line x1={r(X - ux * l)} y1={r(Y + uy * l)} x2={X} y2={Y} />
              <polygon
                strokeWidth={0}
                points={`${X},${Y} ${r(X - ux * hl - cy * hl * 0.5)},${r(Y - cy * hl + ux * hl * 0.5)} ${r(X - ux * hl + cy * hl * 0.5)},${r(Y - cy * hl - ux * hl * 0.5)}`}
              />
            </g>
          );
        }
        return (
          <g key={k}>
            <g className="fill-none stroke-muted" strokeWidth={px * 1.5}>
              <polygon points={[L(0, 0), L(-gr, -gr * 1.5), L(gr, -gr * 1.5)].join(" ")} />
              <polyline points={[L(-gr * 1.4, -gr * 1.5), L(gr * 1.4, -gr * 1.5)].join(" ")} />
            </g>
            {arrow}
            <circle className="fill-ink" cx={X} cy={Y} r={1.2 * px * 1.5} />
          </g>
        );
      })}
    </svg>
  );
}
