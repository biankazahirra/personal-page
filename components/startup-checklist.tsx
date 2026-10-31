"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { bootLines, manual } from "@/content/manual";
import { hasFound, markFound } from "@/lib/assembly";
import { playBell } from "@/lib/sound";

const SESSION_KEY = "bz-booted";

/**
 * The first ten seconds: a printed self-test that types itself out, then a
 * START UNIT button. Shown once per session, always skippable, never required
 * to read the page. Without JavaScript it never mounts.
 */
export function StartupChecklist() {
  const [visible, setVisible] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [typing, setTyping] = useState(true);
  const startButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const savedScroll = useRef(0);
  const fastForward = useRef(false);

  const close = useCallback((completed: boolean) => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Private mode: show it again on the next load.
    }

    // Both actions count as "started": skipping must never leave the visitor
    // stuck one part short of a complete assembly.
    markFound("boot");
    if (completed) playBell();

    setVisible(false);

    // Put the page back exactly where it was, then hand focus to the hero
    // heading. Focusing the ASSEMBLE button here used to scroll the page and
    // trigger the scroll-assembly before the visitor had seen the diagram.
    window.setTimeout(() => {
      window.scrollTo(0, savedScroll.current);
      document
        .getElementById("hero-title")
        ?.focus({ preventScroll: true });
    }, 0);
  }, []);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // Fall through: show it, storage is optional.
    }
    if (hasFound("boot")) return;
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    fastForward.current = false;
    const reduced = document.documentElement.dataset.motion !== "full";
    if (reduced) {
      setLines([...bootLines]);
      setTyping(false);
      return;
    }

    let cancelled = false;
    let timer = 0;
    let lineIndex = 0;
    let charIndex = 0;

    const step = () => {
      if (cancelled || fastForward.current) return;
      if (lineIndex >= bootLines.length) {
        setTyping(false);
        return;
      }

      const line = bootLines[lineIndex];
      charIndex += 1;
      setLines((previous) => {
        const next = [...previous];
        next[lineIndex] = line.slice(0, charIndex);
        return next;
      });

      if (charIndex >= line.length) {
        lineIndex += 1;
        charIndex = 0;
        timer = window.setTimeout(step, 180);
      } else {
        timer = window.setTimeout(step, 10 + Math.random() * 14);
      }
    };

    timer = window.setTimeout(step, 120);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [visible]);

  useEffect(() => {
    if (!visible || typing) return;
    startButton.current?.focus({ preventScroll: true });
  }, [visible, typing]);

  useEffect(() => {
    if (!visible) return;

    savedScroll.current = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close(false);
        return;
      }

      const tag = (event.target as HTMLElement | null)?.tagName;
      const onControl = tag === "BUTTON" || tag === "A" || tag === "INPUT";

      if (!onControl && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        if (startButton.current?.disabled) {
          // Enter / Space during the self-test prints the remaining lines.
          fastForward.current = true;
          setLines([...bootLines]);
          setTyping(false);
        } else {
          close(true);
        }
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
    };
  }, [visible, close]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[75] flex items-center justify-center overflow-y-auto bg-ink/60 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="boot-title"
    >
      <div
        ref={dialog}
        className="overlay-panel relative max-h-[calc(100dvh-2rem)] w-full max-w-[40rem] overflow-y-auto border-2 border-ink bg-paper p-5 text-ink shadow-[8px_8px_0_rgba(43,38,32,0.35)] md:p-8"
      >
        <div className="hazard absolute inset-x-0 top-0 h-2" aria-hidden="true" />

        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink/70 pb-3 pt-3">
          <p className="eyebrow text-ink-muted">Form 2026-A · self-test</p>
          <p className="eyebrow text-ink-muted">Model {manual.model}</p>
        </div>

        <h2 id="boot-title" className="display mt-5 text-[clamp(2rem,6vw,3.5rem)]">
          Start-up checklist
        </h2>
        <p className="mt-2 max-w-[42ch] text-sm text-ink-muted">
          The unit runs a short check before the index opens. Skip it whenever
          you like; nothing is required.
        </p>

        <p className="sr-only">
          Self-test: power ok, curiosity excessive, ukulele uncalibrated, forms
          in order, status partly assembled.
        </p>

        <div className="mt-6 min-h-[9.5rem] border border-ink/35 bg-paper-2/45 px-4 py-4 font-mono text-sm leading-7 md:text-base">
          <p aria-hidden="true" className="eyebrow mb-2 text-ink-muted">
            {">"} running self-test
          </p>
          <div aria-hidden="true">
            {lines.map((line, index) => (
              <p key={index} className="whitespace-pre">
                {line}
                {typing && index === lines.length - 1 ? (
                  <span className="boot-cursor" />
                ) : null}
              </p>
            ))}
            {typing && lines.length === 0 ? <span className="boot-cursor" /> : null}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            ref={startButton}
            type="button"
            disabled={typing}
            onClick={() => close(true)}
            className="label min-h-11 border-2 border-ink bg-ink px-5 py-3 text-xs text-paper transition-colors hover:border-accent hover:bg-accent disabled:cursor-wait disabled:opacity-50"
          >
            Start unit
          </button>
          <button
            type="button"
            onClick={() => close(false)}
            className="eyebrow min-h-11 border-b border-ink/40 px-2 pb-1 pt-2 text-ink-muted hover:border-accent hover:text-accent"
          >
            Skip self-test
          </button>
          <p className="eyebrow ml-auto text-ink-muted">
            enter / space · esc to skip
          </p>
        </div>
      </div>
    </div>
  );
}
