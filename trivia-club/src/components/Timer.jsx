import { useState } from "react";

export default function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  return (
    <main className="page-container">
      <form className="timer-form">
        <label htmlFor="minutes">Minutes:</label>
        <input
          type="number"
          id="minutes"
          name="minutes"
          min="0"
          max="59"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
        />
        <label htmlFor="seconds">Seconds:</label>
        <input
          type="number"
          id="seconds"
          name="seconds"
          min="0"
          max="59"
          value={seconds}
          onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
        />
        <input type="submit" value="Start Timer" />
      </form>
    </main>
  );
}
