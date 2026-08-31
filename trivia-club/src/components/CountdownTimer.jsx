import { useState, useEffect } from "react";

/**
 * CountdownTimer — live ticking countdown to a target event.
 *
 * Props:
 *   eventName  — display name of the event
 *   targetDate — ISO date string or Date for the event
 */
export default function CountdownTimer({ eventName, targetDate }) {
  const calcTimeLeft = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const boxes = [
    { value: timeLeft.days, unit: "Days" },
    { value: timeLeft.hours, unit: "Hours" },
    { value: timeLeft.minutes, unit: "Min" },
    { value: timeLeft.seconds, unit: "Sec" },
  ];

  return (
    <div className="countdown-wrapper">
      <div className="countdown-header">
        <h2 className="countdown-event-title">{eventName}</h2>
        <p className="countdown-label">Countdown</p>
      </div>
      <div className="countdown-grid">
        {boxes.map((box) => (
          <div key={box.unit} className="countdown-box">
            <span className="countdown-value">
              {String(box.value).padStart(2, "0")}
            </span>
            <span className="countdown-unit">{box.unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
