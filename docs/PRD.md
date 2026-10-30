# PRD — Personal Page / Digital World

**Owner:** Bianka Zahirra Putri
**This document replaces:** `prompt.txt` (the original ChatGPT brief) as the source of truth
**Version:** 1.0
**Status:** Approved
**Repo:** `E:\Bianka\MyProjects\personal-page`

## Changelog

| Version | Change |
|---------|--------|
| 1.0 | First PRD. Turns the free-form brief into a spec: routes, acceptance criteria, design tokens, content schema, non-functional budgets, milestones. |
| 1.1 | Frame rebuilt around the "machine being assembled" metaphor: six sockets replace chapter numbers, a probeable assembly board on the homepage, part labels everywhere else, Overpass typography. Content, routes and palette unchanged. |

---

## 1. Summary

A one-person personal site that feels like walking into someone's small world: cinematic, editorial, personal. Not a work portfolio, not a services landing page, not an online CV.

The site moves around three themes: **The Observer** (film, music, everyday moments), **The Explorer** (AI agents, code, tools, learning notes), **The Maker** (projects and practical systems). These themes are creative organizing principles, not mandatory navigation labels.

Professional experience stays present, but small, and never dominates.

## 2. Goals

1. A visitor understands who Bianka is within the first ten seconds, without reading a CV.
2. The site feels made by a person, not generated from a template. Strong, consistent art direction.
3. Bianka can add a note, a journal entry, a film, or a project without touching layout components.
4. The site grows: new content never requires a redesign.

## 3. Non-goals (v1)

- No CMS, database, or authentication.
- No live Spotify or Letterboxd API integration. Outbound links only.
- No analytics, tracking, cookie banner, comments, or newsletter.
- No heavy blog engine (MDX is optional, not required).
- No separate pages for experience or contact (see §5).
- No multi-language support in v1 (see D-01).

## 4. Anti-goals (failures even if the site technically works)

- It reads like a recruitment portfolio or a decorated CV.
- SaaS hero copy, such as "I build scalable digital solutions".
- Every section is an identical rounded card.
- Animation that makes the site slow, or excessive parallax.
- Any invented fact, photograph, metric, or link.
- A mobile layout that is just the desktop layout shrunk down.

## 5. Sitemap and acceptance criteria

Nine routes. Fully static (SSG), no server runtime.

| Route | Content | Acceptance criteria |
|-------|---------|---------------------|
| `/` | Home, cinematic six-part flow | Six sockets (`C01`–`C06`) render in order; every socket opens its section; the board is readable without JavaScript and on touch; no section repeats another's content |
| `/about` | Personal narrative + timeline + skills | Timeline and skills live on the same page (anchors `#journey`, `#toolbox`); first-person copy; no claim that the degree was completed |
| `/curiosity` | Index of notes and experiments | Asymmetric grid; category filter (ai / code / tools / learning) works without reload; entries without `body` have no detail link |
| `/curiosity/[slug]` | Note detail | Only for entries with `body`; `generateStaticParams` covers every slug |
| `/life` | Visual journal | Entries newest first; supports `update`, `photo`, `music`, `ukulele`; layout varies per kind, never a uniform feed |
| `/life/[slug]` | Journal detail | Same as notes; gallery supports 1–4 images |
| `/films` | Film journal | List with year, rating, short note; no detail page in v1; outbound Letterboxd link only when a URL is supplied |
| `/projects` | Collection of things made | Status visible (shipped / in-progress / archived); projects without links show no dead button |
| `/projects/[slug]` | Project detail | Shows summary, role, stack, status, imagery, a numbered note list and an optional powered schematic (auto-runs once in view; `run`, `step`, `reset`); no unverified impact metrics |
| `not-found` | 404 | Same visual language; a way back to `/` |

Mandatory extras: `sitemap.xml`, `robots.txt`, OG image per primary route.

**Home sequence (six sockets):**

