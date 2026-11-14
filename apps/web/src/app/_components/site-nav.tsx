"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark, cx } from "@forzez/ui";

// The menu grows by stage (docs/notes/forzez-sitemap.md): a section appears once it has something in it.
const SECTIONS = [
  { href: "/elements", label: "Elements" },
  { href: "/articles", label: "Articles" },
];

/** The way around from every page: home mark plus the sections, fixed top left (the theme switch is top right). */
export function SiteNav({ className }: { className?: string }) {
  const path = usePathname();
  const item = "inline-flex h-full items-center px-2.5 transition-colors duration-150 ease-fz hover:bg-sunken";
  return (
    <nav
      aria-label="Site"
      className={cx("inline-flex h-9 items-stretch divide-x divide-rule overflow-hidden rounded border border-rule bg-surface text-ink", className)}
    >
      <Link href="/" aria-label="forzez home" className={cx(item, "gap-1.5 pl-2 font-display text-base leading-none")}>
        <LogoMark size={18} />
        <span className="max-[359px]:sr-only">forzez</span>
      </Link>
      {SECTIONS.map((s) => {
        const here = path === s.href || path.startsWith(`${s.href}/`);
        return (
          <Link
            key={s.href}
            href={s.href}
            aria-current={here ? "page" : undefined}
            className={cx(item, "text-sm", here && "bg-sunken underline decoration-muted underline-offset-4")}
          >
            {s.label}
          </Link>
        );
      })}
    </nav>
  );
}
