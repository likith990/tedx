
import { useEffect, useState } from "react";
import "./TeamForm.css";

const EMPTY_FORM = {
  name: "",
  role: "",
  team: "",
  photoUrl: "",
  bio: "",
  order: 0,
  socials: { linkedin: "", instagram: "", email: "" },
};

export default function TeamForm({ member, onCancel, onSubmit, submitting }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (member) {
      setForm({
        name: member.name || "",
        role: member.role || "",
        team: member.team || "",
        photoUrl: member.photoUrl || "",
        bio: member.bio || "",
        order: member.order ?? 0,
        socials: {
          linkedin: member.socials?.linkedin || "",
          instagram: member.socials?.instagram || "",
          email: member.socials?.email || "",
        },
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setFormError("");
  }, [member]);

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function updateSocial(field, value) {
    setForm((f) => ({ ...f, socials: { ...f.socials, [field]: value } }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    if (!form.name.trim() || !form.role.trim()) {
      setFormError("Name and role are required.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      role: form.role.trim(),
      team: form.team.trim(),
      photoUrl: form.photoUrl.trim(),
      bio: form.bio.trim(),
      order: Number(form.order) || 0,
      socials: {
        linkedin: form.socials.linkedin.trim(),
        instagram: form.socials.instagram.trim(),
        email: form.socials.email.trim(),
      },
    };

    try {
      await onSubmit(payload);
    } catch (err) {
      setFormError(err.message || "Something went wrong.");
    }
  }

  return (
    <div className="team-form__overlay" role="presentation" onClick={onCancel}>
      <form className="team-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h3 className="team-form__title">{member ? "Edit member" : "Add member"}</h3>

        {formError && <p className="team-form__error">{formError}</p>}

        <div className="team-form__row">
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
            Role *
            <input
              type="text"
              value={form.role}
              onChange={(e) => updateField("role", e.target.value)}
              placeholder="Curator, Design Lead…"
              required
            />
          </label>
        </div>

        <label>
          Sub-team
          <input
            type="text"
            value={form.team}
            onChange={(e) => updateField("team", e.target.value)}
            placeholder="Core Team, Design, Operations…"
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
          <textarea rows={3} value={form.bio} onChange={(e) => updateField("bio", e.target.value)} />
        </label>

        <label>
          Order
          <input type="number" value={form.order} onChange={(e) => updateField("order", e.target.value)} />
        </label>

        <fieldset className="team-form__socials">
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
            Instagram
            <input
              type="text"
              value={form.socials.instagram}
              onChange={(e) => updateSocial("instagram", e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              type="text"
              value={form.socials.email}
              onChange={(e) => updateSocial("email", e.target.value)}
            />
          </label>
        </fieldset>

        <div className="team-form__actions">
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