# Stage 2 design: UX pass — motion, focus, tabs, context retention

Date: 2026-11-03
Status: approved by owner 2026-11-03 (see Decisions, D1-D3)

## Intent

Stage 2 of `REVISION_BRIEF.md` is a UX pass over the whole site, not one page. The
brief asks for four things: keyboard and focus handling, a mobile tab strip that
never traps vertical scroll, context retention across navigation, and the
page-turn animation defined in §7. The animation has a hard constraint that
shapes everything else: the new page must be readable and focusable within
`--t-content-ready` (500ms) even when the decorative effect runs for
`--t-page-turn` (1200ms).

## Why

Bianka wants section changes to feel like turning a page of a service manual.
Her reviewer warned the opposite: a visitor must never wait to reach content.
The current implementation only satisfies half of that. `PageWipe` is a 640ms red
panel that empties upwards, which is decoration with no content-staging around
it, and the motion tokens in §7.1 are half-wired: `--t-hero`, `--t-toggle` and
`--t-tab` exist, but `--t-page-turn`, `--t-content-ready` and `--t-hover` do not,
so the 640ms panel duration is hard-coded and divorced from the token set that is
supposed to be the single source of truth.

## Goals

- A page change reads as turning one sheet of the manual.
- The new page's heading is visible, readable and focusable within 500ms of the
  navigation, on a mid-range mobile profile.
- Focus lands on the new page's `<h1>`, so a screen reader and a keyboard user
  both start at the top of the new content instead of at the link they clicked.
- Scrolling back to a long page returns the reader to where they were.
- Every horizontal strip keeps its snap behaviour and never swallows a vertical
  swipe.
- Reduced motion and the motion toggle collapse all of it to an instant state.

## Non-goals

- No rewrite of the route structure, header, footer or theme.
- No new content, no invented copy.
- No change to the identity lock (§ "Do NOT change"): typography, colours,
  borders, the manual-band header, placeholder styling.
- No animation library.

## Anti-goals

- A transition that delays the first printable content, or that a visitor must
  sit through before they can click.
- A transition that queues. Clicking again mid-effect must cut straight to the
  new destination.
- Content hidden until an animation finishes. No `pointer-events: none` and no
  `visibility: hidden` on real content during a transition.
- A `viewTransition` flag that silently degrades to a blank first paint.

## Constraints

- Next.js 15.5.28, App Router, `reactStrictMode`. `next.config.ts` currently sets
  only `output` (conditional) and `reactStrictMode`.
- Motion state is written in exactly one place, `lib/motion.ts`
  (`setMotionMode`), which sets `data-motion="full" | "reduce"` on `<html>`,
  persists to `localStorage["motion"]`, and dispatches `motionchange`.
- A pre-paint inline script in `app/layout.tsx` sets `data-motion` from
  storage, falling back to `prefers-reduced-motion`.
- `globals.css` already carries a blanket kill-switch for the active toggle:
  `html[data-motion="reduce"] *` sets `animation-duration` and
  `transition-duration` to `0.01ms !important`. Anything reached by that rule
  needs no separate guard.
- The site has an existing `route-announcer.tsx` with `aria-live="polite"`.
- LCP and CLS must not regress. First load is not a transition.

## Approaches considered

**A. View Transitions API, native, via Next's `experimental.viewTransition` —
chosen.** The browser snapshots the old and new DOM and animates between them, so
the page-turn is a real cross-document effect rather than an overlay painted on
top. No bundle cost, no library, off the critical path by construction. Next 15
wires `startViewTransition` into the router, so a `Link` click triggers it with
no click handler. The trade-off is reach and novelty: it needs a browser with the
API (Chromium, recent Safari), and it is behind an experimental flag, so the app
must look correct when the API is absent.

**B. Extend the existing `PageWipe` overlay.** Paint a red panel, sweep a paper
edge across it, stagger the new content in behind it. No experimental flag, works
everywhere, and reuses a component already in production. Rejected as the primary
mechanism because the effect can only ever be an overlay travelling over content
that is already there: the "old page leaves, new page arrives" reading that §7.2
describes is faked, and the stagger is hand-maintained per element rather than
falling out of the transition. Kept as the fallback path for browsers without the
API, so option A degrades into option B.

