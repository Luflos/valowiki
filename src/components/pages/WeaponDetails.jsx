import { useEffect, useState } from "react"
import "../layout/Weapons.css"
import LazyImage from "../layout/LazyImage"

const SKIN_PAGE = 24

// "EWallPenetrationDisplayType::Medium" -> "Medium"
const enumLabel = (value) =>
   typeof value === "string" ? value.split("::").pop() : value

export default function WeaponDetails({ weaponData, weaponStats, weaponShop, weaponSkins }) {
   // Melee ships without shopData or weaponStats, and everything is empty on
   // the first render, so every figure below is built defensively.
   const stats = []

   if (weaponShop?.categoryText) {
      stats.push({ label: "Category", value: weaponShop.categoryText })
   }
   if (weaponShop?.cost != null) {
      stats.push({ label: "Cost", value: `${weaponShop.cost}`, unit: "creds" })
   }
   if (weaponStats?.fireRate) {
      stats.push({ label: "Fire rate", value: weaponStats.fireRate, unit: "/sec" })
   }
   if (weaponStats?.magazineSize) {
      stats.push({ label: "Magazine", value: weaponStats.magazineSize, unit: "rounds" })
   }
   if (weaponStats?.reloadTimeSeconds) {
      stats.push({ label: "Reload", value: weaponStats.reloadTimeSeconds, unit: "sec" })
   }
   if (weaponStats?.equipTimeSeconds) {
      stats.push({ label: "Equip", value: weaponStats.equipTimeSeconds, unit: "sec" })
   }
   if (weaponStats?.wallPenetration) {
      stats.push({ label: "Wall pen", value: enumLabel(weaponStats.wallPenetration) })
   }
   if (weaponStats?.runSpeedMultiplier) {
      stats.push({ label: "Run speed", value: `${weaponStats.runSpeedMultiplier}x` })
   }

   // A weapon can carry 200 skins; rendering them all makes a 12,000px page
   // and puts hundreds of images in the document. Show a screenful at a time.
   const [shown, setShown] = useState(SKIN_PAGE)

   const skins = (weaponSkins || []).filter((skin) => skin.chromas?.[0]?.fullRender)

   // Reset when navigating between weapons.
   useEffect(() => {
      setShown(SKIN_PAGE)
   }, [weaponData?.uuid])

   const remaining = skins.length - shown

   const skinList = skins.slice(0, shown).map((skin, idx) => (
      <div key={skin.uuid || `skin-${idx}`}>
         <h3>{skin.displayName}</h3>
         <LazyImage
            className="weapon-skin-frame"
            src={skin.chromas[0].fullRender}
            alt={skin.displayName}
         />
      </div>
   ))

   return (
      <div className="page">
         <header className="page-head">
            <span className="eyebrow">Weapon</span>
            <h1>{weaponData?.displayName}</h1>
         </header>

         <section className="weapon-hero">
            <div className="weapon-hero-art">
               {weaponData?.displayIcon && (
                  <img
                     className="wep-image"
                     src={weaponData.displayIcon}
                     alt={weaponData.displayName}
                  />
               )}
            </div>

            {stats.length > 0 && (
               <div className="weapon-hero-stats">
                  <dl>
                     {stats.map((stat) => (
                        <div key={stat.label}>
                           <dt>{stat.label}</dt>
                           <dd>
                              {stat.value}
                              {stat.unit && <span>{stat.unit}</span>}
                           </dd>
                        </div>
                     ))}
                  </dl>
               </div>
            )}
         </section>

         <h2 className="section-title">
            Skins {skins.length > 0 && <small>{skins.length}</small>}
         </h2>
         <div className="skins-container">{skinList}</div>

         {remaining > 0 && (
            <div className="load-more">
               <button
                  type="button"
                  className="btn btn-more"
                  onClick={() => setShown((n) => n + SKIN_PAGE)}
               >
                  Load {Math.min(remaining, SKIN_PAGE)} more
               </button>
               <span>{remaining} remaining</span>
            </div>
         )}
      </div>
   )
}
