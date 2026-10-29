import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { noteCategories, notes } from "@/content/notes";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Curiosity",
  description:
    "Notes from testing AI agents, writing small scripts, and learning things in public.",
};

export default function CuriosityPage() {
  return (
    <>
      <PageHeader
        code="C03"
        name="curiosity"
        title="Notes from the open tabs."
        lede="Things I tried, what broke, and what I would do differently. Written while it is still fresh, not after it has become a nice story."
      />

      <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-12">
        <div className="notes-filter">
          <div
            role="group"
            aria-label="Filter notes by category"
            className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-ink/15 pb-4"
          >
            <label className="filter-option eyebrow cursor-pointer pb-1">
              <input
                type="radio"
                name="note-category"
                id="filter-all"
                defaultChecked
                className="sr-only"
              />
              all
            </label>
            {noteCategories.map((category) => (
              <label
                key={category.value}
                className="filter-option eyebrow cursor-pointer pb-1"
              >
                <input
                  type="radio"
                  name="note-category"
                  id={`filter-${category.value}`}
                  className="sr-only"
                />
                {category.label}
              </label>
            ))}
          </div>

          <ul className="mt-10 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {notes.map((note, index) => {
              const body = (
                <>
                  <p className="eyebrow text-ink-muted">
                    {note.category}
                    {note.date ? ` · ${formatDate(note.date)}` : ""}
                    {note.placeholder ? " · sample" : ""}
                  </p>
                  <h2 className="display mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] group-hover:text-accent">
                    {note.title}
                  </h2>
                  <p className="mt-3 max-w-[44ch] text-ink-muted">{note.excerpt}</p>
                  {note.body ? (
                    <p className="eyebrow mt-5 text-ink-muted group-hover:text-accent">
                      read the note
                    </p>
                  ) : null}
                </>
              );

              return (
                <li
                  key={note.slug}
                  data-cat={note.category}
                  className={index % 3 === 1 ? "md:mt-14" : ""}
                >
                  {note.body ? (
                    <Link href={`/curiosity/${note.slug}`} className="group block">
                      {body}
                    </Link>
                  ) : (
                    <div className="group">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