**C. Framer Motion `AnimatePresence`.** The most control over stagger and
interruption. Rejected: a new dependency on the critical path for an effect the
platform now provides natively, against §8's "new features, services or build
tools" guard and §7's "keep it off the critical path".

## Decisions

### A1. Enable the View Transitions API, keep `PageWipe` as fallback

`next.config.ts` gains `experimental: { viewTransition: true }`. A small client
component detects support (`document.startViewTransition`). When it is present the
router drives the turn and `PageWipe` stays out of the way; when it is absent the
existing wipe runs, retimed to the token set. Support detection is a capability
check on `document`, not a user-agent sniff.

### A2. Tokens become the single source of truth

`globals.css` `:root` gains the three missing §7.1 tokens:
`--t-hover: 180ms`, `--t-content-ready: 500ms`, `--t-page-turn: 1200ms`. The
page-turn effect and the `PageWipe` fallback both read `--t-page-turn`, so
changing one value retimes both. The `640ms` literal goes away.

### A3. Choreography

The 0-150 / 150-500 / 500-1200ms structure of §7.2 maps onto the View
Transitions pseudo-elements: `::view-transition-old(content)` fades and lifts out
during the first window, `::view-transition-new(content)` is fully opaque and
interactive by `--t-content-ready`, and the decorative sweep plus the content
stagger belong to the back half. The stagger targets the elements that are
secondary on every page (cards, captions, textures) through a shared class, so it
is declared once and not per element.

The snapshot is scoped to the content, not the window (owner decision D1).
`<main id="main">` in `app/layout.tsx` carries `view-transition-name: content`,
and the chrome that must not move while a page turns — the manual band header,
the index tab strip, the footer — gets `view-transition-name: none`. Using the
default `root` snapshot would have carried the red band and the tab strip along
with the content, which reads as the whole application changing rather than one
sheet of the manual.

### A4. Focus moves to the new `<h1>`, then scroll is restored

These two requirements fight: focusing an element scrolls to it, which would
undo a restored position. Resolution, in this order:

1. On pathname change, find the page's `<h1>` and `focus({ preventScroll: true })`.
2. Then apply the stored scroll position.

`tabIndex={-1}` is added to page headings so they are programmatically
focusable while staying out of the tab order. The homepage is excluded: it
already has `#hero-title` with `tabIndex={-1}` and its own focus handling in
`startup-checklist.tsx`. Focus never moves on first load — only on a route
change, matching the existing rule in `route-announcer.tsx`.

### A5. Scroll position is stored per path

A small client component stores `window.scrollY` against `location.pathname` in
`sessionStorage`, throttled through `requestAnimationFrame`, and restores it on
the next mount of that path. Restoring uses `behavior: "instant"` so it is not
animated by the global `scroll-behavior: smooth`. Session storage, not local:
context retention matters within a visit, and a stale position from last week
would be worse than the top of the page. The homepage and any page shorter than
the viewport are skipped.

### A6. Tab strips: verify, then fix only what fails

`index-tabs`, `film-strip` and the mobile `socket-tabs` already set
`scroll-snap-type: x mandatory` and are keyboard reachable; `film-strip` and
`socket-tabs` carry comments claiming vertical swipes pass through. That claim is
untested. The plan measures each strip on a touch profile first. Only strips that
actually trap a vertical swipe get `overscroll-behavior-x: contain` and
`touch-action: pan-y`, which is the minimum change that fixes it.

### A7. Reduced motion

The active toggle is already covered by the blanket kill-switch. The gap the
audit found is the script-free path (`html:not([data-motion])` with
`prefers-reduced-motion: reduce`), where several rules animate with no guard.
The view-transition CSS is written inside a guard from the start, and the
fallback keeps its existing `display: none` rule. Guards are added only for rules
reachable on that path, not blanket-applied.

