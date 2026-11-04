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
    note: "Saw it as a kid and it was just a comedy. Saw it again after college, and every student with their own struggle and their own ambition hit a lot harder. The characters stick with you long after.",
    letterboxdUrl: "https://letterboxd.com/film/3-idiots/",
  },
  {
    title: "The Dark Knight",
    year: 2008,
    director: "Christopher Nolan",
    rewatches: "5+×",
    rating: 5,
    note: "No explanation needed: it's a masterpiece, chef's kiss. Every part of it is top notch, and the Joker is genuinely insane. It's Christopher Nolan, so what did you expect.",
    letterboxdUrl: "https://letterboxd.com/film/the-dark-knight/",
  },
  {
    title: "The Silence of the Lambs",
    year: 1991,
    director: "Jonathan Demme",
    rewatches: "5+×",
    rating: 5,
    note: "My favourite psychological thriller, and it isn't close. Dr. Hannibal Lecter is brilliant, manipulative, and impossible to look away from, and the chemistry between him and Clarice is off the charts. Not a weak part in it.",
    letterboxdUrl: "https://letterboxd.com/film/the-silence-of-the-lambs/",
  },
];
