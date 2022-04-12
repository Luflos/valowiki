export default function AgentDetails ({agentData, abilityData}) {
    // console.log(abilityData.abilities)
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
        <>
            <h1>{agentData.displayName}</h1>
            <img src={agentData.background} alt={agentData.displayName}/>
            <img src={agentData.fullPortraitV2} alt={agentData.displayName} />
            <p>{agentData.description}</p>
            
            <h1>Abilities</h1>
            {abilities}
        </>
    )
}