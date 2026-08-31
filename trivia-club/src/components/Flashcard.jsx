import { useState } from "react";

/**
 * Flashcard — click-to-flip card showing front (term) and back (definition).
 *
 * Props:
 *   front — term / question side
 *   back  — definition / answer side
 */
export default function Flashcard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="flashcard-container"
      onClick={() => setFlipped(!flipped)}
      title="Click to flip"
    >
      <div className={`flashcard-inner ${flipped ? "flipped" : ""}`}>
        <div className="flashcard-face flashcard-front">{front}</div>
        <div className="flashcard-face flashcard-back">{back}</div>
      </div>
    </div>
  );
}
