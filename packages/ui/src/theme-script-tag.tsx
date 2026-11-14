"use client";

import { themeScript } from "./theme-script";

/**
 * Put in the root layout's <head>. Runs during HTML parsing on the initial load, so a saved
 * theme applies before first paint. On the client it renders as text/plain: React would warn
 * about (and never run) a script it renders itself; data-theme on <html> survives navigations.
 */
export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
}
