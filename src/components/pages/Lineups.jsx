import { Link } from "react-router-dom"

export default function Lineups() {
   return (
      <div className="center">
         <h1>Lineups</h1>
         <div >
            <h2>
               Line ups are when you align your crosshair or other HUD (Heads up Display) elements
               within the environment in order to shoot/throw an agent's ability to land in a
               desired location. It is generally done while out of harms way to kil and/or displace
               the enemy team to give you and your team an advantage.
            </h2>
         </div>

         <div style={{ margin: 30 }}>
            <Link to="/lineups/sova">Sova Lineups</Link>
            <br></br>
            <Link to="/lineups/cypher">Cypher Setups</Link>
         </div>
      </div>
   )
}
