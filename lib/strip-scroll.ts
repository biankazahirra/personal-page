/** Which card is snapped, from the track's scroll offset. */
export function snapIndex(scrollLeft: number, step: number, count: number): number {
  if (count <= 0 || step <= 0) return 0;
  return Math.min(count - 1, Math.max(0, Math.round(scrollLeft / step)));
}

/** True when the track has reached its right edge, give or take 2px. */
export function isAtEnd(
  scrollLeft: number,
  scrollWidth: number,
  clientWidth: number,
  tolerance = 4,
): boolean {
  return scrollLeft >= scrollWidth - clientWidth - tolerance;
}
