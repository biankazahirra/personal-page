/** A held press must last this long before the unit assembles itself. */
export const HOLD_MS = 1200;
/** Anything shorter than this is a tap, not an abandoned hold. */
export const TAP_MS = 200;
/** A drag past this many pixels is a scroll, so the press is dropped. */
export const MOVE_TOLERANCE = 20;

export type GestureInput = {
  heldMs: number;
  movedPx: number;
  touch: boolean;
  reduced?: boolean;
};

export type GestureOutcome = "ignore" | "instant" | "hold";

/**
 * What a finished press on the hero button should do. `ignore` is the
 * abandoned hold: the parts drift back and nothing is marked as found.
 */
export function gesture({
  heldMs,
  movedPx,
  touch,
  reduced = false,
}: GestureInput): GestureOutcome {
  if (Math.abs(movedPx) >= MOVE_TOLERANCE) return "ignore";
  if (reduced) return "instant";
  if (!touch) return "instant";
  if (heldMs >= HOLD_MS) return "hold";
  if (heldMs < TAP_MS) return "instant";
  return "ignore";
}

/** Fraction of the hold fill, clamped to the 0–1 the CSS expects. */
export function holdProgress(elapsedMs: number): number {
  return Math.min(1, Math.max(0, elapsedMs / HOLD_MS));
}
