import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../layout/Search.css";
import LazyImage from "../layout/LazyImage";
import useBundleMeta from "../../hooks/useBundleMeta";
import { searchAll, countResults } from "../../utils/search";

export default function Search({ agents, gameMaps, weapons }) {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";

  // The query lives in the URL, so results can be linked to and survive a back.
  const meta = useBundleMeta(query.trim().length >= 2);

  const groups = useMemo(
    () =>
      searchAll(
        { agents, gameMaps, weapons, themes: meta.themes, bundles: meta.bundles },
        query
      ),
    [agents, gameMaps, weapons, meta.themes, meta.bundles, query]
  );

  const total = countResults(groups);
  const ready = query.trim().length >= 2;

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Search</span>
        <h1>{query.trim() || "Search"}</h1>
        <p role="status" aria-live="polite">
          {!ready
            ? "Type at least two characters."
            : `${total} ${total === 1 ? "result" : "results"}`}
        </p>
      </header>

      <form
        className="search-page-form"
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <input
          type="search"
          className="search-input"
          placeholder="Search agents, maps, weapons, skins, bundles..."
          value={query}
          onChange={(event) => setParams({ q: event.target.value }, { replace: true })}
          aria-label="Search everything"
        />
      </form>

      {ready && total === 0 && (
        <p className="empty-state">
          Nothing matches "{query.trim()}".
        </p>
      )}

      {groups.map((group) => (
        <section className="search-group" key={group.name}>
          <h2 className="section-title">
            {group.name} <small>{group.total}</small>
          </h2>
          <div className="search-grid">
            {group.items.map((item) => (
              <Link
                key={`${group.name}-${item.id}`}
                to={item.to}
                className="card search-hit"
              >
                <LazyImage className="search-hit-art" src={item.image} />
                <div className="search-hit-body">
                  <h3>{item.label}</h3>
                  {item.sub && <span>{item.sub}</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
