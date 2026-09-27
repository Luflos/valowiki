import { useId, useRef, useState } from "react";
import "./FalloffChart.css";
import { falloffSeries, shotDamage, tidy } from "../../utils/ballistics";

const VIEW = { w: 760, h: 270 };
const PAD = { top: 16, right: 96, bottom: 40, left: 52 };

const plot = {
  x: PAD.left,
  y: PAD.top,
  w: VIEW.w - PAD.left - PAD.right,
  h: VIEW.h - PAD.top - PAD.bottom,
};

// Rounds a maximum up to a friendly axis top.
function axisTop(value) {
  const step = value > 200 ? 50 : value > 100 ? 25 : 10;
  return Math.ceil(value / step) * step;
}

export default function FalloffChart({ series, part, maxMeters = 50 }) {
  const [hoverMeters, setHoverMeters] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const svgRef = useRef(null);
  const titleId = useId();

  const plotted = series.map((entry) => ({
    ...entry,
    points: falloffSeries(entry.weapon, part),
  }));

  const yMax = axisTop(
    Math.max(...plotted.flatMap((s) => s.points.map((p) => p.damage)), 10)
  );

  const sx = (m) => plot.x + (m / maxMeters) * plot.w;
  const sy = (d) => plot.y + plot.h - (d / yMax) * plot.h;

  const ticksY = Array.from({ length: 5 }, (_, i) => (yMax / 4) * i);
  const ticksX = [0, 10, 20, 30, 40, 50].filter((m) => m <= maxMeters);

  // Pointer position -> metres, in viewBox space rather than screen pixels.
  const handleMove = (event) => {
    const rect = svgRef.current.getBoundingClientRect();
    const vx = ((event.clientX - rect.left) / rect.width) * VIEW.w;
    const m = ((vx - plot.x) / plot.w) * maxMeters;

    setHoverMeters(m >= 0 && m <= maxMeters ? m : null);
  };

  return (
    <figure className="chart">
      <figcaption className="chart-head">
        <div>
          <h3 id={titleId}>Damage per shot by distance</h3>
          <p className="chart-sub">
            {part === "head" ? "Headshot" : part === "leg" ? "Leg shot" : "Body shot"} damage,
            assuming every pellet connects
          </p>
        </div>
        <button
          type="button"
          className="chip chart-toggle"
          aria-pressed={showTable}
          onClick={() => setShowTable((open) => !open)}
        >
          {showTable ? "Chart" : "Table"}
        </button>
      </figcaption>

      {/* Legend: identity never rests on colour alone. */}
      <ul className="chart-legend">
        {plotted.map((s) => (
          <li key={s.label}>
            <span className="chart-swatch" style={{ background: s.color }} />
            {s.label}
          </li>
        ))}
      </ul>

      {showTable ? (
        <div className="chart-table-wrap">
          <table className="chart-table">
            <thead>
              <tr>
                <th scope="col">Distance</th>
                {plotted.map((s) => (
                  <th scope="col" key={s.label}>{s.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ticksX.map((m) => (
                <tr key={m}>
                  <th scope="row">{m} m</th>
                  {plotted.map((s) => (
                    <td key={s.label}>{tidy(shotDamage(s.weapon, m, part))}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <svg
          ref={svgRef}
          className="chart-svg"
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          role="img"
          aria-labelledby={titleId}
          onMouseMove={handleMove}
          onMouseLeave={() => setHoverMeters(null)}
        >
          {/* Recessive gridlines */}
          {ticksY.map((d) => (
            <g key={d}>
              <line
                className="chart-grid"
                x1={plot.x}
                x2={plot.x + plot.w}
                y1={sy(d)}
                y2={sy(d)}
              />
              <text className="chart-tick" x={plot.x - 10} y={sy(d) + 4} textAnchor="end">
                {tidy(d)}
              </text>
            </g>
          ))}

          {ticksX.map((m) => (
            <text
              key={m}
              className="chart-tick"
              x={sx(m)}
              y={plot.y + plot.h + 24}
              textAnchor="middle"
            >
              {m}m
            </text>
          ))}

          <text
            className="chart-axis-label"
            x={plot.x + plot.w / 2}
            y={VIEW.h - 4}
            textAnchor="middle"
          >
            Distance
          </text>

          {/* Crosshair sits under the marks */}
          {hoverMeters !== null && (
            <line
              className="chart-crosshair"
              x1={sx(hoverMeters)}
              x2={sx(hoverMeters)}
              y1={plot.y}
              y2={plot.y + plot.h}
            />
          )}

          {plotted.map((s) => {
            const d = s.points
              .map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.meters)},${sy(p.damage)}`)
              .join(" ");
            const last = s.points[s.points.length - 1];

            return (
              <g key={s.label}>
                <path className="chart-line" d={d} stroke={s.color} />
                {/* Direct label - with only two series, both get one. */}
                <text
                  className="chart-direct-label"
                  x={sx(last.meters) + 10}
                  y={sy(last.damage) + 4}
                >
                  {s.label}
                </text>
                {hoverMeters !== null && (
                  <circle
                    className="chart-dot"
                    cx={sx(hoverMeters)}
                    cy={sy(shotDamage(s.weapon, hoverMeters, part))}
                    r={5}
                    fill={s.color}
                  />
                )}
              </g>
            );
          })}
        </svg>
      )}

      {hoverMeters !== null && !showTable && (
        <div className="chart-tooltip" role="status">
          <strong>{Math.round(hoverMeters)} m</strong>
          {plotted.map((s) => (
            <span key={s.label}>
              <span className="chart-swatch" style={{ background: s.color }} />
              {s.label} <b>{tidy(shotDamage(s.weapon, hoverMeters, part))}</b>
            </span>
          ))}
        </div>
      )}
    </figure>
  );
}
