import type { JournalEntry } from "./types";

export const journal: JournalEntry[] = [
  {
    slug: "clayface-tuesday",
    title: "Clayface, on a Tuesday",
    date: "2026-10-27",
    kind: "update",
    excerpt:
      "Three tickets for the 18:15 show at Cilegon Center. Row B, seats 4 to 6.",
    images: [
      {
        src: "/images/life/nonton-clayface.jpg",
        alt: "Three Clayface cinema tickets from Cilegon Center held in front of rows of green seats",
        width: 960,
        height: 1280,
      },
    ],
  },
  {
    slug: "im-with-you",
    title: "I'm With You, on repeat",
    date: "2026-10-31",
    kind: "music",
    loops: 77,
    excerpt: "Avril Lavigne — I'm With You. 77 plays in one month.",
    body: [
      "The loop counter is real this time: 77 plays of I'm With You by Avril Lavigne in October 2026.",
      "Why it stayed on repeat is still unwritten. [ note pending ]",
    ],
  },
  {
    slug: "sample-four-chords",
    title: "Four chords, slowly",
    date: "2026-10-04",
    kind: "ukulele",
    excerpt:
      "Sample entry for uke progress: what changed hands this week, what still buzzes.",
    body: [
      "A learning journal is more useful when it records the awkward stage, not the finished song.",
      "Try: what I practised, what sounded wrong, what finally clicked.",
    ],
    placeholder: true,
  },
  {
    slug: "sample-where-this-goes",
    title: "Where this is going",
    date: "2026-09-15",
    kind: "update",
    excerpt:
      "Sample entry for the first honest post: why this page exists and what it is not.",
    placeholder: true,
  },
];

export const kindLabels: Record<JournalEntry["kind"], string> = {
  update: "update",
  photo: "photo diary",
  music: "music",
  ukulele: "ukulele",
  moment: "moment",
};
