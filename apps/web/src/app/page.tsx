import Link from "next/link";
import { Eyebrow } from "@forzez/ui";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-6 px-4 py-24 sm:px-8">
      <Eyebrow>forzez · Statics</Eyebrow>
      <h1 className="font-display text-4xl leading-none">Equilibrium of forces</h1>
      <p className="max-w-xl text-md text-muted italic">
        Statics you can see: forces, trusses and equilibrium, in diagrams you can touch.
      </p>
      <div className="flex gap-3 font-data text-sm">
        <span className="h-1.5 w-10 self-center bg-force-1" />
        <span className="h-1.5 w-10 self-center bg-force-2" />
        <span className="h-1.5 w-10 self-center bg-force-3" />
        <span className="h-1.5 w-10 self-center bg-ink" />
      </div>
      <div className="flex flex-wrap gap-6 font-data text-sm">
        <Link href="/elements" className="text-accent underline underline-offset-4">
          The Elements of Statics →
        </Link>
        <Link href="/lab/equilibrium" className="text-accent underline underline-offset-4">
          Equilibrium of forces →
        </Link>
        <Link href="/design" className="text-accent underline underline-offset-4">
          Design system →
        </Link>
      </div>
    </main>
  );
}