### A8. Measurement is part of the work

§7.3 requires a number: click to new heading visible and focusable ≤ 500ms on a
mid-range mobile profile. The budget applies to **both** transition paths (owner
decision D2), so the `PageWipe` fallback is retimed to the same rule rather than
being left free. A8 records the number with a CPU- and network-throttled trace,
not an estimate (owner decision D3): Chrome DevTools emulation, **4x CPU
throttle, Slow 3G**, measuring both a cold first navigation and a warm
cross-page navigation.

## Builder-check resolutions

A fresh builder reviewed this document before it reached the owner. Its
questions, and what was decided:

**D1 — Which snapshot turns (owner).** Scope to content: `view-transition-name:
content` on `<main id="main">`, `view-transition-name: none` on the header, tab
strip and footer. See A3.

**D2 — Does the 500ms budget cover the fallback (owner).** Yes, both paths. See A8.

**D3 — Which mobile profile is measured (owner).** Chrome DevTools, 4x CPU,
Slow 3G, cold and warm. See A8.

**D4 — Which element is "the page's `<h1>`" (builder call).** The heading the
route renders as its title. Routes split three ways: `page-header.tsx:21` for the
section index pages, an inline `<h1>` for `contact` and the `[slug]` detail
pages, and `exploded-hero.tsx:383` for the homepage. Every route has exactly one
`<h1>`, so the rule is `document.querySelector("main h1")`, scoped to `<main>` so
a future decorative or hidden `h1` in the chrome can never win. `tabIndex={-1}`
goes in `page-header.tsx` once, plus the three inline sites, not per route.

**D5 — How the support check stays stable under SSR and StrictMode (builder
call).** The pre-paint inline script in `app/layout.tsx` already writes `shift`
and `motion`; capability detection joins it, writing `data-vt="native"` or
`data-vt="fallback"` on `<html>` before first paint. No effect-driven flag, so
there is no frame where the fallback paints before the check resolves. The
component reads the attribute, it does not set it.

**D6 — `PageWipe` when the native path is active (builder call).** It renders
only when `data-vt="fallback"`. On the native path it is not mounted at all,
which removes the risk of a red panel painting over the transition snapshot.

**D7 — Scroll restore versus the router's own scroll handling (builder call).**
Restore runs after the router settles and after A4's focus, in that order: focus
with `preventScroll: true`, then restore. The router's own reset only applies to
history entries it manages; the stored offset is keyed by `location.pathname`, so
the two agree on where they are going. Ordering is fixed here so it cannot be
re-decided by accident during the build.

**D8 — Guaranteed instant restore (builder call).** `behavior: "instant"` is not
reliable everywhere, so restoration temporarily overrides the global
`scroll-behavior: smooth` for the duration of the set, then removes the override.

**D9 — Stagger scope (builder call).** The shared class is added in
`page-header.tsx` and the handful of card/strip components, not swept across
every page.

**D10 — Trigger predicate (builder call).** A4 and A5 fire on a `pathname`
change only. Hash-only navigation and the search-params updates in `logbook.tsx`
must not move focus or restore scroll.

## What is left to the builder

- The exact CSS of the paper-edge sweep and which elements join the stagger.
- Whether the sweep is one pseudo-element or two.
- The precise throttle for the scroll-position writer.
- Which strips need A6's fix, pending measurement.

## Verification

- `tsc --noEmit`, `eslint`, `node --test`, `next build` all clean.
- Focus lands on `<main h1>` on every route; the restored scroll position
  survives it.
- Browser chrome (band, tab strip, footer) does not move during a page turn.
- Back-button between two long pages returns to the stored offset.
- Each horizontal strip snaps, is keyboard reachable, and does not block a
  vertical swipe.
- Reduced motion and the toggle both collapse the turn to instant; JS-off still
  renders usable pages; the fallback path is exercised with the API disabled.
- Throttled trace (D3): heading visible and focusable ≤ 500ms on both paths.
- CLS < 0.1, no console errors, production build deploys.
