"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const LogbookConsole = dynamic(
  () => import("@/components/logbook-console").then((module) => module.LogbookConsole),
  {
    ssr: false,
    loading: () => (
      <p className="eyebrow border border-ink/30 bg-paper-2/50 px-4 py-6 text-ink-muted">
        loading console…
      </p>
    ),
  },
);

/**
 * The console is collapsible and lazily loaded: the chunk only arrives when
 * the visitor asks for it. Every command has a plain page equivalent.
 */
export function ConsoleShell() {
  const [open, setOpen] = useState(false);

  // Open by default on desktop, closed on mobile.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    setOpen(desktop.matches);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="logbook-console"
          className="label border-2 border-ink px-5 py-3 text-xs transition-colors hover:bg-ink hover:text-paper"
        >
          {open ? "Close console" : "Open console"}
        </button>
        <p className="eyebrow text-ink-muted">
          optional · lazy-loaded · sound off by default
        </p>
      </div>

      {open ? (
        <>
          <div
            className="console-backdrop md:hidden"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div id="logbook-console" className="console-sheet mt-5">
            <div className="console-sheet-head items-center justify-between gap-3 px-4 py-2">
              <p className="eyebrow text-paper-on-night/60">logbook console</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="eyebrow min-h-[44px] px-2 text-paper-on-night/75 hover:text-accent-warm"
              >
                close
              </button>
            </div>
            <LogbookConsole />
          </div>
        </>
      ) : (
        <div className="mt-5">
          {/* <p className="max-w-[52ch] border border-dashed border-ink/35 px-4 py-4 text-sm text-ink-muted">
            The console is closed. It accepts{" "}
            <span className="font-mono text-ink">help</span>,{" "}
            <span className="font-mono text-ink">whoami</span>,{" "}
            <span className="font-mono text-ink">projects</span>,{" "}
            <span className="font-mono text-ink">films</span>,{" "}
            <span className="font-mono text-ink">fault-log</span> and{" "}
            <span className="font-mono text-ink">sudo hire-me</span>. Nothing on
            this site needs it.
          </p> */}
          <noscript>
            <p className="mt-3 max-w-[52ch] border-l-2 border-accent px-3 py-2 text-sm text-ink-muted">
              The console needs JavaScript. Every command also has a page:{" "}
              <Link href="/projects" className="border-b border-accent">
                projects
              </Link>
              ,{" "}
              <Link href="/films" className="border-b border-accent">
                films
              </Link>{" "}
              and{" "}
              <Link href="/contact" className="border-b border-accent">
                contact
              </Link>
              .
            </p>
          </noscript>
        </div>
      )}
    </div>
  );
}
