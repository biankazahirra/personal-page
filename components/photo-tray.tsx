"use client";

import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Texture } from "@/components/texture";
import type { PhotoMoment } from "@/content/photos";
import { currentMotion } from "@/lib/motion";
import { flipOrder, photoLabel } from "@/lib/photo-tray";

const FLIP_MS = 380;

/**
 * C04 photo tray: the top photo of a small stack, flipped by tap, arrows,
 * swipe or keyboard. The stack is the enhancement; a plain list of all four
 * moments renders when JavaScript never runs.
 */
export function PhotoTray({ moments }: { moments: PhotoMoment[] }) {
  const [order, setOrder] = useState(() => moments.map((_, index) => index));
  const [leaving, setLeaving] = useState<{ index: number; direction: 1 | -1 } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);

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
  const total = moments.length;

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
        }}
        onPointerUp={(event) => {
          const start = swipe.current;
          swipe.current = null;
          if (!start) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy)) flip(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => {
          swipe.current = null;
        }}
      >
        <div className="photo-stage">
          {[2, 1, 0].map((layer) => {
            const momentIndex = order[layer];
            if (momentIndex === undefined) return null;
            const moment = moments[momentIndex];
            const isTop = layer === 0;

            if (!isTop) {
              return (
                <div key={momentIndex} className="photo-layer" data-layer={layer} aria-hidden="true">
                  <Texture
                    variant={moment.variant}
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
                aria-label={`Next photo: ${moment.label}`}
                onClick={() => flip(1)}
              >
                <Texture
                  variant={moment.variant}
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
        {photoLabel(moments[top]?.label ?? "", top, total)}
      </p>

      <div className="photo-meta">
        {/* The counter below already prints the position, so the label stands alone. */}
        <p className="eyebrow text-paper-on-night/60">{moments[top]?.label}</p>
        <p className="mt-2 max-w-[34ch] text-sm text-paper-on-night/60">
          {moments[top]?.note}
        </p>
      </div>

      <div className="photo-controls">
        <button type="button" className="photo-arrow" aria-label="Previous photo" onClick={() => flip(-1)}>
          ◂
        </button>
        <span className="eyebrow text-paper-on-night/60">
          {String(top + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button type="button" className="photo-arrow" aria-label="Next photo" onClick={() => flip(1)}>
          ▸
        </button>
      </div>

      <p className="eyebrow mt-4 text-paper-on-night/50">tap to flip to the next ▸</p>
      </div>

      <ul className="photo-list">
        {moments.map((moment, index) => (
          <li key={moment.label}>
            <Texture variant={moment.variant} tone="night" className="aspect-[4/3] w-full" label="image pending" />
            <p className="eyebrow mt-3 text-paper-on-night/60">
              <span className="text-accent-warm">{String(index + 1).padStart(2, "0")}</span> · {moment.label}
            </p>
            <p className="mt-1 text-sm text-paper-on-night/60">{moment.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
