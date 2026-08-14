

import { useEffect, useState } from "react";
import "./SpeakerForm.css";

const EMPTY_FORM = {
  name: "",
  designation: "",
  talkTitle: "",
  photoUrl: "",
  bio: "",
  tags: "",
  order: 0,
  featured: false,
  socials: { linkedin: "", twitter: "", website: "" },
};

export default function SpeakerForm({ speaker, onCancel, onSubmit, submitting }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (speaker) {
      setForm({
        name: speaker.name || "",
        designation: speaker.designation || "",
        talkTitle: speaker.talkTitle || "",
        photoUrl: speaker.photoUrl || "",
        bio: speaker.bio || "",
        tags: (speaker.tags || []).join(", "),
        order: speaker.order ?? 0,
        featured: Boolean(speaker.featured),
        socials: {
          linkedin: speaker.socials?.linkedin || "",
          twitter: speaker.socials?.twitter || "",
          website: speaker.socials?.website || "",
        },
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setFormError("");
  }, [speaker]);

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function updateSocial(field, value) {
    setForm((f) => ({ ...f, socials: { ...f.socials, [field]: value } }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    if (!form.name.trim() || !form.designation.trim()) {
      setFormError("Name and designation are required.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      designation: form.designation.trim(),
      talkTitle: form.talkTitle.trim(),
      photoUrl: form.photoUrl.trim(),
      bio: form.bio.trim(),
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      order: Number(form.order) || 0,
      featured: form.featured,
      socials: {
        linkedin: form.socials.linkedin.trim(),
        twitter: form.socials.twitter.trim(),
        website: form.socials.website.trim(),
      },
    };

    try {
      await onSubmit(payload);
    } catch (err) {
      setFormError(err.message || "Something went wrong.");
    }
  }

  return (
    <div className="speaker-form__overlay" role="presentation" onClick={onCancel}>
      <form
        className="speaker-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h3 className="speaker-form__title">
          {speaker ? "Edit speaker" : "Add speaker"}
        </h3>

        {formError && <p className="speaker-form__error">{formError}</p>}

        <div className="speaker-form__row">
          <label>
            Name *
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </label>
          <label>
            Designation *
            <input
              type="text"
              value={form.designation}
              onChange={(e) => updateField("designation", e.target.value)}
              required
            />
          </label>
        </div>

        <label>
          Talk title
          <input
            type="text"
            value={form.talkTitle}
            onChange={(e) => updateField("talkTitle", e.target.value)}
          />
        </label>

        <label>
          Photo URL
          <input
            type="text"
            value={form.photoUrl}
            onChange={(e) => updateField("photoUrl", e.target.value)}
            placeholder="https://…"
          />
        </label>

        <label>
          Bio
          <textarea
            rows={3}
            value={form.bio}
            onChange={(e) => updateField("bio", e.target.value)}
          />
        </label>

        <label>
          Tags (comma-separated)
          <input
            type="text"
            value={form.tags}
            onChange={(e) => updateField("tags", e.target.value)}
            placeholder="AI, Design, Founder"
          />
        </label>

        <div className="speaker-form__row">
          <label>
            Order
            <input
              type="number"
              value={form.order}
              onChange={(e) => updateField("order", e.target.value)}
            />
          </label>
          <label className="speaker-form__checkbox">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => updateField("featured", e.target.checked)}
            />
            Featured
          </label>
        </div>

        <fieldset className="speaker-form__socials">
          <legend>Socials</legend>
          <label>
            LinkedIn
            <input
              type="text"
              value={form.socials.linkedin}
              onChange={(e) => updateSocial("linkedin", e.target.value)}
            />
          </label>
          <label>
            Twitter
            <input
              type="text"
              value={form.socials.twitter}
              onChange={(e) => updateSocial("twitter", e.target.value)}
            />
          </label>
          <label>
            Website
            <input
              type="text"
              value={form.socials.website}
              onChange={(e) => updateSocial("website", e.target.value)}
            />
          </label>
        </fieldset>

        <div className="speaker-form__actions">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}