import { useEffect, useState } from "react";
import Header from "../shared/Header";
import SpeakersSection from "../speakers/SpeakersSection";
import { pingServer } from "../../api/client";

import ScheduleSection from "../schedule/ScheduleSection";
import SponsorsSection from "../sponsors/SponsorsSection";
import TeamSection from "../team/TeamSection";
import VenueSection from "../venue/VenueSection";
import "./Home.css";

export default function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    pingServer();
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <>
      <Header />

      <main id="top">
        <section className={`hero${ready ? " is-ready" : ""}`}>
          <div className="hero__grain" aria-hidden="true" />
          <div className="hero__glow" aria-hidden="true" />
          <div className="hero__glow hero__glow--secondary" aria-hidden="true" />
          <div className="hero__drift-line hero__drift-line--a" aria-hidden="true" />
          <div className="hero__drift-line hero__drift-line--b" aria-hidden="true" />

          <div className="container hero__inner">
            <div className="hero__meta hero__reveal" style={{ transitionDelay: "0ms" }}>
              <span>EDITION 04</span>
              <span>BITS HYDERABAD</span>
              <span>28—30 AUG 2026</span>
            </div>

            <h1 className="hero__title">
              <span className="hero__title-line hero__mask">
                <span style={{ transitionDelay: "120ms" }}>TEDx</span>
              </span>
              <span className="hero__title-line hero__mask">
                <span className="hero__title-accent" style={{ transitionDelay: "240ms" }}>
                  BITS Hyderabad
                </span>
              </span>
            </h1>

            <div className="hero__rule hero__reveal" style={{ transitionDelay: "420ms" }} />

            <div className="hero__foot">
              <p className="hero__tagline hero__reveal" style={{ transitionDelay: "520ms" }}>
                <em>Ideas worth spreading</em>, live on campus.
              </p>
              <a href="#speakers" className="link-arrow hero__reveal" style={{ transitionDelay: "620ms" }}>
                Explore the lineup <span>→</span>
              </a>
            </div>
          </div>
        </section>

        <SpeakersSection />

        <ScheduleSection />

        <SponsorsSection />
        <TeamSection />
        <VenueSection />
        {/* Gallery / FAQ sections will mount here */}
      </main>
    </>
  );
}