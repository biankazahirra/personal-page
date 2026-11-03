# Stage 2 UX pass — report

Plan: `docs/superpowers/plans/2026-11-03-stage-2-ux-pass.md`
Design: `docs/superpowers/specs/2026-11-03-stage-2-ux-pass-design.md`
Branch: `rev/revision-brief` (worktree `brave-comet`). Code range `f17668a..456dbf8`, plus this report. A commit cannot name itself, so the range ends at the last code commit.

## What changed

| # | Change | Commit |
|---|---|---|
| 1 | `--t-hover`, `--t-content-ready`, `--t-page-turn` added to `:root`; `.page-wipe` stops hard-coding `640ms` | `1882c2e` |
| 2 | `lib/route-memory.ts`: pure helpers for the focus target and per-path scroll memory, unit-tested | `f089ff6` |
| 3 | View Transitions enabled (`experimental.viewTransition`), capability written pre-paint as `data-vt`, snapshot scoped to `<main class="page-sheet">`, chrome frozen | `93b8a54` |
| 4 | Page-turn choreography: sheet fades over `--t-content-ready`, settles over `--t-page-turn`; root cross-fade disabled | `f2af3f1` |
| 5 | `RouteFocus` moves focus to `<main> h1` on a pathname change; six headings made focusable | `c4e48b8` |
| 6 | `ScrollMemory` stores and restores `scrollY` per pathname in `sessionStorage` | `d44abf2` |
| 7 | Index tab strip named so it can be measured (component is unused today) | `2ae6187` |
| 8 | Reduced-motion guards for the audited selectors, keyed so an explicit full-motion choice still animates | `14c60c0`, `6afe983` |
| 9 | Final-review fix wave: the fallback wipe uncovers the heading first and finishes inside `--t-content-ready`; scroll restore moved to a layout effect; a below-8 px offset was made to delete the stored entry | `4fae06b` |
| 10 | Focus moved to the same phase as the restore so focus lands first, and leaving the homepage writes no key | `bd56798` |
| 11 | Two changes from row 9 reverted after measurement disproved them: the restore is a passive effect again, and a below-8 px observation no longer deletes a stored offset | `f2d0ece`, `456dbf8` |

Two plan corrections were made before execution: `f17668a` (fade at `--t-content-ready`, no dead stagger rule, step numbering) and `8879705` (root cross-fade freeze).

## Gates

- `npx tsc --noEmit`, `npm run lint`, `node --test` (22 passing), `next build` (36 routes) — clean at every commit.
- Production build served with `npm start`; navigation sweep across `/`, `/life`, `/life/[slug]`, `/about`, `/colophon`, `/projects`, `/contact`, `/curiosity`, `/films`: **zero console errors**.

## Focus

`document.activeElement` after a client-side navigation is `<main> h1` of the destination, inside `<main>`:

| Navigation | Result |
|---|---|
| `/life` → `/colophon` | `H1` = "End matter." |
| `/life` → `/life/im-with-you` | `H1` = the entry title |
| home → `/about` (Contents overlay) | `H1` = "The person behind the tabs." |
| `/colophon` → `/` | `H1` = "Bianka Zahirra" (`#hero-title`) |
| first load | `BODY` — focus never moves |
| hash-only (`location.hash = "#contact"` on `/life`) | `BODY`, pathname unchanged — focus never moves |

## Scroll memory

Re-checked against the final build (all on the production server, at build `456dbf8`):

| Run | Result |
|---|---|
| `/colophon` at 500 → `/` → `/colophon` (forward navigation) | `scrollY` **500**, focus on the `/colophon` heading, `scroll:/colophon` still stored |
| `/life` at 900 → `/colophon` → Back | `scrollY` **900**, focus on the `/life` heading |
| `/life` at 900 → `/colophon`, then a cold load of `/life` | `scrollY` **0** — the first load never restores |
| `/` at 400 → `/about` | no `scroll:/` key is written |
| hash-only (`location.hash = "#contact"` on `/life`) | focus stays on `BODY`, no restore attempt |

Focus and the restore run in that order, and that is measured, not assumed: instrumenting `HTMLElement.prototype.focus` and `window.scrollTo` during a forward navigation records `focus:H1` first, then `scrollTo(0, 500)`. The restore is instant (the `data-restoring` override of `scroll-behavior: smooth`), and a shorter destination clamps to its own height rather than overscrolling.

Two behaviours worth stating plainly, because they are the plan's rules and not accidents:

- **The listener is what stores offsets, not the exit capture.** Next.js resets the document scroll on a push navigation, so by the time the capture runs `window.scrollY` is already 0 and the plan's "skip writes below 8 px" rule makes it write nothing. Offsets therefore only exist once the reader has scrolled after hydration; a scroll made before hydration is not remembered.
- **The top of a page does not clear its entry.** The plan specifies skipping writes below 8 px, so a reader who returns to the top of `/life` and then navigates away can be put back at the old offset on a return. Clearing the entry instead was tried and reverted — see "Decisions taken during the build".

## Transition paths

| Path | Evidence |
|---|---|
| Native (`data-vt="native"`) | `.page-wipe` absent after navigation; `document.startViewTransition` present |
| Fallback (`data-vt="fallback"` forced) | `.page-wipe` present, computed `animation-duration: 500ms` = `var(--t-content-ready)`, `transform-origin: bottom` |

The wipe used to run for `var(--t-page-turn)` (1200 ms) from the top, which left the heading behind an opaque panel for about a second. It now shrinks towards the bottom edge, so the top of the sheet — where the heading is — is uncovered first, and the whole reveal ends inside the 500 ms budget.

