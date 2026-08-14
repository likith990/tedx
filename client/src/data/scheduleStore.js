
import { DEFAULT_SCHEDULE } from "./scheduleData";

const STORAGE_KEY = "tedx_schedule_data";
const EVENT_NAME = "tedx:schedule-updated";

function readRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeRaw(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: data }));
  return data;
}

function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getSchedule() {
  const existing = readRaw();
  if (existing && existing.length > 0) return existing;
  return writeRaw(DEFAULT_SCHEDULE);
}

export function subscribeSchedule(callback) {
  function handleCustom(e) {
    callback(e.detail);
  }
  function handleStorage(e) {
    if (e.key === STORAGE_KEY) callback(getSchedule());
  }
  window.addEventListener(EVENT_NAME, handleCustom);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(EVENT_NAME, handleCustom);
    window.removeEventListener("storage", handleStorage);
  };
}

export function addDay(day) {
  const schedule = getSchedule();
  const newDay = { events: [], ...day, id: generateId("day") };
  writeRaw([...schedule, newDay]);
  return newDay;
}

export function updateDay(dayId, updates) {
  const schedule = getSchedule();
  writeRaw(schedule.map((d) => (d.id === dayId ? { ...d, ...updates } : d)));
}

export function deleteDay(dayId) {
  const schedule = getSchedule();
  writeRaw(schedule.filter((d) => d.id !== dayId));
}

export function addEvent(dayId, event) {
  const schedule = getSchedule();
  const newEvent = { ...event, id: generateId("evt") };
  writeRaw(
    schedule.map((d) => (d.id === dayId ? { ...d, events: [...d.events, newEvent] } : d))
  );
  return newEvent;
}

export function updateEvent(dayId, eventId, updates) {
  const schedule = getSchedule();
  writeRaw(
    schedule.map((d) =>
      d.id === dayId
        ? { ...d, events: d.events.map((ev) => (ev.id === eventId ? { ...ev, ...updates } : ev)) }
        : d
    )
  );
}

export function deleteEvent(dayId, eventId) {
  const schedule = getSchedule();
  writeRaw(
    schedule.map((d) =>
      d.id === dayId ? { ...d, events: d.events.filter((ev) => ev.id !== eventId) } : d
    )
  );
}