import "../layout/Contact.css"
import { FaGithub, FaLinkedin } from "react-icons/fa"

export default function Contact() {
  return (
    <>
      <div className="center" src="blue-gradient.jpeg">
        <h1>Meet the Devs!</h1>
        <h5 className="descriptionApp">
          Forced to meet through GA
        </h5>
        </div>
      <main className="cards-contact team-title">
        <article className="card-contact">
          <img src="images/clair.png" alt="Photo of Clair" />
          <div className="text">
            <h3>Clair Choo</h3>
            <p className="inner-text">What is Valorant....</p>
            <a href="https://github.com/clairxc" target="_blank">
              <FaGithub size={30}/>
            </a>
            <a href="https://www.linkedin.com/in/clair-choo/" target="_blank">
              <FaLinkedin size={30}/>
            </a>
          </div>
        </article>
        <article className="card-contact">
          <img src="images/sol.jpg" alt="Photo of Sol" />
          <div className="text">
            <h3>Sol Youn</h3>
            <p className="inner-text">
            Valorant is okay...
            </p>
            <a href="https://github.com/Luflos" target="_blank">
              <FaGithub size={30}/>
            </a>
            <a href="https://www.linkedin.com/in/sol-youn/" target="_blank">
              <FaLinkedin size={30}/>
            </a>
          </div>
        </article>
        <article className="card-contact">
          <img src="images/brian.jpg" alt="Photo of Brian" />
          <div className="text">
            <h3>Brian Lee</h3>
            <p className="inner-text">
            I WAS Radiant...
            </p>
            <a href="https://github.com/br1anlee" target="_blank">
              <FaGithub size={30}/>
            </a>
            <a href="https://www.linkedin.com/in/brianjoonmolee/" target="_blank">
              <FaLinkedin size={30}/>
            </a>
          </div>
        </article>
      </main>
    </>
  )
}