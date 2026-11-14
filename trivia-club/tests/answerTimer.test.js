import assert from "node:assert/strict";
import test from "node:test";
import {
  answerTimerReducer,
  createAnswerTimer,
  parseAnswerDuration,
  remainingAnswerTime,
} from "../src/utils/answerTimer.js";

test("answer timer pauses and resumes without losing fractional seconds", () => {
  let timer = answerTimerReducer(createAnswerTimer(), {
    type: "start",
    now: 1000,
  });
  timer = answerTimerReducer(timer, { type: "pause", now: 2350 });
  assert.equal(remainingAnswerTime(timer, 10000), 3650);
  timer = answerTimerReducer(timer, { type: "start", now: 10000 });
  assert.equal(remainingAnswerTime(timer, 11000), 2650);
  assert.equal(remainingAnswerTime(timer, 13650), 0);
});

test("answer timer catches up after suspension and restarts the full duration", () => {
  let timer = answerTimerReducer(createAnswerTimer(10), {
    type: "start",
    now: 0,
  });
  assert.equal(remainingAnswerTime(timer, 30000), 0);
  timer = answerTimerReducer(timer, { type: "restart", now: 30000 });
  assert.equal(remainingAnswerTime(timer, 30000), 10000);
  timer = answerTimerReducer(timer, { type: "restart", now: 31000 });
  assert.equal(remainingAnswerTime(timer, 32000), 9000);
});

test("starting an expired answer timer begins another full countdown", () => {
  let timer = answerTimerReducer(createAnswerTimer(), {
    type: "start",
    now: 0,
  });
  timer = answerTimerReducer(timer, { type: "start", now: 8000 });
  assert.equal(remainingAnswerTime(timer, 8000), 5000);
});

test("a render before the next clock tick never shows more than the allotted time", () => {
  const timer = answerTimerReducer(createAnswerTimer(), {
    type: "start",
    now: 1100,
  });
  assert.equal(remainingAnswerTime(timer, 1000), 5000);
});

test("answer durations accept only whole seconds from one to five minutes", () => {
  for (const value of ["", 0, -1, 1.5, 301, "oops", Infinity]) {
    assert.equal(parseAnswerDuration(value, 10), 10);
  }
  assert.equal(parseAnswerDuration("1"), 1);
  assert.equal(parseAnswerDuration("300"), 300);
  let timer = answerTimerReducer(createAnswerTimer(), {
    type: "start",
    now: 0,
  });
  timer = answerTimerReducer(timer, { type: "duration", value: 15 });
  assert.equal(timer.started, false);
  assert.equal(timer.deadline, null);
  assert.equal(remainingAnswerTime(timer, 60000), 15000);
});
