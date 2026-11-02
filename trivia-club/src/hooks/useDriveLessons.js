import { useEffect, useState } from "react";
import { resources } from "../data/resources.js";
import { mergeDriveLessons } from "../utils/driveLessons.js";

const refreshInterval = 5 * 60 * 1000;

export default function useDriveLessons() {
  const [lessons, setLessons] = useState(resources);
  const [refreshFailed, setRefreshFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let running = false;

    async function refresh() {
      if (running || controller.signal.aborted) return;
      running = true;
      try {
        const response = await fetch("/api/lessons", {
          signal: AbortSignal.any([
            controller.signal,
            AbortSignal.timeout(15000),
          ]),
        });
        if (!response.ok) throw new Error("Could not refresh lessons.");
        const { files } = await response.json();
        if (!Array.isArray(files)) throw new Error("Invalid lesson list.");
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
