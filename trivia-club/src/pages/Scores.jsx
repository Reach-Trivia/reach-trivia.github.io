import ScoreCounter from "../components/ScoreCounter.jsx";
import BuzzerEmbed from "../components/BuzzerEmbed.jsx";

export default function Scores() {
  return (
    <main className="scores-page-container">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <section className="text-center">
        <div className="section-header">
          <h1 className="section-title text-2xl md:text-4xl">
            Live Score Ticker
          </h1>
        </div>
      </section>

      {/* ── Side-by-Side: Buzzer on Left, Scores on Right ──────────── */}
      <div className="scores-split-grid">
        <div className="scores-panel">
          <BuzzerEmbed />
        </div>

        <div className="scores-panel">
          <ScoreCounter />
        </div>
      </div>
    </main>
  );
}