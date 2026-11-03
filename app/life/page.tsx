import type { Metadata } from "next";

import { FilmStrip } from "@/components/film-strip";
import { LoopCounter } from "@/components/loop-counter";
import { PageHeader } from "@/components/page-header";
import { UkuleleTuner } from "@/components/ukulele-tuner";
import { journal } from "@/content/journal";

export const metadata: Metadata = {
  title: "Life lately",
  description:
    "A visual journal: songs on repeat, ukulele progress, and things worth noticing.",
};

export default function LifePage() {
  const entries = [...journal].sort((a, b) => b.date.localeCompare(a.date));
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

      <section className="border-y border-ink/15 bg-paper-2/45">
        <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 md:py-16">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="display text-[clamp(1.6rem,3vw,2.25rem)]">Film strip</h2>
            <p className="eyebrow text-ink-muted">Fig. 4-1 · recent frames</p>
          </div>
          <FilmStrip entries={entries} />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <LoopCounter count={loopCount} />
          <UkuleleTuner />
        </div>
      </section>
    </>
  );
}
