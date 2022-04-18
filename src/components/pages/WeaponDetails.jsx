import "../layout/Weapons.css"

export default function WeaponDetails({ weaponData, weaponStats, weaponShop, weaponSkins }) {
   const skinList = weaponSkins.map((skin, idx) => {
      return (
         <div key={`skin-${idx}`}>
            <h3> {skin.displayName} </h3>
            <img
               style={{ padding: "1.5rem" }}
               src={skin.chromas[0].fullRender}
               alt={skin.displayName}
            />
         </div>
      )
   })

   return (
      <section className="center">
         <h1 className="wep-text">{weaponData.displayName}</h1>

         <div class="single-container">
            <img className="wep-image" src={weaponData.displayIcon} alt={weaponData.displayName} />
            <div class="middle">
               <div class="text">
                  {weaponShop === null ? (
                     ""
                  ) : (
                     <p>
                        Category: {weaponShop.category} <br></br> Price: {weaponShop.cost} Creds
                     </p>
                  )}

                  {weaponStats === null ? (
                     ""
                  ) : (
                     <p>
                        Fire Rate: {weaponStats.fireRate} <br></br> Magazine Size:{" "}
                        {weaponStats.magazineSize} <br></br> Equip Speed: {weaponStats.equipTimeSeconds} seconds <br></br> Reload Speed: {weaponStats.reloadTimeSeconds} seconds
                     </p>
                  )}
               </div>
            </div>
         </div>

         <h1 className="skins-text">Skins</h1>
         <div className="skins-container">{skinList}</div>
      </section>
   )
}
