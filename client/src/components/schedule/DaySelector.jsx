
import "./DaySelector.css";

export default function DaySelector({ days, activeDayId, onSelect }) {
  return (
    <div className="day-selector" role="tablist" aria-label="Select schedule day">
      {days.map((day) => {
        const isActive = day.id === activeDayId;
        return (
          <button
            key={day.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`day-selector__item${isActive ? " is-active" : ""}`}
            onClick={() => onSelect(day.id)}
          >
            <span className="day-selector__label">Day {day.dayNumber}</span>
            <span className="day-selector__name">{day.dayName}</span>
            <span className="day-selector__date">{day.date}</span>
          </button>
        );
      })}
    </div>
  );
}