export type ComponentEntry = {
  href: string;
  code: string;
  label: string;
  /** Plain meaning, always shown so the metaphor is never required. */
  plain: string;
  blurb: string;
  /** One line shown on the assembly board. */
  spec: string;
  status: "live" | "unpopulated";
  /** Codes of sockets this one connects to. Related parts light on probe. */
  links?: string[];
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
    label: "Identification",
    plain: "You are here",
    blurb: "the entrance",
    spec: "one page, six sockets",
    status: "live",
    // The index carries every other socket.
    links: ["C02", "C03", "C04", "C05", "C06"],
  },
  {
    href: "/about",
    code: "C02",
    label: "Specifications",
    plain: "About me",
    blurb: "the person",
    spec: "portrait, experience, toolbox",
    status: "live",
  },
  {
    href: "/curiosity",
    code: "C03",
    label: "Maintenance Logbook",
    plain: "Notes & experiments",
    blurb: "the explorer",
    spec: "notes, some unfinished",
    status: "live",
  },
  {
    href: "/life",
    code: "C04",
    label: "Inspection Photos",
    plain: "Personal moments",
    blurb: "the observer",
    spec: "journal, photos, music",
    status: "live",
  },
  {
    href: "/films",
    code: "C05",
    label: "Indicator Panel",
    plain: "Favourite films",
    blurb: "the watcher",
    spec: "four favourites, five stars each",
    status: "live",
  },
  {
    href: "/projects",
    code: "C06",
    label: "Illustrated Parts List",
    plain: "My projects",
    blurb: "the maker",
    spec: "small systems, academic, work",
    status: "live",
  },
];
