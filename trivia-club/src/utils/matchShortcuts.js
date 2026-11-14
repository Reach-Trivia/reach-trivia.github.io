export const timerShortcuts = [
  { key: "t", scope: "timer", action: "toggle" },
  { key: "r", scope: "timer", action: "restart" },
];

export const scoreShortcuts = [
  { key: "1", scope: "score", teamIndex: 0, points: 5 },
  { key: "2", scope: "score", teamIndex: 0, points: 10 },
  { key: "9", scope: "score", teamIndex: 1, points: 5 },
  { key: "0", scope: "score", teamIndex: 1, points: 10 },
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
