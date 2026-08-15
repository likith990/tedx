
import { useEffect, useState } from "react";
import { venueApi } from "../../api/client";
import "./VenueSection.css";

export default function VenueSection() {
  const [venue, setVenue] = useState(null);
  const [status, setStatus] = useState("loading"); 

  useEffect(() => {
    loadVenue();
  }, []);

  async function loadVenue() {
    setStatus("loading");
    try {
      const data = await venueApi.get();
      setVenue(data);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <section id="venue" className="section venue-section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Find us</p>
          <h2>Venue</h2>
        </div>

        {status === "loading" && <div className="venue-section__state">Loading venue…</div>}

        {status === "error" && (
          <div className="venue-section__state venue-section__state--error">
            <p>Couldn&apos;t load venue details right now.</p>
            <button type="button" className="btn btn-outline" onClick={loadVenue}>
              Retry
            </button>
          </div>
        )}

        {status === "ready" && !venue && (
          <div className="venue-section__state">Venue details coming soon.</div>
        )}

        {status === "ready" && venue && (
          <div className="venue-card">
            <div className="venue-card__media">
              {venue.imageUrl ? (
                <img src={venue.imageUrl} alt={venue.name} />
              ) : (
                <div className="venue-card__media--fallback" />
              )}
            </div>

            <div className="venue-card__body">
              <h3 className="venue-card__name">{venue.name}</h3>
              <p className="venue-card__address">{venue.address}</p>

              {venue.description && <p className="venue-card__desc">{venue.description}</p>}

              <div className="venue-card__meta">
                {venue.date && (
                  <div>
                    <p className="eyebrow">Date</p>
                    <p>{venue.date}</p>
                  </div>
                )}
                {venue.time && (
                  <div>
                    <p className="eyebrow">Time</p>
                    <p>{venue.time}</p>
                  </div>
                )}
              </div>

              {venue.directionsUrl && (
                <a
                  href={venue.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn venue-card__directions"
                >
                  Get directions <span aria-hidden="true">→</span>
                </a>
              )}
            </div>

            {venue.mapEmbedUrl && (
              <div className="venue-card__map">
                <iframe
                  src={venue.mapEmbedUrl}
                  title="Venue map"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}