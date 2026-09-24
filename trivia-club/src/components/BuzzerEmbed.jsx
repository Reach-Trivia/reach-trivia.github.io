import { useState } from "react";

/**
 * BuzzerEmbed — MultiBuzz live buzzer framed in a retro Windows-style window.
 * Features title bar with controls for:
 * - Switch layout (⬍ Move under / ⬌ Side-by-side)
 * - Minimize/expand window (− / □)
 * - Reload buzzer (↻)
 * - Open in new tab (↗)
 */
export default function BuzzerEmbed({
  layout = "side",
  onToggleLayout,
  isMinimized = false,
  onToggleMinimize,
}) {
  const [iframeKey, setIframeKey] = useState(0);
  const iframeUrl = "https://multibuzz.app";

  const handleReload = () => {
    setIframeKey((k) => k + 1);
  };

  return (
    <div className="retro-window-wrapper">
      {/* Offset Yellow Backing Layer */}
      <div
        className="score-ticker-backing score-ticker-backing-yellow"
        aria-hidden="true"
      />

      {/* Main Window */}
      <div className="retro-window-card">
        {/* Retro Window Title Bar */}
        <div className="retro-window-header">
          <span className="retro-window-title">
            <span>🗔</span> multibuzz.app
          </span>

          <div className="retro-window-controls">
            {/* Layout Toggle Button */}
            {onToggleLayout && (
              <button
                type="button"
                onClick={onToggleLayout}
                className="retro-window-btn"
                title={
                  layout === "side"
                    ? "Move Buzzer under score ticker"
                    : "Move Buzzer side-by-side with score ticker"
                }
                aria-label="Toggle Layout"
              >
                {layout === "side" ? "⬍" : "⬌"}
              </button>
            )}

            {/* Minimize / Expand Toggle Button */}
            {onToggleMinimize && (
              <button
                type="button"
                onClick={onToggleMinimize}
                className="retro-window-btn font-mono"
                title={isMinimized ? "Restore / Expand window" : "Minimize / Collapse window"}
                aria-label={isMinimized ? "Expand window" : "Minimize window"}
              >
                {isMinimized ? "□" : "−"}
              </button>
            )}

            {/* Reload Button */}
            <button
              type="button"
              onClick={handleReload}
              className="retro-window-btn"
              title="Reload buzzer"
              aria-label="Reload buzzer"
            >
              ↻
            </button>

            {/* Open in New Tab Button */}
            <a
              href={iframeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="retro-window-btn"
              title="Open in new tab"
              aria-label="Open in new tab"
            >
              ↗
            </a>
          </div>
        </div>

        {/* Window Body with Iframe (kept in DOM for seamless state) */}
        <div className={isMinimized ? "hidden" : "retro-window-body"}>
          <iframe
            key={iframeKey}
            src={iframeUrl}
            title="MultiBuzz Buzzer"
            allow="autoplay; clipboard-write; fullscreen"
            className="retro-window-iframe"
          />
        </div>
      </div>
    </div>
  );
}
