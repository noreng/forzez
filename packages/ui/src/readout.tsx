import type { ReactNode } from "react";
import { cx } from "./cx";

/** A small stack of live values, e.g. ΣFx, ΣFy, ΣM in a diagram corner. */
export function Readout({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("font-data text-xs leading-relaxed text-muted tabular-nums", className)}>{children}</div>;
}

/** `label value unit`, value right-aligned so digits line up across rows. */
export function ReadoutRow({ label, value, unit }: { label: ReactNode; value: ReactNode; unit?: ReactNode }) {
  return (
    <div>
      {label} <b className="inline-block min-w-[6ch] text-right font-semibold text-ink">{value}</b>
      {unit ? <> {unit}</> : null}
    </div>
  );
}

const badgeTones = { ok: "bg-ok", bad: "bg-bad", warn: "bg-warn" };

/** Status pill: equilibrium (ok), not in equilibrium (bad), unstable (warn). */
export function Badge({ tone = "ok", children, className }: { tone?: keyof typeof badgeTones; children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "inline-block rounded-sm px-1.5 py-0.5 font-data text-xs leading-none font-semibold text-surface",
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
