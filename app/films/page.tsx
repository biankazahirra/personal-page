import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { PanelLamps } from "@/components/panel-lamps";
import { films } from "@/content/films";

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
        lede="Four favourites to start with. A rating or a line appears only when there is something real to say."
      />

      <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-12">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <p className="eyebrow text-ink-muted">
            Section 5 · indicator panel · {logged.length} lamps
          </p>
          <p className="eyebrow text-ink-muted">press a lamp to read the note</p>
        </div>

        {logged.length === 0 ? (
          <div className="grid gap-10 border-t border-ink/15 pt-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <p className="display text-[clamp(2rem,5vw,3.5rem)]">
                Socket C05 is empty.
              </p>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <p className="max-w-[52ch] text-ink-muted">
                No invented titles, ratings, or reviews; that would defeat the
                point of keeping a journal. When the first film is worth a line,
                its lamp lights here.
              </p>
            </div>
          </div>
        ) : (
          <PanelLamps films={logged} />
        )}

        <p className="mt-10 max-w-[62ch] border-t border-ink/15 pt-6 text-sm text-ink-muted">
          The panel lists four favourites from the Letterboxd profile. A lamp
          stays dark until there is a note worth putting behind it.
        </p>
      </section>
    </>
  );
}
