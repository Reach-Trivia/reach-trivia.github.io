import { useState } from "react";
import { scoreHistory } from "../data/scoreHistory";

const chart = {
  width: 720,
  height: 340,
  left: 58,
  right: 20,
  top: 20,
  bottom: 66,
};

const series = [
  { key: "teamOne", label: "Blue", lineClass: "score-chart-line-blue", pointClass: "score-chart-point-blue" },
  { key: "teamTwo", label: "Green", lineClass: "score-chart-line-green", pointClass: "score-chart-point-green" },
];

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

const getNiceTickStep = (range) => {
  const roughStep = range / 4;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const normalizedStep = roughStep / magnitude;
  const niceStep =
    normalizedStep <= 1 ? 1 : normalizedStep <= 2 ? 2 : normalizedStep <= 5 ? 5 : 10;

  return niceStep * magnitude;
};

export default function ScoreHistoryGraph() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const plotWidth = chart.width - chart.left - chart.right;
  const plotHeight = chart.height - chart.top - chart.bottom;
  const history = [...scoreHistory].sort(
    (a, b) => Date.parse(a.date) - Date.parse(b.date),
  );
  const dates = history.map((entry) => Date.parse(`${entry.date}T00:00:00Z`));
  const earliestDate = Math.min(...dates);
  const latestDate = Math.max(...dates);
  const dateRange = latestDate - earliestDate || 24 * 60 * 60 * 1000;
  const datePadding = dateRange * 0.05;
  const dateDomainStart = earliestDate - datePadding;
  const dateDomainEnd = latestDate + datePadding;
  const xForDate = (date) =>
    chart.left +
    ((Date.parse(`${date}T00:00:00Z`) - dateDomainStart) /
      (dateDomainEnd - dateDomainStart)) *
      plotWidth;
  const scores = history.flatMap((entry) =>
    series.map(({ key }) => entry[key]),
  );
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const scoreRange = maxScore - minScore || Math.max(Math.abs(maxScore) * 0.2, 10);
  const yTickStep = getNiceTickStep(scoreRange * 1.2);
  const yMin = Math.floor((minScore - scoreRange * 0.1) / yTickStep) * yTickStep;
  const yMax = Math.ceil((maxScore + scoreRange * 0.1) / yTickStep) * yTickStep;
  const yTicks = Array.from(
    { length: Math.round((yMax - yMin) / yTickStep) + 1 },
    (_, index) => yMin + index * yTickStep,
  );
  const yForScore = (score) =>
    chart.top + ((yMax - score) / (yMax - yMin)) * plotHeight;
  const plotSeries = series.map((team) => ({
    ...team,
    points: history.map((entry, index) => ({
      date: entry.date,
      index,
      score: entry[team.key],
      x: xForDate(entry.date),
      y: yForScore(entry[team.key]),
    })),
  }));
  const selectedEntry =
    hoveredIndex === null ? null : history[hoveredIndex];
  const selectedX =
    hoveredIndex === null ? null : xForDate(selectedEntry.date);
  const tooltipWidth = 136;
  const tooltipX =
    selectedX === null
      ? null
      : Math.max(
          chart.left,
          Math.min(selectedX + 12, chart.width - chart.right - tooltipWidth),
        );

  return (
    <section className="score-history-section">
      <div className="score-history-card">
        <div className="section-header">
          <h2 className="section-title">Score Progress</h2>
          <p className="section-subtitle">Team scores over time</p>
        </div>
        <div className="score-chart-legend" aria-label="Graph legend">
          {plotSeries.map((team) => (
            <span className="score-chart-legend-item" key={team.key}>
              <span className={`score-chart-legend-swatch ${team.lineClass}`} aria-hidden="true" />
              {team.label}
            </span>
          ))}
        </div>

        <div className="score-chart">
          <svg
            className="score-chart-svg"
            viewBox={`0 0 ${chart.width} ${chart.height}`}
            role="group"
            aria-labelledby="score-chart-title score-chart-description"
            onMouseMove={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect();
              const x =
                ((event.clientX - bounds.left) / bounds.width) * chart.width;
              if (x < chart.left || x > chart.width - chart.right) {
                setHoveredIndex(null);
                return;
              }
              const index = plotSeries[0].points.reduce(
                (closestIndex, point, pointIndex, points) =>
                  Math.abs(point.x - x) <
                  Math.abs(points[closestIndex].x - x)
                    ? pointIndex
                    : closestIndex,
                0,
              );
              setHoveredIndex(index);
            }}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <title id="score-chart-title">Team scores by date</title>
            <desc id="score-chart-description">
              A line graph comparing Blue and Green scores between{" "}
              {formatDate(history[0].date)} and{" "}
              {formatDate(history[history.length - 1].date)}.
            </desc>

            {yTicks.map((tick) => {
              const y = yForScore(tick);
              return (
                <g key={tick}>
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
                    {Number(tick.toPrecision(6))}
                  </text>
                </g>
              );
            })}

            {history.map((entry, index) => {
              const x = xForDate(entry.date);
              const previousX =
                index === 0
                  ? chart.left
                  : (xForDate(history[index - 1].date) + x) / 2;
              const nextX =
                index === history.length - 1
                  ? chart.width - chart.right
                  : (x + xForDate(history[index + 1].date)) / 2;
              return (
                <rect
                  key={entry.date}
                  className="score-chart-hover-target"
                  x={previousX}
                  y={chart.top}
                  width={nextX - previousX}
                  height={plotHeight}
                  role="button"
                  tabIndex={0}
                  aria-label={`${formatDate(entry.date)}: Blue ${entry.teamOne}, Green ${entry.teamTwo}`}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                >
                  <title>
                    {formatDate(entry.date)}: Blue {entry.teamOne}, Green{" "}
                    {entry.teamTwo}
                  </title>
                </rect>
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

            {plotSeries.map((team) => (
              <g key={team.key}>
                <polyline
                  className={`score-chart-line ${team.lineClass}`}
                  points={team.points.map(({ x, y }) => `${x},${y}`).join(" ")}
                />
                {team.points.map((point) => (
                  <circle
                    className={`score-chart-point ${team.pointClass}`}
                    key={point.date}
                    cx={point.x}
                    cy={point.y}
                    r={hoveredIndex === point.index ? "8" : "6"}
                  >
                    <title>
                      {team.label}, {formatDate(point.date)}: {point.score} points
                    </title>
                  </circle>
                ))}
              </g>
            ))}

            {selectedEntry && (
              <line
                className="score-chart-crosshair"
                x1={selectedX}
                x2={selectedX}
                y1={chart.top}
                y2={chart.height - chart.bottom}
              />
            )}
            <g
              className={`score-chart-tooltip${selectedEntry ? " score-chart-tooltip-visible" : ""}`}
              aria-hidden="true"
            >
              <rect
                className="score-chart-tooltip-box"
                x={tooltipX ?? chart.left}
                y={chart.top + 6}
                width={tooltipWidth}
                height="66"
                rx="8"
              />
              {selectedEntry && (
                <>
                  <text
                    className="score-chart-tooltip-date"
                    x={tooltipX + 10}
                    y={chart.top + 23}
                  >
                    {formatDate(selectedEntry.date)}
                  </text>
                  <text
                    className="score-chart-tooltip-blue"
                    x={tooltipX + 10}
                    y={chart.top + 43}
                  >
                    Blue: {selectedEntry.teamOne}
                  </text>
                  <text
                    className="score-chart-tooltip-green"
                    x={tooltipX + 10}
                    y={chart.top + 61}
                  >
                    Green: {selectedEntry.teamTwo}
                  </text>
                </>
              )}
            </g>

            {history.map((entry) => (
              <text
                className="score-chart-tick"
                key={entry.date}
                x={xForDate(entry.date)}
                y={chart.height - chart.bottom + 22}
                textAnchor="middle"
              >
                {formatDate(entry.date)}
              </text>
            ))}

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
        </div>
      </div>
    </section>
  );
}
