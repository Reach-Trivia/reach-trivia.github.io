import { useState } from "react";
import { parseScore } from "../utils/scores.js";

const initialTeams = [
  { name: "Team 1", score: "0", color: "blue" },
  { name: "Team 2", score: "0", color: "green" },
];

function ScoreTicker({ team, index, onChange }) {
  const changeScore = (delta) =>
    onChange({ score: String(parseScore(team.score) + delta) });

  const scoreButtons = (deltas) => (
    <div className="score-btn-group">
      {deltas.map((delta) => (
        <button
          key={delta}
          type="button"
          className="score-btn"
          onClick={() => changeScore(delta)}
          aria-label={`${delta > 0 ? "Add" : "Subtract"} ${Math.abs(delta)} points ${delta > 0 ? "to" : "from"} ${team.name}`}
        >
          {delta > 0 ? "+" : "−"}
          {Math.abs(delta)}
        </button>
      ))}
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

export default function ScoreCounter() {
  const [teams, setTeams] = useState(initialTeams);

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
