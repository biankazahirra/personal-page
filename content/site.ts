import type { Site } from "./types";

export const site: Site = {
  name: "Bianka Zahirra",
  fullName: "Bianka Zahirra Putri",
  tagline: "just a person figuring things out.",
  intro: [
    "I keep forms, spreadsheets and small systems in order for a living. The rest of the time I make things, take them apart, and write down what happened.",
    "Most of what lives here is unfinished on purpose: notes on AI agents, films I keep turning over, songs on repeat, a ukulele I am still slow at.",
  ],
  portrait: {
    src: "/images/portraits/portrait.jpg",
    alt: "Bianka in a black hijab and a batik shirt, smiling at the camera",
    width: 1200,
    height: 1500,
  },
  links: [
    { label: "GitHub" },
    { label: "Letterboxd", href: "https://letterboxd.com/biyyaanca/" },
    { label: "Spotify" },
  ],
  currentlyInto: [
    {
      label: "AI agents",
      note: "OpenCode, mostly. Seeing what holds up when I ask it to build something real.",
    },
    {
      label: "Psychological thrillers",
      note: "Films that stay in the room after they end.",
    },
    {
      label: "Ukulele",
      note: "Four chords, slowly, badly, every evening.",
    },
    {
      label: "Small tools",
      note: "Unglamorous systems that return an hour every week.",
    },
  ],
};
