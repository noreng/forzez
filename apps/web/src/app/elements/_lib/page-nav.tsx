"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Target = { href: string; n: string; short: string } | null;

/**
 * Paging for the Elements: previous · contents · next, pinned to the bottom of the text page
 * so it never needs a scroll. ← and → turn the page too.
 */
export function PageNav({ prev, next }: { prev: Target; next: Target }) {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      const to = e.key === "ArrowLeft" ? prev : e.key === "ArrowRight" ? next : null;
      if (to) router.push(to.href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, router]);

  return (
    <nav
      aria-label="Propositions"
      className="sticky bottom-0 z-10 mt-8 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 border-t border-rule bg-bg py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] font-data text-sm"
    >
      {/* two lines on purpose: arrow and number, then the full title (hidden on phones) */}
      {prev ? (
        <Link href={prev.href} className="group flex min-w-0 flex-col items-start justify-self-start" aria-keyshortcuts="ArrowLeft">
          <span className="whitespace-nowrap group-hover:underline">← {prev.n}</span>
          <span className="hidden font-text text-sm leading-snug text-muted italic group-hover:text-ink sm:block">{prev.short}</span>
        </Link>
      ) : <span />}
      <Link href="/elements" className="text-muted hover:text-ink">Contents</Link>
      {next ? (
        <Link href={next.href} className="group flex min-w-0 flex-col items-end justify-self-end text-right" aria-keyshortcuts="ArrowRight">
          <span className="whitespace-nowrap group-hover:underline">{next.n} →</span>
          <span className="hidden font-text text-sm leading-snug text-muted italic group-hover:text-ink sm:block">{next.short}</span>
        </Link>
      ) : <span />}
    </nav>
  );
}
