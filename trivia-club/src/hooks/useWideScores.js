import { useSyncExternalStore } from "react";

const query = "(min-width: 64rem)";
const getSnapshot = () => window.matchMedia(query).matches;

function subscribe(listener) {
  const media = window.matchMedia(query);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

export default function useWideScores() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
