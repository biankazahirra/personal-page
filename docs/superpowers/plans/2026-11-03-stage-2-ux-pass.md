# Stage 2 UX Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the Stage 2 UX pass: a page-turn transition that never delays content, focus landing on the new page heading, per-path scroll restoration, and horizontal strips that never trap a vertical swipe.

**Architecture:** Next.js App Router drives route changes. The page turn is the browser's View Transitions API, scoped to `<main id="main">` so the manual band, tab strip and footer stay put; `PageWipe` remains as the capability fallback. Focus and scroll live in small client components mounted once in the root layout, fed by pure helpers in `lib/` that are unit-tested with `node --test`.

**Tech Stack:** Next.js 15.5.28 (App Router, `reactStrictMode`), React 19, TypeScript, plain CSS in `app/globals.css` + `app/page-worlds.css`, `node --test` for unit tests, headless Chrome over CDP for the browser checks.

**Spec:** `docs/superpowers/specs/2026-11-03-stage-2-ux-pass-design.md`

## Global Constraints

- `--t-hover: 180ms`, `--t-toggle: 200ms`, `--t-tab: 380ms`, `--t-hero: 600ms`, `--t-content-ready: 500ms`, `--t-page-turn: 1200ms`, `--ease-page: cubic-bezier(0.65, 0, 0.35, 1)`.
- Heading visible and focusable within **500ms**, on both the native and fallback paths.
- Motion state is written only by `lib/motion.ts` (`data-motion="full" | "reduce"`, `localStorage["motion"]`, `motionchange` event).
- Never hide real content during a transition: no `pointer-events: none`, no `visibility: hidden`, no `display: none` on `.display`, cards, captions or controls.
- No new dependency. No animation library.
- Company identity lock: no changes to typography, colours, borders, the manual band, placeholder styling, or copy.
- Focus and scroll fire on a `pathname` change only — never on hash-only navigation, never on first load.
- Every task ends with `npx tsc --noEmit`, `npm run lint`, `npm test` clean.

## Review Focus

- Hash-only navigation and `logbook.tsx`'s `history.replaceState` query updates must not move focus or restore scroll (D10).
- A browser without `document.startViewTransition` must run the fallback wipe with no first-paint flash and no blank frame.
- First load must not steal focus, and must not scroll.
- A stored offset larger than the new page's height must clamp, not overscroll.
- A page shorter than the viewport must not attempt a restore.

---

### Task 1: Motion tokens become the single source of truth

**Files:**
- Modify: `app/globals.css:29-35` (the `:root` token block)
- Modify: `app/globals.css:475-483` (`.page-wipe`)

**Interfaces:**
- Produces: CSS custom properties `--t-hover`, `--t-content-ready`, `--t-page-turn` on `:root`, consumed by every later task.

- [ ] **Step 1: Add the three missing §7.1 tokens**

In the `:root` block that already holds `--t-hero`, `--t-toggle`, `--t-tab`, add in the same order as §7.1:

```css
  --t-hover: 180ms;
  --t-content-ready: 500ms;
  --t-page-turn: 1200ms;
```

Keep the existing `--ease-page` and the existing comment about retiming.

- [ ] **Step 2: Retime `.page-wipe` from the token**

Replace the hard-coded `640ms` with `var(--t-page-turn)`, and split the origin so the wipe leaves from the top edge:

```css
  animation: page-wipe var(--t-page-turn) var(--ease-editorial) forwards;
```

- [ ] **Step 3: Verify the literal is gone**

Run: `Select-String -Path app/globals.css -Pattern "640ms"`
Expected: no matches.

- [ ] **Step 4: Verify build**

