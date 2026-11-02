"use client";

import { useEffect, useRef, useState } from "react";

import { LangEditions } from "@/components/lang-editions";
import { t } from "@/content/i18n";
import { currentMotion, setMotionMode } from "@/lib/motion";
import { setSound, soundOn } from "@/lib/sound";

function SlidersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
    >
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8M4 12h16" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="10" cy="17" r="2" />
    </svg>
  );
}

function SwitchRow({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-ink/20 py-1 first:border-t-0">
      <p className="label text-xs">{label}</p>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={`${label} ${on ? "on" : "off"}`}
        onClick={() => onChange(!on)}
        className={`label min-h-[44px] min-w-[5.5rem] border-2 border-ink px-3 text-xs transition-colors ${
          on ? "bg-mustard text-ink" : "bg-paper-2 text-ink-muted"
        }`}
      >
        {on ? "on" : "off"}
      </button>
    </div>
  );
}

/**
 * Mobile-only settings: motion, sound and print editions in one popover, so
 * the phone band keeps only the model, the meter, the shift and Contents.
 * The desktop header is untouched.
 */
export function MobileSettings() {
  const [open, setOpen] = useState(false);
  const [motionOn, setMotionOn] = useState(true);
  const [sound, setSoundState] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    setMotionOn(currentMotion() === "full");
    setSoundState(soundOn());

    const focusables = () =>
      Array.from(
        panel.current?.querySelectorAll<HTMLElement>(
          'button, [href], summary, input, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        button.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = focusables();
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    button.current?.focus();
  };

  return (
    <div className="relative md:hidden">
      <button
        ref={button}
        type="button"
        aria-label="Settings"
        aria-expanded={open}
        aria-controls="mobile-settings"
        onClick={() => setOpen((value) => !value)}
        className="band-control inline-flex min-w-[44px] items-center justify-center"
      >
        <SlidersIcon />
      </button>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-night/40"
            aria-hidden="true"
            onClick={close}
          />

          <div
            id="mobile-settings"
            ref={panel}
            role="dialog"
            aria-label="Settings"
            className="fixed inset-x-4 top-[7rem] z-[60] max-h-[calc(100svh-8rem)] overflow-y-auto border-2 border-ink bg-paper p-4 text-ink shadow-[6px_6px_0_rgba(43,38,32,0.28)]"
          >
            <p className="label text-[10px] text-ink-muted">settings</p>
            <div className="mt-2">
              <SwitchRow
                label="motion"
                on={motionOn}
                onChange={(next) => {
                  setMotionMode(next ? "full" : "reduce");
                  setMotionOn(next);
                }}
              />
              <SwitchRow
                label="sound"
                on={sound}
                onChange={(next) => {
                  setSound(next);
                  setSoundState(next);
                }}
              />
            </div>
            <div className="mt-2 border-t border-ink/20 pt-3">
              <p className="label text-[10px] text-ink-muted">
                {t("lang.title")}
              </p>
              <LangEditions />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
