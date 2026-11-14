import { useState } from "react";
import ScoreCounter from "../components/ScoreCounter.jsx";
import BuzzerEmbed from "../components/BuzzerEmbed.jsx";
import AnswerTimer from "../components/AnswerTimer.jsx";
import "../styles/scores.css";

export default function Scores() {
  const [layout, setLayout] = useState("side");
  const [isMinimized, setIsMinimized] = useState(false);
  const [shortcutsEnabled, setShortcutsEnabled] = useState(true);

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
            onChangeLayout={setLayout}
            isMinimized={isMinimized}
            onToggleMinimize={() => setIsMinimized((current) => !current)}
          />
        </div>
        <div className="scores-panel scores-counter">
          <ScoreCounter shortcutsEnabled={shortcutsEnabled} />
          <AnswerTimer shortcutsEnabled={shortcutsEnabled} />
        </div>
      </div>
      <div className="scores-shortcuts">
        <label>
          <input
            type="checkbox"
            checked={shortcutsEnabled}
            onChange={(event) => setShortcutsEnabled(event.target.checked)}
          />
          Keyboard shortcuts
        </label>
        <p>
          Click outside the buzzer to use them. Shortcuts pause while typing.
        </p>
      </div>
    </main>
  );
}
