import CountdownTimer from "../components/CountdownTimer";
import TriviaQuestion from "../components/TriviaQuestion";
import AnnouncementCard from "../components/AnnouncementCard";
import { triviaQuestions, announcements } from "../data/mockData";
import { getQuestionOfTheDay } from "../utils/getQuestionOfTheDay";

export default function Home() {
  const todayQ = getQuestionOfTheDay(triviaQuestions);

  return (
    <main className="page-container">
      {/* ── Competition Countdown ──────────────────────────────────── */}
      <section>
        <CountdownTimer
          eventName="Your Name"
          targetDate="2026-08-20T19:00:00"
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

      {/* ── Announcements Feed ────────────────────────────────────── */}
      <section>
        <div className="announcements-feed-header">
          <h2 className="section-title">Announcements</h2>
          <span className="announcements-counter">
            {announcements.length} updates
          </span>
        </div>
        <div className="announcements-scroll-list custom-scrollbar">
          {announcements.map((post) => (
            <AnnouncementCard key={post.id} {...post} />
          ))}
        </div>
      </section>
    </main>
  );
}
