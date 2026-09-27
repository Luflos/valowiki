import "../layout/Contact.css"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { asset } from "../../utils/asset";

export default function Contact() {
  return (
    <>
      <div className="page">
        <header className="page-head center">
          <span className="eyebrow">ValoREF</span>
          <h1>Meet the team</h1>
        </header>
        <main className="cards-contact">
        <article className="card-contact">
          <img src={asset("images/brian.jpg")} alt="Brian Lee" />
          <div className="text">
            <h3>Brian Lee</h3>
            <p className="inner-text">
            I am a Full Stack Web Developer based in Los Angeles who is inspired to provide creative solutions to open ended problems and driven to master his craft. With my experience in the social service industry, I am confident on how adaptable I am working under any environment while being able to provide exceptional communication and feedback to my team members.
            </p>
            <div className="card-socials">
              <a href="https://github.com/br1anlee" target="_blank" rel="noreferrer">
                <FaGithub size={30}/>
              </a>
              <a href="https://www.linkedin.com/in/brianjoonmolee/" target="_blank" rel="noreferrer">
                <FaLinkedin size={30}/>
              </a>
            </div>
          </div>
        </article>
        </main>
      </div>
    </>
  )
}