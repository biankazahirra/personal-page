const STORAGE_KEY = "motion";

export type MotionMode = "full" | "reduce";

/** What the document is set to right now; the inline head script decides first. */
export function currentMotion(): MotionMode {
  return document.documentElement.dataset.motion === "full" ? "full" : "reduce";
}

/**
 * The one place a motion choice is written. Every toggle reads and writes
 * through here, so the header control and the mobile settings agree.
 */
export function setMotionMode(next: MotionMode) {
  document.documentElement.dataset.motion = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Private mode: the choice lasts for this page only.
  }
  window.dispatchEvent(new Event("motionchange"));
}
