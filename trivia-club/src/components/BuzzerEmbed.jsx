import { useState } from "react";

/**
 * BuzzerEmbed — MultiBuzz live buzzer framed in a retro Windows-style window.
 * Features title bar with symbol controls for reload (↻) and open in new tab (↗).
 */
export default function BuzzerEmbed() {
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
            <button
              type="button"
              onClick={handleReload}
              className="retro-window-btn"
              title="Reload buzzer"
              aria-label="Reload buzzer"
            >
              ↻
            </button>
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

        {/* Window Body with Iframe */}
        <div className="retro-window-body">
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
