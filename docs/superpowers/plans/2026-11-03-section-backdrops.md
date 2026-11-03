# Section backdrops — plan

Design: `docs/superpowers/specs/2026-11-03-section-backdrops-design.md`.
Request: `PROMPT_BACKGROUNDS.md`.

Seven rounds. One variant per round, homepage section plus its own page in one
commit, then deploy for review. Do not start a round until the owner has seen
the previous deploy.

Every round ends with: `npx tsc --noEmit`, `npm run lint`, `npm test`,
`npm run build`, then a deploy, then a screenshot of the desktop and the 390 px
view in Day shift and Night shift.

---

## Round 0 — scaffolding (no visual change)

1. Create `app/backdrops.css` with the `:root` variables, the Night-shift
   remap, and an empty `.bg-drawing` placeholder. Add the `@import` line to
   `app/globals.css` after `./phase-four.css`.
2. Add the `.index-tab` utility, unused for now.
3. Confirm the build is byte-identical in appearance: no section carries a
   `.bg-*` class yet.
4. Gates. One commit, one push. Review.

## Round 1 — `drawing` (homepage hero)

1. `.bg-drawing`: two grids (64 px major, 8 px minor) at 8% and 3.5% ink.
2. `::before`: four 16 px registration marks in the corners. `::after`: one
   dashed ring, 320 px, centered behind the exploded view.
3. Mobile (≤ 767 px): 48 px major grid, no registration marks, ring kept.
4. Apply to `ExplodedHero`'s `<section>` (already `relative overflow-hidden`),
   replacing `bg-paper`. Add the `D01 · IDENTIFICATION` index tab to the
   section's first `<p>`.
5. Gates. Measure `.eyebrow`, `.text-ink-muted` and the hero paragraph against
   the backdrop. Commit and push. Review.

## Round 2 — `form` (C02 about, `/about`)

1. `.bg-form`: 32 px rules, one red margin rule at 96 px.
2. `::before`: nothing extra needed; keep the single pseudo free for the tab
   gap if a measurement fails.
3. Mobile: 28 px rules, margin rule at 34 px.
4. Homepage: `#chapter-02` swaps `bg-paper` for `bg-form`. `/about`: the page
   has no section wrapper of its own — add the class to the existing first
   block, or to `<main>` via a page-level wrapper, whichever keeps the diff to
   one element. Add the `C02 · SPECIFICATIONS` tab.
5. Gates. Contrast check on the heading, lede and the spec table. Commit,
   push, review.

## Round 3 — `ledger` (C03 curiosity, `/curiosity`)

1. `.bg-ledger`: 36 px ruled lines, double red margin rule at 120/124 px.
2. `::before`: three ~20 px binder holes on the left edge, each a dark circle
   with an inner ring.
3. Mobile: 32 px lines, holes kept, margin rule at 44 px.
4. Homepage: `#chapter-03` swaps `bg-paper`. `/curiosity`: `PageHeader` plus
   the `<section>` that holds `Logbook` — put the class on the outer block that
   spans the page, so the holes do not restart at the section.
5. Gates. Commit, push, review.

## Round 4 — `desk` (C04 photos, `/life`)

1. `.bg-desk`: 120 px major grid at 14%, 24 px minor at 6%.
2. `::before`: ruler ticks, 1 px every 12 px, 12 px tall, along the top edge.
3. Mobile: 96 px major grid, ticks kept.
4. Homepage: `#chapter-04` currently `bg-night text-paper-on-night`. The brief
   says only `panel` stays dark, so this section becomes the desk surface and
   its `tone="night"` `PartLabel` plus the `PhotoTray` tone must follow. Check
   `FilmStrip` (desktop) and `PhotoTray` (mobile) on the new base before
   committing: both draw their own dark frame, so they should read as loose
   frames on a cutting mat.
5. `/life`: same class on the page wrapper; the `PhotoTray` there already uses
   `tone="paper"`.
6. Gates. Contrast check on the tray caption, note, counter and tap hint, both
   shifts. Commit, push, review.

## Round 5 — `panel` (C05 films, `/films`)

1. `.bg-panel`: `#231f1a` base, 26 px pegboard dots at 16% cream.
2. `::before`: four ~9 px screws. `::after`: unused (keep for the tab gap).
3. Apply to homepage `#chapter-05` and the `/films` page wrapper. The section
   already carries dark ink on `bg-paper`; the panel makes it genuinely dark, so
   every text color inside it must be checked and, where needed, switched to
   the cream tokens. This is the round with the largest risk of invisible text.
4. Keep the lamps exactly as they are.
5. Gates. Full contrast sweep of the section. Commit, push, review.

## Round 6 — `sheet` (C06 projects, `/projects`, `/projects/[slug]`)

1. `.bg-sheet`: 16 px fine grid at 5%.
2. `::before` and `::after`: inner frame, title block `BZ-2026 · SHEET 6/6`
   bottom-right, 3 SVG zone letters A–C on the left, 6 SVG zone numbers 1–6
   along the top.
3. Mobile: hide the zone marks and shrink the frame to a single hairline.
4. Homepage: `#chapter-06` is the pinned horizontal section with an inner
   `h-sticky`. The backdrop must sit on the outer section so it does not
   scroll with the track. Check that the sticky child does not clip the frame.
5. `/projects` and `/projects/[slug]`: same class on the page wrapper.
6. Gates. Commit, push, review.

## Round 7 — `plate` (footer, `/colophon`)

1. `.bg-plate`: brushed-metal stripes, brassy gradient ramp.
2. `::before`: a 14 px hazard band along the top edge (`45deg`, mustard/ink).
   The footer already renders a `.hazard` strip as a real element; the band
   here must not double up. `::after`: four rivets.
3. Check `plate` in Night shift hardest: the plate base is the one mid-tone
   surface, so its cream ink is the weakest pair in the whole set.
4. `/colophon`: same class on the page wrapper.
5. Gates. Commit, push, review.

---

## Report due at the end

- The route-to-variant mapping applied.
- Changed files.
- Screenshots: each section, desktop and mobile, Day and Night shift.
