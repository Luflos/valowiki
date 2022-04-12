import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link className="logo" to="/">VALOwiki</Link>
            <input type="checkbox" id="toggler"/>
            <label htmlFor="toggler"><i className="ri-menu-line"></i></label>
            <div className="menu">
                <ul className="list">
                    <li>
                        <Link to="/agents">Agents</Link>
                    </li>
                    <li>
                        <Link to="/maps">Maps</Link>
                    </li>
                    <li>
                        <Link to="/weapons">Weapons</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}