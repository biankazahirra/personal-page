const STORAGE_KEY = "bench-grain";

/** Fader range. 100 is the printed default, 0 wipes the fleck, 200 doubles it. */
export const GRAIN_DEFAULT = 100;
export const GRAIN_MIN = 0;
export const GRAIN_MAX = 200;

/**
 * Fader value to the grain layer's opacity. The printed default is 0.1, so the
 * scale is value / 1000 and the layer never goes past 0.2.
 */
export function grainOpacity(value: number): number {
  const clamped = Math.min(GRAIN_MAX, Math.max(GRAIN_MIN, Math.round(value)));
  return clamped / 1000;
}

function clampGrain(value: number): number {
  return Math.min(GRAIN_MAX, Math.max(GRAIN_MIN, Math.round(value)));
}

/** Applies the value to the one paper-grain layer; CSS owns the default. */
export function applyGrain(value: number) {
  document.documentElement.style.setProperty(
    "--grain-opacity",
    String(grainOpacity(value)),
  );
}

export function readGrain(): number {
  if (typeof window === "undefined") return GRAIN_DEFAULT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const value = raw === null ? NaN : Number(raw);
    return Number.isFinite(value) ? clampGrain(value) : GRAIN_DEFAULT;
  } catch {
    return GRAIN_DEFAULT;
  }
}

/** Stores the choice and paints it. Returns the clamped value to render. */
export function writeGrain(value: number): number {
  const next = clampGrain(value);
  try {
    window.localStorage.setItem(STORAGE_KEY, String(next));
  } catch {
    // Private mode: the setting lasts for this page only.
  }
  applyGrain(next);
  return next;
}
