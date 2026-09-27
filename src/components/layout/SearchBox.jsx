import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SearchBox.css";
import useBundleMeta from "../../hooks/useBundleMeta";
import { searchAll, countResults } from "../../utils/search";

const PREVIEW_PER_GROUP = 3;

export default function SearchBox({ agents, gameMaps, weapons }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const navigate = useNavigate();

  // Only fetch bundle metadata once someone starts typing.
  const meta = useBundleMeta(query.trim().length >= 2);

  const groups = useMemo(
    () =>
      searchAll(
        { agents, gameMaps, weapons, themes: meta.themes, bundles: meta.bundles },
        query,
        { limitPerGroup: PREVIEW_PER_GROUP }
      ),
    [agents, gameMaps, weapons, meta.themes, meta.bundles, query]
  );

  const total = countResults(groups);
  const showPanel = open && query.trim().length >= 2;

  // Close when focus or a click leaves the box.
  useEffect(() => {
    if (!showPanel) return;

    const onPointerDown = (event) => {
      if (!boxRef.current?.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [showPanel]);

  const goToResults = () => {
    if (query.trim().length < 2) return;

    setOpen(false);
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="searchbox" ref={boxRef}>
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          goToResults();
        }}
      >
        <input
          type="search"
          className="searchbox-input"
          placeholder="Search everything..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          aria-label="Search agents, maps, weapons, skins, bundles and line ups"
        />
      </form>

      {showPanel && (
        <div className="searchbox-panel">
          {total === 0 ? (
            <p className="searchbox-empty">
              {meta.status === "loading"
                ? "Searching..."
                : `Nothing matches "${query.trim()}"`}
            </p>
          ) : (
            <>
              {groups.map((group) => (
                <div className="searchbox-group" key={group.name}>
                  <span className="searchbox-group-title">
                    {group.name}
                    <small>{group.total}</small>
                  </span>
                  <ul>
                    {group.items.map((item) => (
                      <li key={`${group.name}-${item.id}`}>
                        <Link to={item.to} onClick={() => setOpen(false)}>
                          {item.image ? (
                            <img src={item.image} alt="" loading="lazy" />
                          ) : (
                            <span className="searchbox-noart" />
                          )}
                          <span className="searchbox-label">
                            {item.label}
                            {item.sub && <small>{item.sub}</small>}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <button type="button" className="searchbox-all" onClick={goToResults}>
                See all {total} results
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
