
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import SpeakersPanel from "../../admin/SpeakersPanel";
import SchedulePanel from "../../admin/SchedulePanel";
import TeamPanel from "../../admin/TeamPanel";  
import VenuePanel from "../../admin/VenuePanel";
import "./Dashboard.css";

const TABS = [
  { key: "speakers", label: "Speakers" },
  { key: "schedule", label: "Schedule" },
  { key: "team", label: "Team" },     
  { key: "venue", label: "Venue" }, 
];

export default function Dashboard() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("speakers");

  return (
    <div className="admin-dashboard">
      <aside className="admin-dashboard__sidebar">
        <p className="admin-dashboard__brand">
          TEDx<span>Admin</span>
        </p>
        <nav className="admin-dashboard__nav">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`admin-dashboard__tab${
                activeTab === tab.key ? " is-active" : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="admin-dashboard__main">
        <header className="admin-dashboard__header">
          <h1>Dashboard</h1>
          <button type="button" className="btn btn-outline" onClick={logout}>
            Log out
          </button>
        </header>

        <div className="admin-dashboard__content">
          {activeTab === "speakers" && <SpeakersPanel />}
          {activeTab === "schedule" && <SchedulePanel />}
          {activeTab === "team" && <TeamPanel />}   
          {activeTab === "venue" && <VenuePanel />}
        </div>
      </div>
    </div>
  );
}