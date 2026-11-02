import { useState } from "react";
import ScoreCounter from "../components/ScoreCounter.jsx";
import BuzzerEmbed from "../components/BuzzerEmbed.jsx";
import "../styles/scores.css";

export default function Scores() {
  const [layout, setLayout] = useState("side");
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <main id="main-content" className="page-container scores-page">
      <section className="scores-heading">
        <div className="section-header">
          <h1 className="section-title">Live Score Ticker</h1>
        </div>
      </section>
      {/* CSS moves the mounted panels without resetting scores or the buzzer session. */}
      <div className={`scores-layout scores-layout-${layout}`}>
        <div className="scores-panel scores-buzzer">
          <BuzzerEmbed
            layout={layout}
            onToggleLayout={() =>
              setLayout((current) => (current === "side" ? "under" : "side"))
            }
            isMinimized={isMinimized}
            onToggleMinimize={() => setIsMinimized((current) => !current)}
          />
        </div>
        <div className="scores-panel scores-counter">
          <ScoreCounter />
        </div>
      </div>
    </main>
  );
}
