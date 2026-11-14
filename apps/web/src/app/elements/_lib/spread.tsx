import type { ReactNode } from "react";
import { cx } from "@forzez/ui";

/** Running head: small italic line at the top of a page. */
export function RunHead({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx("text-sm text-muted italic", className)}>{children}</p>;
}

/**
 * Layout B, "the spread": two facing pages. Wide screens: text and proof on the left page,
 * the figure alone on the right (it stays in view while the text scrolls). Narrow screens fold
 * into layout A: the figure first, the text under it.
 */
export function Spread({
  left, right, headLeft, headRight,
}: { left: ReactNode; right: ReactNode; headLeft: ReactNode; headRight: ReactNode }) {
  return (
    <main className="grid flex-1 min-[1000px]:grid-cols-2">
      <section className="order-2 flex min-w-0 flex-col px-5 pt-6 pb-12 min-[1000px]:order-1 min-[1000px]:min-h-svh min-[1000px]:pt-16 min-[1000px]:pr-[clamp(32px,4vw,72px)] min-[1000px]:pl-[clamp(32px,8vw,140px)]">
        <RunHead className="hidden min-[1000px]:block">{headLeft}</RunHead>
        <div className="flex max-w-[34rem] flex-1 flex-col">{left}</div>
      </section>
      <section className="order-1 min-w-0 border-rule px-5 pt-5 min-[1000px]:order-2 min-[1000px]:pt-0 min-[1000px]:border-l min-[1000px]:pr-[clamp(32px,8vw,140px)] min-[1000px]:pl-[clamp(32px,4vw,72px)]">
        <div className="flex flex-col min-[1000px]:sticky min-[1000px]:top-0 min-[1000px]:h-svh min-[1000px]:pt-16 min-[1000px]:pb-12">
          <RunHead className="pr-12 min-[1000px]:text-right">{headRight}</RunHead>
          <div className="flex flex-1 flex-col justify-center py-6">{right}</div>
        </div>
      </section>
    </main>
  );
}
