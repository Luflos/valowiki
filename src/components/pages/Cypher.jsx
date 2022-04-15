import ReactPlayer from "react-player"
import "../layout/Lineups.css"

export default function Cypher() {
   return (
      <div className="center">
         <img
            className="agent-imgs"
            src="https://wallpx.com/image/2022/03/valorant-cypher-camera-agents-artwork.jpg"
            alt="Cypher"
         />

         <div>
            <h1 className="title">Split Cypher Setups</h1>

            <h3 className="lineUpTitle">B Setup</h3>
            <div>
               <ReactPlayer controls url="https://youtu.be/_kgwebcpdxw" className='react-player'/>
            </div>

            <h3 className="lineUpTitle">A Setup</h3>
            <div>
               <ReactPlayer controls url="https://youtu.be/FCCmm8oKYWg" className='react-player' />
            </div>

            <h3 className="lineUpTitle">Early A Info Camera</h3>
            <div>
               <ReactPlayer controls url="https://youtu.be/VoGf5qwZL8Y" className='react-player'/>
            </div>

            <h3 className="lineUpTitle">A Camera</h3>
            <div>
               <ReactPlayer controls url="https://youtu.be/0L2XcIRMdSE" className='react-player'/>
            </div>

            <h3 className="lineUpTitle">A Camera #2</h3>
            <div>
               <ReactPlayer controls url="https://youtu.be/1_sar7p-IHk" className='react-player'/>
            </div>

            <div>
               <h1 className="title">Bind Cypher Setups</h1>

               <h3 className="lineUpTitle">B Setup</h3>
               <div>
                  <ReactPlayer controls url="https://youtu.be/k4vnsdNBEu8" className='react-player'/>
               </div>

               <h3 className="lineUpTitle">A Setup</h3>
               <div>
                  <ReactPlayer controls url="https://youtu.be/jHMsLL9HgOY" className='react-player'/>
               </div>
            </div>

            <div>
               <h1 className="title">Fracture Cypher Setups</h1>

               <h3 className="lineUpTitle">B Setup</h3>
               <div>
                  <ReactPlayer controls url="https://youtu.be/TFteb9A_63c" className='react-player'/>
               </div>

               <h3 className="lineUpTitle">A Setup</h3>
               <div>
                  <ReactPlayer controls url="https://youtu.be/4xppZMixd0s" className='react-player'/>
               </div>

               <h3 className="lineUpTitle">B Main One Way</h3>
               <div>
                  <ReactPlayer controls url="https://youtu.be/T_e9Ocxrigk" className='react-player'/>
               </div>
            </div>
         </div>
      </div>
   )
}
