import { useState } from "react";
import useNow from "../hooks/useNow.js";
import { formatTime, secondsUntil } from "../utils/time.js";
import "../styles/home.css";

export default function Timer() {
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");
  const [timer, setTimer] = useState(null);
  const now = useNow(250);
  const remaining =
    timer === null
      ? 0
      : Math.min(timer.duration, secondsUntil(timer.deadline, now));

  function startTimer(event) {
    event.preventDefault();
    const duration = Number(minutes) * 60 + Number(seconds);
    setTimer({ deadline: Date.now() + duration * 1000, duration });
  }

  return (
    <main id="main-content" className="page-container">
      <h1 className="page-title">Practice Timer</h1>
      <form className="card timer-form" onSubmit={startTimer}>
        <label htmlFor="minutes">Minutes</label>
        <input
          type="number"
          id="minutes"
          name="minutes"
          min="0"
          max="59"
          step="1"
          required
          value={minutes}
          onChange={(event) => setMinutes(event.target.value)}
        />
        <label htmlFor="seconds">Seconds</label>
        <input
          type="number"
          id="seconds"
          name="seconds"
          min="0"
          max="59"
          step="1"
          required
          value={seconds}
          onChange={(event) => setSeconds(event.target.value)}
        />
        <div className="timer-controls">
          <button type="submit" className="button">
            Start Timer
          </button>
          <button
            type="button"
            className="button"
            onClick={() => setTimer(null)}
          >
            Reset Timer
          </button>
        </div>
        <output
          className="timer-display"
          role="timer"
          aria-label="Time remaining"
        >
          {formatTime(remaining)}
        </output>
        <p role="status">
          {timer !== null && remaining === 0 ? "Time’s up!" : ""}
        </p>
      </form>
    </main>
  );
}
