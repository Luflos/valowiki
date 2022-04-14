import { Link } from "react-router-dom";
import "../layout/Navbar.css";
export default function Navbar() {
  return (
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

          <li className="padding-top">
            <Link to="/lineups">Line Ups</Link>
          </li>

        </ul>
    </nav>
  );
}
