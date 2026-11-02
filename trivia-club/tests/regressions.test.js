import assert from "node:assert/strict";
import test from "node:test";
import { getQuestionOfTheDay } from "../src/utils/getQuestionOfTheDay.js";
import { chart, createScoreChart } from "../src/utils/scoreChart.js";
import { parseScore } from "../src/utils/scores.js";
import { formatTime, secondsUntil, splitTime } from "../src/utils/time.js";
import { restoreRoute } from "../src/utils/restoreRoute.js";

test("daily trivia stays constant until local midnight, including the DST fallback", () => {
  const previousZone = process.env.TZ;
  process.env.TZ = "America/Toronto";
  try {
    const questions = Array.from({ length: 7 }, (_, index) => index);
    const at = (iso) => getQuestionOfTheDay(questions, new Date(iso));
    assert.equal(
      at("2026-11-01T00:01:00-04:00"),
      at("2026-11-01T23:59:00-05:00"),
    );
    assert.notEqual(
      at("2026-11-01T23:59:00-05:00"),
      at("2026-11-02T00:00:00-05:00"),
    );
    assert.equal(
      at("2026-11-01T01:30:00-04:00"),
      at("2026-11-01T01:30:00-05:00"),
    );
  } finally {
    if (previousZone === undefined) delete process.env.TZ;
    else process.env.TZ = previousZone;
  }
});

test("daily trivia handles empty lists and dates before the epoch", () => {
  assert.equal(getQuestionOfTheDay([]), undefined);
  assert.equal(getQuestionOfTheDay(["a", "b"], new Date(1969, 11, 31)), "b");
});

test("countdowns round up partial seconds and stop at zero", () => {
  assert.equal(secondsUntil(1001, 0), 2);
  assert.equal(secondsUntil(1001, 1001), 0);
  assert.equal(secondsUntil(1001, 9000), 0);
  assert.equal(secondsUntil(NaN, 0), 0);
});

test("countdowns follow wall time after a suspended tab resumes", () => {
  assert.equal(secondsUntil(60000, 0), 60);
  assert.equal(secondsUntil(60000, 45500), 15);
  assert.equal(secondsUntil(60000, 70000), 0);
});

test("time formatting handles day boundaries and timer zero", () => {
  assert.deepEqual(splitTime(90061), { Days: 1, Hours: 1, Min: 1, Sec: 1 });
  assert.equal(formatTime(0), "00:00");
  assert.equal(formatTime(65), "01:05");
  assert.equal(formatTime(3599), "59:59");
});

test("manual scores support negatives and normalize incomplete or invalid edits", () => {
  for (const [value, expected] of [
    ["-15", -15],
    ["", 0],
    ["-", 0],
    ["007", 7],
    ["12abc", 0],
    ["1.5", 0],
    ["Infinity", 0],
    ["9007199254740992", 0],
  ]) {
    assert.equal(parseScore(value), expected);
  }
});

test("score history has an empty state for missing or invalid data", () => {
  assert.equal(createScoreChart([]), null);
  assert.equal(
    createScoreChart([{ date: "invalid", teamOne: 20, teamTwo: 30 }]),
    null,
  );
  assert.equal(
    createScoreChart([{ date: "2026-10-16", teamOne: NaN, teamTwo: 30 }]),
    null,
  );
});

test("a single match is centered and produces finite chart coordinates", () => {
  const model = createScoreChart([
    { date: "2026-10-16", teamOne: 240, teamTwo: 150 },
  ]);
  assert.equal(
    model.history[0].x,
    (chart.left + chart.width - chart.right) / 2,
  );
  for (const team of model.plotSeries) {
    assert.ok(Number.isFinite(team.points[0].y));
    assert.ok(team.points[0].y >= chart.top);
    assert.ok(team.points[0].y <= chart.height - chart.bottom);
  }
});

test("chart sorts unsorted matches without mutating them and supports tied negative scores", () => {
  const entries = [
    { date: "2026-10-17", teamOne: -10, teamTwo: -10 },
    { date: "2026-10-16", teamOne: -10, teamTwo: -10 },
  ];
  const model = createScoreChart(entries);
  assert.equal(entries[0].date, "2026-10-17");
  assert.equal(model.history[0].date, "2026-10-16");
  assert.ok(model.history[0].x < model.history[1].x);
  assert.ok(model.yTicks.length > 1);
  assert.ok(
    model.plotSeries.every((team) =>
      team.points.every(({ x, y }) => Number.isFinite(x) && Number.isFinite(y)),
    ),
  );
});

test("GitHub Pages deep links restore path, query, and fragment exactly", () => {
  const route = "/resources?subject=arts%26music#lessons";
  const location = {
    origin: "https://reach-trivia.github.io",
    search: `?__route=${encodeURIComponent(route)}`,
  };
  const calls = [];
  restoreRoute(location, { replaceState: (...args) => calls.push(args) });
  assert.deepEqual(calls, [[null, "", route]]);
});

test("route restoration refuses off-site redirects and leaves normal queries alone", () => {
  for (const route of [
    "https://example.com",
    "//example.com",
    "/\\\\example.com",
  ]) {
    restoreRoute(
      {
        origin: "https://reach-trivia.github.io",
        search: `?__route=${encodeURIComponent(route)}`,
      },
      {
        replaceState: () => assert.fail("unexpected external redirect"),
      },
    );
  }
  restoreRoute(
    { origin: "https://reach-trivia.github.io", search: "?subject=arts" },
    {
      replaceState: () => assert.fail("normal URL should be untouched"),
    },
  );
});
