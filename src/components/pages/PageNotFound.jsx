import { Link } from "react-router-dom"

export default function PageNotFound() {
    return (
        <div>
            <h1 style={{ textAlign: "center", paddingTop: "5rem" }}>404 Error: Page Not Found</h1>
            <h1 style={{ textAlign: "center", fontSize: "200px"}}> ㅠ_ㅠ </h1>
            <div className="center" style={{padding: "10rem"}}>
                <Link to="/">Go Back Home</Link>
            </div>
        </div>
    )
}