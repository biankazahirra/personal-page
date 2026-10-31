export type ImageRef = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Site = {
  name: string;
  fullName?: string;
  alias?: string;
  tagline: string;
  intro: string[];
  location?: string;
  email?: string;
  /** Full-bleed homepage hero. Falls back to a texture. */
  hero?: ImageRef;
  /** Portrait used on the homepage chapter and /about. */
  portrait?: ImageRef;
  links: { label: string; href?: string }[];
  currentlyInto: { label: string; note?: string }[];
};

export type Note = {
  slug: string;
  title: string;
  date?: string;
  category: "ai" | "code" | "tools" | "learning";
  /** How the experiment ended: still running, closed, or dropped. */
  status?: "running" | "closed" | "dropped";
  /** Maintenance-logbook fault code, e.g. E-014. */
  faultCode?: string;
  /** How badly it went. */
  severity?: "minor" | "moderate" | "critical";
  /** What was actually wrong. Left blank when it is still unknown. */
  rootCause?: string;
  /** What was done about it. */
  fix?: string;
  excerpt: string;
  cover?: ImageRef;
  body?: string[];
  placeholder?: boolean;
};

export type JournalEntry = {
  slug: string;
  date: string;
  title: string;
  kind: "update" | "photo" | "music" | "ukulele" | "moment";
  excerpt?: string;
  images?: ImageRef[];
  body?: string[];
  /** Real play count, when it has actually been recorded. */
  loops?: number;
  placeholder?: boolean;
};

export type FilmEntry = {
  title: string;
  year?: number;
  director?: string;
  watchedOn?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  note?: string;
  /** The line that stayed after the credits. */
  stayed?: string;
  letterboxdUrl?: string;
  placeholder?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  /** Illustrated parts list number, e.g. BZ-06-01. */
  partNo?: string;
  year?: string;
  summary: string;
  role?: string;
  stack: string[];
  status: "shipped" | "in-progress" | "archived";
  links?: { label: string; href: string }[];
  cover?: ImageRef;
  body?: string[];
  /** The three-panel view: problem, build, and the note that stayed. */
  procedure?: {
    problem?: string;
    build?: string;
    /** What the project taught, in the owner's own words. */
    lesson?: string;
    /** Left blank until there is an honest change to record. */
    change?: string;
  };
  /** How the parts connect. Rendered as a chain of expandable nodes. */
  schematic?: { label: string; role: string; step?: string }[];
  placeholder?: boolean;
};

export type TimelineItem = {
  period: string;
  title: string;
  org?: string;
  kind: "education" | "work" | "organization" | "project";
  summary: string;
  current?: boolean;
};
