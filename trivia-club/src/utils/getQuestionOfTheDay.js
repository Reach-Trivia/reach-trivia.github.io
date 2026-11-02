/** Select one question per local calendar day, including daylight-saving days. */
export function getQuestionOfTheDay(questions, today = new Date()) {
  if (!questions.length) return undefined;
  const day =
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) /
    86_400_000;
  const index =
    ((day % questions.length) + questions.length) % questions.length;
  return questions[index];
}
