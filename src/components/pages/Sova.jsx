import ReactPlayer from "react-player"
import "../layout/Lineups.css"

export default function Sova() {
   return (
      <div className="center">
         <img
            className="agent-imgs"
            src="https://wallpaperaccess.com/full/3779849.jpg"
            alt="Sova"
         />
         <div>
            <h2 className="title">Ascent Sova Line Ups</h2>

            <h3 className="lineUpTitle">B Site to Mid</h3>
            <div>
               <ReactPlayer controls url="https://youtu.be/Dm_AnZbeamE" className='react-player'/>
            </div>

            <h3 className="lineUpTitle">A Hell to Heaven</h3>
            <div>
               <ReactPlayer controls url="https://www.youtube.com/watch?v=7lR2_FfKqUk" className='react-player'/>
            </div>

            <h3 className="lineUpTitle">CT to Boat</h3>
            <div>
               <ReactPlayer controls url="https://youtu.be/RCdzMhXYvn8" className='react-player'/>
            </div>

            <h3 className="lineUpTitle">CT Spawn to A</h3>
            <div>
               <ReactPlayer controls url="https://youtu.be/Csqb_JKoOwo" className='react-player'/>
            </div>
         </div>

         <div>
            <h2 className="title">Haven Sova Line Ups</h2>

            <h3 className="lineUpTitle">Garage Recon</h3>
            <div>
               <ReactPlayer controls url="https://youtu.be/TR_OlrD8e_4" className='react-player'/>
            </div>

            <h3 className="lineUpTitle">T Spawn To Garage</h3>
            <div>
               <ReactPlayer controls url="https://youtu.be/K9p7Hu9zSWU" className='react-player'/>
            </div>

            <h3 className="lineUpTitle">C Main to C Site</h3>
            <div>
               <ReactPlayer controls url="https://youtu.be/bY5wwODz3S4" className='react-player'/>
            </div>

            <h3 className="lineUpTitle">B Link to A Site</h3>
            <div>
               <ReactPlayer controls url="https://youtu.be/ENo5rg6PLmg" className='react-player'/>
            </div>
         </div>
      </div>
   )
}
