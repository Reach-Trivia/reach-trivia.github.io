import assert from "node:assert/strict";
import test from "node:test";
import { getMatchShortcut } from "../src/utils/matchShortcuts.js";

test("match shortcuts address the intended timer action and team", () => {
  assert.equal(getMatchShortcut({ key: "n" }).action, "toggle");
  assert.equal(getMatchShortcut({ key: "M" }).action, "restart");
  for (const [key, teamIndex, points] of [
    ["u", 0, 10],
    ["i", 0, 5],
    ["h", 0, -10],
    ["j", 0, -5],
    ["o", 1, 10],
    ["p", 1, 5],
    ["k", 1, -10],
    ["l", 1, -5],
  ]) {
    const shortcut = getMatchShortcut({ key });
    assert.equal(shortcut.scope, "score");
    assert.equal(shortcut.teamIndex, teamIndex);
    assert.equal(shortcut.points, points);
  }
  assert.equal(getMatchShortcut({ key: " " }), null);
  assert.equal(getMatchShortcut({ key: "Escape" }), null);
  for (const key of ["t", "r", "1", "2", "9", "0"]) {
    assert.equal(getMatchShortcut({ key }), null);
  }
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
    assert.equal(getMatchShortcut({ key: "m", [flag]: true }), null);
    assert.equal(getMatchShortcut({ key: "u", [flag]: true }), null);
  }
  assert.equal(
    getMatchShortcut({ key: "u", target: { isContentEditable: true } }),
    null,
  );
  const field = { closest: () => ({ tagName: "INPUT" }) };
  assert.equal(getMatchShortcut({ key: "u", target: field }), null);
  assert.equal(getMatchShortcut({ key: "n", target: field }), null);
});