1. Assembly board: six probeable sockets, model/revision/status table, name and one line.
2. Short introduction (2–3 sentences, first person), portrait slot.
3. Notes preview — the Explorer socket (`C03`).
4. Horizontal journal strip — the Observer socket (`C04`).
5. Films socket (`C05`), shown as unpopulated while `content/films.ts` is empty.
6. Projects preview (`C06`), then the day job, recently, and the footer.

Navigation: the header keeps `Bianka Zahirra`, `rev 2026` and a `components`
button that opens the socket list as an overlay. Transparent over the opening,
solid after scroll. Mobile: fullscreen overlay, single column, touch targets ≥ 44px.

## 6. Creative direction

### 6.1 Principles

- The site is one machine being assembled; the visitor reads its service manual.
  Every frame element agrees with that, prose does not.
- Six sockets (`C01`–`C06`) replace chapter numbers. They appear on the homepage
  board, in the header overlay, and as part labels on every page.
- Asymmetry, deliberate whitespace, magazine-spread composition.
- Typography is the main visual element, not a wrapper for text.
- Images tell stories, not decorative thumbnails.
- Visual rhythm: light sections and dark sections alternate down the page.
- Avoid: decorative gradients, glassmorphism, uniform border radii, heavy soft shadows.

### 6.1a Schematic primitives

Defined in `app/globals.css`, shared by the board and the page headers:

| Class | What it is |
|-------|------------|
| `.trace`, `.trace-h`, `.trace-v` | copper hairline, 1px |
| `.node-label` | bordered mono badge for a part code |
| `.schematic-grid` | faint 24px grid, homepage hero only |

The homepage board (`components/schematic-board.tsx`) is markup plus CSS: hovering
or focusing a socket lights its trace and steps the other sockets back to 0.35
opacity. It works before hydration, without JavaScript, and on touch, where a tap
opens the section directly.

`content/components.ts` is the single source for the six entries: code, label,
blurb, board spec line and status (`live` / `unpopulated`). The header and the
board both read it, so they cannot drift.

### 6.2 Typography

| Role | Font | Notes |
|------|------|-------|
| Display / headings | Overpass 400 | signage-derived grotesque, self-hosted via `next/font` |
| Body / UI | Overpass | same family as display, weights 400/500 |
| Meta (dates, categories, numbers) | Overpass Mono, uppercase, tracking 0.12em | 11–13px only |

Fluid scale:

- Display: `clamp(3rem, 9vw, 8rem)`, line-height 0.95, letter-spacing -0.015em
- Section H2: `clamp(2rem, 5vw, 4rem)`, line-height 1.0
- Body: `1.0625rem`, line-height 1.65, max-width 62ch
- Meta: `0.75rem`

Rules: at most three display sizes per page. Italic for emphasis, never for a whole paragraph.

### 6.3 Colour

| Token | Hex | Use |
|-------|-----|-----|
| `--paper` | `#E8E6DE` | primary light background (chalk) |
| `--ink` | `#101A1F` | text on paper (deep blue-ink) |
| `--ink-muted` | `#4A5560` | secondary text |
| `--night` | `#101A1F` | dark chapter background |
| `--night-soft` | `#17252B` | panels and placeholders on dark |
| `--paper-on-night` | `#E8E6DE` | text on dark |
| `--accent` | `#8A5A32` | text-safe copper: links, rules, active marker |
| `--accent-warm` | `#C08B57` | copper light, decorative only — never small text |

Rules: `--accent-warm` is for non-text elements or text ≥ 24px only. A chapter may switch background (`paper` ↔ `night`), but text tokens switch with it. No colour outside this table without a written reason.

### 6.4 Grid and spacing

- Desktop: 12 columns, max-width 1440px, 24px gutter, 48–96px side margins.
- Tablet: 8 columns, 20px gutter.
- Mobile: 4 columns, 16px gutter; full-bleed for hero and collage images.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.

### 6.5 Motion

- Durations: 180ms (hover), 320ms (enter), 620ms (large reveal), 640ms (page wipe).
- Easing: `cubic-bezier(.2, .6, .2, 1)`.
- **No animation library.** CSS scroll-driven animations plus one small
  `requestAnimationFrame` driver for the horizontal chapter.
