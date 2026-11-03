# Section backdrops — design

Source: `PROMPT_BACKGROUNDS.md` (change request). Date: 2026-11-03.

## Intent

Give every section a machine-themed background that matches its metaphor, and
put the same background on that section's own page. Today the sections are
flat `bg-paper` / `bg-night` panels on top of a ruled-paper body; the metaphor
lives in the labels and components but not in the surface.

## Goals

- One definition per backdrop, shared by the homepage section and the section's
  own page, so the two cannot drift.
- Decoration is CSS only. No image files, no parallax, no
  `background-attachment: fixed`, no `mix-blend-mode`.
- Text stays WCAG AA in Day shift and Night shift.
- No layout shift, no height change, no copy change.
- The background is present in server-rendered markup, so client navigation
  never flashes the wrong surface.

## Non-goals

- Redesigning any component, section or page.
- Moving the placeholder textures that fill empty media slots.
- Touching transitions, focus rings, scroll behaviour or accessibility
  plumbing.
- Adding a dependency.

## Anti-goals

- A backdrop whose pattern is strong enough to read as content.
- Any second dark section: `panel` is the only dark one.
- A backdrop that makes the existing card surfaces (`.data-plate`,
  `.film-frame`, `.lamp-panel`, `.photo-layer`) look pasted on.

## Constraints found in the project

- A global paper grain (`body::before`, fixed, `opacity: 0.1`, `z-index: 1`)
  covers every backdrop and cannot be switched per section.
- Almost every block that holds text already carries an opaque utility
  background (`bg-paper`, `bg-paper-2/50`, `bg-night`). A pattern painted on
  the section element therefore is **not** behind the text; it shows in the
  margins between blocks.
- The Night-shift backgrounds requested in the brief are already the current
  Night-shift base colors (`#1e1b17`, `#2a2621`, and so on), so the requested
  alpha values (2–14%) are safe; only `plate` needs a light pass because a
  mid-grey plate is the one surface where cream ink sits directly on the base.
- `html[data-motion="reduce"]` disables transitions globally. The index tab
  must not rely on a transition for anything.
- Verified neutral: the 10% paper grain over the flat `bg-paper` surfaces
  measures ~5.6:1 / ~15:1 on `.eyebrow`/`.text-ink-muted`. That is the floor.

## Approaches considered

**A. Per-section hand-written CSS**, e.g. `.about-section { ... }`.
Rejected: the homepage section and the `/about` page would each need their own
rule, which is exactly the drift the brief forbids.

**B. One `SectionBackdrop` React component with a `variant` prop**, rendering a
positioned `<div>` plus sibling decoration elements.
Rejected as the primary mechanism: it needs every section (on both the
homepage and the section page) to become `relative` and to change its child
structure, so the diff is far larger than the visual change. The whole
decoration can be drawn with pseudo-elements, which need no extra DOM.

**C. One shared CSS file, `app/backdrops.css`, with a `.bg-<variant>` class per
backdrop plus one `.index-tab` utility, utility and page backgrounds carried by
existing Tailwind classes.** **Chosen.** It is one definition per backdrop, it
changes no DOM for six of the seven variants, and the classes read the same on
both places a variant is used.

## Decisions taken

- `app/backdrops.css` is a new file, imported from `app/globals.css` with one
  `@import` line. It is not a styling layer, so it goes last in the import list
  and uses class selectors only (specificity 0,1,0) to stay under utilities.
- Backdrop colors come from **new variables with literal fallbacks**, e.g.
  `var(--bg-drawing, #efe6d0)`, not from the existing `--color-paper`. The
  brief's bases are slightly lighter than the current `--color-paper`, and some
  section text is hardcoded (`text-ink-muted` resolves to `--color-ink-muted`,
  not to a backdrop variable), so a remap of `--color-paper` alone would move
  the text/background pair in the opposite direction. The new variables are
  declared in `:root` in Day shift and remapped under `html[data-shift="night"]`
  in the same file; Night shift uses the tokens from the layout script and
  cannot be a media query.
- Decoration is drawn with `::before` and `::after` on the `.bg-*` class. Only
  five variants need two pseudo-elements: `drawing`, `ledger`, `plate`,
  `panel`, `desk`. `form` needs one; `sheet` needs none.
- **`sheet` needs JS.** The brief asks for zone numbers 1–6 along the top and
  letters A–C along the left. That is thirteen glyphs; it cannot be drawn with
  gradients. Instead of adding a component, tiny text is painted with
  `background-image: url("data:image/svg+xml,…")` on the `::before` (3–4 marks)
  and `::after` (6 marks). Roughly 1.5 KB inline. No extra DOM, no image file.
- **Index tab** is a `.index-tab` utility applied to the first child of each
  section (`<p>` or `<h2>`, not the `<section>`), positioned absolutely at the
  top-left edge and pulled up so it hangs like a folder tab. Placement is per
  page with `top-*` / `left-*` utilities, which keeps the stylesheet free to
  own only the shape. `.index-tab` is used for **all seven** variants including
  the hero.
- **`plate` contrast.** Brushed-metal stripes and the brassy gradient keep
  their low alphas. The vertical brushing is repeated at ~11 to avoid a visible
  90 px seam.
- **`panel`.** Only its background changes; `.bg-panel` sets `color` but the
  section already carries `text-paper-on-night`, so nothing moves. The lamp
  bezels and lenses are untouched, as the brief requires.
- **`ledger` and `desk` on a light base.** The brief's `--bg-ledger: #e9ddbe`
  is close to the current paper, so the ruled lines and the binder holes read
  as a maintenance book rather than as a change of page.
- **`desk` ruler ticks** sit in a 14 px band at the top edge of the section.
  On the homepage C04 the band runs under the section heading, whose text sits
  on paper at ~5.6:1; the ticks are 1 px lines at 22% ink, so the worst-case
  local contrast under a glyph stays above the text floor. On `/life` the band
  falls in section padding above the heading.
- **`hero register marks`** are drawn in `::after` (four 16 px `+`), and the
  dashed circle behind the exploded view stays a purely decorative single
  dashed ring drawn on the same layer; it carries no information the text does
  not already carry, so it is `aria-hidden` by construction (pseudo-element).
- **Print.** `@media print` in `backdrops.css` drops the tab and the decoration
  pseudos, so the printed manual keeps flat sheets.

## What is left to the builder

- The exact `top-*` / `left-*` utilities for each tab.
- The exact SVG data URIs for the sheet zone marks and letters.
- Where a measured contrast ratio falls below 4.5:1, add the smallest scrim
  (a thin patch of the backdrop base color behind that text) rather than
  lowering the pattern for the whole section.

## Rollout

Seven rounds, one variant per round, homepage section plus the section page in
the same commit, each round followed by a deploy for review:

| Round | Variant | Homepage | Section page(s) |
|---|---|---|---|
| 1 | `drawing` | hero | — |
| 2 | `form` | C02 | `/about` |
| 3 | `ledger` | C03 | `/curiosity` |
| 4 | `desk` | C04 | `/life` |
| 5 | `panel` | C05 | `/films` |
| 6 | `sheet` | C06 | `/projects`, `/projects/[slug]` |
| 7 | `plate` | footer | `/colophon` |

`/contact` keeps its current background.
