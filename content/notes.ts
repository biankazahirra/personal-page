import type { Note } from "./types";

export const notes: Note[] = [
  {
    slug: "sample-what-i-do-with-agents",
    title: "What I actually do with AI agents",
    date: "2026-10-10",
    category: "ai",
    status: "running",
    excerpt:
      "A sample note. Replace it with what you really tried, and what actually helped.",
    body: [
      "This is a sample entry, here so the page has something to hold. Swap the text for your own note.",
      "A shape that works: what I tried, what I expected, what happened, what I would do differently next time.",
      "Keep it short. Two honest paragraphs are better than a summary nobody finishes.",
    ],
    placeholder: true,
  },
  {
    slug: "sample-tool-i-dropped",
    title: "A tool I tried and then dropped",
    date: "2026-09-22",
    category: "tools",
    status: "dropped",
    excerpt:
      "A sample note about a tool that did not survive the second week. Your version goes here.",
    placeholder: true,
  },
  {
    slug: "sample-small-script-big-hour",
    title: "The small script that gave me an hour back",
    date: "2026-08-30",
    category: "code",
    status: "closed",
    excerpt:
      "A sample note about repetition, boredom and the shortest possible fix.",
    placeholder: true,
  },
  {
    slug: "sample-learning-in-progress",
    title: "Learning in progress",
    category: "learning",
    status: "running",
    excerpt:
      "A sample note for the things you are learning right now, written before you finish them.",
    placeholder: true,
  },
];

export const noteCategories = [
  { value: "ai", label: "ai" },
  { value: "code", label: "code" },
  { value: "tools", label: "tools" },
  { value: "learning", label: "learning" },
] as const;
