
import { useEffect, useState } from "react";
import {
  getSchedule,
  addDay,
  updateDay,
  deleteDay,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../../data/scheduleStore";
import ScheduleDayForm from "./ScheduleDayForm";
import ScheduleEventForm from "./ScheduleEventForm";
import "./SchedulePanel.css";

export default function SchedulePanel() {
  const [schedule, setSchedule] = useState([]);
  const [activeDayId, setActiveDayId] = useState(null);
  const [dayFormOpen, setDayFormOpen] = useState(false);
  const [editingDay, setEditingDay] = useState(null);
  const [eventFormOpen, setEventFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    const data = getSchedule();
    setSchedule(data);
    if (data.length > 0) setActiveDayId(data[0].id);
  }, []);

  function refresh() {
    const data = getSchedule();
    setSchedule(data);
    return data;
  }

  function showNotice(type, message) {
    setNotice({ type, message });
    window.setTimeout(() => setNotice(null), 3000);
  }

  const activeDay = schedule.find((d) => d.id === activeDayId) || null;

  function openAddDay() {
    setEditingDay(null);
    setDayFormOpen(true);
  }
  function openEditDay(day) {
    setEditingDay(day);
    setDayFormOpen(true);
  }
  function closeDayForm() {
    setDayFormOpen(false);
    setEditingDay(null);
  }

  function handleDaySubmit(payload) {
    if (editingDay) {
      updateDay(editingDay.id, payload);
      showNotice("success", "Day updated.");
    } else {
      const created = addDay({ ...payload, events: [] });
      setActiveDayId(created.id);
      showNotice("success", "Day added.");
    }
    refresh();
    closeDayForm();
  }

  function handleDeleteDay(day) {
    if (!window.confirm(`Delete ${day.dayName}? This removes all its events.`)) return;
    deleteDay(day.id);
    const data = refresh();
    if (activeDayId === day.id) setActiveDayId(data[0]?.id ?? null);
    showNotice("success", "Day deleted.");
  }

  function openAddEvent() {
    setEditingEvent(null);
    setEventFormOpen(true);
  }
  function openEditEvent(event) {
    setEditingEvent(event);
    setEventFormOpen(true);
  }
  function closeEventForm() {
    setEventFormOpen(false);
    setEditingEvent(null);
  }

  function handleEventSubmit(payload) {
    if (!activeDay) return;
    if (editingEvent) {
      updateEvent(activeDay.id, editingEvent.id, payload);
      showNotice("success", "Event updated.");
    } else {
      addEvent(activeDay.id, payload);
      showNotice("success", "Event added.");
    }
    refresh();
    closeEventForm();
  }

  function handleDeleteEvent(event) {
    if (!activeDay) return;
    if (!window.confirm(`Delete "${event.title}"?`)) return;
    deleteEvent(activeDay.id, event.id);
    refresh();
    showNotice("success", "Event deleted.");
  }

  return (
    <div className="schedule-panel">
      <div className="schedule-panel__header">
        <h2>Schedule</h2>
        <button type="button" className="btn" onClick={openAddDay}>
          Add day
        </button>
      </div>

      {notice && (
        <p className={`schedule-panel__notice schedule-panel__notice--${notice.type}`}>
          {notice.message}
        </p>
      )}

      {schedule.length === 0 && (
        <p className="schedule-panel__state">No days yet. Add the first one.</p>
      )}

      {schedule.length > 0 && (
        <div className="schedule-panel__days">
          {schedule.map((day) => (
            <button
              key={day.id}
              type="button"
              className={`schedule-panel__day-tab${day.id === activeDayId ? " is-active" : ""}`}
              onClick={() => setActiveDayId(day.id)}
            >
              Day {day.dayNumber} · {day.dayName}
            </button>
          ))}
        </div>
      )}

      {activeDay && (
        <div className="schedule-panel__day-detail">
          <div className="schedule-panel__day-meta">
            <div>
              <p className="schedule-panel__day-title">
                Day {activeDay.dayNumber} — {activeDay.dayName}, {activeDay.date}
              </p>
              <p className="schedule-panel__day-desc">{activeDay.description}</p>
            </div>
            <div className="schedule-panel__day-actions">
              <button type="button" onClick={() => openEditDay(activeDay)}>
                Edit day
              </button>
              <button type="button" className="schedule-panel__delete" onClick={() => handleDeleteDay(activeDay)}>
                Delete day
              </button>
            </div>
          </div>

          <div className="schedule-panel__events-header">
            <h3>Events</h3>
            <button type="button" className="btn btn-outline" onClick={openAddEvent}>
              Add event
            </button>
          </div>

          {activeDay.events.length === 0 && (
            <p className="schedule-panel__state">No events yet for this day.</p>
          )}

          {activeDay.events.length > 0 && (
            <table className="schedule-panel__table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Speaker</th>
                  <th>Location</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {activeDay.events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.time}</td>
                    <td>{event.type}</td>
                    <td>{event.title}</td>
                    <td>{event.speaker || "—"}</td>
                    <td>{event.location || "—"}</td>
                    <td className="schedule-panel__actions">
                      <button type="button" onClick={() => openEditEvent(event)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className="schedule-panel__delete"
                        onClick={() => handleDeleteEvent(event)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {dayFormOpen && (
        <ScheduleDayForm day={editingDay} onCancel={closeDayForm} onSubmit={handleDaySubmit} />
      )}

      {eventFormOpen && (
        <ScheduleEventForm event={editingEvent} onCancel={closeEventForm} onSubmit={handleEventSubmit} />
      )}
    </div>
  );
}