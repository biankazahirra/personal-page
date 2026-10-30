"use client";

import { useEffect, useRef, useState } from "react";

import type { TimelineItem } from "@/content/types";

const stopOffset = 9;

/**
 * The journey as a lift shaft: one rail, one carriage that travels to the stop
 * under the pointer or the keyboard. Every summary stays on the page, so the
 * list is complete without JavaScript; only the carriage needs it.
 */
export function JourneyShaft({ items }: { items: TimelineItem[] }) {
  const [active, setActive] = useState(0);
  const [top, setTop] = useState(0);
  const [ready, setReady] = useState(false);
  const stops = useRef<Array<HTMLLIElement | null>>([]);
  const list = useRef<HTMLOListElement | null>(null);

  function measure(index: number) {
    const stop = stops.current[index];
    if (stop) setTop(stop.offsetTop + stopOffset);
  }

  function moveTo(index: number) {
    setActive(index);
    measure(index);
  }

  useEffect(() => {
    measure(active);
    setReady(true);

    const observer = new ResizeObserver(() => measure(active));
    if (list.current) observer.observe(list.current);
    return () => observer.disconnect();
  }, [active]);

  const current = items[active];

  return (
    <div className="journey-shaft relative" data-ready={ready}>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 top-0 w-px bg-ink/15"
      />

      <span
        aria-hidden="true"
        className="journey-carriage absolute left-[-5px] top-0 h-2.5 w-2.5 bg-accent shadow-[0_0_8px_rgba(192,139,87,0.7)]"
        style={{ transform: `translateY(${top}px)` }}
      />

      <ol ref={list}>
        {items.map((item, index) => {
          const isActive = index === active;

          return (
            <li
              key={`${item.period}-${item.title}`}
              ref={(node) => {
                stops.current[index] = node;
              }}
              tabIndex={0}
              onMouseEnter={() => moveTo(index)}
              onFocus={() => moveTo(index)}
              onClick={() => moveTo(index)}
              className="relative border-t border-ink/15 py-6 pl-8 first:border-t-0 first:pt-0 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span
                aria-hidden="true"
                className={`absolute left-[-2.5px] top-[14px] h-1.5 w-1.5 -translate-y-1/2 rounded-full transition-colors duration-200 ${
                  isActive ? "bg-accent" : "bg-ink/30"
                }`}
              />

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <p className="eyebrow text-ink-muted">
                  {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </p>
                <p className="eyebrow text-ink-muted">{item.period}</p>
                <p className="eyebrow text-ink-muted">{item.kind}</p>
                {item.current ? (
                  <span className="eyebrow inline-flex items-center gap-2 rounded-none bg-ink px-2 py-0.5 text-paper">
                    <span
                      aria-hidden="true"
                      className="journey-lamp h-1 w-1 rounded-full"
                    />
                    now
                  </span>
                ) : null}
              </div>

              <h3 className="display mt-2 text-2xl">
                {item.title}
                {item.org ? (
                  <span className="text-ink-muted"> — {item.org}</span>
                ) : null}
              </h3>
              <p className="mt-2 max-w-[52ch] text-ink-muted">{item.summary}</p>
            </li>
          );
        })}
      </ol>

      <p
        aria-live="polite"
        className="eyebrow mt-6 border-t border-ink/15 pt-4 text-ink-muted"
      >
        stop {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} ·{" "}
        <span className="text-accent">{current.kind}</span> · {current.period}
        {current.current ? " · current" : ""}
      </p>
    </div>
  );
}
