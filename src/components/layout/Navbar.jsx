import { Link } from "react-router-dom";
import "../layout/Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav-area">
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
            <ul>
              <li>
                <Link to="/weapons">Pistols</Link>
                <ul>
                  <li>
                    <Link to="/weapons/29a0cfab-485b-f5d5-779a-b59f85e204a8">Classic</Link>
                  </li>
                  <li>
                    <Link to="/weapons/44d4e95c-4157-0037-81b2-17841bf2e8e3">Frenzy</Link>
                  </li>
                  <li>
                    <Link to="/weapons/1baa85b4-4c70-1284-64bb-6481dfc3bb4e">Ghost</Link>
                  </li>
                  <li>
                    <Link to="/weapons/e336c6b8-418d-9340-d77f-7a9e4cfe0702">Sheriff</Link>
                  </li>
                  <li>
                    <Link to="/weapons/42da8ccc-40d5-affc-beec-15aa47b42eda">Shorty</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/weapons">SMGs</Link>
                <ul>
                  <li>
                    <Link to="/weapons/462080d1-4035-2937-7c09-27aa2a5c27a7">Spectre</Link>
                  </li>
                  <li>
                    <Link to="/weapons/f7e1b454-4ad4-1063-ec0a-159e56b58941">Stinger</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/weapons">Shotguns</Link>
                <ul>
                  <li>
                    <Link to="/weapons/910be174-449b-c412-ab22-d0873436b21b">Bucky</Link>
                  </li>
                  <li>
                    <Link to="/weapons/ec845bf4-4f79-ddda-a3da-0db3774b2794">Judge</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/weapons">Rifles</Link>
                <ul>
                  <li>
                    <Link to="/weapons/ae3de142-4d85-2547-dd26-4e90bed35cf7">Bulldog</Link>
                  </li>
                  <li>
                    <Link to="/weapons/4ade7faa-4cf1-8376-95ef-39884480959b">Guardian</Link>
                  </li>
                  <li>
                    <Link to="/weapons/ee8e8d15-496b-07ac-e5f6-8fae5d4c7b1a">Phantom</Link>
                  </li>
                  <li>
                    <Link to="/weapons/9c82e19d-4575-0200-1a81-3eacf00cf872">Vandal</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/weapons">Sniper Rifles</Link>
                <ul>
                  <li>
                    <Link to="/weapons/c4883e50-4494-202c-3ec3-6b8a9284f00b">Marshal</Link>
                  </li>
                  <li>
                    <Link to="/weapons/a03b24d3-4319-996d-0f8c-94bbfba1dfc7">Operator</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/weapons">Heavy Weapons</Link>
                <ul>
                  <li>
                    <Link to="/weapons/55d8a0f4-4274-ca67-fe2c-06ab45efdf58">Ares</Link>
                  </li>
                  <li>
                    <Link to="/weapons/63e6c2b6-4a8e-869c-3d4c-e38355226584">Odin</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/weapons/2f59173c-4bed-b6c3-2191-dea9b58be9c7">Melee</Link>
              </li>
            </ul>
          </li>

          <li className="padding-top">
            <Link to="/lineups">Line Ups</Link>
          </li>

        </ul>
    </nav>
  );
}
