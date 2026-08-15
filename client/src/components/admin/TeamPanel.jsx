
import { useEffect, useState } from "react";
import { teamApi } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import TeamForm from "./TeamForm";
import "./TeamPanel.css";

export default function TeamPanel() {
  const { logout } = useAuth();
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState("loading");
  const [editingMember, setEditingMember] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    loadTeam();
  }, []);

  async function loadTeam() {
    setStatus("loading");
    try {
      const data = await teamApi.list();
      setMembers(data);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
    }
  }

  function openAddForm() {
    setEditingMember(null);
    setFormOpen(true);
  }

  function openEditForm(member) {
    setEditingMember(member);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingMember(null);
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

  async function handleFormSubmit(payload) {
    setSubmitting(true);
    try {
      if (editingMember) {
        await teamApi.update(editingMember._id, payload);
        setNotice({ type: "success", message: "Member updated." });
      } else {
        await teamApi.create(payload);
        setNotice({ type: "success", message: "Member added." });
      }
      closeForm();
      await loadTeam();
    } catch (err) {
      if (handleAuthFailure(err)) return;
      throw err;
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(member) {
    if (!window.confirm(`Delete ${member.name}?`)) return;
    try {
      await teamApi.remove(member._id);
      setNotice({ type: "success", message: "Member deleted." });
      await loadTeam();
    } catch (err) {
      if (handleAuthFailure(err)) return;
      setNotice({ type: "error", message: err.message || "Delete failed." });
    }
  }

  return (
    <div className="team-panel">
      <div className="team-panel__header">
        <h2>Team</h2>
        <button type="button" className="btn" onClick={openAddForm}>
          Add member
        </button>
      </div>

      {notice && (
        <p className={`team-panel__notice team-panel__notice--${notice.type}`}>{notice.message}</p>
      )}

      {status === "loading" && <p className="team-panel__state">Loading…</p>}

      {status === "error" && (
        <div className="team-panel__state">
          <p>Couldn&apos;t load team members.</p>
          <button type="button" className="btn btn-outline" onClick={loadTeam}>
            Retry
          </button>
        </div>
      )}

      {status === "ready" && members.length === 0 && (
        <p className="team-panel__state">No team members yet. Add the first one.</p>
      )}

      {status === "ready" && members.length > 0 && (
        <table className="team-panel__table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Name</th>
              <th>Role</th>
              <th>Sub-team</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                <td>{member.order}</td>
                <td>{member.name}</td>
                <td>{member.role}</td>
                <td>{member.team || "—"}</td>
                <td className="team-panel__actions">
                  <button type="button" onClick={() => openEditForm(member)}>
                    Edit
                  </button>
                  <button type="button" className="team-panel__delete" onClick={() => handleDelete(member)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {formOpen && (
        <TeamForm
          member={editingMember}
          onCancel={closeForm}
          onSubmit={handleFormSubmit}
          submitting={submitting}
        />
      )}
    </div>
  );
}