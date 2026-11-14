import assert from "node:assert/strict";
import test from "node:test";
import { getMatchShortcut } from "../src/utils/matchShortcuts.js";

test("match shortcuts address the intended timer action and team", () => {
  assert.equal(getMatchShortcut({ key: "t" }).action, "toggle");
  assert.equal(getMatchShortcut({ key: "R" }).action, "restart");
  for (const [key, teamIndex, points] of [
    ["1", 0, 5],
    ["2", 0, 10],
    ["9", 1, 5],
    ["0", 1, 10],
  ]) {
    const shortcut = getMatchShortcut({ key });
    assert.equal(shortcut.scope, "score");
    assert.equal(shortcut.teamIndex, teamIndex);
    assert.equal(shortcut.points, points);
  }
  assert.equal(getMatchShortcut({ key: " " }), null);
  assert.equal(getMatchShortcut({ key: "Escape" }), null);
});

test("typing, held keys, composition, and browser shortcuts cannot trigger match actions", () => {
  for (const flag of [
    "defaultPrevented",
    "repeat",
    "isComposing",
    "ctrlKey",
    "metaKey",
    "altKey",
    "shiftKey",
  ]) {
    assert.equal(getMatchShortcut({ key: "r", [flag]: true }), null);
    assert.equal(getMatchShortcut({ key: "1", [flag]: true }), null);
  }
  assert.equal(
    getMatchShortcut({ key: "1", target: { isContentEditable: true } }),
    null,
  );
  const field = { closest: () => ({ tagName: "INPUT" }) };
  assert.equal(getMatchShortcut({ key: "1", target: field }), null);
  assert.equal(getMatchShortcut({ key: "t", target: field }), null);
});
