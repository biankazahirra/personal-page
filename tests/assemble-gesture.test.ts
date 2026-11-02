import assert from "node:assert/strict";
import test from "node:test";

import { HOLD_MS, gesture, holdProgress } from "../lib/assemble-gesture.ts";

test("a tap under 200ms assembles instantly", () => {
  assert.equal(gesture({ heldMs: 120, movedPx: 0, touch: true }), "instant");
});

test("a full hold completes the assembly", () => {
  assert.equal(gesture({ heldMs: HOLD_MS + 40, movedPx: 0, touch: true }), "hold");
});

test("lifting before 1200ms lets the parts drift back", () => {
  assert.equal(gesture({ heldMs: 600, movedPx: 0, touch: true }), "ignore");
});

test("a 20px drag is a scroll, not a hold", () => {
  assert.equal(gesture({ heldMs: 120, movedPx: 20, touch: true }), "ignore");
});

test("reduced motion skips the hold and goes straight to stage 3", () => {
  assert.equal(
    gesture({ heldMs: HOLD_MS, movedPx: 0, touch: true, reduced: true }),
    "instant",
  );
});

test("hold progress runs 0 to 1 and clamps", () => {
  assert.equal(holdProgress(0), 0);
  assert.equal(holdProgress(HOLD_MS / 2), 0.5);
  assert.equal(holdProgress(HOLD_MS), 1);
  assert.equal(holdProgress(HOLD_MS * 2), 1);
  assert.equal(holdProgress(-50), 0);
});
