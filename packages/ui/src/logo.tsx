import { cssVar } from "@forzez/tokens";

/**
 * The forzez mark: three forces in balance, drawn tip to tail, closing a triangle
 * (Elements, Book I, Prop. I). Red, blue, yellow.
 */
export function LogoMark({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden className={className}>
      <g strokeWidth={2.8} strokeLinecap="round" fill="none">
        <line x1="4" y1="19" x2="12" y2="5" stroke={cssVar("force-1")} />
        <line x1="12" y1="5" x2="20" y2="19" stroke={cssVar("force-2")} />
        <line x1="20" y1="19" x2="4" y2="19" stroke={cssVar("force-3")} />
      </g>
    </svg>
  );
}
