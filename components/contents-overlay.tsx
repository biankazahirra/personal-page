"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { manual, sections } from "@/content/manual";

/**
 * Printed table of contents, opened from the header band. Keyboard rules match
 * the old components menu: Escape closes, focus stays inside, trigger gets it back.
 */
export function ContentsOverlay() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialog.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
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
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="contents"
        className="band-control eyebrow"
      >
        Contents
      </button>

      {open ? (
        <div
          id="contents"
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label="Table of contents"
          className="fixed inset-0 z-[60] overflow-y-auto bg-paper text-ink"
        >
          <div className="overlay-panel mx-auto flex min-h-full w-full max-w-[1100px] flex-col px-6 py-6 md:px-10 md:py-10">
            <div className="flex items-start justify-between gap-6 border-b-2 border-ink/70 pb-4">
              <div>
                <p className="eyebrow text-ink-muted">
                  Model {manual.model} · {manual.printedRev}
                </p>
                <h2 className="display mt-2 text-[clamp(2rem,6vw,3.5rem)]">Contents</h2>
              </div>
              <button
                ref={closeButton}
                type="button"
                onClick={() => {
                  setOpen(false);
                  trigger.current?.focus();
                }}
                className="eyebrow border-2 border-ink px-3 py-2 hover:bg-ink hover:text-paper"
              >
                Close
              </button>
            </div>

            <nav aria-label="Manual sections" className="flex-1 py-6">
              <ol>
                {sections.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.code} className="border-b border-ink/25">
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4 md:flex-nowrap"
                      >
                        <span className="label w-14 shrink-0 text-ink-muted">
                          {item.section}
                        </span>
                        <span className="min-w-0">
                          <span
                            className={`label block text-[clamp(1.05rem,2.6vw,1.6rem)] tracking-[0.06em] transition-colors group-hover:text-accent ${
                              active ? "text-accent" : ""
                            }`}
                          >
                            {item.title}
                          </span>
                          <span className="mt-1 block text-sm text-ink-muted">
                            {item.blurb}
                          </span>
                        </span>
                        <span className="toc-leader hidden md:block" aria-hidden="true" />
                        <span className="label ml-auto shrink-0 text-xs text-ink-muted md:ml-0">
                          {item.page}
                        </span>
                        {active ? (
                          <span className="stamp ml-2 hidden shrink-0 sm:inline-block">
                            In use
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className="flex flex-wrap items-baseline justify-between gap-3 border-t-2 border-ink/70 pt-4">
              <p className="text-sm text-ink-muted">
                Keyboard: tab to move, enter to open, escape to close.
              </p>
              <p className="eyebrow text-ink-muted">{manual.printedRev}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
