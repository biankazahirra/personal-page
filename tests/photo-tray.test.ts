import assert from "node:assert/strict";
import test from "node:test";

import { bringToFront, flipOrder, photoLabel } from "../lib/photo-tray.ts";

test("forward flip moves the top photo to the bottom of the stack", () => {
  assert.deepEqual(flipOrder([0, 1, 2, 3], 1), [1, 2, 3, 0]);
});

test("back flip pulls the bottom photo to the top", () => {
  assert.deepEqual(flipOrder([0, 1, 2, 3], -1), [3, 0, 1, 2]);
});

test("flipping wraps in both directions and survives a short stack", () => {
  assert.deepEqual(flipOrder([0, 1, 2], 1), [1, 2, 0]);
  assert.deepEqual(flipOrder([0], 1), [0]);
  assert.deepEqual(flipOrder([0], -1), [0]);
});

test("the announced label keeps the two-digit counter", () => {
  assert.equal(photoLabel("songs, lately", 1, 4), "Photo 2 of 4: songs, lately");
  assert.equal(photoLabel("songs, lately", 0, 1), "Photo 1 of 1: songs, lately");
});

test("a dot jump lifts that photo and keeps the rest in order", () => {
  assert.deepEqual(bringToFront([0, 1, 2], 2), [2, 0, 1]);
  assert.deepEqual(bringToFront([1, 2, 0], 2), [2, 1, 0]);
  assert.deepEqual(bringToFront([0, 1, 2], 0), [0, 1, 2]);
  assert.deepEqual(bringToFront([0, 1], 9), [0, 1]);
});
