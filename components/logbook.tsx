"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { noteCategories } from "@/content/notes";
import type { Note } from "@/content/types";
import { formatDate } from "@/lib/format";

type Tag = "all" | Note["category"];
type LogState = "all" | "resolved" | "open" | "abandoned";

const stateLabel: Record<Exclude<LogState, "all">, string> = {
  resolved: "resolved",
  open: "still open",
  abandoned: "abandoned",
};

const stateTone: Record<Exclude<LogState, "all">, string> = {
  resolved: "resolved",
  open: "accent",
  abandoned: "muted",
};

function stateOf(note: Note): Exclude<LogState, "all"> {
  if (note.status === "closed") return "resolved";
  if (note.status === "dropped") return "abandoned";
  return "open";
}

function severityLevel(note: Note) {
  if (note.severity === "critical") return 3;
  if (note.severity === "moderate") return 2;
  if (note.severity === "minor") return 1;
  return 0;
}

/**
 * C03 as the maintenance logbook. The filters are real radio groups, so the
 * page still reads as a complete log with JavaScript off; filtering only
 * narrows what is already in the HTML. Fault codes come from the content file.
 */
export function Logbook({ notes }: { notes: Note[] }) {
  const [tag, setTag] = useState<Tag>("all");
  const [state, setState] = useState<LogState>("all");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextTag = params.get("tag");
    const nextState = params.get("state");

    if (nextTag && noteCategories.some((category) => category.value === nextTag)) {
      setTag(nextTag as Tag);
    }
    if (nextState === "resolved" || nextState === "open" || nextState === "abandoned") {
      setState(nextState);
    }
  }, []);

  function selectTag(next: Tag) {
    setTag(next);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("tag");
    else url.searchParams.set("tag", next);
    window.history.replaceState(null, "", url);
  }

  function selectState(next: LogState) {
    setState(next);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("state");
    else url.searchParams.set("state", next);
    window.history.replaceState(null, "", url);
  }

  const visible = notes.filter(
    (note) =>
      (tag === "all" || note.category === tag) &&
      (state === "all" || stateOf(note) === state),
  );

  const open = notes.filter((note) => stateOf(note) === "open").length;
  const resolved = notes.filter((note) => stateOf(note) === "resolved").length;

  const tags: { value: Tag; label: string }[] = [
    { value: "all", label: "all tags" },
    ...noteCategories.map((category) => ({
      value: category.value as Tag,
      label: category.label,
    })),
  ];

  const states: { value: LogState; label: string }[] = [
    { value: "all", label: "any state" },
    { value: "open", label: "still open" },
    { value: "resolved", label: "resolved" },
    { value: "abandoned", label: "abandoned" },
  ];

  return (
    <div className="logbook">
      <div className="logbook-plate">
        <p className="eyebrow text-ink-muted">Maintenance log · unit BZ-2026</p>
        <p className="eyebrow text-ink-muted">
          entries <span className="text-ink">{notes.length}</span> · open{" "}
          <span className="text-accent">{open}</span> · resolved{" "}
          <span className="text-ink">{resolved}</span>
        </p>
      </div>

      <div className="logbook-filters">
        <div
          role="radiogroup"
          aria-label="Filter log entries by tag"
          className="flex flex-wrap items-baseline gap-x-5 gap-y-2"
        >
          <span className="eyebrow text-ink-muted">tag</span>
          {tags.map(({ value, label }) => (
            <label
              key={value}
              className="filter-option eyebrow cursor-pointer"
              data-active={tag === value}
            >
              <input
                type="radio"
                name="log-tag"
                value={value}
                checked={tag === value}
                onChange={() => selectTag(value)}
                className="sr-only"
              />
              <span>{label}</span>
              <span className="filter-count">
                {value === "all"
                  ? notes.length
                  : notes.filter((note) => note.category === value).length}
              </span>
            </label>
          ))}
        </div>

        <div
          role="radiogroup"
          aria-label="Filter log entries by state"
          className="flex flex-wrap items-baseline gap-x-5 gap-y-2"
        >
          <span className="eyebrow text-ink-muted">state</span>
          {states.map(({ value, label }) => (
            <label
              key={value}
              className="filter-option eyebrow cursor-pointer"
              data-active={state === value}
            >
              <input
                type="radio"
                name="log-state"
                value={value}
                checked={state === value}
                onChange={() => selectState(value)}
                className="sr-only"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <p className="eyebrow mt-4 text-ink-muted" aria-live="polite">
        showing <span className="text-accent">{visible.length}</span> of {notes.length}{" "}
        {notes.length === 1 ? "entry" : "entries"}
        {tag === "all" ? "" : ` · tag ${tag}`}
        {state === "all" ? "" : ` · ${stateLabel[state]}`}
      </p>

      {visible.length === 0 ? (
        <p className="mt-10 border-t border-ink/15 pt-6 text-ink-muted">
          No entries match that combination yet. The log keeps what happened,
          not what would look tidy.
        </p>
      ) : (
        <ol className="mt-8 border-t border-ink/25">
          {visible.map((note) => {
            const logState = stateOf(note);
            const level = severityLevel(note);

            return (
              <li key={note.slug} className="log-entry">
                <div className="log-rail">
                  <span className="log-code">{note.faultCode ?? "E-000"}</span>
                  {note.date ? (
                    <span className="log-date">{formatDate(note.date)}</span>
                  ) : null}
                  {note.placeholder ? (
                    <span className="log-sample">sample</span>
                  ) : null}
                </div>

                <div className="log-body">
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                    <h2 className="display text-[clamp(1.6rem,3vw,2.35rem)]">
                      {note.body ? (
                        <Link
                          href={`/curiosity/${note.slug}`}
                          className="hover:text-accent"
                        >
                          {note.title}
                        </Link>
                      ) : (
                        note.title
                      )}
                    </h2>
                    <span className="stamp shrink-0" data-tone={stateTone[logState]}>
                      {stateLabel[logState]}
                    </span>
                  </div>

                  <p className="eyebrow mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-muted">
                    <span>{note.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="severity"
                        data-level={level}
                        aria-hidden="true"
                      >
                        <span />
                        <span />
                        <span />
                      </span>
                      severity: {note.severity ?? "not recorded"}
                    </span>
                  </p>

                  <p className="mt-3 max-w-[58ch] text-ink-muted">{note.excerpt}</p>

                  <dl className="log-findings">
                    <div>
                      <dt className="eyebrow text-ink-muted">root cause</dt>
                      <dd className={note.rootCause ? "" : "text-ink-muted"}>
                        {note.rootCause ?? "[ not recorded — still being worked out ]"}
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-ink-muted">fix</dt>
                      <dd className={note.fix ? "" : "text-ink-muted"}>
                        {note.fix ??
                          (logState === "open"
                            ? "[ no fix yet — the entry stays open ]"
                            : "[ no fix recorded ]")}
                      </dd>
                    </div>
                  </dl>

                  {note.body ? (
                    <Link
                      href={`/curiosity/${note.slug}`}
                      className="eyebrow mt-4 inline-flex items-center gap-2 border-b border-accent pb-1 hover:text-accent"
                    >
                      read the full entry <span aria-hidden="true">→</span>
                    </Link>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
