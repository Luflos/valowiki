import { useCallback, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import "../layout/Lineup-page.css";
import LineupEntry from "../layout/LineupEntry";
import LineupMap from "../layout/LineupMap";
import LineupAdmin, { savePosition } from "../layout/LineupAdmin";
import {
  SIDES,
  agentsOn,
  getAgent,
  lineupsOn,
  mapsFor,
  roleOn,
} from "../../data/lineups";

// "I am Sova on Ascent." Controls on the left, the map schematic beside them,
// and the line ups themselves underneath - the same shape as the lineup tools
// players already use, but leading with what your job is rather than a list of
// throws.
export default function AgentMapLineups({ gameMaps, agents }) {
  const { agent: slug, map: mapParam } = useParams();
  const [params, setParams] = useSearchParams();
  const [openId, setOpenId] = useState(null);
  // Position editor - development only, stripped from any build.
  const isDev = process.env.NODE_ENV === "development";
  const [armed, setArmed] = useState(null);
  const [status, setStatus] = useState(null);

  const save = useCallback(
    (body, message) => savePosition(body).then(setStatus, setStatus).then(() => message),
    []
  );

  const agent = getAgent(slug);
  if (!agent) return <Navigate to="/nonexistent" replace />;

  const known = mapsFor(slug).find(
    (entry) => entry.map.toLowerCase() === String(mapParam).toLowerCase()
  );
  if (!known) return <Navigate to={`/lineups/${slug}`} replace />;

  const map = known.map;
  const side = params.get("side");
  const lineups = lineupsOn(slug, map, side);
  const role = roleOn(slug, map);

  // Agent portraits come from the live roster rather than being stored twice.
  const portraitFor = (name) =>
    agents?.find((a) => a.displayName.toLowerCase() === name.toLowerCase())
      ?.displayIconSmall;

  const setSide = (value) => {
    const next = new URLSearchParams(params);
    if (value) next.set("side", value);
    else next.delete("side");
    setParams(next, { replace: true });
    setOpenId(null);
  };

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">
          <Link to={`/lineups/${slug}`}>{agent.name}</Link>
        </span>
        <h1>
          {agent.name} on {map}
        </h1>
        <p>
          {lineups.length} line {lineups.length === 1 ? "up" : "ups"} ·{" "}
          {agent.role}
        </p>
      </header>

      <div className="lineup-layout">
        <aside className="lineup-controls">
          <div className="lineup-control">
            <span className="lineup-control-label">Side</span>
            <div className="chip-row">
              <button
                type="button"
                className="chip"
                aria-pressed={!side}
                onClick={() => setSide(null)}
              >
                Both
              </button>
              {SIDES.map((name) => (
                <button
                  type="button"
                  key={name}
                  className="chip"
                  aria-pressed={side === name}
                  onClick={() => setSide(side === name ? null : name)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="lineup-control">
            <span className="lineup-control-label">Agent</span>
            <div className="agent-picker">
              {agentsOn(map).map((other) => (
                <Link
                  key={other.slug}
                  to={`/lineups/${other.slug}/${map.toLowerCase()}`}
                  className={`agent-pick${other.slug === slug ? " is-active" : ""}`}
                  title={other.name}
                >
                  {portraitFor(other.name) ? (
                    <img src={portraitFor(other.name)} alt="" />
                  ) : (
                    <span className="agent-pick-initial">{other.name[0]}</span>
                  )}
                  <span>{other.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="lineup-control">
            <span className="lineup-control-label">Map</span>
            <div className="chip-row">
              {mapsFor(slug).map((entry) => (
                <Link
                  key={entry.map}
                  to={`/lineups/${slug}/${entry.map.toLowerCase()}`}
                  className="chip"
                  aria-current={entry.map === map ? "page" : undefined}
                >
                  {entry.map}
                  <span className="chip-count">{entry.count}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <LineupMap
          gameMaps={gameMaps}
          mapName={map}
          lineups={lineups}
          selectedId={openId}
          onSelect={(id) => setOpenId((cur) => (cur === id ? null : id))}
          armed={isDev ? armed : null}
          onPlace={
            isDev
              ? (point) => {
                  if (!armed) return;
                  save({ id: armed.id, [armed.field]: point });
                  setArmed(null);
                }
              : undefined
          }
        />
      </div>

      {isDev && (
        <LineupAdmin
          lineups={lineups}
          armed={armed}
          status={status}
          onArm={(next) =>
            setArmed((current) =>
              current?.id === next.id && current.field === next.field ? null : next
            )
          }
          onClear={(id) => {
            save({ id, from: null, to: null });
            setArmed(null);
          }}
        />
      )}

      {/* The "how am I useful here" answer, before any execution detail. */}
      <section className="role-brief">
        <article>
          <h2>Your job on attack</h2>
          <p className={role?.attack ? undefined : "is-blank"}>
            {role?.attack || "Not written yet."}
          </p>
        </article>
        <article>
          <h2>Your job on defence</h2>
          <p className={role?.defence ? undefined : "is-blank"}>
            {role?.defence || "Not written yet."}
          </p>
        </article>
      </section>

      <h2 className="section-title">
        Line ups <small>{lineups.length}</small>
      </h2>

      {lineups.length === 0 ? (
        <p className="empty-state">
          No {side?.toLowerCase()} line ups recorded for {agent.name} on {map}.
        </p>
      ) : (
        <ol className="lineup-list">
          {lineups.map((lineup, index) => (
            <LineupEntry
              key={lineup.id}
              lineup={lineup}
              index={index}
              agentName={agent.name}
              isOpen={openId === lineup.id}
              onToggle={() =>
                setOpenId((current) =>
                  current === lineup.id ? null : lineup.id
                )
              }
            />
          ))}
        </ol>
      )}
    </div>
  );
}
