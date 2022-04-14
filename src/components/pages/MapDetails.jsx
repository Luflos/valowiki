export default function MapDetails({ mapData }) {
   return (
      <>
         <section className="center">
            <h1>{mapData.displayName}</h1>
            <img src={mapData.splash} alt={mapData.displayName} />
            {/* <img className= 'rotate' src={mapData.displayIcon} alt={mapData.displayName} /> */}
            { mapData.displayName === 'Ascent' ? <img src='../images/maps/ascent-map.png' alt={mapData.displayName} /> : '' }
            { mapData.displayName === 'Split' ? <img src='../images/maps/split-map.png' alt={mapData.displayName} /> : '' }
            { mapData.displayName === 'Fracture' ? <img src='../images/maps/fracture-map.png' alt={mapData.displayName} /> : '' }
            { mapData.displayName === 'Bind' ? <img src='../images/maps/bind-map.png' alt={mapData.displayName} /> : '' }
            { mapData.displayName === 'Breeze' ? <img src='../images/maps/breeze-map.png' alt={mapData.displayName} /> : '' }
            { mapData.displayName === 'Icebox' ? <img src='../images/maps/icebox-map.png' alt={mapData.displayName} /> : '' }
            { mapData.displayName === 'Haven' ? <img src='../images/maps/haven-map.png' alt={mapData.displayName} /> : '' }
         </section>
      </>
   )
}
