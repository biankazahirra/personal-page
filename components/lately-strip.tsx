import Link from "next/link";

import type { LatelyItem } from "@/content/lately";

/**
 * The latest few updates, as compact rows: category, title, link. Empty slots
 * stay empty rather than being filled with an invented update.
 */
export function LatelyStrip({ items }: { items: LatelyItem[] }) {
  if (items.length === 0) return null;

  return (
    <section id="lately" className="bg-paper" aria-labelledby="lately-title">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-4 md:grid-cols-12">
          <div className="md:col-span-3">
            <h2 id="lately-title" className="eyebrow text-ink-muted">
              lately
            </h2>
          </div>

          <ul className="md:col-span-8 md:col-start-5">
            {items.map((item) => (
              <li key={`${item.section}:${item.slug}`}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-ink/15 py-3"
                  >
                    <span className="eyebrow w-24 text-ink-muted">
                      {item.category}
                    </span>
                    <span className="display text-xl group-hover:text-accent">
                      {item.title}
                    </span>
                  </Link>
                ) : (
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-ink/15 py-3">
                    <span className="eyebrow w-24 text-ink-muted">
                      {item.category}
                    </span>
                    <span className="display text-xl">{item.title}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

