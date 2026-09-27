import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../layout/Weapons.css";
import { groupWeaponsByCategory } from "../../utils/valorant";
import DataState, { SkeletonGrid } from "../layout/DataState";

export default function Weapons({ weapons, status, onRetry }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Same grouping the sidebar uses, so categories always match.
  const categories = useMemo(
    () => groupWeaponsByCategory(weapons),
    [weapons]
  );

  const visibleCategories = useMemo(() => {
    const search = query.trim().toLowerCase();

    return categories
      .filter(
        (group) => activeCategory === "All" || group.key === activeCategory
      )
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (weapon) =>
            !search || weapon.displayName.toLowerCase().includes(search)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [categories, query, activeCategory]);

  const totalVisible = visibleCategories.reduce(
    (sum, group) => sum + group.items.length,
    0
  );

  const selectCategory = (category) =>
    setActiveCategory((current) => (current === category ? "All" : category));

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">ValoREF</span>
        <h1>Weapons</h1>
        <p>
          {status === "ready"
            ? `${weapons.length} weapons across ${categories.length} categories`
            : "Every weapon, grouped by shop category"}
        </p>
      </header>

      <DataState
        status={status}
        onRetry={onRetry}
        what="weapons"
        skeleton={<SkeletonGrid count={8} variant="wide" />}
      >
      <div className="filter-bar">
        <input
          type="search"
          className="search-input"
          placeholder="Search weapons..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search weapons by name"
        />
        <div className="chip-row">
          <button
            type="button"
            className="chip"
            aria-pressed={activeCategory === "All"}
            onClick={() => setActiveCategory("All")}
          >
            All<span className="chip-count">{weapons.length}</span>
          </button>
          {categories.map((group) => (
            <button
              type="button"
              key={group.key}
              className="chip"
              aria-pressed={activeCategory === group.key}
              onClick={() => selectCategory(group.key)}
            >
              {group.title}
              <span className="chip-count">{group.items.length}</span>
            </button>
          ))}
        </div>
        <span className="result-count" role="status" aria-live="polite">
          {totalVisible} of {weapons.length}
        </span>
      </div>

      {visibleCategories.length === 0 ? (
          <p className="empty-state">No weapons match that search.</p>
        ) : (
          visibleCategories.map((group) => (
          <section key={group.key} className="weapon-section">
            <h2 className="section-title">{group.title}</h2>
            <div className="weapon-grid">
              {group.items.map((weapon) => (
                <Link
                  key={weapon.uuid}
                  to={`/weapons/${weapon.uuid}`}
                  className="card weapon-card"
                >
                  <div className="weapon-card-art">
                    <img src={weapon.displayIcon} alt={weapon.displayName} />
                  </div>
                  <div className="weapon-card-body">
                    <h4>{weapon.displayName}</h4>
                    {/* Melee has no shopData, so it has no price to show. */}
                    {weapon.shopData && (
                      <span className="weapon-card-cost">
                        {weapon.shopData.cost} <small>creds</small>
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
      </DataState>
    </div>
  );
}
