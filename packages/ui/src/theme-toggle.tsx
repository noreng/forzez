"use client";

import { useSyncExternalStore } from "react";
import { cx } from "./cx";
import { THEME_KEY } from "./theme-script";

type Theme = "light" | "dark";
const DARK_MQ = "(prefers-color-scheme: dark)";

function current(): Theme {
  const t = document.documentElement.getAttribute("data-theme");
  if (t === "light" || t === "dark") return t;
  return matchMedia(DARK_MQ).matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const mq = matchMedia(DARK_MQ);
  mq.addEventListener("change", onChange);
  return () => {
    mo.disconnect();
    mq.removeEventListener("change", onChange);
  };
}

function setTheme(next: Theme) {
  const system: Theme = matchMedia(DARK_MQ).matches ? "dark" : "light";
  try {
    // choosing the system's theme again means "follow the system" from now on
    if (next === system) localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, next);
  } catch {}
  if (next === system) document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", next);
}

/**
 * Light/dark switch: a moon in light mode, a sun in dark mode.
 * Pair with `themeScript` in the root layout's <head>.
 */
export function ThemeToggle({ className }: { className?: string }) {
  // null on the server and during hydration; the icons themselves switch in CSS, so nothing flashes
  const theme = useSyncExternalStore<Theme | null>(subscribe, current, () => null);
  const label = theme === "dark" ? "Switch to light theme" : theme === "light" ? "Switch to dark theme" : "Switch theme";
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(current() === "dark" ? "light" : "dark")}
      className={cx(
        "inline-flex size-9 cursor-pointer items-center justify-center rounded border border-rule bg-surface text-ink transition-colors duration-150 ease-fz hover:border-ink",
        className,
      )}
    >
      {/* moon: shown in light mode */}
      <svg viewBox="0 0 24 24" className="size-[18px] dark:hidden" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
      {/* sun: shown in dark mode */}
      <svg viewBox="0 0 24 24" className="hidden size-[18px] dark:block" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
      </svg>
    </button>
  );
}
