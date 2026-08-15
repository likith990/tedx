
import { useEffect, useState } from "react";
import { venueApi } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import "./VenuePanel.css";

const EMPTY_FORM = {
  name: "",
  address: "",
  description: "",
  imageUrl: "",
  mapEmbedUrl: "",
  directionsUrl: "",
  date: "",
  time: "",
};

export default function VenuePanel() {
  const { logout } = useAuth();
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("loading");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    loadVenue();
  }, []);

  async function loadVenue() {
    setStatus("loading");
    try {
      const data = await venueApi.get();
      if (data) {
        setForm({
          name: data.name || "",
          address: data.address || "",
          description: data.description || "",
          imageUrl: data.imageUrl || "",
          mapEmbedUrl: data.mapEmbedUrl || "",
          directionsUrl: data.directionsUrl || "",
          date: data.date || "",
          time: data.time || "",
        });
      } else {
        setForm(EMPTY_FORM);
      }
      setStatus("ready");
    } catch (err) {
      setStatus("error");
    }
  }

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleAuthFailure(err) {
    if (
      err.message?.toLowerCase().includes("invalid or expired token") ||
      err.message?.toLowerCase().includes("no token provided")
    ) {
      logout();
      return true;
    }
    return false;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.address.trim()) {
      setNotice({ type: "error", message: "Name and address are required." });
      return;
    }

    setSubmitting(true);
    try {
      await venueApi.save({
        name: form.name.trim(),
        address: form.address.trim(),
        description: form.description.trim(),
        imageUrl: form.imageUrl.trim(),
        mapEmbedUrl: form.mapEmbedUrl.trim(),
        directionsUrl: form.directionsUrl.trim(),
        date: form.date.trim(),
        time: form.time.trim(),
      });
      setNotice({ type: "success", message: "Venue details saved." });
    } catch (err) {
      if (handleAuthFailure(err)) return;
      setNotice({ type: "error", message: err.message || "Save failed." });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Clear all venue details?")) return;
    try {
      await venueApi.remove();
      setForm(EMPTY_FORM);
      setNotice({ type: "success", message: "Venue details cleared." });
    } catch (err) {
      if (handleAuthFailure(err)) return;
      setNotice({ type: "error", message: err.message || "Delete failed." });
    }
  }

  if (status === "loading") return <p className="venue-panel__state">Loading…</p>;

  if (status === "error") {
    return (
      <div className="venue-panel__state">
        <p>Couldn&apos;t load venue details.</p>
        <button type="button" className="btn btn-outline" onClick={loadVenue}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="venue-panel">
      <div className="venue-panel__header">
        <h2>Venue</h2>
        <button type="button" className="venue-panel__delete" onClick={handleDelete}>
          Clear details
        </button>
      </div>

      {notice && (
        <p className={`venue-panel__notice venue-panel__notice--${notice.type}`}>{notice.message}</p>
      )}

      <form className="venue-form" onSubmit={handleSubmit}>
        <div className="venue-form__row">
          <label>
            Venue name *
            <input type="text" value={form.name} onChange={(e) => updateField("name", e.target.value)} required />
          </label>
          <label>
            Address *
            <input
              type="text"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              required
            />
          </label>
        </div>

        <label>
          Description
          <textarea rows={3} value={form.description} onChange={(e) => updateField("description", e.target.value)} />
        </label>

        <label>
          Image URL
          <input
            type="text"
            value={form.imageUrl}
            onChange={(e) => updateField("imageUrl", e.target.value)}
            placeholder="https://…"
          />
        </label>

        <label>
          Map embed URL
          <input
            type="text"
            value={form.mapEmbedUrl}
            onChange={(e) => updateField("mapEmbedUrl", e.target.value)}
            placeholder="https://www.google.com/maps/embed?..."
          />
        </label>

        <label>
          Directions link
          <input
            type="text"
            value={form.directionsUrl}
            onChange={(e) => updateField("directionsUrl", e.target.value)}
            placeholder="https://maps.google.com/…"
          />
        </label>

        <div className="venue-form__row">
          <label>
            Date
            <input type="text" value={form.date} onChange={(e) => updateField("date", e.target.value)} placeholder="14 March 2026" />
          </label>
          <label>
            Time
            <input type="text" value={form.time} onChange={(e) => updateField("time", e.target.value)} placeholder="9:00 AM – 6:00 PM" />
          </label>
        </div>

        <div className="venue-form__actions">
          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? "Saving…" : "Save venue"}
          </button>
        </div>
      </form>
    </div>
  );
}