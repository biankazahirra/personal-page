const STORAGE_KEY = "assembly";
export const ASSEMBLY_TOTAL = 10;

/**
 * Found parts are stored as a list of ids, so the same id is only counted once.
 * Everything is guarded: private mode and empty storage just mean 0/10.
 */
export function readFound(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return value.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

export function writeFound(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Private mode: the count lasts for this page only.
  }
  window.dispatchEvent(new Event("assemblychange"));
}

export function markFound(id: string) {
  const found = readFound();
  if (found.includes(id)) return;
  writeFound([...found, id]);
}
