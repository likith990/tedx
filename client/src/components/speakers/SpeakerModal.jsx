

import { useEffect } from "react";
import "./SpeakerModal.css";

export default function SpeakerModal({ speaker, onClose }) {
  useEffect(() => {
    if (!speaker) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [speaker, onClose]);

  if (!speaker) return null;

  return (
    <div
      className="speaker-modal__overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="speaker-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="speaker-modal-name"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="speaker-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="speaker-modal__grid">
          <div className="speaker-modal__frame">
            {speaker.photoUrl ? (
              <img src={speaker.photoUrl} alt={speaker.name} />
            ) : (
              <div className="speaker-modal__photo-fallback" />
            )}
          </div>

          <div className="speaker-modal__content">
            {speaker.talkTitle && (
              <p className="eyebrow">{speaker.talkTitle}</p>
            )}
            <h3 id="speaker-modal-name" className="speaker-modal__name">
              {speaker.name}
            </h3>
            <p className="speaker-modal__designation">{speaker.designation}</p>

            {speaker.bio && <p className="speaker-modal__bio">{speaker.bio}</p>}

            {speaker.tags?.length > 0 && (
              <ul className="speaker-modal__tags">
                {speaker.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}

            {(speaker.socials?.linkedin ||
              speaker.socials?.twitter ||
              speaker.socials?.website) && (
              <div className="speaker-modal__socials">
                {speaker.socials.linkedin && (
                  <a href={speaker.socials.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                )}
                {speaker.socials.twitter && (
                  <a href={speaker.socials.twitter} target="_blank" rel="noreferrer">
                    Twitter
                  </a>
                )}
                {speaker.socials.website && (
                  <a href={speaker.socials.website} target="_blank" rel="noreferrer">
                    Website
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}