/** The page heading a client navigation should move focus to. */
export function focusTarget(root: ParentNode): HTMLElement | null {
  return root.querySelector<HTMLElement>("main h1");
}

/** Focus moves only when the pathname changes: never on first load, never on a hash change. */
export function shouldMoveFocus(previous: string | null, next: string): boolean {
  if (previous === null) return false;
  return previous !== next;
}

/** The homepage owns its own focus handling. */
export function shouldRestoreScroll(pathname: string): boolean {
  return pathname !== "/";
}

/** Keep a stored offset inside the new page height. */
export function clampScroll(stored: number, max: number): number {
  if (max <= 0) return 0;
  return Math.min(stored, max);
}

const key = (pathname: string) => `scroll:${pathname}`;

/** The remembered offset for a path, or null when missing or unreadable. */
export function readScroll(storage: Storage, pathname: string): number | null {
  const value = storage.getItem(key(pathname));
  if (value === null) return null;
  const offset = Number.parseInt(value, 10);
  if (Number.isNaN(offset) || offset < 0) return null;
  return offset;
}

/** Remember an offset for a path; the top of the page clears the entry. */
export function writeScroll(storage: Storage, pathname: string, offset: number): void {
  if (offset === 0) {
    storage.removeItem(key(pathname));
    return;
  }
  storage.setItem(key(pathname), String(offset));
}
