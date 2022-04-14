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
                <Link to="/agents">Controllers</Link>
                <ul>
                  <li>
                    <Link to="/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf">Astra</Link>
                  </li>
                  <li>
                    <Link to="/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417">Brimstone</Link>
                  </li>
                  <li>
                    <Link to="/agents/8e253930-4c05-31dd-1b6c-968525494517">Omen</Link>
                  </li>
                  <li>
                    <Link to="/agents/707eab51-4836-f488-046a-cda6bf494859">Viper</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/agents">Duelists</Link>
                <ul>
                  <li>
                    <Link to="/agents/add6443a-41bd-e414-f6ad-e58d267f4e95">Jett</Link>
                  </li>
                  <li>
                    <Link to="/agents/bb2a4828-46eb-8cd1-e765-15848195d751">Neon</Link>
                  </li>
                  <li>
                    <Link to="/agents/eb93336a-449b-9c1b-0a54-a891f7921d69">Phoenix</Link>
                  </li>
                  <li>
                    <Link to="/agents/f94c3b30-42be-e959-889c-5aa313dba261">Raze</Link>
                  </li>
                  <li>
                    <Link to="/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc">Reyna</Link>
                  </li>
                  <li>
                    <Link to="/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89">Yoru</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/agents">Initiators</Link>
                <ul>
                  <li>
                    <Link to="/agents/5f8d3a7f-467b-97f3-062c-13acf203c006">Breach</Link>
                  </li>
                  <li>
                    <Link to="/agents/601dbbe7-43ce-be57-2a40-4abd24953621">KAY/O</Link>
                  </li>
                  <li>
                    <Link to="/agents/6f2a04ca-43e0-be17-7f36-b3908627744d">Skye</Link>
                  </li>
                  <li>
                    <Link to="/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa">Sova</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/agents">Sentinels</Link>
                <ul>
                  <li>
                    <Link to="/agents/22697a3d-45bf-8dd7-4fec-84a9e28c69d7">Chamber</Link>
                  </li>
                  <li>
                    <Link to="/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b">Cypher</Link>
                  </li>
                  <li>
                    <Link to="/agents/1e58de9c-4950-5125-93e9-a0aee9f98746">Killjoy</Link>
                  </li>
                  <li>
                    <Link to="/agents/569fdd95-4d10-43ab-ca70-79becc718b46">Sage</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li className="padding-top">
            <Link to="/maps">Maps</Link>
            <ul>
              <li>
                <Link to="/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319">Ascent</Link>
              </li>
              <li>
                <Link to="/maps/d960549e-485c-e861-8d71-aa9d1aed12a2">Split</Link>
              </li>
              <li>
                <Link to="/maps/b529448b-4d60-346e-e89e-00a4c527a405">Fracture</Link>
              </li>
              <li>
                <Link to="/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba">Bind</Link>
              </li>
              <li>
                <Link to="/maps/2fb9a4fd-47b8-4e7d-a969-74b4046ebd53">Breeze</Link>
              </li>
              <li>
                <Link to="/maps/e2ad5c54-4114-a870-9641-8ea21279579a">Icebox</Link>
              </li>
              <li>
                <Link to="/maps/ee613ee9-28b7-4beb-9666-08db13bb2244">The Range</Link>
              </li>
              <li>
                <Link to="/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047">Haven</Link>
              </li>
            </ul>
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
