import { useState, useEffect } from "react";

/**
 * SingleScoreTicker — represents one team's neo-brutalist score ticker card.
 * Features:
 * - White rectangle with 3px border and NO rounding
 * - Offset colored rectangle behind it (blue or yellow/green)
 * - Large editable team name at the top
 * - Two top buttons for +10 and +5
 * - Large editable number box in the middle
 * - Two bottom buttons for -10 and -5
 */
function SingleScoreTicker({
  defaultName = "Team 1",
  backingClass = "score-ticker-backing-blue",
  onScoreChange,
}) {
  const [teamName, setTeamName] = useState(defaultName);
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState("0");
  const [isFocused, setIsFocused] = useState(false);

  // Keep input in sync when score changes from buttons
  useEffect(() => {
    if (!isFocused) {
      setInputValue(String(score));
    }
  }, [score, isFocused]);

  const handleScoreDelta = (delta) => {
    setScore((prev) => {
      const next = prev + delta;
      setInputValue(String(next));
      if (onScoreChange) onScoreChange(next);
      return next;
    });
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed)) {
      setScore(parsed);
      if (onScoreChange) onScoreChange(parsed);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    const parsed = parseInt(inputValue, 10);
    const finalScore = isNaN(parsed) ? 0 : parsed;
    setScore(finalScore);
    setInputValue(String(finalScore));
    if (onScoreChange) onScoreChange(finalScore);
  };

  const handleReset = () => {
    setScore(0);
    setInputValue("0");
    if (onScoreChange) onScoreChange(0);
  };

  return (
    <div className="score-ticker-wrapper">
      {/* Offset colored rectangle behind (no rounding, 3px black border) */}
      <div
        className={`score-ticker-backing ${backingClass}`}
        aria-hidden="true"
      />

      {/* Foreground white rectangle (no rounding, 3px black border) */}
      <div className="score-ticker-card">
        {/* Editable Team Name on Top */}
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          aria-label="Team Name"
          className="score-team-input"
          placeholder="ENTER TEAM NAME"
        />

        {/* Top Buttons: +10 and +5 */}
        <div className="score-btn-group">
          <button
            type="button"
            className="score-btn score-btn-plus"
            onClick={() => handleScoreDelta(10)}
            title="Add 10 points"
          >
            +10
          </button>
          <button
            type="button"
            className="score-btn score-btn-plus"
            onClick={() => handleScoreDelta(5)}
            title="Add 5 points"
          >
            +5
          </button>
        </div>

        {/* Middle Area: Big Editable Score Display */}
        <div className="score-display-box">
          <input
            type="text"
            inputMode="numeric"
            value={inputValue}
            onFocus={() => setIsFocused(true)}
            onChange={handleInputChange}
            onBlur={handleBlur}
            aria-label={`${teamName} Score`}
            className="score-number-input"
          />
        </div>

        {/* Bottom Buttons: -10 and -5 */}
        <div className="score-btn-group">
          <button
            type="button"
            className="score-btn score-btn-minus"
            onClick={() => handleScoreDelta(-10)}
            title="Subtract 10 points"
          >
            -10
          </button>
          <button
            type="button"
            className="score-btn score-btn-minus"
            onClick={() => handleScoreDelta(-5)}
            title="Subtract 5 points"
          >
            -5
          </button>
        </div>

        {/* Ticker Reset */}
        <button
          type="button"
          onClick={handleReset}
          className="score-reset-btn"
        >
          Reset Team Score
        </button>
      </div>
    </div>
  );
}

export default function ScoreCounter() {
  const [matchKey, setMatchKey] = useState(0);

  const resetAll = () => {
    setMatchKey((k) => k + 1);
  };

  return (
    <div className="score-counter-container">
      {/* Two Tickers Side-by-Side */}
      <div className="score-tickers-grid" key={matchKey}>
        {/* Ticker 1: Electric Blue backing */}
        <SingleScoreTicker
          defaultName="Team 1"
          backingClass="score-ticker-backing-blue"
        />

        {/* Ticker 2: Lime Green backing */}
        <SingleScoreTicker
          defaultName="Team 2"
          backingClass="score-ticker-backing-green"
        />
      </div>

      {/* Global Controls */}
      <div className="score-global-controls">
        <button
          type="button"
          onClick={resetAll}
          className="score-control-btn"
          title="Reset both teams to 0"
        >
          ↺ Reset Match
        </button>
      </div>
    </div>
  );
}
