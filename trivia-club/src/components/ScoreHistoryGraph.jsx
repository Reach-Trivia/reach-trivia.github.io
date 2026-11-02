import { useMemo, useState } from "react";
import { scoreHistory } from "../data/scoreHistory.js";
import {
  chart,
  createScoreChart,
  formatDate,
  series,
} from "../utils/scoreChart.js";

export default function ScoreHistoryGraph({ history = scoreHistory }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const model = useMemo(() => createScoreChart(history), [history]);
  const selected = model?.history[selectedIndex];
  const tooltipWidth = 136;
  const tooltipX = selected
    ? Math.max(
        chart.left,
        Math.min(selected.x + 12, chart.width - chart.right - tooltipWidth),
      )
    : 0;

  function selectNearest(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * chart.width;
    if (x < chart.left || x > chart.width - chart.right) {
      setSelectedIndex(null);
      return;
    }
    const closest = model.history.reduce(
      (best, entry, index, entries) =>
        Math.abs(entry.x - x) < Math.abs(entries[best].x - x) ? index : best,
      0,
    );
    setSelectedIndex(closest);
  }

  return (
    <section
      className="score-history-section"
      aria-labelledby="score-history-title"
    >
      <div className="card score-history-card">
        <div className="section-header">
          <h2 id="score-history-title" className="section-title">
            Score Progress
          </h2>
          <p className="muted">Team scores over time</p>
        </div>
        {!model ? (
          <p className="muted">No score history yet.</p>
        ) : (
          <>
            <div className="score-chart-legend" aria-label="Graph legend">
              {series.map((team) => (
                <span className="score-chart-legend-item" key={team.key}>
                  <span
                    className={`score-chart-legend-swatch ${team.className}`}
                    aria-hidden="true"
                  />
                  {team.label}
                </span>
              ))}
            </div>
            <svg
              className="score-chart-svg"
              viewBox={`0 0 ${chart.width} ${chart.height}`}
              role="group"
              aria-labelledby="score-chart-title score-chart-description"
              onPointerMove={selectNearest}
              onPointerLeave={() => setSelectedIndex(null)}
            >
              <title id="score-chart-title">Team scores by date</title>
              <desc id="score-chart-description">
                Blue and Green scores from {formatDate(model.history[0].date)}{" "}
                to {formatDate(model.history.at(-1).date)}. Focus a date to see
                both scores.
              </desc>
              {model.yTicks.map(({ value, y }) => (
                <g key={value}>
                  <line
                    className="score-chart-gridline"
                    x1={chart.left}
                    x2={chart.width - chart.right}
                    y1={y}
                    y2={y}
                  />
                  <text
                    className="score-chart-tick"
                    x={chart.left - 12}
                    y={y}
                    textAnchor="end"
                    dominantBaseline="middle"
                  >
                    {value}
                  </text>
                </g>
              ))}
              {model.history.map((entry, index, entries) => {
                const previousX =
                  index === 0
                    ? chart.left
                    : (entries[index - 1].x + entry.x) / 2;
                const nextX =
                  index === entries.length - 1
                    ? chart.width - chart.right
                    : (entry.x + entries[index + 1].x) / 2;
                return (
                  <rect
                    key={`${entry.date}-${index}`}
                    className="score-chart-hover-target"
                    x={previousX}
                    y={chart.top}
                    width={nextX - previousX}
                    height={model.plotHeight}
                    role="img"
                    tabIndex={0}
                    aria-label={`${formatDate(entry.date)}: Blue ${entry.teamOne}, Green ${entry.teamTwo}`}
                    onFocus={() => setSelectedIndex(index)}
                    onBlur={() => setSelectedIndex(null)}
                    onPointerDown={() => setSelectedIndex(index)}
                  />
                );
              })}
              <line
                className="score-chart-axis"
                x1={chart.left}
                x2={chart.left}
                y1={chart.top}
                y2={chart.height - chart.bottom}
              />
              <line
                className="score-chart-axis"
                x1={chart.left}
                x2={chart.width - chart.right}
                y1={chart.height - chart.bottom}
                y2={chart.height - chart.bottom}
              />
              {model.plotSeries.map((team) => (
                <g key={team.key} className={team.className}>
                  <polyline
                    className="score-chart-line"
                    points={team.points
                      .map(({ x, y }) => `${x},${y}`)
                      .join(" ")}
                  />
                  {team.points.map((point, index) => (
                    <circle
                      className="score-chart-point"
                      key={index}
                      cx={point.x}
                      cy={point.y}
                      r={selectedIndex === index ? 8 : 6}
                    >
                      <title>
                        {team.label}, {formatDate(model.history[index].date)}:{" "}
                        {point.score} points
                      </title>
                    </circle>
                  ))}
                </g>
              ))}
              {selected && (
                <>
                  <line
                    className="score-chart-crosshair"
                    x1={selected.x}
                    x2={selected.x}
                    y1={chart.top}
                    y2={chart.height - chart.bottom}
                  />
                  <g className="score-chart-tooltip" aria-hidden="true">
                    <rect
                      className="score-chart-tooltip-box"
                      x={tooltipX}
                      y={chart.top + 6}
                      width={tooltipWidth}
                      height={66}
                      rx={8}
                    />
                    <text
                      className="score-chart-tooltip-date"
                      x={tooltipX + 10}
                      y={chart.top + 23}
                    >
                      {formatDate(selected.date)}
                    </text>
                    {series.map((team, index) => (
                      <text
                        key={team.key}
                        className={`score-chart-tooltip-${team.label.toLowerCase()}`}
                        x={tooltipX + 10}
                        y={chart.top + 43 + index * 18}
                      >
                        {team.label}: {selected[team.key]}
                      </text>
                    ))}
                  </g>
                </>
              )}
              {model.history.map(
                (entry, index, entries) =>
                  (index % Math.max(1, Math.ceil(entries.length / 6)) === 0 ||
                    index === entries.length - 1) && (
                    <text
                      className="score-chart-tick"
                      key={`${entry.date}-${index}`}
                      x={entry.x}
                      y={chart.height - chart.bottom + 22}
                      textAnchor="middle"
                    >
                      {formatDate(entry.date)}
                    </text>
                  ),
              )}
              <text
                className="score-chart-axis-label"
                x={(chart.left + chart.width - chart.right) / 2}
                y={chart.height - 8}
                textAnchor="middle"
              >
                Date
              </text>
              <text
                className="score-chart-axis-label"
                transform={`translate(16 ${(chart.top + chart.height - chart.bottom) / 2}) rotate(-90)`}
                textAnchor="middle"
              >
                Score
              </text>
            </svg>
          </>
        )}
      </div>
    </section>
  );
}
