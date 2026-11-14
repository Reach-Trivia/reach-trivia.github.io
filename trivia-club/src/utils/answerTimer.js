export function parseAnswerDuration(value, fallback = 5) {
  const seconds = Number(value);
  return Number.isInteger(seconds) && seconds >= 1 && seconds <= 300
    ? seconds
    : fallback;
}

export function createAnswerTimer(seconds = 5) {
  const durationMs = parseAnswerDuration(seconds) * 1000;
  return {
    durationMs,
    remainingMs: durationMs,
    deadline: null,
    started: false,
  };
}

export function remainingAnswerTime(timer, now) {
  return timer.deadline === null
    ? timer.remainingMs
    : Math.min(timer.remainingMs, Math.max(0, timer.deadline - now));
}

export function answerTimerReducer(timer, action) {
  switch (action.type) {
    case "duration":
      return createAnswerTimer(
        parseAnswerDuration(action.value, timer.durationMs / 1000),
      );
    case "start": {
      const remainingMs =
        remainingAnswerTime(timer, action.now) || timer.durationMs;
      return {
        ...timer,
        remainingMs,
        deadline: action.now + remainingMs,
        started: true,
      };
    }
    case "pause":
      return {
        ...timer,
        remainingMs: remainingAnswerTime(timer, action.now),
        deadline: null,
      };
    case "restart":
      return {
        ...timer,
        remainingMs: timer.durationMs,
        deadline: action.now + timer.durationMs,
        started: true,
      };
    default:
      return timer;
  }
}
