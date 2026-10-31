"use client";

import { useEffect, useState } from "react";

import { findEgg, hasEgg } from "@/lib/eggs";
import { playStamp } from "@/lib/sound";

/**
 * A blank-looking line under the parts list. It is a real part: the manual
 * itself. Kept deliberately quiet so it reads as a printing slip, not a
 * portfolio item.
 */
export function EggPart() {
  const [found, setFound] = useState(false);

  useEffect(() => {
    const update = () => setFound(hasEgg("hidden-part"));
    update();
    window.addEventListener("eggchange", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("eggchange", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  if (found) {
    return (
      <p className="egg-part egg-part-filed">
        <span className="parts-no">BZ-06-00</span>
        <span>
          <span className="block text-sm">the manual itself</span>
          <span className="block text-[11px] text-ink-muted">
            material: paper · status: in hand · filed as a hidden part
          </span>
        </span>
      </p>
    );
  }

  return (
    <button
      type="button"
      className="egg-part"
      onClick={() => {
        findEgg("hidden-part");
        playStamp();
      }}
    >
      <span className="parts-no">BZ-06-00</span>
      <span className="egg-part-desc">
        <span className="block text-sm">[ unlisted part ]</span>
        <span className="block text-[11px]">inspect to add it to the kit</span>
      </span>
      <span className="egg-part-cue">inspect →</span>
    </button>
  );
}
