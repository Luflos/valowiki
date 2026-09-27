import { Link } from "react-router-dom"
import "../layout/Lineup-page.css";
import { LINEUP_AGENTS, lineupsFor } from "../../data/lineups";
import { asset } from "../../utils/asset";

export default function Lineups() {
   return (
      <div className="page">
         <header className="page-head">
            <span className="eyebrow">ValoREF</span>
            <h1>Line Ups</h1>
         </header>

         <img className="image-gif" src={asset("images/Sova-Lineups.jpg")} alt="Sova lineup" />

         <h2 className="section-title">What are Line Ups?</h2>
         <p className="lineUp-description">
            Line ups are when you align your crosshair or other HUD elements
            within the environment in order to shoot or throw an agent's ability
            so it lands in a desired location. It is generally done while out of
            harm's way, to kill or displace the enemy team and give your side an
            advantage.
         </p>

         <h2 className="section-title">Browse by agent</h2>
         <div className="lineup-agent-grid">
            {LINEUP_AGENTS.map((agent) => (
               <Link
                  key={agent.slug}
                  to={`/lineups/${agent.slug}`}
                  className="card lineup-agent-card"
               >
                  <img src={agent.banner} alt={agent.name} />
                  <div className="lineup-agent-body">
                     <h3>{agent.name}</h3>
                     <p>{agent.blurb}</p>
                     <span className="home-card-cta">
                        {lineupsFor(agent.slug).length} line ups
                     </span>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   )
}
