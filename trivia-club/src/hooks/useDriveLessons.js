import { useEffect, useState } from "react";
import { resources } from "../data/resources.js";
import { fetchDriveLessons, mergeDriveLessons } from "../utils/driveLessons.js";

const refreshInterval = 5 * 60 * 1000;
const apiKey = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;

export default function useDriveLessons() {
  const [lessons, setLessons] = useState(resources);
  const [refreshFailed, setRefreshFailed] = useState(false);

  useEffect(() => {
    if (!apiKey) return;
    const controller = new AbortController();
    let running = false;

    async function refresh() {
      if (running || controller.signal.aborted) return;
      running = true;
      try {
        const files = await fetchDriveLessons(apiKey, {
          signal: AbortSignal.any([
            controller.signal,
            AbortSignal.timeout(15000),
          ]),
        });
        if (!controller.signal.aborted) {
          setLessons(mergeDriveLessons(files, resources));
          setRefreshFailed(false);
        }
      } catch {
        if (!controller.signal.aborted) setRefreshFailed(true);
      } finally {
        running = false;
      }
    }

    function onVisible() {
      if (document.visibilityState === "visible") refresh();
    }

    refresh();
    const interval = setInterval(onVisible, refreshInterval);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      controller.abort();
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return { lessons, refreshFailed };
}
