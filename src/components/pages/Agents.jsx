import { Link } from 'react-router-dom'
import "../layout/Agent.css"
import {useState, useEffect} from 'react'


export default function Agents ({agents}) {
   const agentList = agents.map((agent, i) => {
      return (
         <div className="wrapper center" key={`key-${i}`}>
            <div className="card">
            <Link  className="agent-link" to={`/agents/${agent.uuid}`}><img src={agent.displayIconSmall} alt="agent icon" className="card__image"/></Link>
               <div className="container">
                  <h4><b><Link  className="agent-link" to={`/agents/${agent.uuid}`}>{agent.displayName}</Link></b></h4>
                  <p>{agent.role.displayName}</p>
               </div>
            </div>
         </div>

      )
   })
   return(
      <div className="agentContainer">
         <img src="https://wallpapercave.com/dwp1x/wp8723098.jpg" alt="picture of agents" className="agent-img"/>
         <h3 className="agentTitle"></h3>
         <div className="roleContainer">
            <h3 className="roleName">Initiators</h3>
            <p>Initiators “challenge angles by setting up their team to enter contested ground and push defenders away.” These agents often excel on the offensive, setting up their teammates for success. Breach, KAY/O, and Skye offer flashes or stuns in one form or another, while Sova provides vision.</p>
         </div>

         <div className="roleContainer">
            <h3 className="roleName">Duelist</h3>
            <p>Duelists are “self-sufficient fraggers. They are the agents that create some of the most impact, offering aggression to a team composition. A Duelist should be expected to seek out engagements and frag, may that be finding the opening pick or clutching out a round.</p>
            {/* <small>Entry fraggers is someone who usually enters first to take map control from defenders.</small> */}
         </div>

         <div className="roleContainer">
            <h3 className="roleName">Sentinels</h3>
            <p>Sentinels are “defensive experts who can lock down areas and watch flanks, both on attack and defender rounds.” In a game dedicated to planting or defusing the Spike, these agents are crucial. Chamber, Cypher, and Killjoy hold down sites with their gizmos and gadgets, while Sage puts a stop to pushes and rotations with slows and barricades.</p>
         </div>

         <div className="roleContainer">
            <h3 className="roleName">Controllers</h3>
            <p>Controllers are experts in “slicing up dangerous territory to set their team up for success." This usually comes in the form of smokes, which can be used to offensively or defensively block off a target's vision but also slows, stuns, and in some cases, flashes.</p>
         </div>
         
         <h1>List of Agents</h1>
         <div>
            {agentList}
         </div>
      </div>
   )
}