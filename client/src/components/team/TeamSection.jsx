
import { useEffect, useState } from "react";
import { teamApi } from "../../api/client";
import TeamCard from "./TeamCard";
import "./TeamSection.css";

export default function TeamSection() {
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState("loading");

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

  return (
    <section id="team" className="section team-section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">The people behind the event</p>
          <h2>Team</h2>
        </div>

        {status === "loading" && <div className="team-section__state">Loading team…</div>}

        {status === "error" && (
          <div className="team-section__state team-section__state--error">
            <p>Couldn&apos;t load the team right now.</p>
            <button type="button" className="btn btn-outline" onClick={loadTeam}>
              Retry
            </button>
          </div>
        )}

        {status === "ready" && members.length === 0 && (
          <div className="team-section__state">Team lineup coming soon.</div>
        )}

        {status === "ready" && members.length > 0 && (
          <div className="team-grid">
           {members.map((member, index) => (
              <TeamCard key={member._id} member={member} index={index} />
            ))}
            
          </div>
        )}
      </div>
    </section>
  );
}