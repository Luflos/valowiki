export default function MapDetails({gameMaps}) {
    const mapDetails = gameMaps.map((map, idx) => {
      return (
         <div key={`map-${idx}`}>
            <p>
              
            </p>
         </div>
      )
   })
   return (
      <>

      <h1>{mapDetails}</h1>
      </>
   )
}
