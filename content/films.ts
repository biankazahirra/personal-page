import type { FilmEntry } from "./types";

// Filled only with films actually watched and written about. No invented titles,
// ratings or reviews. The four below are the favourites listed on the owner's
// Letterboxd profile; add ratings and notes only when they are real.
export const films: FilmEntry[] = [
  {
    title: "12 Angry Men",
    year: 1957,
    director: "Sidney Lumet",
    rewatches: "3×",
    rating: 5,
    note: "A bunch of dudes arguing in one room for almost the entire movie, in black and white, and somehow I'm glued to the screen the whole time??? How is that even possible?",
    letterboxdUrl: "https://letterboxd.com/film/12-angry-men/",
  },
  {
    title: "3 Idiots",
    year: 2009,
    director: "Rajkumar Hirani",
    rewatches: "10+×",
    rating: 5,
    note: "Used to think this was just a silly comedy as a kid. When I was in college it hits VERY differently. The struggles, the pressure, the dreams... it's all way too relatable. Funny, wholesome, and surprisingly emotional. A comfort movie for sure.",
    letterboxdUrl: "https://letterboxd.com/film/3-idiots/",
  },
  {
    title: "The Dark Knight",
    year: 2008,
    director: "Christopher Nolan",
    rewatches: "5+×",
    rating: 5,
    note: "No explanation needed. Absolute masterpiece. Everything is top-tier and the Joker? INSANE. Every scene with him is pure cinema. I mean, it's Christopher Nolan. Enough said.",
    letterboxdUrl: "https://letterboxd.com/film/the-dark-knight/",
  },
  {
    title: "The Silence of the Lambs",
    year: 1991,
    director: "Jonathan Demme",
    rewatches: "5+×",
    rating: 5,
    note: "Favorite psychological thriller. Hannibal Lecter is terrifyingly smart and manipulative and his chemistry with Clarice... is just CHEF'S KISS. Every conversation feels like a psychological chess match. Literally obsessed.",
    letterboxdUrl: "https://letterboxd.com/film/the-silence-of-the-lambs/",
  },
];
