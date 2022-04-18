import { Link } from "react-router-dom"
import "../layout/Home.css"
import ValoVid from "../video/home-bg.mp4"

export default function Home() {
   return (
      <div>
         <div className="home-div center">
            <h1 className="container-h1">Welcome to VALOWIKI</h1>
            <h4 className="container-h4">Valowiki is an app created for Valorant players who want to learn more about their favorite agents and also improve their gameplay.</h4>

            <h4 className="container-h4"><a href="https://playvalorant.com/en-us/" target="_blank">VALORANT</a> is a free-to-play competitive 5v5 character-based tactical shooter game, developed by Riot Games. Set in a near-future Earth, you team up with four other players against five enemies in round-based combat with an agent of your choice. Creativity is your greatest weapon.</h4>
            <h4>Click <Link to="/gameplay">here</Link> to see some gameplay!</h4>
            <div className="center">
               <video autoPlay loop muted className="valo-vid">
                  <source src={ValoVid} type="video/mp4"/>
               </video>

            </div>

            <div className="container-small">
            <small style={{marginTop:20}}> Valowiki isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. 
            Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.</small>
            </div>
         </div>
      </div>
   )
}