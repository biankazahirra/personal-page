import type { FilmEntry } from "./types";

// Filled only with films actually watched and written about. No invented titles,
// ratings or reviews. The four below are the favourites listed on the owner's
// Letterboxd profile; add ratings and notes only when they are real.
export const films: FilmEntry[] = [
  {
    title: "12 Angry Men",
    year: 1957,
    director: "Sidney Lumet",
    rating: 5,
    note: "One room, twelve jurors, black and white, 1957. On paper that is the most boring film ever printed; on screen it never drags once, and the ending lands. Rewatched three times, and the room still gets hotter each time.",
    letterboxdUrl: "https://letterboxd.com/film/12-angry-men/",
  },
  {
    title: "3 Idiots",
    year: 2009,
    director: "Rajkumar Hirani",
    rating: 5,
    note: "Saw it as a kid and filed it under comedy. Saw it again after college and it had quietly turned heartwarming: every student in it carries their own struggle and their own ambition, and the characters stay with you. Ten-plus rewatches.",
    letterboxdUrl: "https://letterboxd.com/film/3-idiots/",
  },
  {
    title: "The Dark Knight",
    year: 2008,
    director: "Christopher Nolan",
    rating: 5,
    note: "No explanation needed: it is a masterpiece, chef's kiss. Every part is top notch, and the Joker is on a level of his own. It is Christopher Nolan directing, so the quality was never in question. Five-plus rewatches.",
    letterboxdUrl: "https://letterboxd.com/film/the-dark-knight/",
  },
  {
    title: "The Silence of the Lambs",
    year: 1991,
    director: "Jonathan Demme",
    rating: 5,
    note: "My favourite psychological thriller, and it is not close. Dr. Hannibal Lecter is the smartest and most manipulative presence I have watched, and the chemistry between him and Clarice is the best part of a film with no weak parts. Five-plus rewatches.",
    letterboxdUrl: "https://letterboxd.com/film/the-silence-of-the-lambs/",
  },
];
