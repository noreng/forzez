import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Condensed, IBM_Plex_Serif } from "next/font/google";
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
  description: "Statics you can see: interactive forces, trusses and equilibrium.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="hu"
      className={`${display.variable} ${text.variable} ${data.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
