"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { noteCategories } from "@/content/notes";
import type { Note } from "@/content/types";
import { formatDate } from "@/lib/format";

type Channel = "all" | Note["category"];

const statuses = ["running", "closed", "dropped"] as const;

function countIn(notes: Note[], channel: Channel) {
  return channel === "all"
    ? notes.length
    : notes.filter((note) => note.category === channel).length;
}

/**
 * The curiosity index as a four-position channel bank. Picking a channel is a
 * real state change: notes off the channel dim and leave the tab order, the
 * readout reports what is live, and hovering a note lights its channel back.
 * The choice lives in the URL, so returning from a note keeps the channel.
 */
export function NotesBoard({ notes }: { notes: Note[] }) {
  const [channel, setChannel] = useState<Channel>("all");
  const [probed, setProbed] = useState<Note["category"] | null>(null);

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("channel");
    if (value && noteCategories.some((category) => category.value === value)) {
      setChannel(value as Channel);
    }
  }, []);

  function select(next: Channel) {
    setChannel(next);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("channel");
    else url.searchParams.set("channel", next);
    window.history.replaceState(null, "", url);
  }

  const channels: { value: Channel; label: string }[] = [
    { value: "all", label: "all" },
    ...noteCategories.map((category) => ({
      value: category.value as Channel,
      label: category.label,
    })),
  ];

  const visible = channel === "all" ? notes : notes.filter((note) => note.category === channel);
  const summary = statuses
    .map((status) => ({
      status,
      count: visible.filter((note) => note.status === status).length,
    }))
    .filter((entry) => entry.count > 0)
    .map((entry) => `${entry.count} ${entry.status}`)
    .join(" · ");

  return (
    <div className="notes-board">
      <div
        role="radiogroup"
        aria-label="Filter notes by category"
        className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-ink/15 pb-4"
      >
        {channels.map(({ value, label }) => {
          const active = channel === value;
          return (
            <label
              key={value}
              className="filter-option eyebrow cursor-pointer pb-1"
              data-active={active}
              data-probe={probed === value}
            >
              <input
                type="radio"
                name="note-channel"
                value={value}
                checked={active}
                onChange={() => select(value)}
                className="sr-only"
              />
              <span>{label}</span>
              <span className="filter-count">{countIn(notes, value)}</span>
            </label>
          );
        })}
      </div>

      <p className="eyebrow mt-4 text-ink-muted" aria-live="polite">
        channel <span className="text-accent">{channel}</span> · {visible.length}{" "}
        {visible.length === 1 ? "note" : "notes"}
        {summary ? ` · ${summary}` : ""}
      </p>

      {visible.length === 0 ? (
        <p className="mt-10 text-ink-muted">no notes on this channel yet.</p>
      ) : (
        <ul className="mt-10 grid gap-x-10 gap-y-14 md:grid-cols-2">
          {notes.map((note, index) => {
            const muted = channel !== "all" && note.category !== channel;

            const body = (
              <>
                <p className="eyebrow flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-muted">
                  <span>{note.category}</span>
                  {note.date ? <span>· {formatDate(note.date)}</span> : null}
                  {note.placeholder ? <span>· sample</span> : null}
                  {note.status ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden="true">·</span>
                      <span aria-hidden="true" className="status-led" data-status={note.status} />
                      {note.status}
                    </span>
                  ) : null}
                </p>
                <h2 className="display mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] group-hover:text-accent">
                  {note.title}
                </h2>
                <p className="mt-3 max-w-[44ch] text-ink-muted">{note.excerpt}</p>
                {note.body ? (
                  <p className="eyebrow mt-5 text-ink-muted group-hover:text-accent">
                    read the note
                  </p>
                ) : null}
              </>
            );

            return (
              <li
                key={note.slug}
                className={`transition-opacity duration-200 ${
                  muted ? "pointer-events-none opacity-35" : "opacity-100"
                } ${index % 3 === 1 ? "md:mt-14" : ""}`}
              >
                {note.body ? (
                  <Link
                    href={`/curiosity/${note.slug}`}
                    className="group block"
                    aria-hidden={muted || undefined}
                    tabIndex={muted ? -1 : undefined}
                    onMouseEnter={() => setProbed(note.category)}
                    onMouseLeave={() => setProbed(null)}
                    onFocus={() => setProbed(note.category)}
                    onBlur={() => setProbed(null)}
                  >
                    {body}
                  </Link>
                ) : (
                  <div
                    className="group"
                    onMouseEnter={() => setProbed(note.category)}
                    onMouseLeave={() => setProbed(null)}
                  >
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
