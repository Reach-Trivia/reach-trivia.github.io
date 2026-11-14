export default function PanelHeader({
  id,
  title,
  summary,
  position,
  positions,
  onPositionChange,
  isMinimized,
  onToggleMinimize,
  children,
}) {
  return (
    <header className="panel-header">
      <h2 className="panel-title">
        {title} {summary}
      </h2>
      <div className="panel-controls">
        <label className="panel-position">
          <span className="sr-only">{title} position</span>
          <select
            value={position}
            onChange={(event) => onPositionChange(event.target.value)}
          >
            {positions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="panel-toggle"
          onClick={onToggleMinimize}
          aria-label={`${isMinimized ? "Restore" : "Minimize"} ${title}`}
          aria-expanded={!isMinimized}
          aria-controls={id}
        >
          <span aria-hidden="true">{isMinimized ? "+" : "−"}</span>
          {isMinimized ? "Restore" : "Minimize"}
        </button>
        {children}
      </div>
    </header>
  );
}
