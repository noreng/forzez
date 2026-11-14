import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, linkClass } from "@forzez/ui";
import { SupportsGenerator } from "./supports-generator";

export const metadata: Metadata = {
  title: "Supports: a field of pins",
  description: "Four hundred pins on a 20 by 20 grid, each with one load from a seeded field. The first Forzez generator, kept frozen.",
};

export default function Page() {
  return (
    <SupportsGenerator
      head={
        <header className="flex flex-col gap-3">
          <Eyebrow>
            <Link href="/studio" className={linkClass}>Studio</Link> · generator pts1
          </Eyebrow>
          <h1 className="font-display text-4xl leading-none">A field of pins.</h1>
          <p className="max-w-[40rem] text-md text-muted italic">
            Four hundred pins on a 20 by 20 grid, each loaded by a seeded field and turned to meet its load. The first
            generator, kept as it was: a recipe made today draws the same picture forever.
          </p>
        </header>
      }
    />
  );
}
