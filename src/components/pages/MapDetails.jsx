import "../layout/Maps.css"

export default function MapDetails({ mapData }) {
   return (
      <>
         <section className="center">
            <h1>{mapData.displayName}</h1>
            <div>
               <img className="map-imgs" src={mapData.splash} alt={mapData.displayName} />
               {/* <img className= 'rotate' src={mapData.displayIcon} alt={mapData.displayName} /> */}
               { mapData.displayName === 'Ascent' ? <img className="map-imgs" src='../images/maps/ascent-map.png' alt={mapData.displayName} /> : '' }
               { mapData.displayName === 'Split' ? <img className="map-imgs" src='../images/maps/split-map.png' alt={mapData.displayName} /> : '' }
               { mapData.displayName === 'Fracture' ? <img className="map-imgs" src='../images/maps/fracture-map.png' alt={mapData.displayName} /> : '' }
               { mapData.displayName === 'Bind' ? <img className="map-imgs" src='../images/maps/bind-map.png' alt={mapData.displayName} /> : '' }
               { mapData.displayName === 'Breeze' ? <img className="map-imgs" src='../images/maps/breeze-map.png' alt={mapData.displayName} /> : '' }
               { mapData.displayName === 'Icebox' ? <img className="map-imgs" src='../images/maps/icebox-map.png' alt={mapData.displayName} /> : '' }
               { mapData.displayName === 'Haven' ? <img className="map-imgs" src='../images/maps/haven-map.png' alt={mapData.displayName} /> : '' }
            </div>
         </section>
      </>
   )
}
