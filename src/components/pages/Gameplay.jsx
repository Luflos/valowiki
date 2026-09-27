import LineupGallery from "../layout/LineupGallery"
import { GAMEPLAY } from "../../data/lineups"

export default function Gameplay() {
    return (
        <div className="page">
            <header className="page-head">
                <span className="eyebrow">ValoREF</span>
                <h1>Valorant Game Plays</h1>
            </header>

            <LineupGallery lineups={GAMEPLAY} label="Gameplay" />
        </div>
    )
}
