import ReactPlayer from "react-player"
import "../layout/Lineups.css"

export default function Sova() {
   return (
      <>
         <div className="center">
            <img 
               className="agent-imgs"
               src="../../../images/sovapic.jpeg"
               alt="Sova picture"
            />
         </div>
         <h1 className="title center">Sova Line Ups</h1>
         <section className="layout">
            <ReactPlayer 
            controls 
            url="https://youtu.be/Dm_AnZbeamE" 
            className='react-player'
            />

            <ReactPlayer 
            controls 
            url="https://www.youtube.com/watch?v=7lR2_FfKqUk" 
            className='react-player'
            />

            <ReactPlayer 
            controls 
            url="https://youtu.be/RCdzMhXYvn8" 
            className='react-player'
            />

            <ReactPlayer 
            controls 
            url="https://youtu.be/Csqb_JKoOwo" 
            className='react-player'
            />

            <ReactPlayer 
            controls 
            url="https://youtu.be/TR_OlrD8e_4" 
            className='react-player'
            />

            <ReactPlayer 
            controls 
            url="https://youtu.be/K9p7Hu9zSWU" 
            className='react-player'
            />
   
            <ReactPlayer 
            controls 
            url="https://youtu.be/bY5wwODz3S4" 
            className='react-player'
            />
            
            <ReactPlayer 
            controls 
            url="https://youtu.be/ENo5rg6PLmg" 
            className='react-player'
            />
         </section>
      </>
   )
}
