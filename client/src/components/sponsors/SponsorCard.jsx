
import "./SponsorCard.css";

export default function SponsorCard({ sponsor, index, size }) {
  return (
    <div className={`sponsor-card sponsor-card--${size}`} style={{ "--stagger-index": index }}>
      <div className="sponsor-card__mark">
        <img
          src={sponsor.logoSrc}
          alt={`${sponsor.name} logo`}
          className="sponsor-card__logo"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling.style.display = "block";
          }}
        />
        <span className="sponsor-card__logo-fallback">{sponsor.logoText}</span>
      </div>

      <div className="sponsor-card__meta">
        <span className="sponsor-card__category">{sponsor.category}</span>
        <span className="sponsor-card__name">{sponsor.name}</span>
      </div>

      <span className="sponsor-card__line" aria-hidden="true" />
    </div>
  );
}