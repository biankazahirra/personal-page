const STORAGE_KEY = "found-parts";

/**
 * The seven hidden parts. They are kept apart from the ten assembly parts so
 * the assembly meter can still finish at 10/10; this is the field kit count.
 */
export const eggs = [
  { id: "staple", label: "corner staple", partNo: "BZ-EE-01" },
  { id: "warranty", label: "warranty sticker", partNo: "BZ-EE-02" },
  { id: "konami", label: "service override", partNo: "BZ-EE-03" },
  { id: "logo", label: "five taps on the nameplate", partNo: "BZ-EE-04" },
  { id: "ukulele", label: "the word, typed", partNo: "BZ-EE-05" },
  { id: "hidden-part", label: "supplementary part", partNo: "BZ-EE-06" },
  { id: "ink-pad", label: "inspection ink pad", partNo: "BZ-EE-07" },
] as const;

export type EggId = (typeof eggs)[number]["id"];
export type Egg = (typeof eggs)[number];

export const EGG_TOTAL = eggs.length;

const known = new Set<string>(eggs.map((egg) => egg.id));

/**
 * Stored the same way as assembly parts: ids only, guarded against private
 * mode, old ids and duplicates. A page reload never inflates the count.
 */
export function readEggs(): EggId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return Array.from(
      new Set(
        value.filter((id): id is EggId => typeof id === "string" && known.has(id)),
      ),
    );
  } catch {
    return [];
  }
}

export function eggCount(): number {
  return Math.min(EGG_TOTAL, readEggs().length);
}

export function hasEgg(id: EggId): boolean {
  return readEggs().includes(id);
}

function writeEggs(ids: EggId[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Private mode: the count lasts for this page only.
  }
  window.dispatchEvent(new Event("eggchange"));
}

/**
 * Records a hidden part once and announces it. Returns true only the first
 * time, so repeated gestures never replay the toast or the sound.
 */
export function findEgg(id: EggId): boolean {
  if (typeof window === "undefined") return false;
  const found = readEggs();
  if (found.includes(id)) return false;

  const egg = eggs.find((item) => item.id === id);
  if (!egg) return false;

  writeEggs([...found, id]);
  window.dispatchEvent(
    new CustomEvent<Egg & { count: number; total: number }>("eggfound", {
      detail: { ...egg, count: found.length + 1, total: EGG_TOTAL },
    }),
  );
  return true;
}

export function eggForId(id: EggId): Egg {
  return eggs.find((egg) => egg.id === id) ?? eggs[0];
}