- Interactions shipped in v1:
  - Page wipe on every navigation (`components/page-wipe.tsx`).
  - Clip-path image reveals, scroll-driven (`animation-timeline: view()`).
  - Chapter homepage: full-screen entrance, one pinned chapter, one
    scroll-driven horizontal chapter (vertical scroll moves four panels), then
    the maker chapter. Chapter numbers match the overlay menu.
  - Chapters overlay on every breakpoint, numbered 01–06, focus-trapped,
    closes on `Esc`; the header is the only persistent navigation.
  - Scroll progress line under the header; the header turns solid once scrolled
    so it stays legible over both light and dark chapters.
  - Hover: underline sweep on "currently into", accent title, 2% image scale.
- `prefers-reduced-motion: reduce` → scroll animations off,
  page wipe hidden, the horizontal chapter unpins and becomes a native
  horizontally scrollable row. Content stays fully visible. The choice is
  stored in `data-motion` on `<html>` and can be overridden per browser with the
  `motion: on/off` control (chapters overlay and footer).
- Without JavaScript the horizontal chapter also unpins; no panel is hidden.
- Browsers without `animation-timeline` support show the final state immediately.

### 6.6 Imagery

- Varied ratios: 4:5, 3:2, 1:1, 16:9. Not everything 16:9.
- Format: AVIF + WebP via `next/image`. `sizes` is mandatory.
- Text over an image only at ≥ 4.5:1 contrast; otherwise move the text out.
- Alt text is required by the data type, not optional.
- Every slot degrades: `components/media.tsx` renders the real image when the
  content supplies one, otherwise the labelled texture. Hero, portrait, note
  cover, project cover and journal photos all use it.

## 7. Content model

Location: `content/`. Types in `content/types.ts`. All data is local TypeScript, no CMS.

```ts
type ImageRef = { src: string; alt: string; width: number; height: number };

type Site = {
  name: string; alias?: string;
  tagline: string;              // one line, max 90 characters
  intro: string[];              // 2–3 short paragraphs
  location?: string;
  email?: string;               // empty = not displayed
  links: { label: string; href?: string }[]; // no href = not rendered as a link
  currentlyInto: { label: string; note?: string }[]; // 3–5 items
};

type Note = {
  slug: string; title: string; date?: string;
  category: "ai" | "code" | "tools" | "learning";
  excerpt: string; cover?: ImageRef;
  body?: string[];              // with body = has a detail page
  placeholder?: boolean;
};

type JournalEntry = {
  slug: string; date: string; title: string;
  kind: "update" | "photo" | "music" | "ukulele" | "moment";
  excerpt?: string; images?: ImageRef[];
  body?: string[]; placeholder?: boolean;
};

type FilmEntry = {
  title: string; year?: number; director?: string;
  watchedOn?: string; rating?: 1 | 2 | 3 | 4 | 5;
  note?: string; letterboxdUrl?: string; placeholder?: boolean;
};

type Project = {
  slug: string; title: string; year?: string;
  summary: string;              // max 140 characters
  role?: string; stack: string[];
  status: "shipped" | "in-progress" | "archived";
  links?: { label: string; href: string }[];
  cover?: ImageRef; body?: string[]; placeholder?: boolean;
  schematic?: { label: string; role: string; step?: string }[]; // parts, in flow order
};

type TimelineItem = {
  period: string; title: string; org?: string;
  kind: "education" | "work" | "organization" | "project";
  summary: string; current?: boolean;
};
```

Files: `site.ts`, `notes.ts`, `journal.ts`, `films.ts`, `projects.ts`, `timeline.ts`, `types.ts`.

Rule: components read from `content/` only. No personal strings hardcoded in `.tsx`.

## 8. Placeholder policy (resolves the brief's contradiction)

The brief asked for "realistic placeholder content" and also "never invent personal photographs". Final rules:

1. Missing personal facts → `placeholder: true` plus visible copy such as `[display name]`. Never invented.
2. Missing personal photos → a local abstract/texture block, labelled `portrait pending`. **Never** stock photos of people.
3. Sample entries for notes, journal, and films are drafts, always `placeholder: true`, rendered with a visible `sample` marker, and listed in the README's "replace these" section.
4. Verify with `grep -rn "placeholder: true" content/`.
5. `npm run build` never fails because a placeholder is still unfilled.

