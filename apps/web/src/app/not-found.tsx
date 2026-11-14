import Link from "next/link";
import { Eyebrow, buttonClass } from "@forzez/ui";

// Microcopy: docs/notes/brand-naming.md
export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-5 px-5 py-24 sm:px-8">
      <Eyebrow>404</Eyebrow>
      <h1 className="font-display text-4xl leading-none">This page failed under load.</h1>
      <p className="max-w-[30rem] text-md text-muted">The link may be old, or the page was never built. The rest of the structure still stands.</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href="/" className={buttonClass("primary")}>Back to the start</Link>
        <Link href="/elements" className={buttonClass("ghost")}>The Elements of Statics</Link>
      </div>
    </main>
  );
}
