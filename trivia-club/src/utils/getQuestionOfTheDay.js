/**
 * Returns a deterministic question based on today's date.
 * The same question is shown all day; it rotates at midnight local time.
 */
export function getQuestionOfTheDay(questions) {
  const today = new Date();
  const daysSinceEpoch = Math.floor(today.getTime() / 86_400_000);
  return questions[daysSinceEpoch % questions.length];
}
