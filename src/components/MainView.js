import React, { useState, useEffect } from "react";
import { UserCard } from "./UserCard";
import { useAuth } from "../hook/AuthContext";
import "./MainView.css";

const MainView = () => {
  const { user, ready, gapiInstance, signOut, signIn } = useAuth();
  const [events, setEvents] = useState([]);

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
  useEffect(() => {
    if (user && ready) {
      getCalendarEvents();
    }
  }, [user, ready]);

  if (!user) {
    return (
      <div className="container">
        <div onClick={signIn} className="btn login">
          Login
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <UserCard user={user} />
      <div className="space-y-2">
        {events.map((event) => (
          <div
            className="border-2 border-purple-500 rounded-md p-2"
            key={event.summary}
          >
            <p>{event.summary}</p>
            <p>{event.time}</p>
          </div>
        ))}
      </div>
      <div
        className="bg-blue-400 border border-purple-600 mt-4 rounded-md px-4 py-2 w-28 text-center text-white"
        onClick={signOut}
      >
        Logout
      </div>
    </div>
  );
};

export default MainView;
