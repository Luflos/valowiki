import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import "../layout/MapDetail.css";
import {
  playableMaps,
  calloutPosition,
  calloutsBySide,
} from "../../utils/valorant";
import { ErrorState } from "../layout/DataState";

export default function MapDetail({ gameMaps, status, onRetry }) {
  const { id } = useParams();
  const [active, setActive] = useState(null);
  const [showLabels, setShowLabels] = useState(true);

  const maps = playableMaps(gameMaps);

  if (status === "error") {
    return (
      <div className="page">
        <ErrorState onRetry={onRetry} what="this map" />
      </div>
    );
  }

  // The list arrives after the first render.
  if (status === "loading" || gameMaps.length === 0) {
    return (
      <div className="page">
        <div className="mapdetail-skeleton" aria-hidden="true" />
      </div>
    );
  }

  const map = maps.find((m) => m.uuid === id);
  if (!map) return <Navigate to="/nonexistent" replace />;

  const sides = calloutsBySide(map);
  const calloutId = (callout) =>
    `${callout.superRegionName}-${callout.regionName}`;

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Map</span>
        <h1>{map.displayName}</h1>
        <p>
          {map.tacticalDescription}
          {map.coordinates && ` · ${map.coordinates}`}
        </p>
      </header>

      <div className="mapdetail-layout">
        <figure className="mapdetail-figure">
          <div className="mapdetail-canvas">
            <img src={map.displayIcon} alt={`${map.displayName} minimap`} />

            {/* Callouts are plotted from the map's own coordinate transform. */}
            {map.callouts?.map((callout) => {
              const { left, top } = calloutPosition(map, callout);
              const id = calloutId(callout);
              const isActive = active === id;

              return (
                <button
                  type="button"
                  key={id}
                  className={`callout${isActive ? " is-active" : ""}`}
                  style={{ left: `${left * 100}%`, top: `${top * 100}%` }}
                  onMouseEnter={() => setActive(id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(id)}
                  onBlur={() => setActive(null)}
                  aria-label={`${callout.superRegionName} ${callout.regionName}`}
                >
                  <span className="callout-dot" />
                  {(showLabels || isActive) && (
                    <span className="callout-label">{callout.regionName}</span>
                  )}
                </button>
              );
            })}
          </div>
          <figcaption className="mapdetail-caption">
            <span>{map.callouts?.length || 0} callouts</span>
            {/* A state toggle, so the label names the thing, not the action -
                aria-pressed already carries on/off. */}
            <button
              type="button"
              className="chip"
              aria-pressed={showLabels}
              onClick={() => setShowLabels((on) => !on)}
            >
              Labels
            </button>
          </figcaption>
        </figure>

        <aside className="mapdetail-list">
          {sides.map((side) => (
            <section key={side.key}>
              <h3 className="mapdetail-side">{side.title}</h3>
              <ul>
                {side.items.map((callout) => {
                  const id = calloutId(callout);
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        className={active === id ? "is-active" : undefined}
                        onMouseEnter={() => setActive(id)}
                        onMouseLeave={() => setActive(null)}
                      >
                        {callout.regionName}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </aside>
      </div>
    </div>
  );
}
