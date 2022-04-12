export default function WeaponDetails ({ weaponData, weaponStats, weaponShop }) {
   return (
      <>
         <section className='center'>
            <h1>{weaponData.displayName}</h1>
            <img src={weaponData.displayIcon} alt={weaponData.displayName} />
            <p>
               Category: {weaponShop.category}
               <br></br>
              Price: {weaponShop.cost}
            </p>
            <p>
              Fire Rate: {weaponStats.fireRate}
              <br></br>
               Magazine Size:{weaponStats.magazineSize}
            </p>
         </section>
      </>
   )
}