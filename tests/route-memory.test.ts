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
