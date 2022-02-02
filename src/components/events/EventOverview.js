import { useAuth } from "../../hook/AuthContext";
import { useState, useEffect } from "react";

const EventOverview = () => {
  const { user, ready, gapiInstance } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (user && ready) {
      const getCalendarEvents = () => {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        gapiInstance.client.calendar.events
          .list({
            calendarId: "primary",
            timeMin: new Date().toISOString(),
            timeMax: date.toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: "startTime",
          })
          .then((response) => {
            const events = response.result.items.map((event) => event);
            setEvents(events);
          });
      };
      getCalendarEvents();
    }
  }, [user, ready, gapiInstance]);

  const parseDateToMakeSense = (start, end) => {
    return (
      <>
        {new Date(start).toLocaleDateString("cs-cz")}{" "}
        {
          <p>
            {new Date(start).toLocaleTimeString()} -{" "}
            {new Date(end).toLocaleTimeString()}
          </p>
        }
      </>
    );
  };
  if (user) {
    return (
      <>
        {events.map((event) => (
          <>
            <p>
              {event.start.date
                ? event.start.date
                : parseDateToMakeSense(
                    event.start.dateTime,
                    event.end.dateTime
                  )}
            </p>
            <div
              className="border-2 border-purple-500 rounded-md p-2"
              key={event.summary}
            >
              <p>{event.summary}</p>
            </div>
          </>
        ))}
      </>
    );
  }
};

export default EventOverview;
