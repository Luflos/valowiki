import { useRef } from "react";
import "./LineupMap.css";
import { calloutPosition, playableMaps, resolvePoint } from "../../utils/valorant";


// The map schematic: the game's own minimap, its callouts labelled from the
// coordinate transform the API ships, and a marker per line up. Clicking a
// marker selects that line up; a line is drawn to where the ability lands when
// that is recorded.
//
// When the position editor arms a field, a click on the map reports its
// coordinate back through onPlace. That only happens in development; the editor
// is not rendered in a build.
export default function LineupMap({
  gameMaps,
  mapName,
  lineups,
  selectedId,
  onSelect,
  armed = null,
  onPlace,
}) {
  const frameRef = useRef(null);

  const map = playableMaps(gameMaps).find(
    (m) => m.displayName.toLowerCase() === String(mapName).toLowerCase()
  );

  if (!map) {
    return (
      <div className="lineup-map is-empty">
        <p>Map art is still loading.</p>
      </div>
    );
  }

  // Resolve each line up's position once - either raw coordinates or a
  // callout name.
  const resolved = lineups
    .map((lineup) => ({
      lineup,
      from: resolvePoint(map, lineup.from),
      to: resolvePoint(map, lineup.to),
    }))
    .filter((entry) => entry.from);

  // Several line ups often start from the same callout, and a callout resolves
  // to a single point - so their pins would sit exactly on top of each other
  // and only the last would be clickable. Fan any collision out around its
  // shared point. Precise coordinates rarely collide, so this mostly affects
  // positions written as callout names.
  const seen = new Map();
  const placed = resolved.map((entry) => {
    const key = `${entry.from.left.toFixed(3)},${entry.from.top.toFixed(3)}`;
    const index = seen.get(key) ?? 0;
    seen.set(key, index + 1);

    if (index === 0) return entry;

    const angle = (index - 1) * ((Math.PI * 2) / 6) - Math.PI / 2;
    const radius = 0.022;

    return {
      ...entry,
      from: {
        left: entry.from.left + Math.cos(angle) * radius,
        top: entry.from.top + Math.sin(angle) * radius,
      },
    };
  });

  const handleClick = (event) => {
    if (!armed || !onPlace) return;

    const rect = frameRef.current.getBoundingClientRect();
    // Clicking before the minimap has laid out would divide by zero and store
    // a NaN, which JSON turns into null and the renderer then chokes on.
    if (!rect.width || !rect.height) return;

    const x = +((event.clientX - rect.left) / rect.width).toFixed(3);
    const y = +((event.clientY - rect.top) / rect.height).toFixed(3);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;

    onPlace({ x, y });
  };

  return (
    <div className="lineup-map">
      <div
        className={`lineup-map-frame${armed ? " is-placing" : ""}`}
        ref={frameRef}
        onClick={handleClick}
      >
        <img src={map.displayIcon} alt={`${map.displayName} minimap`} />

        {/* Callout labels give the schematic the same readability as the
            in-game map, and come free from the maps endpoint. */}
        {map.callouts?.map((callout) => {
          const { left, top } = calloutPosition(map, callout);

          return (
            <span
              className="lineup-map-callout"
              key={`${callout.superRegionName}-${callout.regionName}`}
              style={{ left: `${left * 100}%`, top: `${top * 100}%` }}
            >
              {callout.regionName}
            </span>
          );
        })}

        {placed.map(({ lineup, from, to }, index) => {
          const isActive = selectedId === lineup.id;

          return (
            <div key={lineup.id}>
              {/* Throw line, when the landing spot is known. */}
              {to && (
                <svg className="lineup-map-line" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line
                    x1={from.left * 100}
                    y1={from.top * 100}
                    x2={to.left * 100}
                    y2={to.top * 100}
                    className={isActive ? "is-active" : undefined}
                  />
                </svg>
              )}

              <button
                type="button"
                className={`lineup-map-pin${isActive ? " is-active" : ""}`}
                style={{
                  left: `${from.left * 100}%`,
                  top: `${from.top * 100}%`,
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  onSelect(lineup.id);
                }}
                aria-label={lineup.title || `Line up ${index + 1}`}
              >
                {typeof lineup.priority === "number" ? lineup.priority : index + 1}
              </button>
            </div>
          );
        })}
      </div>

      <footer className="lineup-map-foot">
        <span>
          {placed.length} of {lineups.length} positioned
        </span>
        {armed && (
          <span className="lineup-map-arming">
            Click to set {armed.field}
          </span>
        )}
      </footer>
    </div>
  );
}
