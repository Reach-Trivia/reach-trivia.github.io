import { useState } from "react";
import ScoreCounter from "../components/ScoreCounter.jsx";
import BuzzerEmbed from "../components/BuzzerEmbed.jsx";

export default function Scores() {
  const [layout, setLayout] = useState("side"); // "side" | "under"
  const [isMinimized, setIsMinimized] = useState(false);

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

      {/* ── Dynamic Layout (Side-by-Side vs Stacked Underneath) ────── */}
      {layout === "side" ? (
        <div className="scores-split-grid">
          <div className="scores-panel">
            <BuzzerEmbed
              layout={layout}
              onToggleLayout={() => setLayout("under")}
              isMinimized={isMinimized}
              onToggleMinimize={() => setIsMinimized((m) => !m)}
            />
          </div>

          <div className="scores-panel">
            <ScoreCounter />
          </div>
        </div>
      ) : (
        <div className="scores-stacked-layout">
          <div className="w-full">
            <ScoreCounter />
          </div>

          <div className="w-full">
            <BuzzerEmbed
              layout={layout}
              onToggleLayout={() => setLayout("side")}
              isMinimized={isMinimized}
              onToggleMinimize={() => setIsMinimized((m) => !m)}
            />
          </div>
        </div>
      )}
    </main>
  );
}