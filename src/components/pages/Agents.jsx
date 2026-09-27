import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../layout/Agent.css";
import { groupAgentsByRole } from "../../utils/valorant";
import DataState, { SkeletonGrid } from "../layout/DataState";

// Editorial copy keyed by the API's role name. A role with no entry still
// renders its card, just without a blurb, so a new role can't break the page.
const ROLE_COPY = {
  Initiator:
    "Initiators challenge angles by setting up their team to enter contested ground and push defenders away. They open a site with flashes, stuns and recon before the duelists commit.",
  Duelist:
    "Duelists are self-sufficient fraggers who create the most impact through aggression. They are expected to seek out engagements, find the opening pick and clutch out rounds.",
  Sentinel:
    "Sentinels are defensive experts who lock down areas and watch flanks on both attack and defence. Their gadgets hold sites and stop pushes long enough for rotations to arrive.",
  Controller:
    "Controllers slice up dangerous territory to set their team up for success. Smokes, slows and stuns block off a defender's vision and carve safe paths through a site.",
};

export default function Agents({ agents, status, onRetry }) {
  const [query, setQuery] = useState("");
  const [activeRole, setActiveRole] = useState("All");

  const roleGroups = useMemo(() => groupAgentsByRole(agents), [agents]);

  const visibleAgents = useMemo(() => {
    const search = query.trim().toLowerCase();

    return agents
      .filter((agent) => {
        const matchesRole =
          activeRole === "All" || agent.role?.displayName === activeRole;
        const matchesSearch =
          !search ||
          agent.displayName.toLowerCase().includes(search) ||
          agent.role?.displayName.toLowerCase().includes(search);

        return matchesRole && matchesSearch;
      })
      .sort((a, b) => a.displayName.localeCompare(b.displayName));
  }, [agents, query, activeRole]);

  // Clicking a role card filters the grid instead of navigating away.
  const selectRole = (role) =>
    setActiveRole((current) => (current === role ? "All" : role));

  return (
    <>
      <header className="agents-hero">
        <img
          className="agents-hero-img"
          src="https://wallpapercave.com/dwp1x/wp8723098.jpg"
          alt="Valorant agents"
        />
        <div className="agents-hero-overlay">
          <span className="eyebrow">ValoREF</span>
          <h1>Agents</h1>
          <p>
            {status === "ready"
              ? `${agents.length} playable agents across ${roleGroups.length} roles`
              : "Every playable agent, grouped by role"}
          </p>
        </div>
      </header>

      <div className="page">
        <DataState
          status={status}
          onRetry={onRetry}
          what="agents"
          skeleton={<SkeletonGrid count={12} />}
        >
        <h2 className="section-title">Roles</h2>
        <div className="role-grid">
          {roleGroups.map((group) => (
            <button
              type="button"
              key={group.key}
              className="card role-card"
              aria-pressed={activeRole === group.key}
              onClick={() => selectRole(group.key)}
            >
              <div className="role-card-head">
                <h3>{group.title}</h3>
                <span className="role-card-count">{group.items.length}</span>
              </div>
              <p>{ROLE_COPY[group.key]}</p>
            </button>
          ))}
        </div>

        <h2 className="section-title">List of Agents</h2>

        <div className="filter-bar">
          <input
            type="search"
            className="search-input"
            placeholder="Search agents..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search agents by name or role"
          />
          <div className="chip-row">
            <button
              type="button"
              className="chip"
              aria-pressed={activeRole === "All"}
              onClick={() => setActiveRole("All")}
            >
              All<span className="chip-count">{agents.length}</span>
            </button>
            {roleGroups.map((group) => (
              <button
                type="button"
                key={group.key}
                className="chip"
                aria-pressed={activeRole === group.key}
                onClick={() => selectRole(group.key)}
              >
                {group.title}
                <span className="chip-count">{group.items.length}</span>
              </button>
            ))}
          </div>
          <span className="result-count" role="status" aria-live="polite">
            {visibleAgents.length} of {agents.length}
          </span>
        </div>

        {visibleAgents.length === 0 ? (
          <p className="empty-state">No agents match that search.</p>
        ) : (
          <div className="agent-grid">
            {visibleAgents.map((agent) => (
              <Link
                key={agent.uuid}
                to={`/agents/${agent.uuid}`}
                className="card agent-card"
              >
                <div className="agent-card-art">
                  <img src={agent.displayIconSmall} alt={agent.displayName} />
                </div>
                <div className="agent-card-body">
                  <h4>{agent.displayName}</h4>
                  <span className="agent-card-role">
                    {agent.role?.displayName}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
        </DataState>
      </div>
    </>
  );
}
