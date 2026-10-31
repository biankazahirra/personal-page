import { components } from "./components";

export type ManualSection = {
  code: string;
  href: string;
  /** Printed section number, e.g. "3.0". */
  section: string;
  /** Printed title in the contents list. */
  title: string;
  /** Page footer, e.g. "Page 3-1". */
  page: string;
  /** Short line for the contents overlay. */
  blurb: string;
};

const titles: Record<string, Pick<ManualSection, "section" | "page" | "title">> = {
  C01: { section: "1.0", page: "Page 1-1", title: "Identification" },
  C02: { section: "2.0", page: "Page 2-1", title: "Specifications" },
  C03: { section: "3.0", page: "Page 3-1", title: "Maintenance Logbook" },
  C04: { section: "4.0", page: "Page 4-1", title: "Inspection Photos" },
  C05: { section: "5.0", page: "Page 5-1", title: "Indicator Panel" },
  C06: { section: "6.0", page: "Page 6-1", title: "Illustrated Parts List" },
};

export const sections: ManualSection[] = [
  ...components.map((component) => ({
    code: component.code,
    href: component.href,
    blurb: component.blurb,
    ...titles[component.code],
  })),
  {
    code: "C07",
    href: "/contact",
    section: "7.0",
    page: "Page 7-1",
    title: "Service Request",
    blurb: "contact, plain text",
  },
];

/** Layout for the printed revision table in the footer. */
export const revisions = [
  { rev: "A", date: "2025-05", note: "first assembly" },
  { rev: "B", date: "2026-10", note: "contents expanded" },
  { rev: "C", date: "2026-10", note: "manual reprint" },
];

export const manual = {
  model: "BZ-2026",
  /** Decorative serial stamped on the data plate. Not a real asset number. */
  serial: "BZ-2026-0042",
  revision: "2026",
  printedRev: "Rev C",
  /** Shown in the footer as the closing line. */
  closing: "Printed Rev 2026 — assembled slowly, revised occasionally.",
};

/** The self-test typed on the start-up sheet, once per session. */
export const bootLines = [
  "power .......... ok",
  "curiosity .......... excessive",
  "ukulele .......... uncalibrated",
  "forms .......... in order",
  "status: partly assembled",
];

/** Longest matching route, so detail pages keep their section in the band. */
export function sectionForPath(pathname: string): ManualSection {
  const match = [...sections]
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => item.href === "/" ? pathname === "/" : pathname.startsWith(item.href));

  return match ?? sections[0];
}
