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
            const events = response.result.items.map((event) => ({
              time: event.start.date,
              summary: event.summary,
            }));
            setEvents(events);
          });
      };
      getCalendarEvents();
    }
  }, [user, ready, gapiInstance]);
  if (user) {
    return (
      <>
        {events.map((event) => (
          <div
            className="border-2 border-purple-500 rounded-md p-2"
            key={event.summary}
          >
            <p>{event.summary}</p>
            <p>{event.time}</p>
          </div>
        ))}
      </>
    );
  }
};

export default EventOverview;
