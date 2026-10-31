const STORAGE_KEY = "assembly";

/**
 * The ten parts that make up the unit. Each id is stored once, so revisiting a
 * section never inflates the count. Labels are shown in the diagnostics panel.
 */
export const assemblyParts = [
  { id: "boot", label: "start-up checklist" },
  { id: "assemble", label: "exploded view assembled" },
  { id: "visit-c02", label: "C02 specifications" },
  { id: "visit-c03", label: "C03 maintenance logbook" },
  { id: "visit-c04", label: "C04 inspection photos" },
  { id: "visit-c05", label: "C05 indicator panel" },
  { id: "visit-c06", label: "C06 illustrated parts list" },
  { id: "console", label: "logbook console" },
  { id: "contact", label: "C07 service request" },
  { id: "scroll-home", label: "index read to the end" },
] as const;

export type AssemblyPartId = (typeof assemblyParts)[number]["id"];

export const ASSEMBLY_TOTAL = assemblyParts.length;

const knownParts = new Set<string>(assemblyParts.map((part) => part.id));

/**
 * Found parts are stored as a list of ids, so the same id is only counted once.
 * Everything is guarded: private mode and empty storage just mean 0/10.
 * Unknown and duplicate ids from an older revision are ignored, so the meter
 * can never read past the ten parts the manual actually has.
 */
export function readFound(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return Array.from(
      new Set(
        value.filter(
          (id): id is string => typeof id === "string" && knownParts.has(id),
        ),
      ),
    );
  } catch {
    return [];
  }
}

export function foundCount(): number {
  return Math.min(ASSEMBLY_TOTAL, readFound().length);
}

export function hasFound(id: AssemblyPartId | string): boolean {
  return readFound().includes(id);
}

export function writeFound(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Private mode: the count lasts for this page only.
  }
  window.dispatchEvent(new Event("assemblychange"));
}

export function markFound(id: AssemblyPartId | string) {
  const found = readFound();
  if (found.includes(id)) return;
  writeFound([...found, id]);
}
