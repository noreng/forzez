import { cssVar } from "@forzez/tokens";

/** Dot grid behind a diagram. Put it first inside the <svg>. */
export function DotGrid({ id = "fz-dots", size = 20, r = 0.9, extent = 1200 }: { id?: string; size?: number; r?: number; extent?: number }) {
  return (
    <>
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse" x={-size / 2} y={-size / 2}>
          <circle cx={size / 2} cy={size / 2} r={r} fill={cssVar("grid")} />
        </pattern>
      </defs>
      <rect x={-extent / 2} y={-extent / 2} width={extent} height={extent} fill={`url(#${id})`} />
    </>
  );
}
