"use client";

import Link from "next/link";
import { useState } from "react";

import { components } from "@/content/components";
import { films } from "@/content/films";
import { journal } from "@/content/journal";
import { notes } from "@/content/notes";
import { projects } from "@/content/projects";
import { timeline } from "@/content/timeline";
import { formatDate } from "@/lib/format";

const counts: Record<string, string> = {
  C01: `${components.length} sockets`,
  C02: `${timeline.length} revisions`,
  C03: `${notes.length} notes`,
  C04: `${journal.length} entries`,
  C05: films.length === 0 ? "no entries yet" : `${films.length} films`,
  C06: `${projects.length} projects`,
};

const revisions = [...notes.map((note) => note.date), ...journal.map((entry) => entry.date)]
  .filter((date): date is string => Boolean(date))
  .sort();
const lastRevision = revisions.at(-1);

/**
 * The homepage board: six sockets on one power bus. Probing a socket lights its
 * spur, its segment of the rail and any socket listed in its `links`; the rest
 * step back. Counts come from the content files, so the board cannot lie.
 */
export function SchematicBoard() {
  const [probed, setProbed] = useState<string | null>(null);
  const probedItem = components.find((item) => item.code === probed);
  const related = new Set(probedItem?.links ?? []);

  return (
    <div className="schematic-board border border-paper-on-night/25 bg-night/50 backdrop-blur-[2px]">
      <div className="flex items-baseline justify-between gap-4 border-b border-paper-on-night/20 px-4 py-2.5">
        <p className="eyebrow text-paper-on-night/60">assembly board · rev 2026</p>
        <p className="eyebrow shrink-0 text-paper-on-night/55">6 sockets</p>
      </div>

      <ul>
        {components.map((item) => {
          const isProbed = probed === item.code;
          const isRelated = related.has(item.code);
          const dimmed = probed !== null && !isProbed && !isRelated;

          return (
            <li
              key={item.code}
              className={`relative border-b border-paper-on-night/10 transition-opacity duration-200 last:border-b-0 ${
                dimmed ? "opacity-35" : "opacity-100"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute bottom-0 left-4 top-0 w-px transition-colors duration-200 ${
                  isProbed
                    ? "bg-accent-warm"
                    : isRelated
                      ? "bg-accent-warm/50"
                      : "bg-paper-on-night/15"
                }`}
              />

              <Link
                href={item.href}
                data-code={item.code}
                onMouseEnter={() => setProbed(item.code)}
                onMouseLeave={() => setProbed(null)}
                onFocus={() => setProbed(item.code)}
                onBlur={() => setProbed(null)}
                className="socket group flex items-center gap-3 px-4 py-2.5 outline-none focus-visible:outline-1 focus-visible:outline-offset-[-2px] focus-visible:outline-accent-warm sm:py-3"
              >
                <span
                  aria-hidden="true"
                  className={`trace h-px w-4 shrink-0 transition-opacity duration-200 sm:w-6 ${
                    isProbed ? "opacity-100" : isRelated ? "opacity-70" : "opacity-40"
                  }`}
                />
                <span
                  className={`node-label shrink-0 transition-colors duration-200 ${
                    isProbed
                      ? "text-accent-warm"
                      : isRelated
                        ? "text-accent-warm/80"
                        : "text-paper-on-night/70"
                  }`}
                >
                  {item.code}
                </span>
                <span className="truncate text-base text-paper-on-night/90 sm:text-lg">
                  {item.label}
                </span>
                <span className="eyebrow ml-auto hidden truncate pl-4 text-paper-on-night/45 md:block">
                  {item.spec}
                </span>
                <span
                  className={`eyebrow shrink-0 text-right ${
                    item.status === "unpopulated"
                      ? "text-accent-warm/80"
                      : "text-paper-on-night/55"
                  }`}
                >
                  {item.status}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="eyebrow border-t border-paper-on-night/20 px-4 py-2.5 text-paper-on-night/55">
        {probedItem ? (
          <>
            <span className="text-accent-warm">{probedItem.code}</span> · {probedItem.label} ·{" "}
            {probedItem.status === "unpopulated" ? "empty" : counts[probedItem.code]}
            {related.size > 0 ? ` · linked: ${[...related].join(" ")}` : ""}
          </>
        ) : (
          "probe a socket to trace it — tap to open"
        )}
      </p>

      <details className="group border-t border-paper-on-night/20">
        <summary className="eyebrow cursor-pointer list-none px-4 py-2.5 text-paper-on-night/55 transition-colors hover:text-accent-warm [&::-webkit-details-marker]:hidden">
          ? diagnostics
        </summary>
        <dl className="eyebrow grid grid-cols-[6.5rem_1fr] gap-y-1.5 px-4 pb-3 text-paper-on-night/55">
          <dt>model</dt>
          <dd className="text-paper-on-night/80">bianka zahirra</dd>
          <dt>revision</dt>
          <dd className="text-paper-on-night/80">2026</dd>
          <dt>sockets</dt>
          <dd className="text-paper-on-night/80">
            {components.length} · {components.filter((item) => item.status === "live").length}{" "}
            populated · {components.filter((item) => item.status === "unpopulated").length} empty
          </dd>
          <dt>entries</dt>
          <dd className="text-paper-on-night/80">
            {notes.length} notes · {journal.length} journal · {projects.length} projects ·{" "}
            {films.length} films
          </dd>
          <dt>last revision</dt>
          <dd className="text-paper-on-night/80">
            {lastRevision ? formatDate(lastRevision) : "unknown"}
          </dd>
          <dt>keyboard</dt>
          <dd className="text-paper-on-night/80">tab through the sockets</dd>
        </dl>
      </details>
    </div>
  );
}
