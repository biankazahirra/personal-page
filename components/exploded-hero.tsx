"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

import { DataPlate } from "@/components/data-plate";
import { Media } from "@/components/media";
import { site } from "@/content/site";
import { markFound } from "@/lib/assembly";
import { playStamp } from "@/lib/sound";

type Part = {
  n: number;
  label: string;
  x: string;
  y: string;
  angle: string;
  length: string;
};

/** Satellites around the central portrait. The portrait is part 01. */
const parts: Part[] = [
  { n: 2, label: "notes", x: "-8.5rem", y: "-9rem", angle: "43deg", length: "6.5rem" },
  { n: 3, label: "films", x: "-10.5rem", y: "0rem", angle: "0deg", length: "7.5rem" },
  { n: 4, label: "music", x: "-8.5rem", y: "9rem", angle: "-43deg", length: "6.5rem" },
  { n: 5, label: "projects", x: "8.5rem", y: "-9rem", angle: "137deg", length: "6.5rem" },
  { n: 6, label: "ukulele", x: "10.5rem", y: "0rem", angle: "180deg", length: "7.5rem" },
];

const legend = [
  { n: 1, label: "portrait" },
  ...parts.map(({ n, label }) => ({ n, label })),
];

function PartIcon({ n }: { n: number }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" focusable="false">
      {n === 1 ? (
        <g {...common}>
          <circle cx="12" cy="8" r="3.4" />
          <path d="M4.5 20c.7-4 3.4-6 7.5-6s6.8 2 7.5 6" />
        </g>
      ) : null}
      {n === 2 ? (
        <g {...common}>
          <path d="M6 3.5h9l3 3V20.5H6z" />
          <path d="M15 3.5v3h3M9 10h6M9 13h6M9 16h4" />
        </g>
      ) : null}
      {n === 3 ? (
        <g {...common}>
          <rect x="3.5" y="5" width="17" height="14" rx="1" />
          <path d="M7 5v14M17 5v14M7 9h3M14 9h3M7 15h3M14 15h3" />
        </g>
      ) : null}
      {n === 4 ? (
        <g {...common}>
          <circle cx="8" cy="17" r="3" />
          <path d="M11 17V6l8-2v11" />
          <circle cx="16" cy="15" r="3" />
        </g>
      ) : null}
      {n === 5 ? (
        <g {...common}>
          <path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5z" />
          <path d="M4 8.5 12 13l8-4.5M12 13v7" />
        </g>
      ) : null}
      {n === 6 ? (
        <g {...common}>
          <ellipse cx="8.5" cy="16.5" rx="4.5" ry="3.4" />
          <path d="M11.5 14.5 19 6M18 5l1.8 1.8M6.5 15.8h4" />
        </g>
      ) : null}
    </svg>
  );
}

/**
 * The opening diagram: six parts float apart around the portrait. Scrolling
 * or pressing ASSEMBLE glides them together; the stamp lands when they meet.
 * The exploded state is the default, so the page still reads without JS.
 */
