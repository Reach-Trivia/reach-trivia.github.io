import { useState } from "react";

/**
 * TriviaQuestion — interactive multiple-choice quiz component.
 *
 * Props:
 *   question  — the question text
 *   options   — string array of 4 answer choices
 *   correctIndex — index (0-based) of the correct option
 */
export default function TriviaQuestion({ question, options, correctIndex }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const answered = selectedIndex !== null;

  const handleClick = (idx) => {
    if (answered) return; // lock after first answer
    setSelectedIndex(idx);
  };

  const buttonClass = (idx) => {
    if (!answered) return "button";
    if (idx === correctIndex) return "button correct";
    if (idx === selectedIndex) return "button answer";
    return "button answer";
  };

  return (
    <section className="trivia-section">
      <div className="trivia-header">
        <h2 className="trivia-title">Daily Trivia!</h2>
        <p className="trivia-question-text">{question}</p>
      </div>
      <div className="buttons">
        {options.map((option, idx) => (
          <button
            key={idx}
            className={buttonClass(idx)}
            onClick={() => handleClick(idx)}
          >
            {option}
          </button>
        ))}
      </div>
      {answered && (
        <div className="trivia-feedback">
          <p
            className={`trivia-feedback-text ${
              selectedIndex === correctIndex ? "text-[#1FE23B]" : "text-red-400"
            }`}
          >
            {selectedIndex === correctIndex
              ? "✓ Correct answer! Well done."
              : `✗ Incorrect. The correct answer was: ${options[correctIndex]}`}
          </p>
        </div>
      )}
    </section>
  );
}
