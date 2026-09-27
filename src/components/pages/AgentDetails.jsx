import "../layout/AgentDetails.css"

export default function AgentDetails({ agentData, abilityData }) {
   const abilities = abilityData.map((ability, idx) => {
      return (
         <div key={idx} className="card ability-card">
            {/* Passives sometimes ship without an icon. */}
            {ability.displayIcon && (
               <img
                  className="ability-img"
                  src={ability.displayIcon}
                  alt={`${ability.displayName} icon`}
               />
            )}
            <span className="ability-slot">{ability.slot}</span>
            <h3>{ability.displayName}</h3>
            <p>{ability.description}</p>
         </div>
      )
   })

   return (
      <>
         <header className="agent-hero">
            {agentData.background && (
               <img
                  src={agentData.background}
                  alt=""
                  className="agent-hero-bg"
                  aria-hidden="true"
               />
            )}
            <div className="agent-hero-inner">
               <div className="agent-hero-text">
                  {agentData.role && (
                     <span className="agent-role-badge">
                        {agentData.role.displayIcon && (
                           <img src={agentData.role.displayIcon} alt="" />
                        )}
                        {agentData.role.displayName}
                     </span>
                  )}
                  <h1>{agentData.displayName}</h1>
                  <p className="agent-desc">{agentData.description}</p>
               </div>
               {agentData.fullPortraitV2 && (
                  <img
                     src={agentData.fullPortraitV2}
                     alt={agentData.displayName}
                     className="agent-portrait"
                  />
               )}
            </div>
         </header>

         <div className="page">
            <h2 className="section-title">Abilities</h2>
            <div className="abilities-grid">{abilities}</div>
         </div>
      </>
   )
}
