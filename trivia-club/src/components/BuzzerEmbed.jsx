import { useState } from "react";

const buzzerUrl = "https://multibuzz.app";

export default function BuzzerEmbed({
  layout,
  onToggleLayout,
  isMinimized,
  onToggleMinimize,
}) {
  const [reloadKey, setReloadKey] = useState(0);
  const layoutLabel =
    layout === "side"
      ? "Move buzzer under scores"
      : "Move buzzer beside scores";

  return (
    <div className="offset-panel buzzer-frame">
      <div className="buzzer-window">
        <div className="buzzer-header">
          <span className="buzzer-title">🗔 multibuzz.app</span>
          <div className="buzzer-controls">
            <button
              type="button"
              onClick={onToggleLayout}
              title={layoutLabel}
              aria-label={layoutLabel}
            >
              {layout === "side" ? "⬍" : "⬌"}
            </button>
            <button
              type="button"
              onClick={onToggleMinimize}
              title={isMinimized ? "Expand buzzer" : "Minimize buzzer"}
              aria-label={isMinimized ? "Expand buzzer" : "Minimize buzzer"}
              aria-expanded={!isMinimized}
              aria-controls="buzzer-body"
            >
              {isMinimized ? "□" : "−"}
            </button>
            <button
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
              title="Reload buzzer"
              aria-label="Reload buzzer"
            >
              ↻
            </button>
            <a
              href={buzzerUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open buzzer in new tab"
              aria-label="Open buzzer in new tab"
            >
              ↗
            </a>
          </div>
        </div>
        <div id="buzzer-body" hidden={isMinimized}>
          <iframe
            key={reloadKey}
            src={buzzerUrl}
            title="MultiBuzz Buzzer"
            allow="autoplay; clipboard-write; fullscreen"
            className="buzzer-iframe"
          />
        </div>
      </div>
    </div>
  );
}
