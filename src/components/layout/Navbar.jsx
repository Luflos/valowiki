import { Link } from "react-router-dom";
import "../layout/Navbar.css";
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

    // <nav className="navbar">
    //     <Link to="/"><img src="images/logo.png" alt="valorant logo" className='val-logo'/></Link>
    //     <input type="checkbox" id="toggler"/>
    //     <label htmlFor="toggler"><i className="ri-menu-line"></i></label>

    //     {/* Weapons dropdown */}
    //     <div className="menu dropdown">
    //         <button className="dropbtn">Weapons</button>
    //         <div className="dropdown-content">
    //             <Link to="/agents" className=''>Agents</Link>

    //             <Link to="/maps" className='navbar-link nav-link dropdown-content-link'>Maps</Link>

    //             <Link to="/weapons" className='navbar-link nav-link'>Weapons</Link>
    //         </div>
    //     </div>

    //     {/* Maps dropdown */}
    //     <div className="menu dropdown">
    //         <button className="dropbtn">Maps</button>
    //         <div className="dropdown-content">
    //             <Link to="/agents" className=''>Agents</Link>

    //             <Link to="/maps" className='navbar-link nav-link dropdown-content-link'>Maps</Link>

    //             <Link to="/weapons" className='navbar-link nav-link'>Weapons</Link>
    //         </div>
    //     </div>

    //     {/* Agent dropdown */}
    //     <div className="menu dropdown">
    //         <button className="dropbtn">Agents</button>
    //         <div className="dropdown-content">
    //             <Link to="/weapons" className='navbar-link nav-link'>Weapons</Link>

    //             <Link to="/maps" className='navbar-link nav-link dropdown-content-link'>Maps</Link>

    //             <Link to="/agents" className=''>Agents</Link>
    //         </div>
    //     </div>
    // </nav>

    // submenu try
    // <nav className="navbar">
    <nav className="nav-area">

      {/* Weapons dropdown */}
        <ul>
          <li>
            <Link to="/">
                <img src="images/logo.png" alt="valorant logo" className="val-logo" />
            </Link>
          </li>
          <li className="padding-top">
            <Link to="/agents">Agents</Link>
            <ul>
              <li>
                <Link to="/agents">more agents</Link>
              </li>
              <li>
                <Link to="/agents">even more agents</Link>
              </li>
              <li>
                <Link to="/agents">even more more agents</Link>
                <ul>
                  <li>
                    <Link to="/agents">morrrrrrre agents</Link>
                  </li>
                  <li>
                    <Link to="/agents">more agentsssssss</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li className="padding-top">
            <Link to="/maps">Maps</Link>
          </li>

          <li className="padding-top">
            <Link to="/weapons">Weapons</Link>
          </li>

        </ul>
    </nav>
  );
}
