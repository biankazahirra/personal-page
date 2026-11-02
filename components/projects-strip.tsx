"use client";

import Link from "next/link";
import type { FocusEvent, KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Media } from "@/components/media";
import { PartLabel } from "@/components/part-label";
import type { Project } from "@/content/types";
import { currentMotion } from "@/lib/motion";
import { isAtEnd, snapIndex } from "@/lib/strip-scroll";

function scrollBehavior() {
  return currentMotion() === "full" ? ("smooth" as const) : ("auto" as const);
}

/**
 * C06 on the homepage: a native scroll-snap strip of wide project cards. The
 * cards and their links work without JavaScript; the arrows, punch holes and
 * helper label are added after hydration.
 */
export function ProjectsStrip({ projects }: { projects: Project[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const [paged, setPaged] = useState(false);
  const [ready, setReady] = useState(false);

  const measure = useCallback(() => {
    const list = track.current;
    if (!list) return;
    const cards = list.querySelectorAll<HTMLElement>("[data-project-card]");
    const step =
      cards.length > 1
        ? cards[1].offsetLeft - cards[0].offsetLeft
        : list.clientWidth;
    const max = list.scrollWidth - list.clientWidth;
    const end = isAtEnd(list.scrollLeft, list.scrollWidth, list.clientWidth);

    // Latched: once the reader starts moving, the helper label stays gone.
    if (list.scrollLeft > 4) setScrolled(true);
    setAtStart(list.scrollLeft <= 4);
    setAtEnd(end);
    setOverflowing(max > 1);
    // Position dots only make sense when the strip can travel a whole card.
    setPaged(max >= step);
    setIndex(
      end && list.scrollLeft > 4
        ? projects.length - 1
        : snapIndex(list.scrollLeft, step, projects.length),
    );
  }, [projects.length]);

  useEffect(() => {
    const list = track.current;
    if (!list) return;
    measure();
    setReady(true);
    list.addEventListener("scroll", measure, { passive: true });
    const resize = new ResizeObserver(measure);
    resize.observe(list);
    return () => {
      list.removeEventListener("scroll", measure);
      resize.disconnect();
    };
  }, [measure]);

  const stepOf = (list: HTMLUListElement) => {
    const cards = list.querySelectorAll<HTMLElement>("[data-project-card]");
    return cards.length > 1
      ? cards[1].offsetLeft - cards[0].offsetLeft
      : list.clientWidth;
  };

  const scrollByCard = (direction: 1 | -1) => {
    const list = track.current;
    if (!list) return;
    list.scrollBy({
      left: direction * stepOf(list),
      behavior: scrollBehavior(),
    });
  };

  const jumpTo = (target: number) => {
    const list = track.current;
    if (!list) return;
    list.scrollTo({
      left: target * stepOf(list),
      behavior: scrollBehavior(),
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }
  };

  // Tabbing into a card brings that card into the strip's view.
  const onCardFocus = (event: FocusEvent<HTMLUListElement>) => {
    const list = track.current;
    const card = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-project-card]",
    );
    if (!list || !card) return;
    list.scrollTo({
      left:
        card.getBoundingClientRect().left -
        list.getBoundingClientRect().left +
        list.scrollLeft,
      behavior: scrollBehavior(),
    });
  };

  // Only the first card with artwork loads eagerly; placeholders need nothing.
  const firstImage = projects.findIndex((project) => project.cover);

  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-paper-on-night/20 pb-5">
        <PartLabel
          code="C06"
          name="illustrated parts list"
          plain="My projects"
          tone="night"
        />

        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2">
          {ready && overflowing ? (
            <>
              <p
                className="eyebrow projects-hint text-paper-on-night/60"
                data-scrolled={scrolled}
                aria-hidden="true"
              >
                keep scrolling —
              </p>

              {paged ? (
                <div
                  className="flex items-center"
                  role="group"
                  aria-label="Project positions"
                >
                  {projects.map((project, hole) => (
                    <button
                      key={project.slug}
                      type="button"
                      className="projects-dot"
                      aria-label={`Go to project ${hole + 1} of ${projects.length}`}
                      aria-current={hole === index ? "true" : undefined}
                      onClick={() => jumpTo(hole)}
                    >
                      <span aria-hidden="true" />
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="projects-arrow"
                  aria-label="Previous project"
                  aria-disabled={atStart}
                  onClick={() => {
                    if (!atStart) scrollByCard(-1);
                  }}
                >
                  ◂
                </button>
                <button
                  type="button"
                  className="projects-arrow"
                  aria-label="Next project"
                  aria-disabled={atEnd}
                  onClick={() => {
                    if (!atEnd) scrollByCard(1);
                  }}
                >
                  ▸
                </button>
              </div>
            </>
          ) : null}

          <Link href="/projects" className="eyebrow hover:text-accent-warm">
            all projects
          </Link>
        </div>
      </div>

      <h2 className="display mt-8 max-w-[18ch] text-[clamp(2rem,4vw,3.5rem)]">
        Things I have made, with the notes still attached.
      </h2>

      <div
        className="projects-viewport mt-12 md:mt-14"
        data-start={atStart}
        data-end={atEnd}
      >
        <ul
          ref={track}
          className="projects-track"
          role="region"
          aria-label="Projects, scrollable"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onFocus={onCardFocus}
        >
          {projects.map((project, card) => (
            <li key={project.slug} data-project-card className="projects-card">
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col border border-paper-on-night/20"
              >
                <Media
                  image={project.cover}
                  variant={project.status === "in-progress" ? "grid" : "field"}
                  tone="night"
                  className="aspect-[16/9] w-full"
                  label="screenshot pending"
                  sizes="(min-width: 1280px) 440px, (min-width: 768px) 36vw, 85vw"
                  priority={card === firstImage}
                />

                <div className="flex flex-1 flex-col p-4 md:p-5">
                  <p className="eyebrow text-paper-on-night/60">
                    {project.status}
                    {project.year ? ` · ${project.year}` : ""}
                  </p>
                  <h3 className="display mt-2 text-[clamp(1.6rem,2.2vw,2rem)] group-hover:text-accent-warm">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-paper-on-night/60">
                    {project.summary}
                  </p>
                  <p className="eyebrow mt-auto pt-4 text-paper-on-night/60">
                    {project.stack.join(" · ")}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <span className="projects-fade projects-fade-left" aria-hidden="true" />
        <span className="projects-fade projects-fade-right" aria-hidden="true" />
      </div>
    </>
  );
}
