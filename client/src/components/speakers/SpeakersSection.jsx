
import { useEffect, useState } from "react";
import { speakersApi } from "../../api/client";
import SpeakerCarousel from "./SpeakerCarousel";
import SpeakerModal from "./SpeakerModal";
import "./SpeakersSection.css";

export default function SpeakersSection() {
  const [speakers, setSpeakers] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  useEffect(() => {
    loadSpeakers();
  }, []);

  async function loadSpeakers() {
    setStatus("loading");
    try {
      const data = await speakersApi.list();
      setSpeakers(data);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <section id="speakers" className="section speakers-section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Who&apos;s taking the stage</p>
          <h2>Speakers</h2>
        </div>

        {status === "loading" && (
          <div className="speakers-section__state">Loading speakers…</div>
        )}

        {status === "error" && (
          <div className="speakers-section__state speakers-section__state--error">
            <p>Couldn&apos;t load speakers right now.</p>
            <button type="button" className="btn btn-outline" onClick={loadSpeakers}>
              Retry
            </button>
          </div>
        )}

        {status === "ready" && (
          <SpeakerCarousel speakers={speakers} onOpenSpeaker={setSelectedSpeaker} />
        )}
      </div>

      <SpeakerModal speaker={selectedSpeaker} onClose={() => setSelectedSpeaker(null)} />
    </section>
  );
}