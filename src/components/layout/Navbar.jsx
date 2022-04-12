import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav>
            <ul>
                <Link to="/">VALOwiki</Link>
                <Link to="/agents">Agents</Link>
                <Link to="/maps">Maps</Link>
            </ul>
        </nav>
    )
}