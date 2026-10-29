# Personal page

A small personal world: notes on AI agents and small systems, a film journal,
songs on repeat, and an ukulele still being learned.

Built with Next.js (App Router), TypeScript and Tailwind CSS v4. Everything is
static. There is no database, no CMS, and no tracking.

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

## Add a film

Append to `films` in `content/films.ts`. No invented titles or ratings — the list
is empty until there is something real to log.

## Replace the placeholder images

There are no photographs in this repository yet, and no stock photos of people
are used. Image slots currently render abstract patterns from
`components/texture.tsx`, labelled `portrait pending` / `image pending` /
`screenshot pending`.

To use a real image:

1. Put the file in the right folder:
   - `public/images/portraits/`
   - `public/images/life/`
   - `public/images/interests/`
   - `public/images/projects/`
   - `public/images/textures/`
2. Use `kebab-case` filenames, no spaces: `desk-at-night.jpg`.
3. Reference it from content with `src`, `alt`, `width`, `height`:

```ts
cover: { src: "/images/projects/hallistic.jpg", alt: "Booking screen", width: 1600, height: 1200 }
```

4. Replace the `<Texture …>` block on the page with the image (see
   `app/projects/[slug]/page.tsx` for the pattern).

Alt text is required, not optional.

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
  `https://personal-page.vercel.app`; set `NEXT_PUBLIC_SITE_URL` when a real
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
- Page transitions: `components/page-wipe.tsx` replays a dark panel on route
  change. It is skipped entirely under reduced motion.
- No icon library: the few icons are inline SVG or text.
- The category filter on `/curiosity` is CSS-only (radio inputs plus `:has`), so
  it works without JavaScript.
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
