import CountdownTimer from "../components/CountdownTimer.jsx";
import ScoreHistoryGraph from "../components/ScoreHistoryGraph.jsx";
import TriviaQuestion from "../components/TriviaQuestion.jsx";
import { triviaQuestions } from "../data/questions.js";
import { getQuestionOfTheDay } from "../utils/getQuestionOfTheDay.js";
import useNow from "../hooks/useNow.js";
import "../styles/home.css";

function DailyTrivia() {
  const now = useNow();
  const question = getQuestionOfTheDay(triviaQuestions, new Date(now));
  return question ? (
    <TriviaQuestion key={question.question} {...question} />
  ) : null;
}

export default function Home() {
  return (
    <main id="main-content" className="page-container">
      <section>
        <CountdownTimer
          eventName="Consensus Trivia"
          targetDate="2026-12-05T07:00:00-05:00"
        />
      </section>
      <section className="trivia-wrapper">
        <DailyTrivia />
      </section>
      <ScoreHistoryGraph />
    </main>
  );
}