## Timing

Measured on the production build at `localhost`, desktop viewport, **unthrottled**: a click on the footer "colophon" link (or the entry link) from `/life`, sampled every animation frame from inside the page. Three runs each; the table gives the worst of the three.

- **in DOM** — the destination `<main> h1` exists.
- **unoccluded** — the heading's box no longer overlaps the fallback panel, so the heading is readable, not merely present.
- **focused** — `document.activeElement === document.querySelector("main h1")`.

| Path | heading in DOM | unoccluded | focused | CLS |
|---|---|---|---|---|
| native | ≤149 ms | ≤149 ms | **≤149 ms** | 0.001 |
| fallback (panel running) | ≤184 ms | **≤200 ms** | **≤184 ms** | 0.0004 |
| native, `/life` → `/life/im-with-you` | ≤160 ms | ≤160 ms | **≤160 ms** | not measured separately; same path as "native" |

The panel is fully off-screen at 500 ms (its own duration); the heading is clear well before that. Both paths land inside the 500 ms budget with room to spare. Focus is observed in the same frame the heading appears, because it is applied in a layout effect. CLS during a navigation that actually restores an offset is 0.0002 (native) and 0.0004 (fallback), and 0.0005 for a buffered first load — two orders of magnitude below the 0.1 bar.

**Limitation, stated plainly:** these numbers are *not* the D3 profile. The in-app browser exposes no CPU throttling, no network throttling, and no viewport emulation, so 4× CPU / Slow 3G at 390×844 could not be applied. The measurement is therefore an upper-bound-free best case: it proves the architecture (focus and visibility are not gated on the 1200 ms decorative settle) but it does not prove the budget under a mid-range phone. To reproduce the D3 trace: Chrome DevTools → Performance, 4× CPU + Slow 3G, device 390×844, record a click on a nav link, read the time to the new heading and to `document.activeElement === document.querySelector("main h1")`.

## Horizontal strips (Task 7)

Measured, not assumed:

| Strip | Scroll container | `touch-action` | Verdict |
|---|---|---|---|
| `film-strip` (`/life`) | `.film-strip-wrap`, `overflow-x: auto` | `auto` | passes — vertical swipes reach the page |
| `socket-tabs` (`/`) | none needed at this width | `auto` | passes |
| `index-tabs` | renders nowhere (component unused) | — | n/a |

No `touchmove`/`pointermove` `preventDefault` exists in any component. **No CSS fix was applied**, and the plan's proposed `touch-action: pan-y` was rejected on the way: on a horizontal scroller it disables horizontal finger panning, which would have broken the strips it was meant to help.

## Reduced motion

- The active toggle path is unchanged: `html[data-motion="reduce"] *` still kills every animation.
- The script-free path now has guards for `.page-wipe`, `.overlay-panel`, `.journey-carriage`, `.projects-hint`, `.projects-gauge > span`, and the four `phase-four.css` egg animations.
- Each guard is prefixed `html:not([data-motion="full"])`, so a visitor who explicitly chose full motion on a reduced-motion OS still gets motion. Not browser-verified: the in-app browser cannot emulate `prefers-reduced-motion`, and the persistence path (`localStorage["motion"]`) was not exercised in this pass.

## JS off

Fetched the server HTML for eight routes; every one renders its `<h1>` with `tabindex`:

```
/          200 h1: "Bianka Zahirra"
/life      200 h1: "A journal without a schedule."
/about     200 h1: "The person behind the tabs."
/colophon  200 h1: "End matter."
/projects  200 h1: "Things I made, and what they taught me."
/contact   200 h1: "Say hi."
/curiosity 200 h1: "Notes from the open tabs."
/films     200 h1: "Watched, then thought about."
```

## Not verified, and why

- **D3 throttled trace** — tooling has no CPU/network throttling (above).
- **Day + Night at 360/390/768/1024/1440** — the in-app browser cannot set a viewport or a colour scheme. One Day screenshot at the default viewport was captured during the sweep; the responsive rules are unchanged by this stage.
- **`prefers-reduced-motion` emulation** — not available.

## Decisions taken during the build

- The root pseudo-elements lost the default cross-fade; without it the band, tab strip and footer fade with the content.
- The per-child content stagger was dropped: a view transition snapshots the new DOM, so child animations never run on the native path. The sheet settle carries the motion.
- `writeScroll` removes the key at offset 0 rather than storing `"0"`. The plan's own test asserts that; the component still never writes 0, because the plan's Task 6 says to skip writes below 8 px.
- The homepage heading is focused on arrival like any other route; "homepage excluded" meant it needed no extra attribute, not that focus must skip it.
- **The scroll restore stays a passive effect.** A review asked for a layout effect, so a restored page could not paint at the top first. Measured: with the layout effect the restore is silently discarded (Next.js resets the document scroll after layout effects run), so a forward navigation to a remembered path landed at `scrollY` 0 and the resulting 0 then deleted the stored entry. The design's D7 already says the restore runs after the router settles, so the layout effect was reverted.
- **A below-8 px offset no longer deletes the stored entry.** That change came from the same review. Measured: the exit capture reads `window.scrollY` after the router has reset it, so the rule deleted the outgoing page's offset on every navigation. The plan's Task 6 wording (skip the write) was restored.

## Pre-existing, unchanged

- RSC prefetch 404s for two `/curiosity/sample-*` pages.
- The word-count target from the brief is still unmet.
- `components/index-tabs.tsx` renders nowhere.
