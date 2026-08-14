import { useEffect } from "react";
import Header from "../shared/Header";
import SpeakersSection from "../speakers/SpeakersSection";
import { pingServer } from "../../api/client";

import ScheduleSection from "../schedule/ScheduleSection";
import SponsorsSection from "../sponsors/SponsorsSection";
import "./Home.css";

export default function Home() {
  useEffect(() => {
    pingServer();
  }, []);

  return (
    <>
      <Header />

      <main id="top">
        <section className="hero">
          <div className="hero__glow" aria-hidden="true" />
          <div className="container hero__inner">
            <p className="eyebrow hero__eyebrow">BITS Hyderabad presents</p>
            <h1 className="hero__title">
              TEDx<span>BITSHyderabad</span>
            </h1>
            <p className="hero__tagline">Ideas worth spreading, live on campus.</p>
          </div>
        </section>

        <SpeakersSection />

        <ScheduleSection />

       <SponsorsSection />
        {/* Team / POR section will mount here */}
        {/* Venue + directions section will mount here */}
        {/* Gallery / FAQ sections will mount here */}
      </main>
    </>
  );
}