import type { FilmEntry } from "./types";

// Filled only with films actually watched and written about. No invented titles,
// ratings or reviews. The four below are the favourites listed on the owner's
// Letterboxd profile; add ratings and notes only when they are real.
export const films: FilmEntry[] = [
  {
    title: "12 Angry Men",
    year: 1957,
    director: "Sidney Lumet",
    letterboxdUrl: "https://letterboxd.com/film/12-angry-men/",
  },
  {
    title: "3 Idiots",
    year: 2009,
    director: "Rajkumar Hirani",
    letterboxdUrl: "https://letterboxd.com/film/3-idiots/",
  },
  {
    title: "The Dark Knight",
    year: 2008,
    director: "Christopher Nolan",
    letterboxdUrl: "https://letterboxd.com/film/the-dark-knight/",
  },
  {
    title: "The Silence of the Lambs",
    year: 1991,
    director: "Jonathan Demme",
    letterboxdUrl: "https://letterboxd.com/film/the-silence-of-the-lambs/",
  },
];
