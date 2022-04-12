import {useState, useEffect} from 'react'
import AgentDetails from './AgentDetails'

import axios from 'axios'

export default function Agent() {
    const {id} = useParams()
    const [agentData, setAgentData] = useState([])

    useEffect(() => {
        axios.get(`https://valorant-api.com/v1/agents/${id}`)
            .then((response) => {
                setAgentData(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    return (
        <AgentDetails agentData={agentData}/>
    )
}