

import { useEffect, useState } from "react";
import "./ScheduleForms.css";

const EMPTY_FORM = { dayNumber: "", dayName: "", date: "", description: "" };

export default function ScheduleDayForm({ day, onCancel, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (day) {
      setForm({
        dayNumber: day.dayNumber || "",
        dayName: day.dayName || "",
        date: day.date || "",
        description: day.description || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setFormError("");
  }, [day]);

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    if (!form.dayNumber.trim() || !form.dayName.trim() || !form.date.trim()) {
      setFormError("Day number, day name, and date are required.");
      return;
    }

    onSubmit({
      dayNumber: form.dayNumber.trim(),
      dayName: form.dayName.trim(),
      date: form.date.trim(),
      description: form.description.trim(),
    });
  }

  return (
    <div className="schedule-form__overlay" role="presentation" onClick={onCancel}>
      <form className="schedule-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h3 className="schedule-form__title">{day ? "Edit day" : "Add day"}</h3>

        {formError && <p className="schedule-form__error">{formError}</p>}

        <div className="schedule-form__row">
          <label>
            Day number *
            <input
              type="text"
              value={form.dayNumber}
              onChange={(e) => updateField("dayNumber", e.target.value)}
              placeholder="01"
              required
            />
          </label>
          <label>
            Day name *
            <input
              type="text"
              value={form.dayName}
              onChange={(e) => updateField("dayName", e.target.value)}
              placeholder="Friday"
              required
            />
          </label>
        </div>

        <label>
          Date *
          <input
            type="text"
            value={form.date}
            onChange={(e) => updateField("date", e.target.value)}
            placeholder="August 28, 2026"
            required
          />
        </label>

        <label>
          Short description
          <textarea
            rows={2}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Arrival, ideas, and the beginning of something bigger."
          />
        </label>

        <div className="schedule-form__actions">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn">
            {day ? "Save changes" : "Add day"}
          </button>
        </div>
      </form>
    </div>
  );
}