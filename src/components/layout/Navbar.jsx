import { Link } from "react-router-dom"
import "../layout/Navbar.css"
export default function Navbar() {
    return (
        // <nav className="navbar">
        //     <Link to="/"><img src="images/logo.png" alt="valorant logo" className='val-logo'/></Link>
        //     <input type="checkbox" id="toggler"/>
        //     <label htmlFor="toggler"><i className="ri-menu-line"></i></label>
        //     <div className="menu">
        //         <ul className="list">
        //             <li>
        //                 <Link to="/agents" className='nav-link'>Agents</Link>
        //             </li>
        //             <li>
        //                 <Link to="/maps" className='nav-link'>Maps</Link>
        //             </li>
        //             <li>
        //                 <Link to="/weapons" className='nav-link'>Weapons</Link>
        //             </li>
        //         </ul>
        //     </div>
        // </nav>

        <nav className="navbar">
            <Link to="/"><img src="images/logo.png" alt="valorant logo" className='val-logo'/></Link>
            <input type="checkbox" id="toggler"/>
            <label htmlFor="toggler"><i className="ri-menu-line"></i></label>

            <div className="menu dropdown">
                {/* Agent dropdown */}
                <button className="dropbtn">Agents</button>
                <div className="dropdown-content">
                    <Link to="/agents" className=''>Agents</Link>

                    <Link to="/maps" className='navbar-link nav-link dropdown-content-link'>Maps</Link>

                    <Link to="/weapons" className='navbar-link nav-link'>Weapons</Link>
                </div>
            </div>
            {/* Maps dropdown */}
            <div className="menu dropdown">
                <button className="dropbtn">Maps</button>
                <div className="dropdown-content">
                    <Link to="/agents" className=''>Agents</Link>

                    <Link to="/maps" className='navbar-link nav-link dropdown-content-link'>Maps</Link>

                    <Link to="/weapons" className='navbar-link nav-link'>Weapons</Link>
                </div>
            </div>
            {/* Weapons dropdown */}
            <div className="menu dropdown">
                <button className="dropbtn">Weapons</button>
                <div className="dropdown-content">
                    <Link to="/agents" className=''>Agents</Link>

                    <Link to="/maps" className='navbar-link nav-link dropdown-content-link'>Maps</Link>

                    <Link to="/weapons" className='navbar-link nav-link'>Weapons</Link>
                </div>
            </div>
        </nav>
    )
}