import { Link } from "react-router-dom"

export default function Weapons({ weapons }) {
   const weaponsList = weapons.map((weapon, idx) => {
      return (
         <section key={`weapon-${idx}`} className="center">
            {weapon.displayName}
            <p>
               <Link to={`/weapons/${weapon.uuid}`}>
                  <img src={weapon.displayIcon} alt={weapon.displayName} />
               </Link>
            </p>
         </section>
      )
   })
   return (
      <div className="background-color">
         <h1 className="center">List of Weapons</h1>
         {weaponsList}
      </div>
   )
}
