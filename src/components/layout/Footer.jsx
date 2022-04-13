import "../layout/Footer.css"

export default function Footer() {
    return (
        <footer className="footer">
            <p>© coolbeans inc. {new Date().getFullYear}</p>
        </footer>
    )
}