## 9. Technical specification

- Next.js 15 App Router, TypeScript strict, Tailwind CSS v4.
- Static rendering; no runtime dynamic routes; no page-level `use client`.
- Icons: inline SVG only. No icon library in v1 (four icons do not justify a dependency).
- Fonts via `next/font` (self-hosted).
- No animation library.
- Images in `public/images/{portraits,life,interests,projects,textures}/`. Filenames: `kebab-case`, no spaces, no non-ASCII characters.
- Structure: `app/`, `components/`, `content/`, `lib/`.
- No `utils/` folder for a single function. No state management library. No API routes.
- Deploy on Vercel; build must pass `npm run build` without fixable warnings.

## 10. Non-functional requirements

### 10.1 Responsive

- Breakpoints: `<768` mobile, `768–1279` tablet, `≥1280` desktop. Supported down to 320px.
- No horizontal scroll at 320px, 768px, or 1440px.
- Mobile: layout recomposed, not shrunk; body text ≥ 16px; images cropped with a deliberate `object-position`.

### 10.2 Accessibility — WCAG 2.2 AA target

- Text contrast 4.5:1 (small), 3:1 (≥ 24px or bold ≥ 18.66px).
- Landmarks: `header`, `nav`, `main`, `footer`. One `h1` per page, headings in order.
- Skip link to `#main`.
- Visible `:focus-visible` on every interactive element; never `outline: none` without a replacement.
- Full keyboard navigation; the mobile overlay traps focus and closes on `Esc`.
- `prefers-reduced-motion` respected.
- Information never conveyed by colour alone (project status has a text label).

### 10.3 Performance (budgets, not hopes)

| Metric | Target |
|--------|--------|
| Lighthouse mobile, Performance | ≥ 90 |
| Lighthouse Accessibility | 100 |
| LCP (mobile 4G, Moto G Power) | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| First-load JS (gzip) | < 150 KB |
| Total images on home | < 1.5 MB |

Over budget → fix before calling it done. Do not raise the budget.

### 10.4 SEO and metadata

- Per-route `metadata`: title, description, canonical, OG/Twitter image.
- `sitemap.ts` and `robots.ts`.
- `lang="en"` (D-01 resolved).
- Real name appears only where approved (D-02).

## 11. Milestones

| # | Deliverable | Exit criteria |
|---|-------------|---------------|
| M0 | Scaffold | Next.js + strict TS + Tailwind running; `npm run build` succeeds; `content/` exists |
| M1 | Design system + shell | Colour/font/spacing tokens in CSS; navbar + footer + mobile overlay; a dummy page using the tokens |
| M2 | Home | Six parts per §5; responsive at 320/768/1440; no overflow |
| M3 | Secondary pages | `/about`, `/curiosity`, `/life`, `/films`, `/projects` + detail routes; category filter works |
| M4 | Polish | Reveal motion, hover states, OG image, 404, `sitemap`, `robots` |
| M5 | Verify + docs | Lint, typecheck, build green; §10.3 budgets measured; README complete; placeholder list |

Order is mandatory. Do not start M3 before M2 passes the responsive check.

## 12. Verification (run it, do not claim it)

```
npm run lint
npx tsc --noEmit
npm run build
```

Manual:

- [ ] Every internal link resolves; no `href="#"`.
- [ ] No invented external links (GitHub, Letterboxd, Spotify, LinkedIn).
- [ ] Keyboard only: reach every page and close the overlay.
- [ ] 200% zoom: no clipped text.
- [ ] 320px: no horizontal scroll.
- [ ] Reduced motion: no translate animation.
- [ ] `grep -rn "placeholder: true" content/` → list recorded in the README.
- [ ] Lighthouse mobile run, scores recorded as they are.

## 13. Definition of Done v1