Run: `npx tsc --noEmit && npm run lint && npm test && npm run build`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css
git commit -m "feat(motion): wire the remaining section 7.1 timing tokens"
```

---

### Task 2: Pure navigation helpers (TDD)

**Files:**
- Create: `lib/route-memory.ts`
- Create: `tests/route-memory.test.ts`

**Interfaces:**
- Produces:
  - `focusTarget(root: ParentNode): HTMLElement | null` — the page heading, scoped to `main`.
  - `shouldMoveFocus(previous: string | null, next: string): boolean` — `false` on first load (`previous === null`) and when only the hash changed.
  - `shouldRestoreScroll(pathname: string): boolean` — `false` for the homepage.
  - `clampScroll(stored: number, max: number): number` — `0` when `max <= 0`, otherwise `Math.min(stored, max)`.
  - `readScroll(storage: Storage, pathname: string): number | null`
  - `writeScroll(storage: Storage, pathname: string, offset: number): void` — no-op when `offset === 0`.
  - Storage key format: `scroll:${pathname}`.

- [ ] **Step 1: Write the failing tests**

```ts
import assert from "node:assert/strict";
import test from "node:test";

import {
  clampScroll,
  focusTarget,
  readScroll,
  shouldMoveFocus,
  shouldRestoreScroll,
  writeScroll,
} from "../lib/route-memory.ts";

function fakeStorage() {
  const data = new Map<string, string>();
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    removeItem: (key: string) => void data.delete(key),
    clear: () => data.clear(),
    key: () => null,
    length: 0,
  } as unknown as Storage;
}

const hasMain = (html: string) => ({
  querySelector: (selector: string) => (selector === "main h1" && html === "main" ? { id: "heading" } : null),
});

test("focus targets the heading inside main, not one in the chrome", () => {
  assert.equal(focusTarget(hasMain("main") as unknown as ParentNode)?.id, "heading");
  assert.equal(focusTarget(hasMain("chrome") as unknown as ParentNode), null);
});

test("focus never moves on first load or on a hash-only change", () => {
  assert.equal(shouldMoveFocus(null, "/projects"), false);
  assert.equal(shouldMoveFocus("/life", "/life"), false);
  assert.equal(shouldMoveFocus("/life", "/projects"), true);
});

test("the homepage keeps its own focus handling", () => {
  assert.equal(shouldRestoreScroll("/"), false);
  assert.equal(shouldRestoreScroll("/projects"), true);
});

test("a stored offset clamps to the new page height", () => {
  assert.equal(clampScroll(900, 400), 400);
  assert.equal(clampScroll(900, 0), 0);
  assert.equal(clampScroll(120, 400), 120);
});

test("scroll is remembered per path and cleared at the top", () => {
  const storage = fakeStorage();
  writeScroll(storage, "/life", 640);
  assert.equal(readScroll(storage, "/life"), 640);
  assert.equal(readScroll(storage, "/projects"), null);
  writeScroll(storage, "/life", 0);
  assert.equal(readScroll(storage, "/life"), null);
});

