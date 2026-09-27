import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import "../layout/Bundles.css";
import DataState, { SkeletonGrid } from "../layout/DataState";
import BundleCard from "../layout/BundleCard";
import useBundleMeta from "../../hooks/useBundleMeta";
import useScrollMemory from "../../hooks/useScrollMemory";
import { buildBundles } from "../../utils/bundles";

const PAGE = 24;

// Rarest first - it reads as a ladder rather than an arbitrary order.
const TIER_ORDER = [
  "Ultra Edition",
  "Exclusive Edition",
  "Premium Edition",
  "Deluxe Edition",
  "Select Edition",
];

// Filters live in the query string rather than component state, so opening a
// bundle and pressing back returns to the same view - and so a filtered list
// can be linked to. Defaults stay out of the URL to keep it readable.
const DEFAULTS = { q: "", weapon: "All", tier: "All", sort: "size", full: "1", page: "1" };

export default function Bundles({ weapons, status: weaponStatus, onRetry }) {
  const [params, setParams] = useSearchParams();

  const read = (name) => params.get(name) ?? DEFAULTS[name];
  const query = read("q");
  const weapon = read("weapon");
  const tier = read("tier");
  const sort = read("sort");
  const fullOnly = read("full") === "1";
  const pageNo = Math.max(1, parseInt(read("page"), 10) || 1);
  const shown = pageNo * PAGE;

  // Changing a filter starts the list again; only "Load more" advances the page.
  const update = (changes, { keepPage = false } = {}) => {
    const next = new URLSearchParams(params);

    Object.entries(changes).forEach(([name, value]) => {
      if (value === DEFAULTS[name]) next.delete(name);
      else next.set(name, value);
    });
    if (!keepPage) next.delete("page");

    // replace: filter tweaks shouldn't each become a back-button step.
    setParams(next, { replace: !keepPage });
  };

  const meta = useBundleMeta();

  const bundles = useMemo(
    () => buildBundles({ weapons, themes: meta.themes, bundles: meta.bundles }),
    [weapons, meta.themes, meta.bundles]
  );

  const tierNameById = useMemo(
    () => new Map(meta.tiers.map((t) => [t.uuid, t.displayName])),
    [meta.tiers]
  );

  const weaponNames = useMemo(
    () =>
      [...new Set(bundles.flatMap((b) => b.items.map((i) => i.weapon)))].sort(
        (a, b) => a.localeCompare(b)
      ),
    [bundles]
  );

  const tierNames = useMemo(
    () =>
      TIER_ORDER.filter((name) =>
        meta.tiers.some((t) => t.displayName === name)
      ),
    [meta.tiers]
  );

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();

    const filtered = bundles.filter((bundle) => {
      // 178 collections hold a single skin - one-offs rather than the
      // multi-weapon bundles people mean. Hidden unless asked for.
      if (fullOnly && bundle.items.length < 2) return false;

      if (weapon !== "All" && !bundle.items.some((i) => i.weapon === weapon)) {
        return false;
      }

      // "Contains", not "is" - 121 collections mix tiers.
      if (
        tier !== "All" &&
        !bundle.items.some((i) => tierNameById.get(i.tierUuid) === tier)
      ) {
        return false;
      }

      if (!search) return true;

      return (
        bundle.name.toLowerCase().includes(search) ||
        bundle.items.some((i) => i.displayName.toLowerCase().includes(search))
      );
    });

    return sort === "name"
      ? [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      : filtered;
  }, [bundles, query, weapon, tier, sort, fullOnly, tierNameById]);

  const status =
    weaponStatus === "error" || meta.status === "error"
      ? "error"
      : weaponStatus === "loading" || meta.status === "loading"
      ? "loading"
      : "ready";

  const retry = () => {
    meta.retry();
    onRetry?.();
  };

  const page = visible.slice(0, shown);
  const remaining = visible.length - page.length;

  // Keyed on the filters, so each distinct view remembers its own position.
  const rememberScroll = useScrollMemory(
    `bundles?${params.toString()}`,
    status === "ready"
  );

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">ValoREF</span>
        <h1>Skin Bundles</h1>
        <p>
          {status === "ready"
            ? `${bundles.length} collections covering ${bundles.reduce(
                (sum, b) => sum + b.items.length,
                0
              )} skins`
            : "Every skin collection, grouped by theme"}
        </p>
      </header>

      <DataState
        status={status}
        onRetry={retry}
        what="bundles"
        skeleton={<SkeletonGrid count={9} variant="wide" />}
      >
        <div className="bundle-controls">
          <input
            type="search"
            className="search-input"
            placeholder="Search bundles or skins..."
            value={query}
            onChange={(event) => update({ q: event.target.value })}
            aria-label="Search bundles by name, or by a skin inside them"
          />

          <label className="compare-field">
            <span>Weapon</span>
            <select
              className="compare-select"
              value={weapon}
              onChange={(event) => update({ weapon: event.target.value })}
            >
              <option value="All">Any weapon</option>
              {weaponNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <label className="compare-field">
            <span>Sort</span>
            <select
              className="compare-select"
              value={sort}
              onChange={(event) => update({ sort: event.target.value })}
            >
              <option value="size">Most skins</option>
              <option value="name">A to Z</option>
            </select>
          </label>
        </div>

        <div className="filter-bar">
          <div className="chip-row">
            <button
              type="button"
              className="chip"
              aria-pressed={tier === "All"}
              onClick={() => update({ tier: "All" })}
            >
              Any tier
            </button>
            {tierNames.map((name) => (
              <button
                type="button"
                key={name}
                className="chip"
                aria-pressed={tier === name}
                onClick={() => update({ tier: tier === name ? "All" : name })}
              >
                {name.replace(" Edition", "")}
              </button>
            ))}
            <button
              type="button"
              className="chip"
              aria-pressed={fullOnly}
              onClick={() => update({ full: fullOnly ? "0" : "1" })}
              title="Hide collections that contain only one skin"
            >
              Full collections
            </button>
          </div>
          <span className="result-count" role="status" aria-live="polite">
            {visible.length} of {bundles.length}
          </span>
        </div>

        {visible.length === 0 ? (
          <p className="empty-state">No bundles match those filters.</p>
        ) : (
          <>
            <div className="bundle-grid">
              {page.map((bundle) => (
                <BundleCard
                  key={bundle.key}
                  bundle={bundle}
                  onOpen={rememberScroll}
                />
              ))}
            </div>

            {remaining > 0 && (
              <div className="load-more">
                <button
                  type="button"
                  className="btn btn-more"
                  onClick={() => update({ page: String(pageNo + 1) }, { keepPage: true })}
                >
                  Load {Math.min(remaining, PAGE)} more
                </button>
                <span>{remaining} remaining</span>
              </div>
            )}
          </>
        )}
      </DataState>
    </div>
  );
}