export function ExplodedHero() {
  const [assembled, setAssembled] = useState(false);
  const [scrub, setScrub] = useState(0);
  const [reduced, setReduced] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const stamped = useRef(false);

  useEffect(() => {
    const read = () =>
      setReduced(document.documentElement.dataset.motion !== "full");
    read();
    window.addEventListener("motionchange", read);
    return () => window.removeEventListener("motionchange", read);
  }, []);

  useEffect(() => {
    if (assembled || reduced) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Give the diagram room to be read first: start after the first ~8vh
        // and finish over roughly half a screen, so the parts visibly meet.
        const distance = Math.max(240, window.innerHeight * 0.5);
        const start = Math.max(24, window.innerHeight * 0.08);
        const progress = Math.min(
          1,
          Math.max(0, (window.scrollY - start) / distance),
        );
        setScrub(progress);
        if (progress >= 0.99) {
          setAssembled(true);
          markFound("assemble");
          if (!stamped.current) {
            stamped.current = true;
            playStamp();
          }
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [assembled, reduced]);

  const assemble = () => {
    if (assembled) return;
    setAssembled(true);
    setScrub(1);
    markFound("assemble");
    if (!stamped.current) {
      stamped.current = true;
      playStamp();
    }
  };

  const progress = assembled ? 1 : reduced ? 0 : scrub;
  const spread = 1 - progress;

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-10 md:px-12 md:pb-24 md:pt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink/70 pb-3">
          <p className="eyebrow text-ink-muted">Section 1.0 · Identification</p>
          <p className="eyebrow text-ink-muted">Fig. 1-1 · exploded view</p>
        </div>

        <div className="mt-8 grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5 md:pt-6">
            <p className="eyebrow text-accent">Model BZ-2026 · unit 0042</p>
            <h1
              id="hero-title"
              tabIndex={-1}
              className="display mt-4 text-[clamp(3rem,8vw,6.5rem)]"
            >
              {site.name}
            </h1>
            <p className="mt-5 max-w-[30ch] text-[clamp(1.35rem,2.6vw,2rem)] leading-tight">
              {site.tagline}
            </p>
            <p className="mt-5 max-w-[46ch] text-ink-muted">
              {site.intro[0]}
            </p>

            <DataPlate className="mt-7 max-w-[30rem]" />

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                id="assemble-unit"
                type="button"
                onClick={assemble}
                aria-pressed={assembled}
                className="label border-2 border-ink bg-ink px-5 py-3 text-xs text-paper transition-colors hover:border-accent hover:bg-accent disabled:cursor-default disabled:opacity-70"
                disabled={assembled}
              >
                {assembled ? "Unit assembled" : "Assemble unit"}
              </button>
              <p className="eyebrow text-ink-muted">
                {assembled
                  ? "inspection stamp applied"
                  : "or scroll — the parts meet on the way down"}
              </p>
            </div>

            <noscript>
              <p className="mt-4 max-w-[46ch] border-l-2 border-accent px-3 py-2 text-sm text-ink-muted">
                JavaScript is off, so the diagram stays exploded. Every part is
                also a page: the legend below names each one.
              </p>
            </noscript>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div
              ref={stage}
              className="exploded-stage mx-auto w-full max-w-[36rem]"
              data-snap={assembled}
              style={
                {
                  "--assembly": progress,
                  "--spread": spread,
                } as CSSProperties
              }
              role="img"
              aria-label="Exploded view: a portrait in the centre with notes, films, music, projects and ukulele floating around it, assembling into one unit."
            >
              <span className="exploded-cross" aria-hidden="true" />

              <div className="exploded-center">
                <Media
                  image={site.portrait}
                  variant="field"
                  label="portrait pending"
                  className="aspect-[4/5] w-full"
                  sizes="(min-width: 768px) 30vw, 55vw"
                  priority
                />
                <span className="balloon absolute -left-3 -top-3" aria-hidden="true">
                  1
                </span>
                {assembled ? (
                  <span
                    className="stamp stamp-in absolute -bottom-4 right-2 text-xs"
                    data-tone="mustard"
                    aria-hidden="true"
                  >
                    Inspected
                  </span>
                ) : null}
              </div>

              {parts.map((part) => (
                <div
                  key={part.n}
                  className="exploded-part"
                  style={
                    {
                      "--x": part.x,
                      "--y": part.y,
                      "--a": part.angle,
                      "--len": part.length,
                    } as CSSProperties
                  }
                  aria-hidden="true"
                >
                  <span className="balloon">{part.n}</span>
                  <PartIcon n={part.n} />
                  <span className="exploded-part-label">{part.label}</span>
                </div>
              ))}

            </div>

            <p className="sr-only" role="status" aria-live="polite">
              {assembled ? "Inspection complete. The unit is assembled." : ""}
            </p>

            <div className="mx-auto mt-6 max-w-[36rem] border-t border-ink/30 pt-3">
              <p className="eyebrow text-ink-muted">Legend</p>
              <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-3">
                {legend.map((item) => (
                  <li key={item.n} className="flex items-baseline gap-2">
                    <span className="label text-[10px] text-accent">
                      {String(item.n).padStart(2, "0")}
                    </span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
