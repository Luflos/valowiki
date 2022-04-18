import { Link } from "react-router-dom"

export default function PageNotFound() {
    return (
        <div>
            <h1 style={{ textAlign: "center", paddingTop: "5rem" }}>Page Not Found</h1>
            <div className="center">
                <img src="/images/jett404.gif" alt="gif"/>
            </div>
            <div className="center" style={{padding: "5rem"}}>
                <Link to="/">Go Back Home</Link>
            </div>
        </div>
    )
}