- [ ] Nine routes work, all static.
- [ ] Consistent visual identity (tokens used, no stray colours or fonts).
- [ ] Home tells a story instead of selling.
- [ ] Content editable from `content/` without touching components.
- [ ] No invented personal facts, metrics, or links.
- [ ] The degree is never stated as completed; 93 credits and 3.51 GPA may appear with "not completed" context.
- [ ] §10.3 budgets met, or the gap documented.
- [ ] README: run, edit profile, add note/journal/project/film, replace images, deploy to Vercel.

## 14. Verified facts (usable, do not extend)

- Computer Science, Universitas Lampung, 2022–2024. 93 credits. Last GPA 3.51/4.00. **Not completed.**
- Administration Support, IT & Management System Division, PT Krakatau Sarana Properti, May 2025–present.
- Built digital Purchase Requisition forms in Microsoft Access.
- Managed LHSTP, vendor invoice documentation, company improvement records, monthly KPI reporting.
- Currently developing a digital LHSTP form workflow in Microsoft Access.
- Hallistic: building-booking information website, academic project. HTML, JavaScript, Tailwind CSS, PHP, MySQL. Initial interface design in Figma.
- PROPLAN: project-planning information system, Java + MySQL. Led the team.
- Logic Course Teaching Assistant, Universitas Lampung, August–December 2023. The 94% pass rate is a reported figure; attribute it, do not claim it as personal impact.
- Former Himakom Secretariat Bureau member. Managed and archived 100+ documents.
- Event Secretary, Computer Science Showdown 2024. Distributed documents to 50+ committee members.

**Forbidden:** phone number, personal email from the CV, internal company screenshots, unmeasured business impact claims, invented dates or titles.

## 15. Voice and copy

Tone: conversational, honest, observant, understated. First person. Short sentences.

Two registers, and they do not mix inside one sentence:

- **Frame** (header, board, part labels, overlay, footer microcopy): service
  manual. Nouns are parts and sockets, verbs are probe, assemble, revise. Terse,
  no jokes, lowercase labels.
- **Body** (about, notes, journal, project text): plain and direct, first person,
  no metaphor. A reader who ignores the frame still gets a normal personal site.

Visitors never see repository details. File paths, build steps and "TODO" belong
in the README, not on a page.

Allowed: "still learning", "trying things out", "not finished", "a temporary note".

Forbidden: "passionate", "innovative solutions", "leveraging technology", "seasoned", "expert", "10x", motivational quotes, emoji in UI.

Opening directions (pick one or rewrite):

- "just a person figuring things out."
- "collecting ideas, learning things, building little worlds."
- "somewhere between code, music, and too many open tabs."

## 16. Open decisions

| ID | Question | Decision |
|----|----------|----------|
| D-01 | Site language | **English** (decided). All strings in `content/`. |
| D-02 | Display name | **`Bianka`** as the display name, **`Bianka Zahirra Putri`** on `/about` (decided) |
| D-03 | Domain | none yet, `.vercel.app` |
| D-04 | Public contact email | not displayed until supplied |
| D-05 | Letterboxd, Spotify, GitHub, LinkedIn URLs | not displayed (no fake links); README lists where to add them |
| D-06 | Personal photographs available | no → texture blocks labelled `portrait pending` |
| D-07 | `/films` as its own page | yes, no detail pages in v1 |
| D-08 | Separate `/experience` page | no, part of `/about#journey` |
| D-09 | Downloadable CV PDF | not provided |
| D-10 | MDX for long bodies | no, `string[]` paragraphs |

## 17. Risks

| Risk | Mitigation |
|------|------------|
| Without personal photos, the visual identity leans on typography and texture | Treat typography as the hero; ship three high-quality abstract textures |
| Cinematic references invite heavy animation | §10.3 budgets and the no-animation-library rule |
| Content goes stale quickly | Dates optional; "currently into" is cheap to edit |
| Sensitive company data leaks | No internal screenshots; describe PR/LHSTP work without operational detail |
| Placeholders survive into production | §12 checklist plus the README list |

## 18. Out of scope for this PRD

Final visual design (moodboard, per-section composition), the per-file implementation plan, and the full copy deck. These come after this PRD is approved.
