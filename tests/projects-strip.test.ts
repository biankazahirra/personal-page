import assert from "node:assert/strict";
import test from "node:test";

import { isAtEnd, snapIndex } from "../lib/strip-scroll.ts";

test("snap index rounds to the nearest card and clamps the ends", () => {
  assert.equal(snapIndex(0, 460, 3), 0);
  assert.equal(snapIndex(240, 460, 3), 1);
  assert.equal(snapIndex(900, 460, 3), 2);
  assert.equal(snapIndex(-40, 460, 3), 0);
});

test("snap index survives a zero-width step", () => {
  assert.equal(snapIndex(300, 0, 3), 0);
  assert.equal(snapIndex(300, 100, 0), 0);
});

test("the strip counts as at the end only within a small tolerance", () => {
  assert.equal(isAtEnd(600, 1000, 400), true);
  assert.equal(isAtEnd(596, 1000, 400), true);
  assert.equal(isAtEnd(500, 1000, 400), false);
});
