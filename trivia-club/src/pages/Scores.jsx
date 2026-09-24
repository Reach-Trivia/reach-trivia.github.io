import ScoreCounter from "../components/ScoreCounter.jsx";

export default function Scores() {
  return (
    <main className="page-container">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <section className="text-center">
        <div className="section-header">
          <h2 className="countdown-event-title">Live Score Ticker</h2>
        </div>
      </section>

      {/* ── Score Counter Section ─────────────────────────────────── */}
      <section className="w-full !p-0">
        <ScoreCounter />
      </section>
    </main>
  );
}