
import "./ScheduleItem.css";

export default function ScheduleItem({ event, index }) {
  const { time, type, title, description, speaker, location, featured } = event;

  return (
    <div
      className={`schedule-item${featured ? " is-featured" : ""}`}
      style={{ "--stagger-index": index }}
      role="listitem"
    >
      <div className="schedule-item__time">{time}</div>
      <div className="schedule-item__type">{type}</div>

      <div className="schedule-item__content">
        <h3 className="schedule-item__title">{title}</h3>
        {description && <p className="schedule-item__description">{description}</p>}
        {speaker && <p className="schedule-item__speaker">{speaker}</p>}
      </div>

      {location && <div className="schedule-item__location">{location}</div>}
    </div>
  );
}