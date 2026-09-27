import { Link, Navigate, useParams } from "react-router-dom";
import "../layout/Lineup-page.css";
import { getAgent, lineupsFor, mapsFor } from "../../data/lineups";

// The agent's overview: which maps they have line ups for. Picking one leads
// to the agent x map page, which is where the actual teaching happens.
export default function AgentLineups() {
  const { agent: slug } = useParams();
  const agent = getAgent(slug);

  if (!agent) return <Navigate to="/nonexistent" replace />;

  const maps = mapsFor(slug);
  const total = lineupsFor(slug).length;

  return (
    <div className="page">
      <img className="image-gif" src={agent.banner} alt={agent.name} />

      <header className="page-head">
        <span className="eyebrow">
          <Link to="/lineups">Line Ups</Link> · {agent.role}
        </span>
        <h1>{agent.name}</h1>
        <p>{agent.blurb}</p>
      </header>

      <h2 className="section-title">
        Pick your map <small>{total} line ups</small>
      </h2>

      {maps.length === 0 ? (
        <p className="empty-state">No line ups for {agent.name} yet.</p>
      ) : (
        <div className="map-picker">
          {maps.map((entry) => (
            <Link
              key={entry.map}
              to={`/lineups/${slug}/${entry.map.toLowerCase()}`}
              className="card"
            >
              <h3>{entry.map}</h3>
              <span>
                {entry.count} {entry.count === 1 ? "line up" : "line ups"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
