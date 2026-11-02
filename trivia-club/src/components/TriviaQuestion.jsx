import { useState } from "react";

export default function TriviaQuestion({ question, options, correctIndex }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const answered = selectedIndex !== null;
  const correct = selectedIndex === correctIndex;

  return (
    <section className="card trivia-section" aria-labelledby="trivia-title">
      <h2 id="trivia-title" className="section-title">
        Daily Trivia!
      </h2>
      <p>{question}</p>
      <div className="trivia-options">
        {options.map((option, index) => {
          const result = !answered
            ? ""
            : index === correctIndex
              ? " is-correct"
              : index === selectedIndex
                ? " is-incorrect"
                : "";
          return (
            <button
              key={option}
              type="button"
              className={`button${result}`}
              disabled={answered}
              onClick={() => setSelectedIndex(index)}
            >
              {option}
            </button>
          );
        })}
      </div>
      <p
        role="status"
        className={`trivia-feedback${answered ? (correct ? " is-correct" : " is-incorrect") : ""}`}
      >
        {answered &&
          (correct
            ? "✓ Correct answer! Well done."
            : `✗ Incorrect. The correct answer was: ${options[correctIndex]}`)}
      </p>
    </section>
  );
}
