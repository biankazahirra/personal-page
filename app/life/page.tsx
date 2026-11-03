import type { Metadata } from "next";

import { FilmStrip } from "@/components/film-strip";
import { LoopCounter } from "@/components/loop-counter";
import { PageHeader } from "@/components/page-header";
import { PhotoTray } from "@/components/photo-tray";
import { UkuleleTuner } from "@/components/ukulele-tuner";
import { journal } from "@/content/journal";
import { photoMoments } from "@/content/photos";

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
            <h2 className="display text-[clamp(1.6rem,3vw,2.25rem)]">
              <span className="hidden md:inline">Film strip</span>
              <span className="md:hidden">Photo tray</span>
            </h2>
            <p className="eyebrow text-ink-muted">Fig. 4-1 · recent frames</p>
          </div>

          <div className="hidden md:block">
            <FilmStrip entries={entries} />
          </div>

          {/* The tray prints its caption in paper-on-night, nearly the same cream
              as this section, so it is handed the paper tone instead. */}
          <div className="md:hidden">
            <PhotoTray moments={photoMoments} entries={entries} tone="paper" />
          </div>
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
