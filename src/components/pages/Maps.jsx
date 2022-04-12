import { Link } from "react-router-dom"

export default function Maps({ gameMaps }) {

   const mapsList = gameMaps.map((map, idx) => {
      return (
         <li key={`map-${idx}`}>
            <p>
               <Link to={`/maps/${map.uuid}`}>
                  {map.displayName}
                  <img src={map.listViewIcon} alt={map.displayName} />
               </Link>
            </p>
         </li>
      )
   })
   return (
      <>
         <h1>{mapsList}</h1>
      </>
   )
}
