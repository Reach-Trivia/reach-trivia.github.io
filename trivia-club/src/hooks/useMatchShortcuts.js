import { useEffect, useEffectEvent } from "react";
import { getMatchShortcut } from "../utils/matchShortcuts.js";

export default function useMatchShortcuts(enabled, scope, onShortcut) {
  const handleShortcut = useEffectEvent(onShortcut);

  useEffect(() => {
    if (!enabled) return;

    function onKeyDown(event) {
      const shortcut = getMatchShortcut(event);
      if (shortcut?.scope !== scope) return;
      event.preventDefault();
      handleShortcut(shortcut);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled, scope]);
}
