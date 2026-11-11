"use client";

import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Media } from "@/components/media";
import { kindLabels } from "@/content/journal";
import type { JournalEntry } from "@/content/types";
import { formatDate } from "@/lib/format";
import { currentMotion } from "@/lib/motion";
import { bringToFront, flipOrder, photoLabel } from "@/lib/photo-tray";

const FLIP_MS = 380;

/** Placeholder texture per entry kind, the same mapping the photo strip uses. */
const variants: Record<JournalEntry["kind"], "grid" | "waves" | "field" | "arcs"> = {
  update: "grid",
  photo: "field",
  music: "waves",
  ukulele: "field",
  moment: "arcs",
};

/**
 * C04 photo tray: the top photo of a small stack, flipped by tap, arrows,
 * swipe or keyboard. The stack is the enhancement; a plain list of the same
 * journal entries renders when JavaScript never runs.
 */
export function PhotoTray({
  entries,
  tone = "night",
}: {
  entries: JournalEntry[];
  /** `paper` when the tray sits on a light section instead of the dark one. */
  tone?: "night" | "paper";
}) {
  const [order, setOrder] = useState(() => entries.map((_, index) => index));
  const [leaving, setLeaving] = useState<{ index: number; direction: 1 | -1 } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  /** A finished swipe is not also a tap; the photo button's click would double flip. */
  const swiped = useRef(false);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const flip = useCallback(
    (direction: 1 | -1) => {
      if (order.length < 2 || leaving) return;

      if (currentMotion() === "reduce") {
        setOrder((current) => flipOrder(current, direction));
        return;
      }

      const top = order[0];
      setLeaving({ index: top, direction });
      timer.current = setTimeout(() => {
        setOrder((current) => flipOrder(current, direction));
        setLeaving(null);
      }, FLIP_MS);
    },
    [leaving, order],
  );

  const top = order[0];
  const total = entries.length;
  const current = entries[top];

  /** A dot jumps straight to one photo; the stack keeps its cyclic order. */
  const goTo = (index: number) => {
    if (leaving || index === top) return;
    setOrder((current) => bringToFront(current, index));
  };

  const topLayer = (tray: HTMLElement) => tray.querySelector<HTMLElement>(".photo-layer-top");

  /** Ink that stays readable on whichever section the tray is mounted in. */
  const ink = tone === "paper" ? "text-ink" : "text-paper-on-night/60";
  const inkSoft = tone === "paper" ? "text-ink-muted" : "text-paper-on-night/50";

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const onControl = (event.target as HTMLElement).closest("button");
    if (event.key === "ArrowRight" || (event.key === "Enter" && !onControl) || (event.key === " " && !onControl)) {
      event.preventDefault();
      flip(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      flip(-1);
    }
  };

  return (
    <div className="photo-tray-wrap">
      <div className="photo-tray-ui">
      <div
        role="region"
        aria-label="Personal moments, photo tray"
        tabIndex={0}
        className="photo-tray"
        onKeyDown={onKeyDown}
        onPointerDown={(event) => {
          swipe.current = { x: event.clientX, y: event.clientY };
          swiped.current = false;
          // Keep the moves coming even when the finger leaves the tray. Capture
          // can throw when the pointer is already gone.
          try {
            event.currentTarget.setPointerCapture(event.pointerId);
          } catch {
            /* pointer already released */
          }
        }}
        onPointerMove={(event) => {
          const start = swipe.current;
          if (!start || currentMotion() === "reduce") return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          // Let a vertical scroll through untouched.
          if (Math.abs(dx) <= Math.abs(dy)) return;
          const layer = topLayer(event.currentTarget);
          if (!layer) return;
          layer.dataset.dragging = "true";
          layer.style.transform = `translate(${dx}px, ${Math.min(10, Math.abs(dx) * 0.05)}px) rotate(${dx * 0.03}deg)`;
        }}
        onPointerUp={(event) => {
          const start = swipe.current;
          swipe.current = null;
          const layer = topLayer(event.currentTarget);
          if (layer) {
            delete layer.dataset.dragging;
            layer.style.removeProperty("transform");
          }
          if (!start) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy)) {
            swiped.current = true;
            flip(dx < 0 ? 1 : -1);
          }
        }}
        onPointerCancel={(event) => {
          swipe.current = null;
          const layer = topLayer(event.currentTarget);
          if (layer) {
            delete layer.dataset.dragging;
            layer.style.removeProperty("transform");
          }
        }}
      >
        <div className="photo-stage">
          {[2, 1, 0].map((layer) => {
            const momentIndex = order[layer];
            if (momentIndex === undefined) return null;
            const entry = entries[momentIndex];
            const isTop = layer === 0;

            if (!isTop) {
              return (
                <div key={momentIndex} className="photo-layer" data-layer={layer} aria-hidden="true">
                  <Media
                    image={entry.images?.[0]}
                    variant={variants[entry.kind]}
                    tone="night"
                    className="h-full w-full"
                    label="image pending"
                  />
                </div>
              );
            }

            return (
              <button
                key={momentIndex}
                type="button"
                className="photo-layer photo-layer-top"
                data-top="true"
                data-leaving={leaving && leaving.index === momentIndex ? leaving.direction : undefined}
                aria-label={`Next photo: ${entry.title}`}
                onClick={() => {
                  if (swiped.current) {
                    swiped.current = false;
                    return;
                  }
                  flip(1);
                }}
              >
                <Media
                  image={entry.images?.[0]}
                  variant={variants[entry.kind]}
                  tone="night"
                  className="h-full w-full"
                  label="image pending"
                />
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {photoLabel(current?.title ?? "", top, total)}
      </p>

      <div className="photo-meta">
        {/* The counter below already prints the position, so the meta carries
            only the facts the photo strip shows: kind, title, date. */}
        <p className={`eyebrow ${ink}`}>{current ? kindLabels[current.kind] : ""}</p>
        <p className={`mt-1 max-w-[34ch] text-sm ${ink}`}>{current?.title}</p>
        <p className={`eyebrow mt-1 ${inkSoft}`}>
          {current ? formatDate(current.date) : ""}
        </p>
      </div>

      <div className="photo-controls">
        <button type="button" className="photo-arrow" aria-label="Previous photo" onClick={() => flip(-1)}>
          ◂
        </button>
        <span className={`eyebrow ${ink}`}>
          {String(top + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button type="button" className="photo-arrow" aria-label="Next photo" onClick={() => flip(1)}>
          ▸
        </button>
      </div>

      <div className="photo-dots">
        {entries.map((entry, index) => (
          <button
            key={entry.slug}
            type="button"
            className="photo-dot"
            aria-current={index === top}
            aria-label={`Photo ${index + 1}: ${entry.title}`}
            onClick={() => goTo(index)}
          />
        ))}
        <span className={`photo-counter eyebrow ${ink}`}>
          {String(top + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <p className={`eyebrow mt-4 ${inkSoft}`}>tap to flip</p>
      </div>

      <ul className="photo-list">
        {entries.map((entry, index) => (
          <li key={entry.slug}>
            <Media image={entry.images?.[0]} variant={variants[entry.kind]} tone="night" className="aspect-[4/3] w-full" label="image pending" />
            <p className={`eyebrow mt-3 ${ink}`}>
              <span className={tone === "paper" ? "text-accent" : "text-accent-warm"}>{String(index + 1).padStart(2, "0")}</span> · {kindLabels[entry.kind]}
            </p>
            <p className="mt-1 text-sm">{entry.title}</p>
            <p className={`eyebrow mt-1 ${inkSoft}`}>{formatDate(entry.date)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
