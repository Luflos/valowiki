import { Link } from "react-router-dom"

export default function Home() {
   return (
      <div className="homepage-bg">
         <div className="home-div center">
            <h1>Welcome to VALOWIKI</h1>

            <h3>Valorant is a free-to-play competitive 5v5 character-based tactical shooter game, developed by Riot Games. Set in a near-future Earth, you team up with four other players against five enemies in round-based combat with an agent of your choice. </h3>

            <h3>Valowiki is an app created for Valorant players who want to learn more about their favorite agents and also improve their gameplay.</h3>
         </div>

         <div className="center">
            <button className="idk"><Link to="/agents">Agents</Link></button>

            <Link className="idk" to="/maps">Maps</Link>

         </div>
      </div>
   )
}