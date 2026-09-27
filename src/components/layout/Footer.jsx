import "../layout/Footer.css"
import { Link } from "react-router-dom"

export default function Footer() {
   return (
      <div className="footer">
         <Link to="/team" className="footer-link">
            <p>ValoREF {new Date().getFullYear()} ©</p>
         </Link>
      </div>
   )
}
