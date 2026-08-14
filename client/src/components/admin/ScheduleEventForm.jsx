

import { useEffect, useState } from "react";
import "./ScheduleForms.css";

const EVENT_TYPES = [
  "REGISTRATION", "OPENING", "SESSION", "KEYNOTE", "BREAK",
  "PANEL", "PERFORMANCE", "LUNCH", "NETWORKING", "CLOSING",
];

const EMPTY_FORM = {
  time: "",
  type: "SESSION",
  title: "",
  description: "",
  speaker: "",
  location: "",
  featured: false,
};

export default function ScheduleEventForm({ event, onCancel, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (event) {
      setForm({
        time: event.time || "",
        type: event.type || "SESSION",
        title: event.title || "",
        description: event.description || "",
        speaker: event.speaker || "",
        location: event.location || "",
        featured: Boolean(event.featured),
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setFormError("");
  }, [event]);

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    if (!form.time.trim() || !form.type.trim() || !form.title.trim()) {
      setFormError("Time, type, and title are required.");
      return;
    }

    onSubmit({
      time: form.time.trim(),
      type: form.type.trim().toUpperCase(),
      title: form.title.trim(),
      description: form.description.trim(),
      speaker: form.speaker.trim(),
      location: form.location.trim(),
      featured: form.featured,
    });
  }

  return (
    <div className="schedule-form__overlay" role="presentation" onClick={onCancel}>
      <form className="schedule-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h3 className="schedule-form__title">{event ? "Edit event" : "Add event"}</h3>

        {formError && <p className="schedule-form__error">{formError}</p>}

        <div className="schedule-form__row">
          <label>
            Time *
            <input
              type="text"
              value={form.time}
              onChange={(e) => updateField("time", e.target.value)}
              placeholder="09:00 AM"
              required
            />
          </label>
          <label>
            Type *
            <input
              type="text"
              list="schedule-event-types"
              value={form.type}
              onChange={(e) => updateField("type", e.target.value)}
              placeholder="SESSION 01"
              required
            />
            <datalist id="schedule-event-types">
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
          </label>
        </div>

        <label>
          Title *
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            required
          />
        </label>

        <label>
          Description
          <textarea
            rows={2}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </label>

        <div className="schedule-form__row">
          <label>
            Speaker
            <input
              type="text"
              value={form.speaker}
              onChange={(e) => updateField("speaker", e.target.value)}
              placeholder="Optional"
            />
          </label>
          <label>
            Location
            <input
              type="text"
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="Optional"
            />
          </label>
        </div>

        <label className="schedule-form__checkbox">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => updateField("featured", e.target.checked)}
          />
          Highlight this entry (featured session)
        </label>

        <div className="schedule-form__actions">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn">
            {event ? "Save changes" : "Add event"}
          </button>
        </div>
      </form>
    </div>
  );
}