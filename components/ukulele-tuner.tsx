"use client";

import { useState } from "react";

import { playPluck } from "@/lib/sound";

const strings = [
  { note: "G", frequency: 392.0, base: -16, reading: "slightly flat" },
  { note: "C", frequency: 261.63, base: 5, reading: "slightly sharp" },
  { note: "E", frequency: 329.63, base: 21, reading: "close, not settled" },
  { note: "A", frequency: 440.0, base: -7, reading: "still drifting" },
];

/**
 * A tuner that never quite settles, because the ukulele has not either. Each
 * string is a real button with a 44px target. A pluck only makes sound when
 * the header's sound switch is on; reduced motion turns the needle into an
 * instant state change.
 */
export function UkuleleTuner() {
  const [active, setActive] = useState(0);
  const [plucks, setPlucks] = useState(0);

  const string = strings[active];
  const wobble = [-2, 1.5, -1][plucks % 3];
  const angle = string.base + wobble;

  function pluck(index: number) {
    setActive(index);
    setPlucks((value) => value + 1);
    playPluck(strings[index].frequency);
  }

  return (
    <div className="tuner">
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow text-ink-muted">ukulele tuner · C04</p>
        <p className="eyebrow text-accent">calibration in progress</p>
      </div>

      <div className="tuner-gauge" aria-hidden="true">
        <div className="tuner-scale" />
        <div
          className="tuner-needle"
          data-active={plucks > 0}
          style={{ transform: `rotate(${angle}deg)` }}
        />
        <span className="tuner-pivot" />
      </div>

      <p className="mt-4 text-sm text-ink-muted" aria-live="polite">
        string {string.note} · {plucks === 0 ? "not touched yet" : string.reading}. It never
        quite settles; that is the calibration.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {strings.map((item, index) => (
          <button
            key={item.note}
            type="button"
            onClick={() => pluck(index)}
            aria-pressed={active === index}
            className="tuner-key"
          >
            {item.note}
          </button>
        ))}
      </div>

      <p className="eyebrow mt-3 text-ink-muted">
        plucks are silent unless sound is on
      </p>
    </div>
  );
}
