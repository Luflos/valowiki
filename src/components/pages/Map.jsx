import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import MapDetails from "./MapDetails"
import axios from "axios"

export default function Map() {
   const { id } = useParams()
   const [mapData, setMapData] = useState([])

   useEffect(() => {
      axios
         .get(`https://valorant-api.com/v1/maps/${id}`)
         .then((response) => {
            setMapData(response.data.data)
         })
         .catch(console.log)
   }, [id])

   return (
      <div className="background-color">
         <MapDetails mapData={mapData} />
      </div>
   )
}
