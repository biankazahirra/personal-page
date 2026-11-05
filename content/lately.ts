import { films } from "./films.ts";
import { journal, kindLabels } from "./journal.ts";
import { notes } from "./notes.ts";
import type { FilmEntry, JournalEntry, Note } from "./types.ts";

/** One line in the Lately strip: category, title, link. Nothing else. */
export type LatelyItem = {
  /** Which preview this item belongs to, so it is never repeated below. */
  section: "life" | "curiosity" | "films";
  slug: string;
  category: string;
  title: string;
  /** Missing while the section is under construction, so the row is plain text. */
  href?: string;
  date: string;
};

/**
 * Where the strip sits on the homepage. Change this one value to move it
 * below the Assembly Board, as the first-time visitor test may decide.
 */
export const latelyPosition: "after-hero" | "after-board" = "after-hero";

const fromJournal = (entry: JournalEntry): LatelyItem => ({
  section: "life",
  slug: entry.slug,
  category: kindLabels[entry.kind],
  title: entry.title,
  href: `/life/${entry.slug}`,
  date: entry.date,
});

const fromNote = (note: Note): LatelyItem | null =>
  note.date
    ? {
        section: "curiosity",
        slug: note.slug,
        category: note.category,
        title: note.title,
        date: note.date,
      }
    : null;

// A film only counts as "lately" when it has a real watched date. Entries
// without one are skipped, never given a made-up date.
const fromFilm = (film: FilmEntry): LatelyItem | null =>
  film.watchedOn
    ? {
        section: "films",
        slug: film.title,
        category: "film",
        title: film.title,
        href: film.letterboxdUrl ?? "/films",
        date: film.watchedOn,
      }
    : null;

const keep = (item: LatelyItem | null): item is LatelyItem => item !== null;

/** The latest few updates across the site, newest first. */
export function buildLately(limit = 3): LatelyItem[] {
  const all = [
    ...journal.map(fromJournal),
    ...notes.map(fromNote).filter(keep),
    ...films.map(fromFilm).filter(keep),
  ];

  return all.sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

const key = (item: { section: string; slug: string }) =>
  `${item.section}:${item.slug}`;

/** Anything already shown in Lately is excluded from the previews below it. */
export function excludeLately<T extends { slug: string }>(
  items: T[],
  section: LatelyItem["section"],
  lately: LatelyItem[],
): T[] {
  const shown = new Set(lately.map(key));
  return items.filter((item) => !shown.has(key({ section, slug: item.slug })));
}
