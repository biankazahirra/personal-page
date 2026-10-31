"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ASSEMBLY_TOTAL, foundCount } from "@/lib/assembly";

const SESSION_KEY = "bz-assembly-startup";

/**
 * The reward state: at 10/10 the unit starts up once per session. It is a
 * real dialog (Escape closes, focus is managed) but never blocks the content
 * underneath for long.
 */
export function AssemblyComplete() {
  const [open, setOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const check = () => {
      if (foundCount() < ASSEMBLY_TOTAL) return;
      try {
        if (window.sessionStorage.getItem(SESSION_KEY)) return;
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Private mode: show it once per page load.
      }
      setOpen(true);
    };

    check();
    window.addEventListener("assemblychange", check);
    window.addEventListener("storage", check);
    return () => {
      window.removeEventListener("assemblychange", check);
      window.removeEventListener("storage", check);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    previousFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialog.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href]',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus.current?.focus({ preventScroll: true });
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="assembly-startup fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-ink/70 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="assembly-title"
      aria-describedby="assembly-note"
    >
      <div
        ref={dialog}
        className="overlay-panel relative max-h-[calc(100dvh-2rem)] w-full max-w-[42rem] overflow-y-auto border-2 border-ink bg-paper p-6 text-ink shadow-[8px_8px_0_rgba(43,38,32,0.35)] md:p-10"
      >
        <div className="hazard absolute inset-x-0 top-0 h-2" aria-hidden="true" />

        <div className="flex flex-wrap items-start justify-between gap-4 pt-3">
          <p className="eyebrow text-ink-muted">
            Final inspection · Model BZ-2026
          </p>
          <button
            ref={closeButton}
            type="button"
            onClick={() => setOpen(false)}
            className="eyebrow border-2 border-ink px-3 py-2 hover:bg-ink hover:text-paper"
          >
            Close
          </button>
        </div>

        <p className="stamp stamp-in mt-6 inline-block text-sm" data-tone="mustard">
          Assembled — Approved
        </p>

        <h2
          id="assembly-title"
          className="display mt-5 text-[clamp(2.25rem,7vw,4.25rem)]"
        >
          Unit assembled.
        </h2>

        <p id="assembly-note" className="mt-4 max-w-[44ch] text-lg">
          thanks for the thorough inspection. the lamp is on, the count is{" "}
          {ASSEMBLY_TOTAL}/{ASSEMBLY_TOTAL}, and the manual is complete enough
          to use.
        </p>

        <div className="notice mt-6 px-4 py-4">
          <p className="label text-[10px] text-ink-muted">
            Hidden extra · service note no. 10
          </p>
          <p className="mt-2 max-w-[46ch] text-sm">
            the machine is mostly paper. keep it that way. a printed copy of
            this note now lives at the bottom of the index.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-ink/30 pt-5">
          <Link
            href="/#service-note"
            onClick={() => setOpen(false)}
            className="eyebrow border-b border-accent pb-1 hover:text-accent"
          >
            read the service note
          </Link>
          <p className="eyebrow ml-auto text-ink-muted">
            {foundCount()}/{ASSEMBLY_TOTAL} parts found
          </p>
        </div>
      </div>
    </div>
  );
}
