import "../layout/AgentDetails.css"

export default function AgentDetails ({agentData, abilityData}) {
      const abilities = abilityData.map((ability, idx) => {
        return(
            <li key={idx}>
                <img src={ability.displayIcon} alt="skill icon" />
                <h2>{ability.displayName}</h2>
                {ability.description}
            </li>
        )
    })

    return (
        <div className="agentDetails-Container">
            <h1>{agentData.displayName}</h1>
            <img src={agentData.background} alt={agentData.displayName} className="imageOne image"/>
            <img src={agentData.fullPortraitV2} alt={agentData.displayName} className="imageTwo image"/>
            <p>{agentData.description}</p>
            
            <h1>Abilities</h1>
            {abilities}
            
        </div>
    )
}