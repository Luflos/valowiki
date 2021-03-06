import "../layout/Maps.css"

export default function MapDetails({ mapData }) {
   return (
      <>
         <section className="center">
            <h1 style={{marginBottom:20}}>{mapData.displayName}</h1>
            <div>
               <img className="map-imgs" src={mapData.splash} alt={mapData.displayName} />
               { mapData.displayName === 'The Range' ? '' : 
               <h2 style={{marginBottom:20, marginTop:20}} >Callouts for {mapData.displayName}</h2>
               }
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
