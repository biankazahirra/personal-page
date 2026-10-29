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
  placeholder?: boolean;
};

export type FilmEntry = {
  title: string;
  year?: number;
  director?: string;
  watchedOn?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  note?: string;
  letterboxdUrl?: string;
  placeholder?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  year?: string;
  summary: string;
  role?: string;
  stack: string[];
  status: "shipped" | "in-progress" | "archived";
  links?: { label: string; href: string }[];
  cover?: ImageRef;
  body?: string[];
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
