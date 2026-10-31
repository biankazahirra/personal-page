"use client";

import { useEffect, useState } from "react";

import { setSound, soundOn } from "@/lib/sound";

/**
 * Sound is off by default and only ever plays after a gesture. The switch is
 * in the header band so it is never buried.
 */
export function SoundToggle() {
  const [on, setOn] = useState<boolean | null>(null);

  useEffect(() => {
    setOn(soundOn());
  }, []);

  const toggle = () => {
    const next = !(on ?? false);
    setSound(next);
    setOn(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="band-control eyebrow"
      aria-pressed={on ?? false}
      aria-label={
        on === null
          ? "Sound off — turn sound on"
          : on
            ? "Sound on — turn sound off"
            : "Sound off — turn sound on"
      }
    >
      {on === null ? "sound off" : on ? "sound on" : "sound off"}
    </button>
  );
}
