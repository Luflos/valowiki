import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";
import "./LineupGallery.css";
import { mapsIn, thumbnailFor, watchUrl } from "../../data/lineups";

// One card. Shows the YouTube thumbnail only - the player is never mounted
// until the card is clicked, so a page of 8 videos costs 8 images, not 8
// iframes.
function LineupCard({ lineup, index, label, onPlay }) {
  const [thumbFailed, setThumbFailed] = useState(false);
  const title = lineup.title || `${label} line up ${index + 1}`;

  return (
    <button type="button" className="card lineup-card" onClick={() => onPlay(lineup)}>
      <div className="lineup-thumb">
        {thumbFailed ? (
          // Private or removed videos have no thumbnail.
          <span className="lineup-thumb-missing">Preview unavailable</span>
        ) : (
          <img
            src={thumbnailFor(lineup.id)}
            alt=""
            loading="lazy"
            onError={() => setThumbFailed(true)}
          />
        )}
        <span className="lineup-play" aria-hidden="true" />
      </div>
      <div className="lineup-card-body">
        <h4>{title}</h4>
        {(lineup.map || lineup.ability) && (
          <div className="lineup-tags">
            {lineup.map && <span className="lineup-tag is-map">{lineup.map}</span>}
            {lineup.ability && <span className="lineup-tag">{lineup.ability}</span>}
          </div>
        )}
      </div>
    </button>
  );
}

// Modal player. Mounts ReactPlayer for exactly one video at a time.
function Lightbox({ lineup, label, index, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    // Stop the page behind the modal scrolling while it's open.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const title = lineup.title || `${label} line up ${index + 1}`;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={title}>
      <div className="lightbox-scrim" onClick={onClose} />
      <div className="lightbox-panel">
        <div className="lightbox-head">
          <div>
            <h3>{title}</h3>
            {(lineup.map || lineup.ability) && (
              <div className="lineup-tags">
                {lineup.map && <span className="lineup-tag is-map">{lineup.map}</span>}
                {lineup.ability && <span className="lineup-tag">{lineup.ability}</span>}
              </div>
            )}
          </div>
          <button
            type="button"
            className="lightbox-close"
            onClick={onClose}
            ref={closeRef}
            aria-label="Close video"
          />
        </div>
        <div className="lightbox-video">
          <ReactPlayer
            controls
            playing
            url={watchUrl(lineup.id)}
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default function LineupGallery({ lineups, label }) {
  const [activeMap, setActiveMap] = useState("All");
  const [playing, setPlaying] = useState(null);

  const maps = useMemo(() => mapsIn(lineups), [lineups]);

  const visible = useMemo(
    () =>
      activeMap === "All"
        ? lineups
        : lineups.filter((lineup) => lineup.map === activeMap),
    [lineups, activeMap]
  );

  if (lineups.length === 0) {
    return <p className="empty-state">No line ups here yet.</p>;
  }

  return (
    <>
      {/* Only worth showing once more than one map has been tagged. */}
      {maps.length > 1 && (
        <div className="filter-bar">
          <div className="chip-row">
            <button
              type="button"
              className="chip"
              aria-pressed={activeMap === "All"}
              onClick={() => setActiveMap("All")}
            >
              All<span className="chip-count">{lineups.length}</span>
            </button>
            {maps.map((map) => (
              <button
                type="button"
                key={map}
                className="chip"
                aria-pressed={activeMap === map}
                onClick={() =>
                  setActiveMap((current) => (current === map ? "All" : map))
                }
              >
                {map}
                <span className="chip-count">
                  {lineups.filter((l) => l.map === map).length}
                </span>
              </button>
            ))}
          </div>
          <span className="result-count" role="status" aria-live="polite">
            {visible.length} of {lineups.length}
          </span>
        </div>
      )}

      <div className="lineup-grid">
        {visible.map((lineup) => (
          <LineupCard
            key={lineup.id}
            lineup={lineup}
            index={lineups.indexOf(lineup)}
            label={label}
            onPlay={setPlaying}
          />
        ))}
      </div>

      {playing && (
        <Lightbox
          lineup={playing}
          label={label}
          index={lineups.indexOf(playing)}
          onClose={() => setPlaying(null)}
        />
      )}
    </>
  );
}
