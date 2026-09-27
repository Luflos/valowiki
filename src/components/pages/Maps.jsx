import { Link } from "react-router-dom"
import "../layout/Maps.css"
import { playableMaps } from "../../utils/valorant"
import DataState, { SkeletonGrid } from "../layout/DataState"

export default function Maps({ gameMaps, status, onRetry }) {
   const maps = playableMaps(gameMaps)

   return (
      <div className="page">
         <header className="page-head">
            <span className="eyebrow">ValoREF</span>
            <h1>Maps</h1>
            <p>
               {status === "ready"
                  ? `${maps.length} maps in the standard rotation`
                  : "Standard map rotation"}
            </p>
         </header>

         <DataState
            status={status}
            onRetry={onRetry}
            what="maps"
            skeleton={<SkeletonGrid count={6} variant="map" />}
         >
         <div className="map-grid">
            {maps.map((map) => (
               <Link
                  key={map.uuid}
                  to={`/maps/${map.uuid}`}
                  className="card map-card"
               >
                  <div className="map-card-art">
                     <img src={map.splash} alt={map.displayName} loading="lazy" />
                  </div>
                  <div className="map-card-body">
                     <h3>{map.displayName}</h3>
                     <span className="map-card-sites">{map.tacticalDescription}</span>
                     {map.callouts?.length > 0 && (
                        <span className="map-card-coords">
                           {map.callouts.length} callouts
                        </span>
                     )}
                  </div>
               </Link>
            ))}
         </div>
         </DataState>
      </div>
   )
}
