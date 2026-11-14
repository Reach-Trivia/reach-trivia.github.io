import { useState } from "react";
import { parseScore } from "../utils/scores.js";
import { scoreShortcuts } from "../utils/matchShortcuts.js";
import useMatchShortcuts from "../hooks/useMatchShortcuts.js";

const initialTeams = [
  { name: "Team 1", score: "0", color: "blue" },
  { name: "Team 2", score: "0", color: "green" },
];

function ScoreTicker({ team, index, onChange, shortcutsEnabled }) {
  const changeScore = (delta) =>
    onChange({ score: String(parseScore(team.score) + delta) });

  const scoreButtons = (deltas) => (
    <div className="score-btn-group">
      {deltas.map((delta) => {
        const shortcut = scoreShortcuts.find(
          ({ teamIndex, points }) => teamIndex === index && points === delta,
        );
        return (
          <button
            key={delta}
            type="button"
            className="score-btn"
            onClick={() => changeScore(delta)}
            aria-label={`${delta > 0 ? "Add" : "Subtract"} ${Math.abs(delta)} points ${delta > 0 ? "to" : "from"} ${team.name}`}
            aria-keyshortcuts={shortcutsEnabled ? shortcut?.key : undefined}
            title={shortcut ? `Shortcut: ${shortcut.key}` : undefined}
          >
            {delta > 0 ? "+" : "−"}
            {Math.abs(delta)}
            {shortcut && (
              <kbd className="shortcut-key" aria-hidden="true">
                {shortcut.key}
              </kbd>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className={`offset-panel score-ticker-${team.color}`}>
      <div className="score-ticker-card">
        <input
          type="text"
          value={team.name}
          onChange={(event) => onChange({ name: event.target.value })}
          aria-label={`Team ${index + 1} name`}
          className="score-team-input"
          placeholder="Enter team name"
        />
        {scoreButtons([10, 5])}
        <div className="score-display-box">
          <input
            type="text"
            inputMode="numeric"
            value={team.score}
            onChange={(event) => {
              if (/^-?\d*$/.test(event.target.value))
                onChange({ score: event.target.value });
            }}
            onBlur={() => onChange({ score: String(parseScore(team.score)) })}
            aria-label={`${team.name || `Team ${index + 1}`} score`}
            className="score-number-input"
          />
        </div>
        {scoreButtons([-10, -5])}
        <button
          type="button"
          onClick={() => onChange({ score: "0" })}
          className="text-button"
        >
          Reset Team Score
        </button>
      </div>
    </div>
  );
}

export default function ScoreCounter({ shortcutsEnabled = true }) {
  const [teams, setTeams] = useState(initialTeams);

  useMatchShortcuts(shortcutsEnabled, "score", ({ teamIndex, points }) => {
    setTeams((current) =>
      current.map((team, index) =>
        index === teamIndex
          ? { ...team, score: String(parseScore(team.score) + points) }
          : team,
      ),
    );
  });

  function updateTeam(index, changes) {
    setTeams((current) =>
      current.map((team, i) => (i === index ? { ...team, ...changes } : team)),
    );
  }

  return (
    <div className="score-counter">
      <div className="score-tickers-grid">
        {teams.map((team, index) => (
          <ScoreTicker
            key={team.color}
            team={team}
            index={index}
            shortcutsEnabled={shortcutsEnabled}
            onChange={(changes) => updateTeam(index, changes)}
          />
        ))}
      </div>
      <button
        type="button"
        className="button"
        onClick={() =>
          setTeams((current) =>
            current.map((team) => ({ ...team, score: "0" })),
          )
        }
      >
        ↺ Reset Match
      </button>
    </div>
  );
}
