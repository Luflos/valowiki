import "../layout/AgentDetails.css"

export default function AgentDetails({ agentData, abilityData }) {
   const abilities = abilityData.map((ability, idx) => {
      return (
         <div key={idx} className="abilities-div">
            <img className="ability-img" src={ability.displayIcon} alt= {`${ability.displayName}'s icon`}/>
            <h2>{ability.displayName}
            <br></br>
            {ability.slot}
            </h2>
            <div className="desc-div">{ability.description} </div>
         </div>
      )
   })

   return (
      <div>
         <div className="agentDetails-Container center">
            <h1 style={{fontSize:60}}>{agentData.displayName}</h1>
            <img
               src={agentData.background}
               alt={agentData.displayName}
               className="agent-name-img"
            />
            <img
               src={agentData.fullPortraitV2}
               alt={agentData.displayName}
               className="agent-detail-img"
            />
            <p className="agent-desc">{agentData.description}</p>
         </div>
         <h1 className="center" style={{marginTop:50, marginBottom:20}}>Abilities</h1>

         <div className="abilities-container center">{abilities}</div>
      </div>
   )
}
