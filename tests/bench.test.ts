import assert from "node:assert/strict";
import test from "node:test";

import {
  GRAIN_DEFAULT,
  GRAIN_MAX,
  GRAIN_MIN,
  grainOpacity,
  readGrain,
} from "../lib/bench.ts";

test("the default fader value is the printed grain opacity", () => {
  assert.equal(grainOpacity(GRAIN_DEFAULT), 0.1);
});

test("the fader wipes the grain at zero and doubles it at the top", () => {
  assert.equal(grainOpacity(GRAIN_MIN), 0);
  assert.equal(grainOpacity(GRAIN_MAX), 0.2);
});

test("values outside the fader range are clamped", () => {
  assert.equal(grainOpacity(-40), 0);
  assert.equal(grainOpacity(9999), 0.2);
  assert.equal(grainOpacity(33), 0.033);
});

test("an empty store falls back to the default", () => {
  assert.equal(readGrain(), GRAIN_DEFAULT);
});
