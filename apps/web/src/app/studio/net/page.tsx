import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, linkClass } from "@forzez/ui";
import { NetGenerator } from "./net-generator";

export const metadata: Metadata = {
  title: "Net: a truss the solver draws",
  description: "One connected truss on a seeded grid, loaded by a seeded field and solved for every member force. Blue pulls, red pushes.",
};

export default function Page() {
  return (
    <NetGenerator
      head={
        <header className="flex flex-col gap-3">
          <Eyebrow>
            <Link href="/studio" className={linkClass}>Studio</Link> · generator net
          </Eyebrow>
          <h1 className="font-display text-4xl leading-none">A truss the solver draws.</h1>
          <p className="max-w-[40rem] text-md text-muted italic">
            One connected truss on a seeded grid, loaded by a seeded field. Nobody picks which members push and which
            pull: the solver works it out for every member, and that is the picture.
          </p>
        </header>
      }
    />
  );
}
