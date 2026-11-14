import type { ReactNode } from "react";
import Link from "next/link";
import { Pending } from "@forzez/ui";

/**
 * One line of a contents list (home, articles): what it is, a sentence, and where it goes. A linked row shows its
 * underline and arrow at every width; a row that is not there yet says so with a tag, not with grey.
 */
export function ContentsRow({ kicker, title, children, href, status }: { kicker: string; title: string; children: ReactNode; href?: string; status?: string }) {
  const cut = title.lastIndexOf(" ") + 1;
  const head = title.slice(0, cut);
  const last = title.slice(cut);
  const underline = "underline decoration-muted decoration-1 underline-offset-4 group-hover:decoration-ink";
  const inner = (
    <>
      <span className="font-data text-sm text-muted">{kicker}</span>
      <span>
        <span className="font-display text-xl">
          {href ? (
            <>
              <span className={underline}>{head}</span>
              {/* the last word and the arrow never part, so the arrow can't wrap onto a line of its own */}
              <span className="whitespace-nowrap">
                <span className={underline}>{last}</span>
                <span aria-hidden className="ml-2 inline-block font-data text-lg transition-transform duration-150 ease-fz group-hover:translate-x-1">→</span>
              </span>
            </>
          ) : (
            title
          )}
        </span>
        <span className="mt-1 block text-muted">{children}</span>
      </span>
      {status ? <Pending className="justify-self-start">{status}</Pending> : null}
    </>
  );
  const row = "grid grid-cols-1 gap-x-8 gap-y-2 py-5 sm:grid-cols-[11rem_minmax(0,1fr)_auto] sm:items-baseline";
  return (
    <li className="border-b border-rule first:border-t">
      {href ? (
        <Link href={href} className={`group -mx-3 rounded-sm px-3 transition-colors duration-150 ease-fz hover:bg-sunken ${row}`}>{inner}</Link>
      ) : (
        <div className={row}>{inner}</div>
      )}
    </li>
  );
}
