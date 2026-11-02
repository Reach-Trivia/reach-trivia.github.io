export function parseScore(value) {
  const score = Number(value);
  return Number.isSafeInteger(score) ? score : 0;
}
