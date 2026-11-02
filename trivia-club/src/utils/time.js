export function secondsUntil(target, now = Date.now()) {
  const difference = Number(target) - now;
  return Number.isFinite(difference)
    ? Math.max(0, Math.ceil(difference / 1000))
    : 0;
}

export function splitTime(totalSeconds) {
  return {
    Days: Math.floor(totalSeconds / 86400),
    Hours: Math.floor(totalSeconds / 3600) % 24,
    Min: Math.floor(totalSeconds / 60) % 60,
    Sec: totalSeconds % 60,
  };
}

export function formatTime(totalSeconds) {
  return `${String(Math.floor(totalSeconds / 60)).padStart(2, "0")}:${String(totalSeconds % 60).padStart(2, "0")}`;
}
