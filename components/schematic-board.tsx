"use client";

import Link from "next/link";
import { useState } from "react";

import { components } from "@/content/components";
import { films } from "@/content/films";
import { journal } from "@/content/journal";
import { notes } from "@/content/notes";
import { projects } from "@/content/projects";
import { timeline } from "@/content/timeline";

const counts: Record<string, string> = {
  C01: `${components.length} sockets`,
  C02: `${timeline.length} revisions`,
  C03: `${notes.length} notes`,
  C04: `${journal.length} entries`,
  C05: films.length === 0 ? "no entries yet" : `${films.length} films`,
  C06: `${projects.length} projects`,
};

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
        <p className="eyebrow text-ink-muted">
          <span className="hidden md:inline">probe a socket</span>
          <span className="md:hidden">six sockets</span>
        </p>
      </div>

      {/* Phones get the whole plate: six labelled sockets at once, a readout that
          names the touched one, and one open link. No sideways rack, no swipe. */}
      <div className="md:hidden">
        <ul className="socket-grid" aria-label="Sockets">
          {components.map((item) => {
            const isActive = active.code === item.code;
            return (
              <li key={item.code}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`${item.code} ${item.label} — ${item.plain}`}
                  aria-controls="socket-readout"
                  onClick={() => setProbed(item.code)}
                  data-active={isActive}
                  className="socket-slot"
                >
                  <span className="socket-slot-row">
                    <span aria-hidden="true" className="socket-jack" />
                    <span className="socket-tab-code label text-[10px]">
                      {item.code}
                    </span>
                    <span className="socket-slot-status eyebrow">{item.status}</span>
                  </span>
                  <span className="label socket-slot-title">{item.label}</span>
                  <span className="eyebrow socket-slot-plain">{item.plain}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div
          id="socket-readout"
          className="socket-readout"
          role="region"
          aria-label={`Socket readout: ${active.label} — ${active.plain}`}
          aria-live="polite"
        >
          <div className="min-w-0">
            <p className="label text-[10px]">
              <span className="text-accent">{active.code}</span>
              <span className="eyebrow text-ink-muted"> · {active.blurb}</span>
            </p>
            <p className="socket-readout-spec">{active.spec}</p>
          </div>

          {active.draft ? (
            <span className="stamp shrink-0" data-tone="mustard">
              Under construction
            </span>
          ) : (
            <Link href={active.href} className="socket-readout-open">
              open →
            </Link>
          )}
        </div>
      </div>

      <div className="socket-board-body">
        <ul className="socket-tabs" aria-label="Sockets">
          {components.map((item) => {
            const isActive = active.code === item.code;
            const tab = (
              <>
                <span className="label socket-tab-code text-[10px]">
                  {item.code}
                </span>
                <span className="label text-xs">{item.label}</span>
                <span className="eyebrow ml-auto text-[9px] text-ink-muted">
                  {item.status}
                </span>
                <span className="socket-tab-spur" aria-hidden="true" />
              </>
            );

            return (
              <li key={item.code}>
                {item.draft ? (
                  <span
                    data-active={isActive}
                    data-code={item.code}
                    aria-label={`${item.code} ${item.label} — under construction`}
                    onMouseEnter={() => setProbed(item.code)}
                    onMouseLeave={() => setProbed(null)}
                    className="socket-tab cursor-default"
                  >
                    {tab}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    data-active={isActive}
                    data-code={item.code}
                    aria-label={`${item.code} ${item.label} — ${item.plain}`}
                    aria-controls="socket-preview"
                    onMouseEnter={() => setProbed(item.code)}
                    onMouseLeave={() => setProbed(null)}
                    onFocus={() => setProbed(item.code)}
                    onBlur={() => setProbed(null)}
                    onPointerDown={() => setProbed(item.code)}
                    className="socket-tab"
                  >
                    {tab}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div
          id="socket-preview"
          className="socket-preview"
          role="region"
          aria-label={`Socket preview: ${active.label} — ${active.plain}`}
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="eyebrow text-ink-muted">
            preview · {active.code}
          </p>
          <h3 className="display mt-2 text-[clamp(1.5rem,3vw,2.25rem)]">
            {active.label}
          </h3>
          <p className="eyebrow mt-1 text-accent">{active.plain}</p>
          <p className="mt-2 text-sm text-ink-muted">{active.blurb}</p>

          {/* Only the two facts the tab cannot show. Status and the section
              number restate the tab's own code and status chip. */}
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-ink/25 pt-3 text-sm">
            <div>
              <dt className="label text-[9px] text-ink-muted">Spec</dt>
              <dd className="mt-0.5">{active.spec}</dd>
            </div>
            <div>
              <dt className="label text-[9px] text-ink-muted">Holds</dt>
              <dd className="mt-0.5">{counts[active.code] ?? "—"}</dd>
            </div>
          </dl>

          {active.draft ? (
            <span className="stamp mt-4 inline-block" data-tone="mustard">
              Under construction
            </span>
          ) : (
            <Link
              href={active.href}
              className="eyebrow mt-4 inline-block border-b border-accent pb-1 hover:text-accent"
            >
              open section →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
