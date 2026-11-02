import assert from "node:assert/strict";
import test from "node:test";

import { buildLately, excludeLately, latelyPosition } from "../content/lately.ts";
import { films } from "../content/films.ts";
import { journal } from "../content/journal.ts";
import { notes } from "../content/notes.ts";

test("lately shows at most three rows, newest first", () => {
  const lately = buildLately();

  assert.ok(lately.length <= 3, `expected <= 3 rows, got ${lately.length}`);
  assert.ok(lately.length > 0, "expected at least one row");

  const dates = lately.map((item) => item.date);
  assert.deepEqual(dates, [...dates].sort((a, b) => b.localeCompare(a)));
});

test("lately never invents an item without a date", () => {
  const lately = buildLately();
  const undatedFilms = films.filter((film) => !film.watchedOn).map((f) => f.title);

  for (const title of undatedFilms) {
    assert.ok(
      !lately.some((item) => item.section === "films" && item.title === title),
      `${title} has no watched date and must not appear`,
    );
  }
});

test("an item in lately is excluded from the preview below it", () => {
  const lately = buildLately();
  const rest = excludeLately(notes, "curiosity", lately);
  const shown = new Set(lately.map((item) => `${item.section}:${item.slug}`));

  for (const note of rest) {
    assert.ok(!shown.has(`curiosity:${note.slug}`), `${note.slug} repeated`);
  }
});

test("life preview drops the journal entries already shown in lately", () => {
  const lately = buildLately();
  const rest = excludeLately(journal, "life", lately);
  const shown = new Set(lately.map((item) => `${item.section}:${item.slug}`));

  for (const entry of rest) {
    assert.ok(!shown.has(`life:${entry.slug}`), `${entry.slug} repeated`);
  }
});

test("lately position is one value, not a layout decision in the page", () => {
  assert.ok(["after-hero", "after-board"].includes(latelyPosition));
});
