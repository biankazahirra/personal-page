# Personal page

A small personal world: notes on AI agents and small systems, a film journal,
songs on repeat, and an ukulele still being learned.

The site is read as one machine being assembled, and the visitor is holding the
service manual. Six sockets (`C01`–`C06`) replace chapter numbers: the homepage
board shows them, the header keeps the list, and every section carries its part
number. The prose stays plain; only the frame is schematic.

Built with Next.js (App Router), TypeScript and Tailwind CSS v4. Everything is
static. There is no database, no CMS, and no tracking. Fonts are Overpass and
Overpass Mono, served by `next/font`.

The specification lives in [`docs/PRD.md`](docs/PRD.md).

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Where to edit things

| What | File |
|------|------|
| Name, tagline, intro, currently-into, links | `content/site.ts` |
| Component list: codes, names, status, board spec line | `content/components.ts` |
| Notes / curiosity entries | `content/notes.ts` |
| Journal entries | `content/journal.ts` |
| Films | `content/films.ts` |
| Projects | `content/projects.ts` |
| Education, work, organisations | `content/timeline.ts` |
| Field definitions | `content/types.ts` |

Pages read from `content/` only. Nothing personal is hardcoded in a component,
so you can rewrite every word without touching layout.

## Add a note

Append an object to `notes` in `content/notes.ts`:

```ts
{
  slug: "agent-that-failed",          // used in the URL
  title: "An agent that failed quietly",
  date: "2026-11-02",
  category: "ai",                     // ai | code | tools | learning
  status: "running",                  // running | closed | dropped (optional)
  excerpt: "One or two lines that appear in the index.",
  body: ["Paragraph one.", "Paragraph two."], // optional
}
```

With `body`, the entry gets its own page at `/curiosity/<slug>` and the index
links to it. Without `body`, the index shows the excerpt only.

## Add a journal entry

Append to `journal` in `content/journal.ts`. `kind` is one of
`update | photo | music | ukulele | moment`. Add `body` for a detail page,
`images` for a photo gallery:

```ts
images: [{ src: "/images/life/desk-2026.jpg", alt: "Desk at night", width: 1600, height: 1200 }]
```

## Add a project

Append to `projects` in `content/projects.ts`. Only add projects you can describe
accurately. Leave `links` out entirely when there is nothing public to link to;
the page then shows no button rather than a dead one.

`schematic` is optional. It lists the parts of the project in the order they
connect. The page runs them as a circuit when the diagram scrolls into view;
each part has a short label and one sentence of role. Add `step` to describe what
happens at that point in the flow, for the readout during the run.

```ts
schematic: [
  {
    label: "Figma",
    role: "Interfaces drawn before anything was built.",
    step: "The interface is drawn before anything is built.",
  },
  { label: "PHP", role: "Handles the booking requests." },
]
```

## Add a film

Append to `films` in `content/films.ts`. No invented titles or ratings — the list
is empty until there is something real to log.

## Connect two sockets

The homepage board lights related sockets when you probe one. Relations live in
`content/components.ts` as socket codes:

```ts
{ code: "C03", label: "curiosity", /* … */ links: ["C06"] }
```

Add a link only when the content justifies it. `C01` links to every other socket
because it is the entrance; the others stay empty until a note or a project
really refers to another section.

## Add a photograph

Image slots render an abstract texture until content supplies an image, then
`components/media.tsx` swaps in the real file in the same box. No page edits
needed, only data.

1. Put the file under `public/images/…`, kebab-case, no spaces:
   `public/images/portraits/hero.jpg` → `"/images/portraits/hero.jpg"`.
2. Compress first: longest side about 2000 px, under 300 KB. Next.js re-encodes
   on Vercel but does not shrink what you upload.
3. Fill the matching field:

| Slot | Field |
|------|-------|
| Homepage hero, full-bleed | `site.hero` in `content/site.ts` |
| Portrait, homepage chapter 02 and `/about` | `site.portrait` in `content/site.ts` |
| Note image, `/curiosity/<slug>` | `notes[].cover` |
| Project image, `/projects`, homepage, `/projects/<slug>` | `projects[].cover` |
| Journal photos, `/life/<slug>` | `journal[].images[]` |

```ts
hero: {
  src: "/images/portraits/hero.jpg",
  alt: "Empty desk with a lamp on, late evening",
  width: 2000,
  height: 1333,
}
```

Alt text is required, not optional. Width and height are the real pixel size of
the file: they reserve space so nothing jumps while the image loads.

A project cover on `/projects/<slug>` keeps its own ratio and is never cropped,
so screenshots stay readable. Everywhere else, media fills a fixed box and crops.

## Placeholders to replace

