import { Link } from "react-router-dom"
import { asset } from "../../utils/asset";

export default function PageNotFound() {
    return (
        <div className="page center">
            <span className="eyebrow">Error 404</span>
            <h1>Page Not Found</h1>
            <img
                src={asset("images/jett404.gif")}
                alt="Jett dashing away"
                style={{ margin: "2rem auto", borderRadius: "8px", maxWidth: "480px" }}
            />
            <div>
                <Link to="/" className="btn btn-primary">Go Back Home</Link>
            </div>
        </div>
    )
}
