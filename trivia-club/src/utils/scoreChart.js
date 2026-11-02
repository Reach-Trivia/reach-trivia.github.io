export const chart = {
  width: 720,
  height: 340,
  left: 58,
  right: 20,
  top: 20,
  bottom: 66,
};
export const series = [
  { key: "teamOne", label: "Blue", className: "score-chart-blue" },
  { key: "teamTwo", label: "Green", className: "score-chart-green" },
];

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
export const formatDate = (date) =>
  dateFormatter.format(new Date(`${date}T00:00:00Z`));

function niceTickStep(range) {
  const rough = range / 4;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const normalized = rough / magnitude;
  return (
    (normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10) *
    magnitude
  );
}

/** Compute geometry once per data change, rather than for every pointer movement. */
export function createScoreChart(entries) {
  const history = entries
    .map((entry) => ({
      ...entry,
      timestamp: Date.parse(`${entry.date}T00:00:00Z`),
    }))
    .filter(
      (entry) =>
        Number.isFinite(entry.timestamp) &&
        series.every(({ key }) => Number.isFinite(entry[key])),
    )
    .sort((a, b) => a.timestamp - b.timestamp);
  if (!history.length) return null;

  const plotWidth = chart.width - chart.left - chart.right;
  const plotHeight = chart.height - chart.top - chart.bottom;
  const firstDate = history[0].timestamp;
  const lastDate = history.at(-1).timestamp;
  const padding = (lastDate - firstDate || 86400000) * 0.05;
  const xForDate = (date) =>
    chart.left +
    ((date - firstDate + padding) / (lastDate - firstDate + 2 * padding)) *
      plotWidth;
  const scores = history.flatMap((entry) =>
    series.map(({ key }) => entry[key]),
  );
  const min = Math.min(...scores);
  const max = Math.max(...scores);
  const range = max - min || Math.max(Math.abs(max) * 0.2, 10);
  const step = niceTickStep(range * 1.2);
  const yMin = Math.floor((min - range * 0.1) / step) * step;
  const yMax = Math.ceil((max + range * 0.1) / step) * step;
  const yForScore = (score) =>
    chart.top + ((yMax - score) / (yMax - yMin)) * plotHeight;

  return {
    history: history.map((entry) => ({
      ...entry,
      x: xForDate(entry.timestamp),
    })),
    plotHeight,
    yTicks: Array.from(
      { length: Math.round((yMax - yMin) / step) + 1 },
      (_, i) => {
        const value = yMin + i * step;
        return { value: Number(value.toPrecision(6)), y: yForScore(value) };
      },
    ),
    plotSeries: series.map((team) => ({
      ...team,
      points: history.map((entry) => ({
        x: xForDate(entry.timestamp),
        y: yForScore(entry[team.key]),
        score: entry[team.key],
      })),
    })),
  };
}
