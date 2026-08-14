
import { useEffect, useRef, useState } from "react";
import { SPONSORS } from "../../data/sponsorsData";
import SponsorCard from "./SponsorCard";
import "./SponsorsSection.css";

const PRIMARY = SPONSORS.filter((s) => s.tier === "primary");
const SUPPORTING = SPONSORS.filter((s) => s.tier === "partner");

export default function SponsorsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className={`section sponsors-section${isVisible ? " is-visible" : ""}`}
    >
      <div className="container">
        <div className="section-head sponsors-section__head">
          <p className="eyebrow">Backed by ideas</p>
          <h2>Our Sponsors</h2>
          <p className="sponsors-section__desc">
            Built with the support of organizations that believe in ideas worth spreading.
          </p>
        </div>

        <div className="sponsors-grid">
          <p className="sponsors-grid__label">Primary Partners</p>
          <div className="sponsors-grid__row sponsors-grid__row--primary">
            {PRIMARY.map((sponsor, index) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} index={index} size="primary" />
            ))}
          </div>

          <p className="sponsors-grid__label">Partners</p>
          <div className="sponsors-grid__row sponsors-grid__row--partner">
            {SUPPORTING.map((sponsor, index) => (
              <SponsorCard
                key={sponsor.id}
                sponsor={sponsor}
                index={index + PRIMARY.length}
                size="partner"
              />
            ))}
          </div>
        </div>

        <div className="sponsors-cta">
          <p>Interested in partnering with TEDx BITS Hyderabad?</p>
          <a href="mailto:partnerships@tedxbitshyderabad.com" className="sponsors-cta__link">
            Get in touch <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}