Sample content is marked in the data (`placeholder: true`) and rendered with a
`sample` tag. Find all of it with:

```bash
grep -rn "placeholder: true" content/
```

Current list:

- `content/notes.ts` — four sample notes (`sample-*` slugs)
- `content/journal.ts` — three sample entries (`sample-*` slugs)
- Homepage and About page portrait slots
- Every `screenshot pending` block on project pages

## What is intentionally missing

These need real values from the owner. Nothing is invented to fill them:

- GitHub, Letterboxd, Spotify, LinkedIn URLs (`content/site.ts` → `links[].href`).
  Links without `href` are not rendered.
- Public contact email (`content/site.ts` → `email`). Empty means the footer shows
  a short note instead of an address.
- Display name preference: `Bianka` now, full name on `/about`. Full name
  (`Bianka Zahirra Putri`) is set in `content/site.ts` → `fullName`.
- Personal photographs.
- OG image per route. Metadata exists, the generated image does not yet.
- A domain. `sitemap.ts` and `robots.ts` fall back to
  `https://biankazahirra.vercel.app`; set `NEXT_PUBLIC_SITE_URL` when a real
  domain exists.

## Deploy to Vercel

1. Push the repository to GitHub. Done: `main` tracks
   `https://github.com/biankazahirra/personal-page.git`.
2. Import it in Vercel. Framework preset: Next.js, root directory `./`. No
   environment variables are required; `NEXT_PUBLIC_SITE_URL` is optional.
3. Do **not** set `NEXT_EXPORT` on Vercel. That flag is only for the Apache
   export; leaving it unset keeps normal Next.js builds and image optimisation.
4. Deploy. The site is fully static; every route prerenders at build time.

## Serve it from Apache (optional)

If you would rather host it yourself, build a folder of plain files:

```
$env:NEXT_EXPORT='1'; npm run build
```

That writes `out/` (with `trailingSlash`, so routes become
`/about/index.html`). Copy the contents of `out/` into your Apache document
root, for example:

```
Copy-Item -Recurse -Force out\* C:\xampp\htdocs\personal-page\
```

Then open `http://localhost/personal-page/`. Notes:

- Base path matters. Serving from a subfolder needs
  `basePath: "/personal-page"` in `next.config.ts`; serving from the document
  root does not.
- `next start` does not work with `output: "export"`. Use Apache, or any static
  file server.
- Images lose Next.js optimisation in this mode (`unoptimized: true`). Fine
  while the site only holds textures; compress photographs before adding them.

## Notes on the build

- No animation library: reveals use CSS scroll-driven animations, guarded by
  `@supports` and `prefers-reduced-motion`. The horizontal chapter is one
  `requestAnimationFrame` loop in `components/horizontal-chapters.tsx`.
- The homepage is built as chapters: the entrance, a pinned chapter, one
  scroll-driven horizontal chapter, then the maker. Chapter numbers match the
  overlay menu; every destination is also a plain page at its own route.
- Without JavaScript or with reduced motion, the horizontal chapter unpins
  (`.h-section` in `app/globals.css`) and the panels become a normal
  horizontally scrollable row, so nothing is unreachable.
- Motion respects the device setting by default. `app/layout.tsx` sets
  `data-motion` before first paint from `localStorage` or
  `prefers-reduced-motion`; the `motion: on/off` control in the chapters overlay
  (and the footer) overrides it and persists per browser.
- Page transitions: `components/page-wipe.tsx` replays a dark panel on route
  change. It is skipped entirely under reduced motion.
- No icon library: the few icons are inline SVG or text.
- The category filter on `/curiosity` is a client component: it dims notes off
  the channel, keeps the choice in `?channel=`, and lights a note's channel on
  hover. Without JavaScript every note is listed and readable.
- Motion, contrast and keyboard support follow the budgets in `docs/PRD.md` §10.

## Measured (2026-10-29, production build)

Checked with the browser tool's Lighthouse audit (mobile emulation) against
`next start`:

| Metric | Result | PRD budget |
|--------|--------|-----------|
| Accessibility | 100 | 100 |
| Best practices | 100 | — |
| SEO | 100 | — |
| First-load JS | 106 kB | < 150 kB |

Performance and LCP were last measured on the earlier editorial build (91 and
2.7 s, LCP element the `Bianka` headline). The chapter rebuild — pinned
sections, a horizontal chapter, a full-screen hero texture — changed the paint
path, so those numbers are stale. Re-run Lighthouse with the performance
category before quoting one. Re-check LCP on a real phone: the throttled mobile
profile spends most of it on render delay, not network.

Not measured yet: INP under a real interaction trace. Re-run after adding real
images; photographs are what will move LCP, not the current textures.
