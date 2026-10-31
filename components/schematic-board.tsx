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
 * The six sockets as a rack of index tabs. Probing one draws its connector,
 * lifts the tab and updates the preview; the link opens the section. The
 * default preview is C01, so the board says something before it is touched.
 */
export function SchematicBoard() {
  const [probed, setProbed] = useState<string | null>(null);
  const active = components.find((item) => item.code === probed) ?? components[0];

  return (
    <div className="socket-board">
      <div className="socket-board-head">
        <p className="eyebrow text-ink-muted">assembly board · rev 2026</p>
        <p className="eyebrow text-ink-muted">probe a socket</p>
      </div>

      <div className="socket-board-body">
        <ul className="socket-tabs" aria-label="Sockets">
          {components.map((item) => {
            const isActive = active.code === item.code;

            return (
              <li key={item.code}>
                <Link
                  href={item.href}
                  data-active={isActive}
                  data-code={item.code}
                  aria-controls="socket-preview"
                  onMouseEnter={() => setProbed(item.code)}
                  onMouseLeave={() => setProbed(null)}
                  onFocus={() => setProbed(item.code)}
                  onBlur={() => setProbed(null)}
                  onPointerDown={() => setProbed(item.code)}
                  className="socket-tab"
                >
                  <span className="label socket-tab-code text-[10px]">
                    {item.code}
                  </span>
                  <span className="label text-xs">{item.label}</span>
                  <span className="eyebrow ml-auto text-[9px] text-ink-muted">
                    {item.status}
                  </span>
                  <span className="socket-tab-spur" aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          id="socket-preview"
          className="socket-preview"
          role="region"
          aria-label={`Socket preview: ${active.label}`}
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="eyebrow text-ink-muted">
            preview · {active.code}
          </p>
          <h3 className="display mt-2 text-[clamp(1.5rem,3vw,2.25rem)]">
            {active.label}
          </h3>
          <p className="mt-2 text-sm text-ink-muted">{active.blurb}</p>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-ink/25 pt-3 text-sm">
            <div>
              <dt className="label text-[9px] text-ink-muted">Spec</dt>
              <dd className="mt-0.5">{active.spec}</dd>
            </div>
            <div>
              <dt className="label text-[9px] text-ink-muted">Holds</dt>
              <dd className="mt-0.5">{counts[active.code] ?? "—"}</dd>
            </div>
            <div>
              <dt className="label text-[9px] text-ink-muted">Status</dt>
              <dd className="mt-0.5">{active.status}</dd>
            </div>
            <div>
              <dt className="label text-[9px] text-ink-muted">Section</dt>
              <dd className="mt-0.5">{active.code.replace("C0", "")}.0</dd>
            </div>
          </dl>

          <Link
            href={active.href}
            className="eyebrow mt-4 inline-block border-b border-accent pb-1 hover:text-accent"
          >
            open section →
          </Link>

          <details className="mt-5 border-t border-ink/25 pt-3">
            <summary className="eyebrow cursor-pointer list-none text-ink-muted hover:text-accent [&::-webkit-details-marker]:hidden">
              ? diagnostics
            </summary>
            <dl className="eyebrow mt-2 grid grid-cols-[5.5rem_1fr] gap-y-1 text-ink-muted">
              <dt>model</dt>
              <dd className="text-ink">BZ-2026</dd>
              <dt>sockets</dt>
              <dd className="text-ink">
                {components.length} ·{" "}
                {components.filter((item) => item.status === "live").length} populated
              </dd>
              <dt>entries</dt>
              <dd className="text-ink">
                {notes.length} notes · {journal.length} journal · {projects.length} projects
              </dd>
              <dt>last revision</dt>
              <dd className="text-ink">
                {lastRevision ? formatDate(lastRevision) : "unknown"}
              </dd>
            </dl>
          </details>
        </div>
      </div>
    </div>
  );
}
