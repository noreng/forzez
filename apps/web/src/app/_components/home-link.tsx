import Link from "next/link";
import { LogoMark, cx } from "@forzez/ui";

/** Way home from every page: the mark and the wordmark, fixed top left (the theme switch is top right). */
export function HomeLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="forzez home"
      className={cx(
        "inline-flex h-9 items-center gap-1.5 rounded border border-rule bg-surface pr-2.5 pl-2 font-display text-base leading-none text-ink transition-colors duration-150 ease-fz hover:border-ink",
        className,
      )}
    >
      <LogoMark size={18} />
      forzez
    </Link>
  );
}
