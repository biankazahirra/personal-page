import type { Metadata } from "next";
import Link from "next/link";

import { FilmStrip } from "@/components/film-strip";
import { LoopCounter } from "@/components/loop-counter";
import { Media } from "@/components/media";
import { PageHeader } from "@/components/page-header";
import { UkuleleTuner } from "@/components/ukulele-tuner";
import { journal, kindLabels } from "@/content/journal";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Life lately",
  description:
    "A visual journal: songs on repeat, ukulele progress, and things worth noticing.",
};

const variants = {
  update: "grid",
  photo: "field",
  music: "waves",
  ukulele: "field",
  moment: "arcs",
} as const;

export default function LifePage() {
  const entries = [...journal].sort((a, b) => b.date.localeCompare(a.date));
  const loopCount = entries.find((entry) => typeof entry.loops === "number")?.loops;

  return (
    <>
      <PageHeader
        code="C04"
        name="life"
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
            Inspection photos
          </h2>
          <p className="eyebrow text-ink-muted">mounted · stamped · not sorted</p>
        </div>

        <ul className="photo-grid">
          {entries.map((entry, index) => {
            const content = (
              <>
                <Media
                  image={entry.images?.[0]}
                  variant={variants[entry.kind]}
                  label="image pending"
                  className="aspect-[4/3] w-full"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <figcaption className="inspection-caption">
                  <p className="eyebrow flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-muted">
                    <span>inspection note {String(index + 1).padStart(2, "0")}</span>
                    <span aria-hidden="true">·</span>
                    <span>{kindLabels[entry.kind]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{formatDate(entry.date)}</span>
                    {entry.placeholder ? (
                      <span className="stamp ml-1" data-tone="mustard">
                        sample
                      </span>
                    ) : null}
                  </p>

                  <h3 className="display mt-2 text-[clamp(1.5rem,2.6vw,2rem)] group-hover:text-accent">
                    {entry.title}
                  </h3>

                  {entry.excerpt ? (
                    <p className="mt-2 max-w-[44ch] text-sm text-ink-muted">
                      {entry.excerpt}
                    </p>
                  ) : null}

                  {entry.body ? (
                    <p className="eyebrow mt-4 text-ink-muted group-hover:text-accent">
                      read the entry →
                    </p>
                  ) : null}
                </figcaption>
              </>
            );

            return (
              <li key={entry.slug} className="photo-frame" data-tilt={index % 2}>
                {entry.body ? (
                  <Link href={`/life/${entry.slug}`} className="group block">
                    <figure className="photo-mount">{content}</figure>
                  </Link>
                ) : (
                  <figure className="group photo-mount">{content}</figure>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
