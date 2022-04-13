import bToMid from "../video/b-to-mid.mp4"
import aHellToHeaven from "../video/aHell-to-heaven.mp4"
import bSiteToA from "../video/bSite-to-A.mp4"
import cMainToCSite from "../video/c-main-to-c-site.mp4"
import ctToBoat from "../video/ct-to-boat.mp4"
import ctSpawnToA from "../video/ctspawn-to-a.mp4"
import garageRecon from "../video/garageRecon.mp4"
import tSpawnToGarage from "../video/tspawn-to-garage.mp4"


import ReactPlayer from 'react-player'




export default function Lineups(){
    return(
        <div>
            <div>
                <h1>Lineups</h1>
                <h4>Line ups is aligning your crosshair or other HUD (Heads up Display) elements within the environment in order to shoot/throw an agent's ability to land in a desired location. It is generally done while out of harms way to kill and/or displace the enemy team to give you and your team an advantage.</h4>
            </div>
            
            <div>
                <h2>Ascent Sova Line Ups</h2>

                <h3>B Site to Mid</h3>
                <div>
                    <ReactPlayer controls url={bToMid}/>
                </div>

                <h3>A Hell to Heaven</h3>
                <div>
                    <ReactPlayer controls url={aHellToHeaven} />
                </div>

                <h3>CT to Boat</h3>
                <div>
                    <ReactPlayer controls url={ctToBoat} />
                </div>

                <h3>CT Spawn to A</h3>
                <div>
                    <ReactPlayer controls url={ctSpawnToA} />
                </div>
            </div>

            <div>
                <h2>Haven Sova Line Ups</h2>

                <h3>Garage Recon</h3>
                <div>
                    <ReactPlayer controls url={garageRecon} />
                </div>

                <h3>T Spawn To Garage</h3>
                <div>
                    <ReactPlayer controls url={tSpawnToGarage} />
                </div>

                <h3>C Main to C Site</h3>
                <div>
                    <ReactPlayer controls url={cMainToCSite} />
                </div>

                <h3>B Site to A Site</h3>
                <div>
                    <ReactPlayer controls url={bSiteToA} />
                </div>
            </div>

        </div>
    )
}