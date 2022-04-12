export default function MapDetails({ mapData }) {
   return (
      <>
         <section className="center">
            <h1>{mapData.displayName}</h1>
            <img src={mapData.splash} alt={mapData.displayName} />
            <img className= 'rotate' src={mapData.displayIcon} alt={mapData.displayName} />
         </section>
      </>
   )
}
