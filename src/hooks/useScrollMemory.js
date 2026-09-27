import { useCallback, useEffect } from "react";
import { useNavigationType } from "react-router-dom";

// Remembers where a list was scrolled to, so coming back from a detail page
// lands where you left rather than at the top.
//
// The position is captured when you click through - deliberately, not from a
// scroll listener. Navigating to a shorter page makes the browser clamp
// scrollY and fire one last scroll event, so anything listening saves that
// clamped value instead of where you actually were.
//
// Restoring only happens on a back/forward (POP); a fresh visit starts at the
// top like any other page.
export default function useScrollMemory(key, ready) {
  const storageKey = `scroll:${key}`;
  const navigationType = useNavigationType();

  const remember = useCallback(() => {
    try {
      window.sessionStorage.setItem(storageKey, String(window.scrollY));
    } catch {
      // Private mode or blocked storage - not worth failing over.
    }
  }, [storageKey]);

  useEffect(() => {
    if (!ready || navigationType !== "POP") return;

    let saved = null;
    try {
      saved = window.sessionStorage.getItem(storageKey);
    } catch {
      /* ignore */
    }
    if (saved === null) return;

    // One frame, so the restored list has been laid out first.
    const frame = requestAnimationFrame(() => {
      window.scrollTo(0, parseInt(saved, 10) || 0);
    });

    return () => cancelAnimationFrame(frame);
  }, [storageKey, ready, navigationType]);

  return remember;
}
