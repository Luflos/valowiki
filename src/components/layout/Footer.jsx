import "../layout/Footer.css"

export default function Footer() {
    return (
        <div className="footer">
            <p> © coolbeans inc. {new Date().getFullYear()}</p>
        </div>
    )
}