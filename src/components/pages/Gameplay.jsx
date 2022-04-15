import ReactPlayer from "react-player"
import "../layout/Lineups.css"


export default function Gameplay() {
    return (
        <>
            <h1 className="center">Valorant Game Plays</h1>
            <div className="center layout">
                <ReactPlayer 
                controls
                url="https://youtu.be/M7D_XBjGw3E"
                className="react-player"
                />

                <ReactPlayer 
                controls
                url="https://youtu.be/WakR802RZcI"
                className="react-player"
                />

                <ReactPlayer 
                controls
                url="https://youtu.be/HQjIVPSG4Nw"
                className="react-player"
                />

                <ReactPlayer 
                controls
                url="https://youtu.be/yRKr-0ZWobY"
                className="react-player"
                />
            </div>
        </>
    )
}