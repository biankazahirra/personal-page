import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { films } from "@/content/films";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Films",
  description:
    "A small film journal: what was watched, what stayed, and the rare five stars.",
};

export default function FilmsPage() {
  const logged = [...films].sort((a, b) =>
    (b.watchedOn ?? "").localeCompare(a.watchedOn ?? ""),
  );

  return (
    <>
      <PageHeader
        code="C05"
        name="films"
        title="Watched, then thought about."
        lede="A list that starts empty on purpose. Entries appear when there is something to say beyond a rating."
      />

      <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-12">
        {logged.length === 0 ? (
          <div className="grid gap-10 border-t border-ink/15 pt-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <p className="display text-[clamp(2rem,5vw,3.5rem)]">Nothing logged yet.</p>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <p className="max-w-[52ch] text-ink-muted">
                No invented titles, ratings, or reviews — that would defeat the
                point of keeping a journal. When the first film is worth a line,
                it goes in{" "}
                <code className="font-mono text-[0.9em] text-ink">content/films.ts</code>{" "}
                and shows up here.
              </p>

              <ul className="mt-8 border-t border-ink/15">
                {[
                  "title and year",
                  "when it was watched",
                  "a rating, out of five",
                  "a line about what stayed",
                ].map((field) => (
                  <li
                    key={field}
                    className="eyebrow flex items-baseline justify-between gap-4 border-b border-ink/15 py-3 text-ink-muted"
                  >
                    <span>{field}</span>
                    <span className="text-ink-muted">pending</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <ul className="border-t border-ink/15">
            {logged.map((film) => (
              <li
                key={`${film.title}-${film.watchedOn ?? ""}`}
                className="grid gap-3 border-b border-ink/15 py-6 md:grid-cols-12 md:items-baseline md:gap-6"
              >
                <div className="md:col-span-6">
                  <h2 className="display text-[clamp(1.5rem,3vw,2.25rem)]">
                    {film.title}
                    {film.year ? (
                      <span className="text-ink-muted"> ({film.year})</span>
                    ) : null}
                  </h2>
                  {film.director ? (
                    <p className="eyebrow mt-1 text-ink-muted">{film.director}</p>
                  ) : null}
                </div>

                <p className="eyebrow text-ink-muted md:col-span-2">
                  {film.watchedOn ? formatDate(film.watchedOn) : "—"}
                  {film.placeholder ? " · sample" : ""}
                </p>

                <p className="max-w-[40ch] text-ink-muted md:col-span-3">
                  {film.note ?? ""}
                </p>

                <p className="eyebrow text-ink-muted md:col-span-1 md:text-right">
                  {film.rating ? `${film.rating}/5` : "—"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
