import { Link } from "react-router-dom"
import "../layout/Weapons.css"

export default function Weapons({ weapons }) {
   const weaponsList = weapons.map((weapon, idx) => {
      return (
         <div key={`weapon-${idx}`} className="center">
            {weapon.displayName}
            <br></br>
            Category: {weapon.shopData === null ? "Melee" : weapon.shopData.category}
            <p>
               <Link to={`/weapons/${weapon.uuid}`}>
                  <img src={weapon.displayIcon} alt={weapon.displayName} />
               </Link>
            </p>
         </div>
      )
   })

   return (
      <>
         <h1 className="center">List of Weapons</h1>
      <div className="grid-container">
         {weaponsList}
      </div>
      </>
   )
}
