import type { Metadata } from "next";
import Link from "next/link";

import { FilmStrip } from "@/components/film-strip";
import { LoopCounter } from "@/components/loop-counter";
import { PageHeader } from "@/components/page-header";
import { UkuleleTuner } from "@/components/ukulele-tuner";
import { journal, kindLabels } from "@/content/journal";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Life lately",
  description:
    "A visual journal: songs on repeat, ukulele progress, and things worth noticing.",
};

export default function LifePage() {
  const entries = [...journal].sort((a, b) => b.date.localeCompare(a.date));
  // Only entries with a body have a page of their own to open.
  const entriesWithBody = entries.filter((entry) => entry.body);
  const loopCount = entries.find((entry) => typeof entry.loops === "number")?.loops;

  return (
    <>
      <PageHeader
        code="C04"
        name="life"
        plain="Personal moments"
        title="A journal without a schedule."
        lede="Songs, small moments, practice notes. Not a feed, not a highlight reel — just what happened."
      />

      <section className="mx-auto max-w-[1440px] px-6 pb-16 md:px-12 md:pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          <LoopCounter count={loopCount} />
          <UkuleleTuner />
        </div>
      </section>

      <section className="border-y border-ink/15 bg-paper-2/45">
        <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 md:py-16">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="display text-[clamp(1.6rem,3vw,2.25rem)]">Film strip</h2>
            <p className="eyebrow text-ink-muted">Fig. 4-1 · recent frames</p>
          </div>
          <FilmStrip entries={entries} />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="display text-[clamp(1.75rem,3.5vw,2.75rem)]">
            Notes behind the frames
          </h2>
          <p className="eyebrow text-ink-muted">one entry, one page</p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {entriesWithBody.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`/life/${entry.slug}`}
                className="group block border-t border-ink/15 pt-4"
              >
                <p className="eyebrow text-ink-muted">
                  {kindLabels[entry.kind]} · {formatDate(entry.date)}
                  {entry.placeholder ? " · sample" : ""}
                </p>
                <h3 className="display mt-2 text-[clamp(1.5rem,2.6vw,2rem)] group-hover:text-accent">
                  {entry.title}
                </h3>
                {entry.excerpt ? (
                  <p className="mt-2 max-w-[44ch] text-sm text-ink-muted">
                    {entry.excerpt}
                  </p>
                ) : null}
                <p className="eyebrow mt-3 text-ink-muted group-hover:text-accent">
                  read the entry →
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
