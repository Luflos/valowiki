import { useState } from "react";
import ReactPlayer from "react-player";
import LazyImage from "./LazyImage";
import { thumbnailFor, watchUrl, missingFields } from "../../data/lineups";

const STEPS = [
  ["stand", "Stand here"],
  ["aim", "Aim here"],
  ["result", "Result"],
];

// One line up: a summary row that expands into the teaching template. Fields
// that haven't been written yet are simply absent rather than showing empty
// headings, except for `denies`, which is the whole point of the entry and so
// is called out as missing.
export default function LineupEntry({
  lineup,
  index,
  agentName,
  isOpen,
  onToggle,
}) {
  const [playing, setPlaying] = useState(false);

  const title = lineup.title || `${agentName} line up ${index + 1}`;
  const gaps = missingFields(lineup);
  const images = STEPS.filter(([key]) => lineup.images?.[key]);

  return (
    <li className={`lineup-entry${isOpen ? " is-open" : ""}`}>
      <button
        type="button"
        className="lineup-entry-head"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="lineup-entry-rank">
          {typeof lineup.priority === "number" ? lineup.priority : index + 1}
        </span>

        <LazyImage className="lineup-entry-thumb" src={thumbnailFor(lineup.id)} />

        <span className="lineup-entry-title">
          <strong>{title}</strong>
          <span className="lineup-tags">
            {lineup.ability && <span className="lineup-tag">{lineup.ability}</span>}
            {lineup.side && <span className="lineup-tag">{lineup.side}</span>}
            {lineup.difficulty && (
              <span className="lineup-tag">{lineup.difficulty}</span>
            )}
          </span>
        </span>

        <span className="lineup-entry-chevron" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="lineup-entry-body">
          {lineup.denies ? (
            <p className="lineup-why">
              <span>Why it works</span>
              {lineup.denies}
            </p>
          ) : (
            <p className="lineup-why is-blank">
              <span>Why it works</span>
              Not written yet - this is the field that makes the line up worth
              learning rather than just copying.
            </p>
          )}

          {(lineup.when || lineup.beatenBy) && (
            <dl className="lineup-facts">
              {lineup.when && (
                <div>
                  <dt>When to use it</dt>
                  <dd>{lineup.when}</dd>
                </div>
              )}
              {lineup.beatenBy && (
                <div>
                  <dt>How it's beaten</dt>
                  <dd>{lineup.beatenBy}</dd>
                </div>
              )}
            </dl>
          )}

          {images.length > 0 && (
            <div className="lineup-steps">
              {images.map(([key, label]) => (
                <figure key={key}>
                  <LazyImage
                    className="lineup-step-art"
                    src={lineup.images[key]}
                    alt={label}
                  />
                  <figcaption>{label}</figcaption>
                </figure>
              ))}
            </div>
          )}

          <div className="lineup-entry-video">
            {playing ? (
              <ReactPlayer
                controls
                playing
                url={watchUrl(lineup.id)}
                width="100%"
                height="100%"
              />
            ) : (
              <button
                type="button"
                className="btn btn-more"
                onClick={() => setPlaying(true)}
              >
                Play video
              </button>
            )}
          </div>

          {gaps.length > 0 && (
            <p className="lineup-gaps">
              Still to document: {gaps.join(", ")}
            </p>
          )}
        </div>
      )}
    </li>
  );
}
