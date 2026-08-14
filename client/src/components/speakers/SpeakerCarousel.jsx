

import { useEffect, useMemo, useState } from "react";
import SpeakerCard from "./SpeakerCard";
import "./SpeakerCarousel.css";

function usePerView() {
  const getPerView = () => {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    return 3;
  };

  const [perView, setPerView] = useState(getPerView);

  useEffect(() => {
    function handleResize() {
      setPerView(getPerView());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return perView;
}

export default function SpeakerCarousel({ speakers, onOpenSpeaker }) {
  const perView = usePerView();
  const [page, setPage] = useState(0);

  const pages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < speakers.length; i += perView) {
      chunks.push(speakers.slice(i, i + perView));
    }
    return chunks;
  }, [speakers, perView]);

  useEffect(() => {
    setPage((p) => Math.min(p, Math.max(pages.length - 1, 0)));
  }, [pages.length]);

  if (speakers.length === 0) {
    return (
      <div className="speaker-carousel__empty">
        <p>Speakers announced soon. Check back shortly.</p>
      </div>
    );
  }

  const goTo = (index) => {
    setPage(Math.max(0, Math.min(index, pages.length - 1)));
  };

  return (
    <div className="speaker-carousel">
      <div className="speaker-carousel__viewport">
        <div
          className="speaker-carousel__track"
          style={{
            transform: `translateX(-${page * 100}%)`,
            width: `${pages.length * 100}%`,
          }}
        >
          {pages.map((chunk, i) => (
            <div
              className="speaker-carousel__page"
              key={i}
              style={{ width: `${100 / pages.length}%` }}
            >
              {chunk.map((speaker) => (
                <div className="speaker-carousel__item" key={speaker._id}>
                  <SpeakerCard speaker={speaker} onOpen={onOpenSpeaker} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {pages.length > 1 && (
        <div className="speaker-carousel__controls">
          <button
            type="button"
            className="speaker-carousel__arrow"
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            aria-label="Previous speakers"
          >
            ‹
          </button>

          <div className="speaker-carousel__dots">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`speaker-carousel__dot${i === page ? " is-active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="speaker-carousel__arrow"
            onClick={() => goTo(page + 1)}
            disabled={page === pages.length - 1}
            aria-label="Next speakers"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}