/** The four inspection photos shown in C04. Copy and order are fixed. */
export type PhotoMoment = {
  label: string;
  variant: "grid" | "waves" | "field" | "arcs";
  note: string;
};

export const photoMoments: PhotoMoment[] = [
  {
    label: "a week that went fast",
    variant: "grid",
    note: "The photos that never made it anywhere else.",
  },
  {
    label: "songs, lately",
    variant: "waves",
    note: "What ended up on repeat, and for how long.",
  },
  {
    label: "practice, badly",
    variant: "field",
    note: "Ukulele progress, recorded at the awkward stage.",
  },
  {
    label: "rooms worth sitting in",
    variant: "arcs",
    note: "Places that made me stay a little longer.",
  },
];
