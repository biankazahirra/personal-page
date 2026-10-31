"use client";

import Link from "next/link";
import type { FormEvent, KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";

import { films } from "@/content/films";
import { manual, sections } from "@/content/manual";
import { notes } from "@/content/notes";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { markFound } from "@/lib/assembly";
import { playKey } from "@/lib/sound";

type Line = {
  text: string;
  href?: string;
  external?: boolean;
  prompt?: boolean;
  muted?: boolean;
};

const intro: Line[] = [
  {
    text: `BZ-2026 logbook console. type "help" for commands.`,
    muted: true,
  },
  {
    text: "this console is optional. every section is also a page.",
    muted: true,
  },
];

function run(command: string): Line[] {
  const [head, ...rest] = command.trim().split(/\s+/);
  const verb = (head ?? "").toLowerCase();
  const argument = rest.join(" ").toLowerCase();

  if (verb === "help") {
    return [
      { text: "available commands:", muted: true },
      { text: "  help ............ this list" },
      { text: "  whoami .......... the operator" },
      { text: "  contents ........ the manual sections" },
      { text: "  projects ........ what I have built" },
      { text: "  films ........... the film journal" },
      { text: "  fault-log ....... notes, including the dropped ones" },
      { text: "  sudo hire-me .... a service request" },
      { text: "  clear ........... clear the screen" },
    ];
  }

  if (verb === "whoami") {
    return [
      { text: `${site.name} — ${site.tagline}` },
      { text: "administration support by day. forms, spreadsheets, small systems." },
      { text: "notes, films, songs and a ukulele after hours." },
    ];
  }

  if (verb === "contents") {
    return sections.map((section) => ({
      text: `${section.section}  ${section.title}  ·  ${section.page}`,
      href: section.href,
    }));
  }

  if (verb === "projects") {
    if (projects.length === 0) {
      return [{ text: "no projects listed yet.", muted: true }];
    }
    return [
      { text: `${projects.length} projects:`, muted: true },
      ...projects.map((project) => ({
        text: `  ${project.title} — ${project.status}${project.year ? ` · ${project.year}` : ""}`,
        href: `/projects/${project.slug}`,
      })),
    ];
  }

  if (verb === "films") {
    if (films.length === 0) {
      return [{ text: "no films logged yet.", muted: true }];
    }
    return [
      { text: `${films.length} films in the indicator panel:`, muted: true },
      ...films.map((film) => ({
        text: `  ${film.title}${film.year ? ` (${film.year})` : ""}${film.director ? ` — ${film.director}` : ""}`,
        href: film.letterboxdUrl,
        external: Boolean(film.letterboxdUrl),
      })),
      { text: "the panel itself:", href: "/films" },
    ];
  }

  if (verb === "fault-log" || (verb === "fault" && argument === "log")) {
    if (notes.length === 0) {
      return [{ text: "no faults logged. suspicious.", muted: true }];
    }
    return [
      { text: `${notes.length} entries in the maintenance logbook:`, muted: true },
      ...notes.map((note, index) => ({
        text: `  E-${String(index + 1).padStart(3, "0")}  [${note.status ?? "open"}]  ${note.title}`,
        href: note.body ? `/curiosity/${note.slug}` : "/curiosity",
      })),
      { text: "filter by channel on the logbook page:", href: "/curiosity" },
    ];
  }

  if (verb === "sudo") {
    if (argument === "hire-me" || argument === "hire me") {
      return [
        { text: "permission granted. no password required for curiosity." },
        { text: "opening the service request form:", href: "/contact" },
      ];
    }
    return [
      { text: `sudo: "${argument || "?"}" is not a command. try: sudo hire-me`, muted: true },
    ];
  }

  if (verb === "clear") {
    return [];
  }

  return [
    { text: `ERROR 404: page missing from manual — "${command.trim()}"`, muted: false },
    { text: 'type "help" for the command list.', muted: true },
  ];
}

export function LogbookConsole() {
  const [lines, setLines] = useState<Line[]>(intro);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  useEffect(() => {
    const node = log.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [lines]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = value.trim();
    if (!command) return;

    playKey();
    markFound("console");
    setHistory((previous) => [command, ...previous].slice(0, 20));
    setHistoryIndex(-1);
    setValue("");

    if (command.toLowerCase() === "clear") {
      setLines([]);
      return;
    }

    setLines((previous) => [
      ...previous,
      { text: `> ${command}`, prompt: true },
      ...run(command),
    ]);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const next = Math.min(history.length - 1, historyIndex + 1);
      setHistoryIndex(next);
      setValue(history[next]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setValue("");
        return;
      }
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setValue(history[next]);
    }
  };

  return (
    <div className="console">
      <div className="console-head">
        <p className="eyebrow text-paper-on-night/70">
          logbook console · model {manual.model}
        </p>
        <p className="eyebrow text-paper-on-night/45">optional · never required</p>
      </div>

      <div
        ref={log}
        className="console-log"
        role="log"
        aria-live="polite"
        aria-label="Console output"
      >
        {lines.map((line, index) => (
          <p
            key={index}
            className={`console-line ${
              line.prompt
                ? "console-prompt"
                : line.muted
                  ? "text-paper-on-night/60"
                  : ""
            }`}
          >
            {line.href ? (
              line.external ? (
                <a
                  href={line.href}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="console-link"
                >
                  {line.text}
                </a>
              ) : (
                <Link href={line.href} className="console-link">
                  {line.text}
                </Link>
              )
            ) : (
              line.text
            )}
          </p>
        ))}
      </div>

      <form onSubmit={submit} className="console-form">
        <label htmlFor="console-input" className="sr-only">
          Console command
        </label>
        <span aria-hidden="true" className="console-prompt">
          BZ-2026&gt;
        </span>
        <input
          ref={input}
          id="console-input"
          name="command"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="type help"
          className="console-input"
        />
      </form>

      <p className="console-hint eyebrow">
        enter to run · ↑ ↓ for history · no command is required
      </p>
    </div>
  );
}
