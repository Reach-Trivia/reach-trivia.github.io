export const timerShortcuts = [
  { key: "n", scope: "timer", action: "toggle" },
  { key: "m", scope: "timer", action: "restart" },
];

export const scoreShortcuts = [
  { key: "u", scope: "score", teamIndex: 0, points: 10 },
  { key: "i", scope: "score", teamIndex: 0, points: 5 },
  { key: "h", scope: "score", teamIndex: 0, points: -10 },
  { key: "j", scope: "score", teamIndex: 0, points: -5 },
  { key: "o", scope: "score", teamIndex: 1, points: 10 },
  { key: "p", scope: "score", teamIndex: 1, points: 5 },
  { key: "k", scope: "score", teamIndex: 1, points: -10 },
  { key: "l", scope: "score", teamIndex: 1, points: -5 },
];

const shortcuts = [...timerShortcuts, ...scoreShortcuts];

export function getMatchShortcut(event) {
  if (
    event.defaultPrevented ||
    event.repeat ||
    event.isComposing ||
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    event.shiftKey ||
    event.target?.isContentEditable ||
    event.target?.closest?.(
      'input, textarea, select, [role="textbox"], [role="combobox"]',
    )
  ) {
    return null;
  }

  return shortcuts.find(({ key }) => key === event.key?.toLowerCase()) ?? null;
}
