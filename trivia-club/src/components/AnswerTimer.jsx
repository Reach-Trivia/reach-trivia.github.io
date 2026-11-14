import { useReducer, useState } from "react";
import PanelHeader from "./PanelHeader.jsx";
import useNow from "../hooks/useNow.js";
import useMatchShortcuts from "../hooks/useMatchShortcuts.js";
import { timerShortcuts } from "../utils/matchShortcuts.js";
import { formatTime } from "../utils/time.js";
import {
  answerTimerReducer,
  createAnswerTimer,
  parseAnswerDuration,
  remainingAnswerTime,
} from "../utils/answerTimer.js";

const positions = [
  { value: "below", label: "Below scores" },
  { value: "above", label: "Above scores" },
];

const toggleKey = timerShortcuts.find(({ action }) => action === "toggle").key;
const restartKey = timerShortcuts.find(
  ({ action }) => action === "restart",
).key;

export default function AnswerTimer({ shortcutsEnabled = true }) {
  const [timer, dispatch] = useReducer(
    answerTimerReducer,
    5,
    createAnswerTimer,
  );
  const [duration, setDuration] = useState("5");
  const [position, setPosition] = useState("below");
  const [isMinimized, setIsMinimized] = useState(false);
  const now = useNow(100);
  const remainingMs = remainingAnswerTime(timer, now);
  const running = timer.deadline !== null && remainingMs > 0;
  const finished = timer.started && remainingMs === 0;
  const time = formatTime(Math.ceil(remainingMs / 1000));
  const status = finished
    ? "Time’s up!"
    : running
      ? "Running"
      : timer.started
        ? "Paused"
        : "Ready";

  function toggleTimer() {
    const now = Date.now();
    const isRunning =
      timer.deadline !== null && remainingAnswerTime(timer, now) > 0;
    dispatch({ type: isRunning ? "pause" : "start", now });
  }

  useMatchShortcuts(shortcutsEnabled, "timer", ({ action }) => {
    if (action === "toggle") toggleTimer();
    else dispatch({ type: "restart", now: Date.now() });
  });

  function commitDuration() {
    const seconds = parseAnswerDuration(duration, timer.durationMs / 1000);
    setDuration(String(seconds));
    if (seconds * 1000 !== timer.durationMs) {
      dispatch({ type: "duration", value: seconds });
    }
  }

  return (
    <section
      className={`offset-panel answer-timer answer-timer-${position}${finished ? " answer-timer-finished" : ""}`}
      aria-label="Answer timer"
    >
      <div className="answer-timer-window">
        <PanelHeader
          id="answer-timer-body"
          title="Answer timer"
          summary={
            isMinimized ? <span className="timer-summary">{time}</span> : null
          }
          position={position}
          positions={positions}
          onPositionChange={setPosition}
          isMinimized={isMinimized}
          onToggleMinimize={() => setIsMinimized((current) => !current)}
        />
        <div id="answer-timer-body" hidden={isMinimized}>
          <div className="answer-timer-body">
            <output
              className="answer-timer-display"
              role="timer"
              aria-label="Answer time remaining"
            >
              {time}
            </output>
            <label className="answer-duration">
              Seconds
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={3}
                value={duration}
                disabled={running}
                onChange={(event) => {
                  const value = event.target.value;
                  if (!/^\d{0,3}$/.test(value)) return;
                  setDuration(value);
                  if (
                    value !== "" &&
                    Number(value) === parseAnswerDuration(value, null)
                  ) {
                    dispatch({ type: "duration", value });
                  }
                }}
                onBlur={commitDuration}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    event.currentTarget.blur();
                  }
                }}
              />
            </label>
            <div className="answer-timer-actions">
              <button
                type="button"
                className="button"
                onClick={toggleTimer}
                aria-keyshortcuts={shortcutsEnabled ? toggleKey : undefined}
              >
                {running
                  ? "Pause"
                  : timer.started && !finished
                    ? "Resume"
                    : "Start"}
              </button>
              <button
                type="button"
                className="button"
                onClick={() => dispatch({ type: "restart", now: Date.now() })}
                aria-keyshortcuts={shortcutsEnabled ? restartKey : undefined}
              >
                Restart
              </button>
            </div>
          </div>
        </div>
        <p
          className={`answer-timer-status${isMinimized ? " sr-only" : ""}`}
          role="status"
        >
          {status}
        </p>
      </div>
    </section>
  );
}
