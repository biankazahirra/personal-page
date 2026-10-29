import Link from "next/link";

import { Media } from "@/components/media";
import { SchematicBoard } from "@/components/schematic-board";
import { Texture } from "@/components/texture";
import { films } from "@/content/films";
import { journal, kindLabels } from "@/content/journal";
import { notes } from "@/content/notes";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { timeline } from "@/content/timeline";
import { formatDate } from "@/lib/format";

const observerPanels = [
  {
    label: "a week that went fast",
    variant: "grid" as const,
    note: "The photos that never made it anywhere else.",
  },
  {
    label: "songs, lately",
    variant: "waves" as const,
    note: "What ended up on repeat, and for how long.",
  },
  {
    label: "practice, badly",
    variant: "field" as const,
    note: "Ukulele progress, recorded at the awkward stage.",
  },
  {
    label: "rooms worth sitting in",
    variant: "arcs" as const,
    note: "Places that made me stay a little longer.",
  },
];

export default function HomePage() {
  const recentNotes = notes.slice(0, 3);
  const recentJournal = journal.slice(0, 2);
  const featuredProjects = projects.slice(0, 3);
  const current = timeline.find((item) => item.current);

  return (
    <>
      {/* the entrance — a board you can probe */}
      <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-night text-paper-on-night">
        {site.hero ? (
          <div className="absolute inset-0">
            <Media
              image={site.hero}
              variant="waves"
              tone="night"
              label="hero image pending"
              className="h-full w-full opacity-30"
              sizes="100vw"
              priority
            />
          </div>
        ) : null}
        <div aria-hidden="true" className="schematic-grid absolute inset-0 opacity-20" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,26,31,0.98),rgba(16,26,31,0.55)_60%,rgba(16,26,31,0.8))]"
        />

        <div className="relative mx-auto w-full max-w-[1440px] px-6 pt-24 md:px-12 md:pt-28">
          <div className="md:ml-auto md:max-w-[560px]">
            <SchematicBoard />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-8 pt-10 md:px-12 md:pb-12">
          <p className="eyebrow text-paper-on-night/70">an index of a small world</p>

          <h1 className="display mt-6 text-[clamp(4.5rem,17vw,15rem)]">Bianka</h1>

          <div className="mt-6 flex flex-col gap-6 border-t border-paper-on-night/20 pt-5 md:flex-row md:items-baseline md:justify-between">
            <p className="max-w-[32ch] text-[clamp(1.125rem,2vw,1.5rem)] leading-snug">
              {site.tagline}
            </p>
            <p className="eyebrow text-paper-on-night/60">
              six sockets — probe one, or scroll
            </p>
          </div>
        </div>
      </section>

      {/* 02 — the person, pinned from tablet up */}
      <section id="chapter-02" className="relative bg-paper md:h-[170vh]">
        <div className="flex items-center overflow-hidden py-20 md:sticky md:top-0 md:h-[100svh] md:py-0">
          <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 px-6 md:grid-cols-12 md:px-12">
            <div className="md:col-span-6">
              <p className="eyebrow text-ink-muted">02 — the person</p>
              <h2 className="display mt-5 text-[clamp(2.5rem,5.5vw,4.5rem)]">
                A person, not a profile.
              </h2>
              {site.intro.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-5 max-w-[52ch] text-ink-muted [&+p]:mt-4"
                >
                  {paragraph}
                </p>
              ))}
              <Link
                href="/about"
                className="eyebrow mt-8 inline-block border-b border-accent pb-1 hover:text-accent"
              >
                read the whole chapter
              </Link>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <Media
                image={site.portrait}
                variant="field"
                label="portrait pending"
                className="clip-reveal aspect-[4/5] w-full"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 03 — the explorer */}
      <section id="chapter-03" className="relative overflow-hidden bg-paper">
        <div className="relative mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="eyebrow text-ink-muted">03 — the explorer</p>
              <h2 className="display mt-5 text-[clamp(2rem,4vw,3.25rem)]">
                Notes from the open tabs.
              </h2>
              <p className="mt-4 max-w-[30ch] text-ink-muted">
                What I tried, what broke, and what I would do differently.
              </p>
              <Link
                href="/curiosity"
                className="eyebrow mt-8 inline-block border-b border-accent pb-1 hover:text-accent"
              >
                all {notes.length} notes
              </Link>
            </div>

            <ul className="md:col-span-8 md:col-start-5">
              {recentNotes.map((note) => (
                <li key={note.slug}>
                  <Link
                    href={`/curiosity/${note.slug}`}
                    className="group grid gap-2 border-t border-ink/15 py-6 md:grid-cols-12 md:items-baseline md:gap-6"
                  >
                    <p className="eyebrow text-ink-muted md:col-span-3">
                      {note.category}
                      {note.date ? ` · ${formatDate(note.date)}` : ""}
                      {note.placeholder ? " · sample" : ""}
                    </p>
                    <div className="md:col-span-9">
                      <h3 className="display text-[clamp(1.5rem,2.6vw,2.25rem)] group-hover:text-accent">
                        {note.title}
                      </h3>
                      <p className="mt-2 max-w-[52ch] text-ink-muted">{note.excerpt}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 04 — the observer, horizontal chapter */}
      <section
        id="chapter-04"
        data-horizontal
        className="h-section relative h-[320vh] bg-night text-paper-on-night"
      >
        <div className="h-sticky sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-paper-on-night/20 pb-4">
              <p className="eyebrow text-paper-on-night/60">04 — the observer</p>
              <p className="eyebrow text-paper-on-night/60">keep scrolling —</p>
            </div>
          </div>

          <div
            data-horizontal-track
            className="h-track mt-8 flex gap-6 pl-6 md:gap-10 md:pl-12"
          >
            {observerPanels.map((panel, index) => (
              <figure
                key={panel.label}
                className="h-panel w-[78vw] shrink-0 md:w-[38vw]"
              >
                <Texture
                  variant={panel.variant}
                  tone="night"
                  className="aspect-[4/3] w-full"
                  label="image pending"
                />
                <figcaption className="eyebrow mt-4 flex items-baseline gap-3 text-paper-on-night/60">
                  <span className="text-accent-warm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {panel.label}
                </figcaption>
                <p className="mt-2 max-w-[34ch] text-sm text-paper-on-night/60">
                  {panel.note}
                </p>
              </figure>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-night to-transparent md:w-16"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-night to-transparent md:w-16"
          />
        </div>
      </section>

      {/* 05 — the watcher */}
      <section id="chapter-05" className="bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-24">
          <div className="grid gap-8 md:grid-cols-12">
            <p className="eyebrow text-ink-muted md:col-span-3">05 — the watcher</p>
            <div className="md:col-span-8 md:col-start-5">
              <h2 className="display text-[clamp(2rem,4vw,3.25rem)]">
                Films, noted after the credits.
              </h2>
              <p className="mt-4 max-w-[52ch] text-ink-muted">
                {films.length === 0
                  ? "No entries yet. The first ones go up when they are worth writing down."
                  : `${films.length} films so far, with what stayed after the credits.`}
              </p>
              <Link
                href="/films"
                className="eyebrow mt-6 inline-block border-b border-accent pb-1 hover:text-accent"
              >
                the films chapter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — the maker */}
      <section id="chapter-06" className="bg-night text-paper-on-night">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-paper-on-night/20 pb-5">
            <p className="eyebrow text-paper-on-night/60">06 — the maker</p>
            <Link href="/projects" className="eyebrow hover:text-accent-warm">
              all projects
            </Link>
          </div>

          <div className="mt-14 flex flex-col gap-20 md:gap-28">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group grid items-end gap-6 md:grid-cols-12 md:gap-10"
              >
                <div
                  className={`md:col-span-8 ${index % 2 === 1 ? "md:order-2 md:col-start-5" : ""}`}
                >
                  <Media
                    image={project.cover}
                    variant={project.status === "in-progress" ? "grid" : "field"}
                    tone="night"
                    className="clip-reveal aspect-[16/9] w-full transition-transform duration-700 ease-[cubic-bezier(.2,.6,.2,1)] group-hover:scale-[1.02]"
                    label="screenshot pending"
                    sizes="(min-width: 768px) 66vw, 100vw"
                  />
                </div>

                <div
                  className={`md:col-span-4 ${index % 2 === 1 ? "md:order-1 md:col-start-1 md:row-start-1" : ""}`}
                >
                  <p className="eyebrow text-paper-on-night/60">
                    {project.status}
                    {project.year ? ` · ${project.year}` : ""}
                  </p>
                  <h3 className="display mt-3 text-[clamp(2rem,4vw,3.5rem)] group-hover:text-accent-warm">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-[40ch] text-paper-on-night/60">
                    {project.summary}
                  </p>
                  <p className="eyebrow mt-5 text-paper-on-night/60">
                    {project.stack.join(" · ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* the day job */}
      <section id="the-day-job" className="bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="eyebrow text-ink-muted">the day job</p>
              <h2 className="display mt-5 text-[clamp(2rem,4vw,3.25rem)]">
                Small systems, ordinary days.
              </h2>
            </div>

            <div className="md:col-span-8 md:col-start-5">
              <p className="max-w-[54ch] text-[clamp(1.125rem,1.9vw,1.5rem)] leading-relaxed">
                By day I keep paperwork moving at a property company: requisition
                forms, records, monthly numbers. The interesting part is the same
                as here — making a slow process a little shorter.
              </p>

              {current ? (
                <p className="eyebrow mt-8 text-ink-muted">
                  {current.period} · {current.org}
                </p>
              ) : null}

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink/15 pt-6">
                <Link
                  href="/about#journey"
                  className="eyebrow border-b border-accent pb-1 hover:text-accent"
                >
                  the timeline
                </Link>
                <Link
                  href="/life"
                  className="eyebrow border-b border-accent pb-1 hover:text-accent"
                >
                  life lately
                </Link>
                <Link
                  href="/films"
                  className="eyebrow border-b border-accent pb-1 hover:text-accent"
                >
                  films
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — closing, before the footer */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 pb-10 md:px-12">
          <div className="grid gap-6 border-t border-ink/15 pt-8 md:grid-cols-12">
            <p className="eyebrow text-ink-muted md:col-span-3">recently</p>
            <ul className="md:col-span-8 md:col-start-5">
              {recentJournal.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    href={`/life/${entry.slug}`}
                    className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-ink/15 py-4"
                  >
                    <span className="eyebrow w-24 text-ink-muted">
                      {kindLabels[entry.kind]}
                    </span>
                    <span className="display text-xl group-hover:text-accent">
                      {entry.title}
                    </span>
                    <span className="eyebrow ml-auto text-ink-muted">
                      {formatDate(entry.date)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
