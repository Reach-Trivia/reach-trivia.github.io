import { useState } from "react";
import PanelHeader from "./PanelHeader.jsx";
import useWideScores from "../hooks/useWideScores.js";

const buzzerUrl = "https://multibuzz.app";

export default function BuzzerEmbed({
  layout,
  onChangeLayout,
  isMinimized,
  onToggleMinimize,
}) {
  const [reloadKey, setReloadKey] = useState(0);
  const isWide = useWideScores();
  const positions = [
    { value: "side", label: isWide ? "Beside scores" : "Above scores" },
    { value: "under", label: "Below scores" },
  ];

  return (
    <div className="offset-panel buzzer-frame">
      <div className="buzzer-window">
        <PanelHeader
          id="buzzer-body"
          title="multibuzz.app"
          position={layout}
          positions={positions}
          onPositionChange={onChangeLayout}
          isMinimized={isMinimized}
          onToggleMinimize={onToggleMinimize}
        >
          <button
            type="button"
            className="panel-icon-button"
            onClick={() => setReloadKey((key) => key + 1)}
            title="Reload buzzer"
            aria-label="Reload buzzer"
          >
            ↻
          </button>
          <a
            className="panel-icon-button"
            href={buzzerUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open buzzer in new tab"
            aria-label="Open buzzer in new tab"
          >
            ↗
          </a>
        </PanelHeader>
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
