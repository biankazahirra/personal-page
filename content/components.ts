export type ComponentEntry = {
  href: string;
  code: string;
  label: string;
  blurb: string;
  /** One line shown on the assembly board. */
  spec: string;
  status: "live" | "unpopulated";
};

/**
 * The site read as a machine: six sockets, numbered like parts.
 * `unpopulated` is shown as-is rather than hidden, so an empty section
 * reads as an empty socket, not a broken link.
 */
export const components: ComponentEntry[] = [
  {
    href: "/",
    code: "C01",
    label: "index",
    blurb: "the entrance",
    spec: "one page, six sockets",
    status: "live",
  },
  {
    href: "/about",
    code: "C02",
    label: "about",
    blurb: "the person",
    spec: "portrait, timeline, toolbox",
    status: "live",
  },
  {
    href: "/curiosity",
    code: "C03",
    label: "curiosity",
    blurb: "the explorer",
    spec: "notes, some unfinished",
    status: "live",
  },
  {
    href: "/life",
    code: "C04",
    label: "life",
    blurb: "the observer",
    spec: "journal, photos, music",
    status: "live",
  },
  {
    href: "/films",
    code: "C05",
    label: "films",
    blurb: "the watcher",
    spec: "no entries yet",
    status: "unpopulated",
  },
  {
    href: "/projects",
    code: "C06",
    label: "projects",
    blurb: "the maker",
    spec: "small systems, academic, work",
    status: "live",
  },
];
