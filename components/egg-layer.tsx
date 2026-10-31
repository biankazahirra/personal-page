"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import {
  eggs,
  findEgg,
  readEggs,
  type Egg,
  type EggId,
} from "@/lib/eggs";
import {
  playBell,
  playChord,
  playInk,
  playOverride,
  playStaple,
  playStamp,
} from "@/lib/sound";

type Toast = Egg & { count: number; total: number };

type Mark = {
  id: number;
  x: number;
  y: number;
  label: "VOID" | "APPROVED" | "REVISED";
  rotate: number;
};

const KONAMI = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

const MARKS = ["VOID", "APPROVED", "REVISED"] as const;

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

/**
 * The hidden layer. Every part is stored in lib/eggs, so the toast, the
 * footer meter and a fresh tab always agree. Nothing here blocks the manual:
 * if none of it is touched, the page reads exactly the same.
 */
export function EggLayer() {
  const [found, setFound] = useState<EggId[]>([]);
  const [toast, setToast] = useState<Toast | null>(null);
  const [maintenance, setMaintenance] = useState(false);
  const [armed, setArmed] = useState(false);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [stapleGone, setStapleGone] = useState(false);
  const [showUkulele, setShowUkulele] = useState(false);
  const [override, setOverride] = useState(false);

  const toastTimer = useRef<number | null>(null);
  const ukuleleTimer = useRef<number | null>(null);
  const overrideTimer = useRef<number | null>(null);
  const markId = useRef(0);
  const swallowClick = useRef(false);
  const drag = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    dx: number;
    dy: number;
    el: HTMLButtonElement;
  } | null>(null);

  const addMark = useCallback((x: number, y: number) => {
    const label = MARKS[Math.floor(Math.random() * MARKS.length)];
    const next: Mark = {
      id: (markId.current += 1),
      x,
      y,
      label,
      rotate: Math.round(Math.random() * 16) - 8,
    };
    playInk();
    setMarks((current) => [...current.slice(-24), next]);
  }, []);

  const dismissToast = useCallback(() => {
    if (toastTimer.current !== null) {
      window.clearTimeout(toastTimer.current);
      toastTimer.current = null;
    }
    setToast(null);
  }, []);

  /* Found parts stay in sync with any other component writing to the store. */
  useEffect(() => {
    const update = () => setFound(readEggs());
    update();
    window.addEventListener("eggchange", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("eggchange", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  /* One toast per newly found part, dismissed after five seconds. */
  useEffect(() => {
    const onFound = (event: Event) => {
      const detail = (event as CustomEvent<Toast>).detail;
      if (!detail) return;
      if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
      setToast(detail);
      toastTimer.current = window.setTimeout(() => {
        setToast(null);
        toastTimer.current = null;
      }, 5200);
    };

    window.addEventListener("eggfound", onFound);
    return () => {
      window.removeEventListener("eggfound", onFound);
      if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    };
  }, []);

  /* Maintenance mode is a session state: a reload returns the manual to stock. */
  useEffect(() => {
    let stored = false;
    try {
      stored = window.sessionStorage.getItem("maintenance") === "on";
    } catch {
      stored = false;
    }
    if (stored) setMaintenance(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (maintenance) {
      root.dataset.maintenance = "on";
      try {
        window.sessionStorage.setItem("maintenance", "on");
      } catch {
        // Private mode: the mode lasts for this page only.
      }
    } else {
      delete root.dataset.maintenance;
      try {
        window.sessionStorage.removeItem("maintenance");
      } catch {
        // Private mode: nothing to clear.
      }
    }
  }, [maintenance]);

  useEffect(() => {
    const root = document.documentElement;
    if (armed) root.dataset.inking = "on";
    else delete root.dataset.inking;
  }, [armed]);

  /* Ink: the next pointer press becomes a stamp instead of a click. */
  useEffect(() => {
    if (!armed) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-egg-ignore]")) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      swallowClick.current = true;
      window.setTimeout(() => {
        swallowClick.current = false;
      }, 700);
      addMark(event.clientX, event.clientY);
      setArmed(false);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setArmed(false);
        return;
      }
      if (event.key.toLowerCase() === "s" && !isTypingTarget(event.target)) {
        event.preventDefault();
        addMark(window.innerWidth / 2, window.innerHeight / 2);
        setArmed(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("keydown", onKey);
    };
  }, [armed, addMark]);

  /* A click that follows a stamp is swallowed, never a navigation. */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!swallowClick.current) return;
      swallowClick.current = false;
      event.preventDefault();
      event.stopPropagation();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  /* Konami, the typed word, and escape to leave any hidden state. */
  useEffect(() => {
    let sequence: string[] = [];
    let typed = "";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setArmed(false);
        setMaintenance(false);
        return;
      }

      if (isTypingTarget(event.target)) return;

      const key = event.key.toLowerCase();
      sequence = [...sequence, key].slice(-KONAMI.length);
      if (sequence.join("|") === KONAMI.join("|")) {
        sequence = [];
        findEgg("konami");
        playOverride();
        setOverride(true);
        if (overrideTimer.current !== null) {
          window.clearTimeout(overrideTimer.current);
        }
        overrideTimer.current = window.setTimeout(() => {
          setOverride(false);
          overrideTimer.current = null;
        }, 2400);
      }

      if (event.key.length === 1) {
        typed = (typed + key).slice(-24);
        if (typed.endsWith("ukulele")) {
          typed = "";
          findEgg("ukulele");
          playChord();
          setShowUkulele(true);
          if (ukuleleTimer.current !== null) {
            window.clearTimeout(ukuleleTimer.current);
          }
          ukuleleTimer.current = window.setTimeout(() => {
            setShowUkulele(false);
            ukuleleTimer.current = null;
          }, 2800);
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (overrideTimer.current !== null) window.clearTimeout(overrideTimer.current);
      if (ukuleleTimer.current !== null) window.clearTimeout(ukuleleTimer.current);
    };
  }, []);

  /* Five taps on the nameplate, counted across client-side navigations. */
  useEffect(() => {
    let hits = 0;
    let last = 0;

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const logo = target.closest('[data-egg="logo"]');
      if (!logo) return;

      const now = Date.now();
      hits = now - last > 1800 ? 1 : hits + 1;
      last = now;

      if (hits >= 5) {
        hits = 0;
        findEgg("logo");
        playBell();
        logo.classList.add("egg-logo-hit");
        window.setTimeout(() => logo.classList.remove("egg-logo-hit"), 700);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const pullStaple = () => {
    if (stapleGone) return;
    setStapleGone(true);
    findEgg("staple");
    playStaple();
  };

  const onStapleDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const el = event.currentTarget;
    el.setPointerCapture(event.pointerId);
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      dx: 0,
      dy: 0,
      el,
    };
  };

  const onStapleMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const state = drag.current;
    if (!state || state.pointerId !== event.pointerId) return;
    state.dx = event.clientX - state.startX;
    state.dy = event.clientY - state.startY;
    state.el.style.transform = `translate(${state.dx}px, ${state.dy}px) rotate(${state.dx * 0.35}deg)`;
  };

  const onStapleUp = () => {
    const state = drag.current;
    if (!state) return;
    drag.current = null;
    const distance = Math.hypot(state.dx, state.dy);
    if (distance > 44) {
      pullStaple();
      return;
    }
    state.el.style.transform = "";
  };

  const toggleMaintenance = () => {
    const next = !maintenance;
    if (next) {
      findEgg("warranty");
      playStamp();
    }
    setArmed(false);
    setMaintenance(next);
  };

  const toggleInk = () => {
    if (armed) {
      setArmed(false);
      return;
    }
    findEgg("ink-pad");
    setArmed(true);
  };

  const stapleFound = found.includes("staple") || stapleGone;

  return (
    <>
      {!stapleFound ? (
        <button
          type="button"
          className="egg-staple"
          aria-label="Loose staple in the corner — drag it out, or press Enter to remove it"
          onPointerDown={onStapleDown}
          onPointerMove={onStapleMove}
          onPointerUp={onStapleUp}
          onPointerCancel={() => {
            if (drag.current) drag.current.el.style.transform = "";
            drag.current = null;
          }}
          onClick={(event) => {
            if (event.detail === 0) pullStaple();
          }}
        >
          <svg viewBox="0 0 44 44" aria-hidden="true" focusable="false">
            <path
              d="M14 8v22a8 8 0 0 0 16 0V10a5 5 0 0 0-10 0v20a3 3 0 0 0 6 0V12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="square"
            />
            <path d="M12 5h20" stroke="currentColor" strokeWidth="1" opacity="0.35" />
          </svg>
        </button>
      ) : null}

      <div className="egg-dock" data-egg-ignore>
        <button
          type="button"
          className="egg-tool egg-warranty"
          aria-pressed={maintenance}
          onClick={toggleMaintenance}
        >
          <span>warranty</span>
          <span>void if opened</span>
          <span className="sr-only">maintenance mode</span>
        </button>

        <button
          type="button"
          className="egg-tool egg-ink"
          aria-pressed={armed}
          aria-label={
            armed
              ? "Ink pad ready — click anywhere to stamp"
              : "Pick up the ink pad"
          }
          onClick={toggleInk}
        >
          <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
            <rect x="4" y="9" width="24" height="15" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <rect x="8" y="13" width="16" height="7" fill="currentColor" opacity="0.55" />
            <path d="M9 27h14" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <span className="sr-only">Ink pad</span>
        </button>
      </div>

      {armed ? (
        <p className="egg-hint" data-egg-ignore role="status">
          ink pad ready — click anywhere, or press <kbd>s</kbd>.{" "}
          <button type="button" className="underline" onClick={() => setArmed(false)}>
            put it down
          </button>
        </p>
      ) : null}

      {marks.map((mark) => (
        <span
          key={mark.id}
          aria-hidden="true"
          className="stamp egg-mark"
          data-tone={mark.label === "APPROVED" ? "mustard" : undefined}
          style={{
            left: mark.x,
            top: mark.y,
            transform: `translate(-50%, -50%) rotate(${mark.rotate}deg)`,
          }}
        >
          {mark.label}
        </span>
      ))}

      {maintenance ? (
        <div className="maintenance-rail" aria-hidden="true">
          <p>torque: hand-tight</p>
          <p>fig. 4 — paper feed</p>
          <p>do not laminate</p>
          <p>ink: permanent</p>
        </div>
      ) : null}

      {showUkulele ? (
        <div className="egg-ukulele" aria-hidden="true">
          <div className="egg-ukulele-card">
            <p className="eyebrow">four strings · no calibration</p>
            <p className="egg-ukulele-word">ukulele</p>
            <p className="egg-ukulele-note">four chords, slowly, badly.</p>
          </div>
        </div>
      ) : null}

      {override ? (
        <div className="egg-override" aria-hidden="true">
          <span>service override · calibration unlocked</span>
        </div>
      ) : null}

      {toast ? (
        <div className="egg-toast" role="status" aria-live="polite" data-egg-ignore>
          <span className="stamp shrink-0 text-[9px]" data-tone="mustard">
            part found
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm">
              {toast.partNo} · {toast.label}
            </span>
            <span className="block font-mono text-[11px] text-ink-muted">
              field kit {toast.count}/{toast.total} · {eggs.length} hidden parts
            </span>
          </span>
          <button
            type="button"
            className="egg-toast-close"
            aria-label="Dismiss part found notice"
            onClick={dismissToast}
          >
            ×
          </button>
        </div>
      ) : null}

      <span className="sr-only" aria-live="polite">
        {`field kit: ${found.length} of ${eggs.length} hidden parts found`}
      </span>
    </>
  );
}
