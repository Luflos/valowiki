import "../layout/Weapons.css"

export default function WeaponDetails({ weaponData, weaponStats, weaponShop, weaponSkins }) {
  
   const skinList = weaponSkins.map((skin, idx) => {
      return (
         <div key={`skin-${idx}`}>
            <h3> {skin.displayName} </h3>
               <img style ={{padding:"1.5rem"}}src={skin.chromas[0].fullRender} alt={skin.displayName} />
         </div>
      )
   })

   return (
      <section className="center">
         <h1 style={{marginBottom:30}}>{weaponData.displayName}</h1>
         <div className="container">
            <img className= 'wep-img' src={weaponData.displayIcon} alt={weaponData.displayName} />
            <div className="middle">
               <div className="text">

               {weaponShop === null ? "" : <p>Category: {weaponShop.category} <br></br> Price: {weaponShop.cost} Creds</p>}
   
                {weaponStats === null ? "" : <p>Fire Rate: {weaponStats.fireRate} <br></br> Magazine Size: {weaponStats.magazineSize}</p>}
                </div>
            </div>
         </div>

         {/* {weaponShop === null ? "" : <p>Category: {weaponShop.category} <br></br> Price: {weaponShop.cost} Creds</p>}
   
         {weaponStats === null ? "" : <p>Fire Rate: {weaponStats.fireRate} <br></br> Magazine Size: {weaponStats.magazineSize}</p>} */}
         
         <h1 style={{marginBottom:30, marginTop:80}}>
         {weaponData.displayName} Skins
         </h1>
         <div className="skins-container" style={{padding: "3rem"}}>
         {skinList}
         </div>
      </section>
   )
}