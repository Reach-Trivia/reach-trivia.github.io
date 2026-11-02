import useNow from "../hooks/useNow.js";
import { secondsUntil, splitTime } from "../utils/time.js";

export default function CountdownTimer({ eventName, targetDate }) {
  const now = useNow();
  const remaining = secondsUntil(new Date(targetDate).getTime(), now);

  return (
    <div className="countdown">
      <div className="countdown-header">
        <h1 className="countdown-title">{eventName}</h1>
        <p className="countdown-label">
          {remaining > 0 ? "Countdown" : "The countdown is complete!"}
        </p>
      </div>
      <div
        className="countdown-grid"
        role="timer"
        aria-label={`Countdown to ${eventName}`}
      >
        {Object.entries(splitTime(remaining)).map(([unit, value]) => (
          <div key={unit} className="countdown-box">
            <span className="countdown-value">
              {String(value).padStart(2, "0")}
            </span>
            <span className="countdown-unit">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
