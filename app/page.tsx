import Link from "next/link";

import { AssemblyExtra } from "@/components/assembly-extra";
import { ConsoleShell } from "@/components/console-shell";
import { ExplodedHero } from "@/components/exploded-hero";
import { LatelyStrip } from "@/components/lately-strip";
import { PartLabel } from "@/components/part-label";
import { ProjectsStrip } from "@/components/projects-strip";
import { SchematicBoard } from "@/components/schematic-board";
import { StartupChecklist } from "@/components/startup-checklist";
import { Texture } from "@/components/texture";
import { films } from "@/content/films";
import { buildLately, excludeLately, latelyPosition } from "@/content/lately";
import { notes } from "@/content/notes";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
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
  // Anything already in the Lately strip is never repeated in the previews.
  const lately = buildLately();
  const recentNotes = excludeLately(notes, "curiosity", lately).slice(0, 3);
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      <StartupChecklist />

      {/* 01 — identification, as an exploded view */}
      <ExplodedHero />

      {/* lately — three latest updates, never a full section */}
      {latelyPosition === "after-hero" ? <LatelyStrip items={lately} /> : null}

      {/* 01.2 — the socket board, first stop after the hero */}
      <section id="assembly-board" className="bg-paper-2/35">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink/70 pb-4">
            <PartLabel code="C01.2" name="assembly board" plain="Explore all sections" />
            <p className="eyebrow text-ink-muted">six sockets · one bus</p>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 className="display text-[clamp(2rem,4vw,3.25rem)]">
                Six sockets. Probe one.
              </h2>
              <p className="mt-4 max-w-[34ch] text-ink-muted">
                <span className="md:hidden">
                  Swipe the rack, tap a socket to open it.
                </span>
                <span className="hidden md:inline">
                  Hover or focus a tab to trace it. The preview follows the
                  probe; the tab opens the section.
                </span>
              </p>
              <p className="eyebrow mt-6 hidden text-ink-muted md:block">
                keyboard: tab through the rack
              </p>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <SchematicBoard />
            </div>
          </div>
        </div>
      </section>

      {latelyPosition === "after-board" ? <LatelyStrip items={lately} /> : null}

      {/* 01.1 — the logbook console, optional */}
      <section id="console" className="bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <PartLabel code="C01.1" name="logbook console" plain="Optional terminal" />
              <h2 className="display mt-5 text-[clamp(2rem,4vw,3.25rem)]">
                Ask the machine.
              </h2>
              <p className="mt-4 max-w-[34ch] text-ink-muted">
                A small terminal for people who like typing. Optional, and never
                the only way in.
              </p>
              <div className="notice mt-6 px-4 py-3">
                <p className="label text-[10px] text-ink-muted">Warning</p>
                <p className="mt-1 max-w-[34ch] text-sm">
                  May cause excessive curiosity. Do not remove the lid without
                  snacks.
                </p>
              </div>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <ConsoleShell />
            </div>
          </div>
        </div>
      </section>

      {/* 02 — the person */}
      <section id="chapter-02" className="bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
          <div className="max-w-[52rem]">
            <PartLabel code="C02" name="specifications" plain="About me" />
            <h2 className="display mt-5 text-[clamp(2.5rem,5.5vw,4.5rem)]">
              A person, not a profile.
            </h2>
            <p className="mt-5 max-w-[52ch] text-ink-muted">{site.aboutPreview}</p>
            <Link
              href="/about"
              className="eyebrow mt-8 inline-block border-b border-accent pb-1 hover:text-accent"
            >
              read the whole section
            </Link>
          </div>
        </div>
      </section>

      {/* 06 — the illustrated parts list */}
      <section id="chapter-06" className="bg-night text-paper-on-night">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
          <ProjectsStrip projects={featuredProjects} />
        </div>
      </section>

      {/* 03 — the maintenance logbook */}
      <section id="chapter-03" className="relative overflow-hidden bg-paper">
        <div className="relative mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <PartLabel code="C03" name="maintenance logbook" plain="Notes & experiments" />
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

      {/* 04 — the inspection photos, horizontal chapter */}
      <section
        id="chapter-04"
        data-horizontal
        className="h-section relative h-[320vh] bg-night text-paper-on-night"
      >
        <div className="h-sticky sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-paper-on-night/20 pb-4">
              <PartLabel code="C04" name="inspection photos" plain="Personal moments" tone="night" />
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

      {/* 05 — the indicator panel */}
      <section id="chapter-05" className="bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-24">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <PartLabel code="C05" name="indicator panel" plain="Films I've watched" />
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <h2 className="display text-[clamp(2rem,4vw,3.25rem)]">
                Films, noted after the credits.
              </h2>
              <p className="mt-4 max-w-[52ch] text-ink-muted">
                {films.length === 0
                  ? "No entries yet. The first ones go up when they are worth writing down."
                  : `${films.length} films so far, with what stayed after the credits.`}
              </p>

              {films.length > 0 ? (
                <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {films.slice(0, 4).map((film) => (
                    <li key={film.title}>
                      <Link
                        href="/films"
                        className="lamp-mini flex min-h-[44px] items-center gap-2 border border-ink/35 bg-paper-2/50 px-2.5 py-2 hover:border-accent hover:text-accent"
                      >
                        <span className="lamp-bezel" aria-hidden="true">
                          <span className="lamp-lens" />
                        </span>
                        <span className="label text-[10px] leading-tight">
                          {film.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}

              <Link
                href="/films"
                className="eyebrow mt-6 inline-block border-b border-accent pb-1 hover:text-accent"
              >
                the films section
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AssemblyExtra />
    </>
  );
}

