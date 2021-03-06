import { Link } from "react-router-dom"
import "../layout/Weapons.css"

export default function Weapons({ weapons }) {
   const categories = new Map()

   for (let index = 0; index < weapons.length; index++) {
      const oneWeapon = weapons[index]

      if (!categories.has(oneWeapon.category)) {
         categories.set(oneWeapon.category, [])
      }
      categories.get(oneWeapon.category).push(oneWeapon)
   }

   const weaponsList = []
   for (const arrayOfWeapons of categories.values()) {
      const displayName = arrayOfWeapons[0].shopData?.category || "Melee"
      weaponsList.push(<h2 className="center weapons-h2">{displayName}</h2>)

      const weaponsGroup = arrayOfWeapons.map((weapon, idx) => {
         return (
            <div key={`weapon-${idx}`}>
               <h3>{weapon.displayName}</h3>
               <p>
                  <br></br>
                  <Link to={`/weapons/${weapon.uuid}`}>
                     <img className="weapons-img" src={weapon.displayIcon} alt={weapon.displayName} />
                  </Link>
               </p>
            </div>
         )
      })
      weaponsList.push(<div className="weapons-container">{weaponsGroup}</div>)
   }

   return (
      <>
         <h1 className="center weapons-h1">List of Weapons</h1>
         <div className="center weapons-div">{weaponsList}</div>
      </>
   )
}