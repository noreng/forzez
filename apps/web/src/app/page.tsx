import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-6 px-4 py-24 sm:px-8">
      <p className="font-data text-xs uppercase tracking-[0.16em] text-muted">forzez · Statika</p>
      <h1 className="font-display text-4xl leading-none">Erők egyensúlya</h1>
      <p className="max-w-xl text-md text-muted italic">
        Statika, amit látni lehet: erők, rácsos tartók és egyensúly, kézzel fogható ábrákon.
      </p>
      <div className="flex gap-3 font-data text-sm">
        <span className="h-1.5 w-10 self-center bg-force-1" />
        <span className="h-1.5 w-10 self-center bg-force-2" />
        <span className="h-1.5 w-10 self-center bg-force-3" />
        <span className="h-1.5 w-10 self-center bg-ink" />
      </div>
      <Link href="/design" className="font-data text-sm text-accent underline underline-offset-4">
        Design system →
      </Link>
    </main>
  );
}
