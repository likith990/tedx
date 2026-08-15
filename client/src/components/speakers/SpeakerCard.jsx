
import { useState } from "react";
import "./SpeakerCard.css";

export default function SpeakerCard({ speaker,index, onOpen }) {
  const [imgError, setImgError] = useState(false);
  const initials = speaker.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <button
      type="button"
      className="speaker-card"
      onClick={() => onOpen(speaker)}
      aria-label={`View details for ${speaker.name}`}
    >
      <div className="speaker-card__frame">
        {speaker.photoUrl && !imgError ? (
          <img
            src={speaker.photoUrl}
            alt={speaker.name}
            className="speaker-card__photo"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="speaker-card__photo speaker-card__photo--fallback">
            <span>{initials}</span>
          </div>
        )}
      </div>

      <div className="speaker-card__body">
        {speaker.talkTitle && (
          <p className="eyebrow speaker-card__talk">{speaker.talkTitle}</p>
        )}
        <h3 className="speaker-card__name">{speaker.name}</h3>
        <p className="speaker-card__designation">{speaker.designation}</p>

        {speaker.tags?.length > 0 && (
          <ul className="speaker-card__tags">
            {speaker.tags.slice(0, 3).map((tag) => (
              <li key={tag} className="speaker-card__tag">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </button>
  );
}