import ReactPlayer from "react-player";
import "../layout/Lineups.css";

export default function Cypher() {
  return (
    <>
      <div className="center">
        <img
          className="agent-imgs"
          src="../../../images/cypher.jpeg"
          alt="Cypher picture"
        />
      </div>
      <h1 className="title center">Cypher Setups</h1>
      <section className="layout">
        <ReactPlayer
          controls
          url="https://youtu.be/_kgwebcpdxw"
          className="react-player"
        />

        <ReactPlayer
          controls
          url="https://youtu.be/FCCmm8oKYWg"
          className="react-player"
        />

        <ReactPlayer
          controls
          url="https://youtu.be/k4vnsdNBEu8"
          className="react-player"
        />

        <ReactPlayer
          controls
          url="https://youtu.be/jHMsLL9HgOY"
          className="react-player"
        />

        <ReactPlayer
          controls
          url="https://youtu.be/TFteb9A_63c"
          className="react-player"
        />

        <ReactPlayer
          controls
          url="https://youtu.be/4xppZMixd0s"
          className="react-player"
        />
      </section>
    </>
  );
}
