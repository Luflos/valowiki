import { Link } from "react-router-dom"

export default function Maps({ gameMaps }) {
   const mapsList = gameMaps.map((map, idx) => {
      return (
         <section key={`map-${idx}`} className="center">
            {map.displayName}
            <p>
               <Link to={`/maps/${map.uuid}`}>
                  <img src={map.listViewIcon} alt={map.displayName} />
               </Link>
            </p>
         </section>
      )
   })
   return (
      <>
         <h1 className="center">List of Maps</h1>
         {mapsList}
      </>
   )
}
