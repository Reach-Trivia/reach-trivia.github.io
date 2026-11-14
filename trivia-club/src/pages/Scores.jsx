import { useState } from "react";
import ScoreCounter from "../components/ScoreCounter.jsx";
import BuzzerEmbed from "../components/BuzzerEmbed.jsx";
import AnswerTimer from "../components/AnswerTimer.jsx";
import { scoreShortcuts, timerShortcuts } from "../utils/matchShortcuts.js";
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
      <footer className="scores-shortcuts" aria-label="Keyboard shortcuts">
        <div className="shortcuts-heading">
          <h2>Keyboard shortcuts</h2>
          <label>
            <input
              type="checkbox"
              checked={shortcutsEnabled}
              onChange={(event) => setShortcutsEnabled(event.target.checked)}
            />
            Enable shortcuts
          </label>
        </div>
        <div className="shortcut-guide">
          {[0, 1].map((teamIndex) => (
            <div key={teamIndex}>
              <h3>Team {teamIndex + 1}</h3>
              <p className="shortcut-list">
                {scoreShortcuts
                  .filter((shortcut) => shortcut.teamIndex === teamIndex)
                  .map(({ key, points }) => (
                    <span key={key}>
                      <kbd>{key.toUpperCase()}</kbd> {points > 0 ? "+" : "−"}
                      {Math.abs(points)}
                    </span>
                  ))}
              </p>
            </div>
          ))}
          <div>
            <h3>Timer</h3>
            <p className="shortcut-list">
              {timerShortcuts.map(({ key, action }) => (
                <span key={key}>
                  <kbd>{key.toUpperCase()}</kbd>{" "}
                  {action === "toggle" ? "Start / pause" : "Restart"}
                </span>
              ))}
            </p>
          </div>
        </div>
        <p>
          Click outside the buzzer to use them. Shortcuts pause while typing.
        </p>
      </footer>
    </main>
  );
}
