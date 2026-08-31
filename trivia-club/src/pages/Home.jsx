import CountdownTimer from "../components/CountdownTimer";
import TriviaQuestion from "../components/TriviaQuestion";
import { triviaQuestions } from "../data/questions";
import { getQuestionOfTheDay } from "../utils/getQuestionOfTheDay";

export default function Home() {
  const todayQ = getQuestionOfTheDay(triviaQuestions);

  return (
    <main className="page-container">
      {/* ── Competition Countdown ──────────────────────────────────── */}
      <section>
        <CountdownTimer
          eventName="Consensus Trivia"
          targetDate="2027-02-26T15:00:00"
        />
      </section>

      {/* ── Daily Trivia ──────────────────────────────────────────── */}
      <section className="!p-0">
        <TriviaQuestion
          question={todayQ.question}
          options={todayQ.options}
          correctIndex={todayQ.correctIndex}
        />
      </section>
    </main>
  );
}
