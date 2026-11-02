/** Recover a direct GitHub Pages link while preserving its query and fragment. */
export function restoreRoute(location, history) {
  const route = new URLSearchParams(location.search).get("__route");
  if (!route?.startsWith("/")) return;
  const target = new URL(route, location.origin);
  if (target.origin === location.origin) {
    history.replaceState(
      null,
      "",
      target.pathname + target.search + target.hash,
    );
  }
}
