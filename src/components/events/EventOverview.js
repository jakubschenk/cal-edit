import { useAuth } from "../../hook/AuthContext";
import { useState, useEffect } from "react";
import Event from "./Event";
import EditEventModal from "./EditEventModal";

const EventOverview = ({ reloadEvents, setReloadEvents }) => {
  const { user, ready, gapiInstance } = useAuth();
  const [events, setEvents] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(undefined);
  const handleOpenEdit = (index) => {
    setCurrentEvent(events[index]);
    console.log(events[index]);
    setOpenEdit(true);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };

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

  useEffect(() => {
    if (gapiInstance) {
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
      setReloadEvents(false);
    }
  }, [reloadEvents, setReloadEvents, gapiInstance]);

  if (user) {
    return (
      <>
        {events &&
          events.map((event, index) => (
            <>
              <Event
                event={event}
                index={index}
                edit={handleOpenEdit}
                key={JSON.stringify(event)}
              />
            </>
          ))}
        <EditEventModal
          event={currentEvent}
          isOpen={openEdit}
          closeModal={handleEditClose}
          reloadEvents={setReloadEvents}
        />
      </>
    );
  }
};

export default EventOverview;
