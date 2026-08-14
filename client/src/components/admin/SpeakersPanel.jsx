

import { useEffect, useState } from "react";
import { speakersApi } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import SpeakerForm from "./SpeakerForm";
import "./SpeakersPanel.css";

export default function SpeakersPanel() {
  const { logout } = useAuth();
  const [speakers, setSpeakers] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [editingSpeaker, setEditingSpeaker] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState(null); // { type: 'success' | 'error', message }

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

  function openAddForm() {
    setEditingSpeaker(null);
    setFormOpen(true);
  }

  function openEditForm(speaker) {
    setEditingSpeaker(speaker);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingSpeaker(null);
  }

  function handleAuthFailure(err) {
    if (err.message?.toLowerCase().includes("invalid or expired token") ||
        err.message?.toLowerCase().includes("no token provided")) {
      logout();
      return true;
    }
    return false;
  }

  async function handleFormSubmit(payload) {
    setSubmitting(true);
    try {
      if (editingSpeaker) {
        await speakersApi.update(editingSpeaker._id, payload);
        setNotice({ type: "success", message: "Speaker updated." });
      } else {
        await speakersApi.create(payload);
        setNotice({ type: "success", message: "Speaker added." });
      }
      closeForm();
      await loadSpeakers();
    } catch (err) {
      if (handleAuthFailure(err)) return;
      throw err;
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(speaker) {
    if (!window.confirm(`Delete ${speaker.name}?`)) return;
    try {
      await speakersApi.remove(speaker._id);
      setNotice({ type: "success", message: "Speaker deleted." });
      await loadSpeakers();
    } catch (err) {
      if (handleAuthFailure(err)) return;
      setNotice({ type: "error", message: err.message || "Delete failed." });
    }
  }

  return (
    <div className="speakers-panel">
      <div className="speakers-panel__header">
        <h2>Speakers</h2>
        <button type="button" className="btn" onClick={openAddForm}>
          Add speaker
        </button>
      </div>

      {notice && (
        <p className={`speakers-panel__notice speakers-panel__notice--${notice.type}`}>
          {notice.message}
        </p>
      )}

      {status === "loading" && <p className="speakers-panel__state">Loading…</p>}

      {status === "error" && (
        <div className="speakers-panel__state">
          <p>Couldn&apos;t load speakers.</p>
          <button type="button" className="btn btn-outline" onClick={loadSpeakers}>
            Retry
          </button>
        </div>
      )}

      {status === "ready" && speakers.length === 0 && (
        <p className="speakers-panel__state">No speakers yet. Add the first one.</p>
      )}

      {status === "ready" && speakers.length > 0 && (
        <table className="speakers-panel__table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Featured</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {speakers.map((speaker) => (
              <tr key={speaker._id}>
                <td>{speaker.order}</td>
                <td>{speaker.name}</td>
                <td>{speaker.designation}</td>
                <td>{speaker.featured ? "Yes" : "—"}</td>
                <td className="speakers-panel__actions">
                  <button type="button" onClick={() => openEditForm(speaker)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="speakers-panel__delete"
                    onClick={() => handleDelete(speaker)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {formOpen && (
        <SpeakerForm
          speaker={editingSpeaker}
          onCancel={closeForm}
          onSubmit={handleFormSubmit}
          submitting={submitting}
        />
      )}
    </div>
  );
}