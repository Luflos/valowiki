import "../layout/Weapons.css"

export default function WeaponDetails({ weaponData, weaponStats, weaponShop, weaponSkins }) {
  
   const skinList = weaponSkins.map((skin, idx) => {
      return (
         <div key={`skin-${idx}`}>
            {skin.displayName}
            <p>
               <img src={skin.chromas[0].fullRender} alt={skin.displayName} />
            </p>
         </div>
      )
   })

   return (
      <section className="center">

         <h1>{weaponData.displayName}</h1>
         <img src={weaponData.displayIcon} alt={weaponData.displayName} />

         {weaponShop === null ? "" : <p>Category: {weaponShop.category} <br></br> Price: {weaponShop.cost}</p>}
   
         {weaponStats === null ? "" : <p>Fire Rate: {weaponStats.fireRate} <br></br> Magazine Size: {weaponStats.magazineSize}</p>}
         <br></br>
         
         SKINS
         <div className="skins-container">
         {skinList}
         </div>
      </section>
   )
}