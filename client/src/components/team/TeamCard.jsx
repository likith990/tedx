import { useState } from "react";
import "./TeamCard.css";

export default function TeamCard({ member, index }) {
  const [imgError, setImgError] = useState(false);
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="team-card">
      <div className="team-card__frame">
        <span className="team-card__index">{String(index + 1).padStart(2, "0")}</span>

        {member.photoUrl && !imgError ? (
          <img
            src={member.photoUrl}
            alt={member.name}
            className="team-card__photo"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="team-card__photo team-card__photo--fallback">
            <span>{initials}</span>
          </div>
        )}
      </div>

      <div className="team-card__body">
        {member.team && <p className="eyebrow team-card__team">{member.team}</p>}
        <h3 className="team-card__name">{member.name}</h3>
        <p className="team-card__role">{member.role}</p>

        {(member.socials?.linkedin || member.socials?.instagram || member.socials?.email) && (
          <div className="team-card__socials">
            {member.socials?.linkedin && (
              <a href={member.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                in
              </a>
            )}
            {member.socials?.instagram && (
              <a href={member.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                ig
              </a>
            )}
            {member.socials?.email && (
              <a href={`mailto:${member.socials.email}`} aria-label="Email">
                @
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}