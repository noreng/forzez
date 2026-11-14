import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Condensed, IBM_Plex_Serif } from "next/font/google";
import { ThemeScript, ThemeToggle } from "@forzez/ui";
import { SiteNav } from "./_components/site-nav";
import "./globals.css";

// Font variables feed the --fz-font-* tokens (see @forzez/tokens): the "Plex" pairing.
// latin-ext is required for Hungarian (ő, ű). Weights match the fontWeight tokens.
const display = IBM_Plex_Sans_Condensed({
  variable: "--nf-display",
  weight: "600",
  subsets: ["latin", "latin-ext"],
});

const text = IBM_Plex_Serif({
  variable: "--nf-text",
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
});

const data = IBM_Plex_Mono({
  variable: "--nf-data",
  weight: ["400", "600"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: { default: "forzez", template: "%s · forzez" },
  description: "Real structures, calculated by physics and drawn line by line in ink. Bridges, arches, trusses.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${text.variable} ${data.variable} h-full antialiased`}
    >
      <head>
        {/* applies a saved light/dark choice before first paint */}
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <SiteNav className="fixed top-3 left-3 z-20 min-[860px]:top-4 min-[860px]:left-4" />
        <ThemeToggle className="fixed top-3 right-3 z-20 min-[860px]:top-4 min-[860px]:right-4" />
      </body>
    </html>
  );
}
