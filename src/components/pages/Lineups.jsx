import {Link} from 'react-router-dom'




export default function Lineups(){
    return(
        <div>
            <div>
                <h1>Lineups</h1>
                <h4>Line ups are when you aligning your crosshair or other HUD (Heads up Display) elements within the environment in order to shoot/throw an agent's ability to land in a desired location. It is generally done while out of harms way to kill and/or displace the enemy team to give you and your team an advantage.</h4>
            </div>

            <div>
                <Link to='/lineups/sova'><h1>Sova Line Ups</h1></Link>
                <Link to='/lineups/cypher'><h1>Cypher Set Ups</h1></Link>
            </div>
        </div>
    )
}