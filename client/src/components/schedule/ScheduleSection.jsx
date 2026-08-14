
import { useEffect, useState } from "react";
import { getSchedule, subscribeSchedule } from "../../data/scheduleStore";
import DaySelector from "./DaySelector";
import ScheduleItem from "./ScheduleItem";
import "./ScheduleSection.css";

export default function ScheduleSection() {
  const [schedule, setSchedule] = useState([]);
  const [activeDayId, setActiveDayId] = useState(null);

  useEffect(() => {
    const data = getSchedule();
    setSchedule(data);
    if (data.length > 0) setActiveDayId(data[0].id);

    const unsubscribe = subscribeSchedule((updated) => {
      setSchedule(updated);
      setActiveDayId((current) => {
        if (updated.some((d) => d.id === current)) return current;
        return updated[0]?.id ?? null;
      });
    });

    return unsubscribe;
  }, []);

  const activeDay = schedule.find((d) => d.id === activeDayId) || null;

  if (schedule.length === 0) return null;

  return (
    <section id="schedule" className="section schedule-section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">The day ahead</p>
          <h2>Schedule</h2>
        </div>

        <DaySelector days={schedule} activeDayId={activeDayId} onSelect={setActiveDayId} />

        {activeDay && (
          <div className="schedule-section__body" key={activeDay.id}>
            {activeDay.description && (
              <p className="schedule-section__day-blurb">{activeDay.description}</p>
            )}

            <div className="schedule-list" role="list">
              {activeDay.events.map((event, index) => (
                <ScheduleItem key={event.id} event={event} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}