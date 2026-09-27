import { useState } from "react";
import "./LineupAdmin.css";

// Writes a position into src/data/lineups.js through the dev server. Lives
// here rather than in the page so that a production build, where the panel is
// never rendered, can drop this module and the endpoint it names along with it.
export async function savePosition(body) {
  try {
    const response = await fetch("/__admin/position", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (!result.ok) throw new Error(result.error || "Save failed");

    const what = Object.keys(body).filter((k) => k !== "id");
    return { kind: "ok", message: `Saved ${what.join(" and ")}.` };
  } catch (error) {
    return {
      kind: "error",
      message: `${error.message}. Is the dev server running?`,
    };
  }
}

// Development-only. Arms the map for a click, then writes the coordinate
// straight into src/data/lineups.js through the dev server, so positions are
// placed by pointing at the map rather than typing numbers. Hot reload brings
// the change straight back onto the page.
//
// Rendered only when NODE_ENV is "development"; the routes it calls do not
// exist in a build.
export default function LineupAdmin({ lineups, armed, onArm, onClear, status }) {
  const [open, setOpen] = useState(true);

  const describe = (value) => {
    if (!value) return "unset";
    if (typeof value === "string") return value;
    return `${value.x}, ${value.y}`;
  };

  return (
    <section className={`admin${open ? " is-open" : ""}`}>
      <header>
        <h2>
          <span className="admin-dot" aria-hidden="true" />
          Position editor
        </h2>
        <button type="button" className="chip" onClick={() => setOpen((o) => !o)}>
          {open ? "Hide" : "Show"}
        </button>
      </header>

      {open && (
        <>
          <p className="admin-hint">
            {armed
              ? `Click the map to set ${armed.field} for "${armed.title}".`
              : "Pick a field below, then click the map. Saves to src/data/lineups.js."}
          </p>

          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">Line up</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {lineups.map((lineup) => {
                const title = lineup.title || lineup.id;
                const isFrom = armed?.id === lineup.id && armed.field === "from";
                const isTo = armed?.id === lineup.id && armed.field === "to";

                return (
                  <tr key={lineup.id} className={armed?.id === lineup.id ? "is-armed" : undefined}>
                    <th scope="row">{title}</th>
                    <td>
                      <button
                        type="button"
                        className="admin-cell"
                        aria-pressed={isFrom}
                        onClick={() => onArm({ id: lineup.id, field: "from", title })}
                      >
                        {describe(lineup.from)}
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="admin-cell"
                        aria-pressed={isTo}
                        onClick={() => onArm({ id: lineup.id, field: "to", title })}
                      >
                        {describe(lineup.to)}
                      </button>
                    </td>
                    <td>
                      {(lineup.from || lineup.to) && (
                        <button
                          type="button"
                          className="admin-clear"
                          title="Clear both points"
                          onClick={() => onClear(lineup.id)}
                        >
                          Clear
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {status && (
            <p className={`admin-status is-${status.kind}`} role="status">
              {status.message}
            </p>
          )}
        </>
      )}
    </section>
  );
}
