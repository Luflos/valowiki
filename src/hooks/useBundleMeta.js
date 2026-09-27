import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const API = "https://valorant-api.com/v1";

const EMPTY = { themes: [], bundles: [], tiers: [] };

// Themes, bundles and content tiers never change within a session, so the
// first request is shared by every later mount. Without this, leaving a bundle
// page and coming back re-downloaded ~0.4 MB and dropped the view back to a
// loading state, which read as the page refreshing itself.
let cache = null;
let inflight = null;

function load() {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;

  inflight = Promise.all([
    axios.get(`${API}/themes`),
    axios.get(`${API}/bundles`),
    axios.get(`${API}/contenttiers`),
  ])
    .then(([themeRes, bundleRes, tierRes]) => {
      cache = {
        themes: themeRes.data.data,
        bundles: bundleRes.data.data,
        tiers: tierRes.data.data,
      };
      inflight = null;
      return cache;
    })
    .catch((error) => {
      inflight = null;
      throw error;
    });

  return inflight;
}

// `enabled` defers the request: the global search mounts this on every page but
// should only pay for the metadata once someone actually types.
export default function useBundleMeta(enabled = true) {
  const [meta, setMeta] = useState(cache ?? EMPTY);
  // Already cached means the first paint has data - no loading flash.
  const [status, setStatus] = useState(
    cache ? "ready" : enabled ? "loading" : "idle"
  );
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    cache = null;
    inflight = null;
    setAttempt((n) => n + 1);
  }, []);

  useEffect(() => {
    if (cache) {
      setMeta(cache);
      setStatus("ready");
      return;
    }

    if (!enabled) return;

    let cancelled = false;
    setStatus("loading");

    load()
      .then((data) => {
        if (cancelled) return;
        setMeta(data);
        setStatus("ready");
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Bundle metadata request failed", error);
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [attempt, enabled]);

  return { ...meta, status, retry };
}