test("corrupt storage reads as no offset", () => {
  const storage = fakeStorage();
  storage.setItem("scroll:/life", "not-a-number");
  assert.equal(readScroll(storage, "/life"), null);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot find module `../lib/route-memory.ts`.

- [ ] **Step 3: Implement `lib/route-memory.ts`**

Signatures exactly as in Interfaces. No DOM access outside `focusTarget`; storage is passed in so the helpers stay unit-testable. `readScroll` returns `null` when the value is missing or `Number.isNaN`.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, 15 existing + 6 new tests.

- [ ] **Step 5: Commit**

```bash
git add lib/route-memory.ts tests/route-memory.test.ts
git commit -m "feat(nav): pure helpers for focus target and per-path scroll memory"
```

---

### Task 3: View Transitions plumbing and capability fallback

**Files:**
- Modify: `next.config.ts`
- Modify: `app/layout.tsx:86-92` (pre-paint script) and `:114` (`<main>`)
- Modify: `components/page-wipe.tsx`
- Modify: `app/globals.css` (`.page-wipe` guard, chrome `view-transition-name: none`)

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `<html data-vt="native" | "fallback">` set before first paint; `<main id="main" class="page-sheet">` carries `view-transition-name: content`.

- [ ] **Step 1: Enable the flag**

```ts
const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: { viewTransition: true },
  ...(staticExport ? { output: "export" as const, images: { unoptimized: true }, trailingSlash: true } : {}),
};
```

- [ ] **Step 2: Detect support before first paint**

Extend the existing inline script (it already writes `shift` and `motion`) with one more statement inside the same `try`, then set the fallback in the `catch`:

```js
document.documentElement.dataset.vt = typeof document.startViewTransition === "function" ? "native" : "fallback";
```

- [ ] **Step 3: Gate `PageWipe` on the capability**

In `components/page-wipe.tsx`, after the existing `useEffect`, return `null` unless the attribute says fallback:

```tsx
if (typeof document !== "undefined" && document.documentElement.dataset.vt === "native") return null;
```

Place it before the `wipeKey` check so the native path never paints the panel.

- [ ] **Step 4: Name the sheet and freeze the chrome**

In `app/globals.css`:

```css
main.page-sheet {
  view-transition-name: content;
}

.manual-band,
.socket-tabs,
body > footer {
  view-transition-name: none;
}
```

Use the element/class names that actually exist: `.manual-band` on the header, `.socket-tabs` for the mobile tab strip, and `body > footer` because `SiteFooter` renders a bare `<footer id="contact">` with no class. Add `className="page-sheet"` to `<main id="main">` in `app/layout.tsx`.

- [ ] **Step 5: Verify the attribute and the fallback**

Start the dev server, then in headless Chrome check `document.documentElement.dataset.vt` is `"native"` and that `.page-wipe` is absent from the DOM after a client-side navigation; then re-run with `Page.addScriptToEvaluateOnNewDocument` deleting `document.startViewTransition` and confirm `"fallback"` plus a `.page-wipe` element present after navigation.

- [ ] **Step 6: Verify build**

Run: `npx tsc --noEmit && npm run lint && npm test && npm run build`
Expected: all pass; build prints no `viewTransition` warning other than Next's experimental notice.

- [ ] **Step 7: Commit**

```bash
git add next.config.ts app/layout.tsx components/page-wipe.tsx app/globals.css
git commit -m "feat(nav): scope the page turn to the content sheet with a wipe fallback"
```

---

### Task 4: Page-turn choreography

**Files:**
- Modify: `app/globals.css` (new `::view-transition-*` block; reduced-motion guard)

**Interfaces:**
- Consumes: `--t-content-ready`, `--t-page-turn`, `--ease-page` (Task 1); `view-transition-name: content` (Task 3).
- Produces: `.page-stagger` class used by Task 5.

- [ ] **Step 1: Write the turn**

```css
::view-transition-old(content) {
  animation: sheet-out calc(var(--t-content-ready) * 0.6) var(--ease-page) both;
}

::view-transition-new(content) {
  animation: sheet-in var(--t-page-turn) var(--ease-page) both;
}

@keyframes sheet-out {
  to { opacity: 0; transform: translateY(-8px) rotate(-0.4deg); }
}

@keyframes sheet-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: none; }
}
```

New content reaches full opacity at `--t-content-ready`; the remaining time is the decorative settle.

- [ ] **Step 2: Add the stagger hook**

```css
.page-stagger > * {
  animation: sheet-stagger 420ms var(--ease-page) both;
}

@keyframes sheet-stagger {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}
```

- [ ] **Step 3: Guard reduced motion and script-free**

```css
html[data-motion="reduce"] ::view-transition-old(content),
html[data-motion="reduce"] ::view-transition-new(content),
html[data-motion="reduce"] .page-stagger > * {
  animation: none !important;
}

html:not([data-motion]) .page-wipe,
html[data-vt="native"] .page-wipe {
  display: none;
}
```

- [ ] **Step 4: Verify visually at 1440 and 360, Day and Night**

Capture the frame at ~200ms and ~1200ms after a click on a nav link; confirm the band, tab strip and footer are pixel-identical between the two frames, and that the heading is readable at 200ms.

- [ ] **Step 5: Verify build**

Run: `npx tsc --noEmit && npm run lint && npm test && npm run build`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css
git commit -m "feat(motion): page-turn choreography with a content-ready first half"
```

---

### Task 5: Focus lands on the new heading

**Files:**
- Create: `components/route-focus.tsx`
- Modify: `app/layout.tsx` (mount next to `RouteAnnouncer`)
- Modify: `components/page-header.tsx:21`
- Modify: `app/contact/page.tsx:17`, `app/life/[slug]/page.tsx:50`, `app/projects/[slug]/page.tsx:67`, `app/curiosity/[slug]/page.tsx:63`

**Interfaces:**
- Consumes: `focusTarget`, `shouldMoveFocus` (Task 2).
- Produces: nothing other tasks use.

- [ ] **Step 1: Make page headings programmatically focusable**

Add `tabIndex={-1}` to the five `<h1>` sites listed above. Leave `#hero-title` in `exploded-hero.tsx` untouched.

- [ ] **Step 2: Write the component**

`RouteFocus` is a client component with no render output. It keeps `previous` in a ref, and on `usePathname()` change:

```tsx
const heading = focusTarget(document);
if (heading && shouldMoveFocus(previous.current, pathname)) {
  heading.focus({ preventScroll: true });
}
previous.current = pathname;
```

First render must not focus. Cleanup: none needed.

- [ ] **Step 3: Verify on every route**

For `/about`, `/projects`, `/projects/[slug]`, `/life/[slug]`, `/contact`, `/curiosity/[slug]`, `/not-found`: after a client-side click, `document.activeElement` is the route's `<main> h1`; on `/` it is unchanged. Then click an in-page anchor and confirm focus did not move.

- [ ] **Step 4: Verify build and tests**

Run: `npx tsc --noEmit && npm run lint && npm test && npm run build`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add components/route-focus.tsx app/layout.tsx components/page-header.tsx <the four page files>
git commit -m "feat(a11y): move focus to the new page heading after client navigation"
```

---

### Task 6: Per-path scroll restoration

**Files:**
- Create: `components/scroll-memory.tsx`
- Modify: `app/layout.tsx` (mount)
- Modify: `app/globals.css` (optional `html[data-restoring]` override)

**Interfaces:**
- Consumes: `readScroll`, `writeScroll`, `clampScroll`, `shouldRestoreScroll` (Task 2).
- Produces: nothing other tasks use.

- [ ] **Step 1: Write the component**

Client component, no render output:

- On mount and on `pathname` change: read `sessionStorage`, clamp to `document.documentElement.scrollHeight - innerHeight`, and if `shouldRestoreScroll(pathname)` and the offset is `> 0`, set `document.documentElement.dataset.restoring = "1"`, call `window.scrollTo(0, offset)`, then remove the attribute on the next frame.
- While not restoring: write `scrollY` through `requestAnimationFrame` on `scroll`, skipping writes below `8px`.
- Never restore on first load.

- [ ] **Step 2: Kill the smooth-scroll fight**

```css
html[data-restoring] {
  scroll-behavior: auto;
}
```

- [ ] **Step 3: Verify the round trip**

At 360 and 1440: scroll a long page to ~60%, navigate to another route, then go back. Confirm the offset is within 8px of where it was, the heading has focus, and the page did not animate to the top first. Repeat with a page shorter than the stored offset and confirm it lands at the bottom, not beyond.

- [ ] **Step 4: Verify build and tests**

Run: `npx tsc --noEmit && npm run lint && npm test && npm run build`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add components/scroll-memory.tsx app/layout.tsx app/globals.css
git commit -m "feat(nav): remember scroll position per path"
```

---

### Task 7: Horizontal strips never trap a vertical swipe

**Files:**
- Modify: `components/index-tabs.tsx:21` (add a class hook only)
- Modify: `app/globals.css` (`.index-tabs`, `.film-strip`, `.socket-tabs`) and/or `app/page-worlds.css` (`.film-strip`) if needed

**Interfaces:**
- Consumes: nothing.
- Produces: nothing.

- [ ] **Step 1: Give the index tab list a class hook**

`components/index-tabs.tsx:21` `<ol>` currently has only utility classes, so CSS cannot target it. Add `index-tabs` to its `className` string. No visual change.

- [ ] **Step 2: Measure first**

On a 390×844 touch profile, dispatch a vertical pointer drag starting inside each strip (`index-tabs`, `film-strip`, `socket-tabs`) and record `scrollY` before/after. A strip passes when the page scrolls.

- [ ] **Step 2: Fix only the failures**

For each failing selector add:

```css
  overscroll-behavior-x: contain;
  touch-action: pan-y;
```

No other strip changes.

- [ ] **Step 3: Re-measure and record which strips needed the fix**

Repeat Step 2; every strip must now scroll the page. Note the list in the stage report.

- [ ] **Step 4: Verify build**

Run: `npx tsc --noEmit && npm run lint && npm test && npm run build`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css app/page-worlds.css components/index-tabs.tsx
git commit -m "fix(tabs): let vertical swipes through every horizontal strip"
```

---

### Task 8: Reduced-motion gaps on the script-free path

**Files:**
- Modify: `app/globals.css`
- Modify: `app/page-worlds.css`
- Modify: `app/phase-four.css`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing.

- [ ] **Step 1: Add guards only for rules reachable without the toggle**

Inside `@media (prefers-reduced-motion: reduce)`, add `animation: none !important;` / `transition: none !important;` for the selectors the audit listed as unguarded on `html:not([data-motion])`: `.overlay-panel`, `.journey-carriage`, `.page-wipe`, `.projects-hint`, `.projects-gauge > span`, and the `phase-four.css` egg animations (`.egg-mark`, `.egg-toast`, `.egg-ukulele-card`, `.egg-logo-hit`).

Do not touch the active-toggle blanket rule at `globals.css:126-133`; it already covers everything.

- [ ] **Step 2: Verify with motion off and with the OS preference**

Load with `localStorage` unset and `prefers-reduced-motion: reduce` emulated; check the listed elements report `animationName: "none"` and `transitionDuration: "0s"`.

- [ ] **Step 3: Verify build**

Run: `npx tsc --noEmit && npm run lint && npm test && npm run build`
Expected: all pass.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/page-worlds.css app/phase-four.css
git commit -m "fix(motion): still the remaining animations when the OS asks for less"
```

---

### Task 9: Measure against the 500ms budget and close the stage

**Files:**
- Create: `docs/audit/stage-2-report.md`

**Interfaces:**
- Consumes: everything above.
- Produces: the Stage 2 report.

- [ ] **Step 1: Record the throttled trace**

Chrome DevTools emulation: 4× CPU, Slow 3G. For both paths (native; `startViewTransition` deleted), click a nav link and record the time until the new `<main> h1` is visible and `document.activeElement`. Cold first navigation and warm navigation, at 390×844.

- [ ] **Step 2: Check the rest of the gate**

CLS < 0.1, zero console errors, JS-off renders every page, Day + Night screenshots at 360/390/768/1024/1440, and the keyboard/focus sweep from Task 5.

- [ ] **Step 3: Write the report**

`docs/audit/stage-2-report.md`: what changed, files touched, timing table, the strips that needed the Task 7 fix, screenshots, validation output, blockers.

- [ ] **Step 4: Commit, push, verify the deploy**

```bash
git add docs/audit/stage-2-report.md
git commit -m "docs: stage 2 UX pass report"
git push origin HEAD:main
```

Then confirm the production deployment serves the new `<html data-vt>` attribute and that a client navigation still turns the sheet.

## Self-Review

- **Spec coverage:** A1→Task 3; A2→Task 1; A3→Tasks 3+4; A4→Tasks 2+5; A5→Tasks 2+6; A6→Task 7; A7→Task 8; A8→Task 9. D1→Task 3; D2/D3→Task 9; D4→Tasks 2+5; D5/D6→Task 3; D7/D8→Task 6; D9→Task 4 (stagger class); D10→Task 2 tests.
- **Review Focus:** hash-only navigation and `replaceState` → Task 2 test `shouldMoveFocus` + Task 6's pathname-only trigger; missing API → Task 3 Step 5; first-load focus/scroll → Tasks 2, 5, 6; oversize offset → Task 2 `clampScroll` + Task 6 Step 3; short page → Task 6 Step 1.
- **Type consistency:** `focusTarget`, `shouldMoveFocus`, `shouldRestoreScroll`, `clampScroll`, `readScroll`, `writeScroll` are defined once in Task 2 and referenced by those names in Tasks 5 and 6.
