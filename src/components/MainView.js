import React, { useState } from "react";
import { useAuth } from "../hook/AuthContext";
import "./MainView.css";
import Layout from "./layout/Layout";
import EventOverview from "./events/EventOverview";

const MainView = () => {
  const { user, signIn } = useAuth();
  const [reloadEvents, setReloadEvents] = useState(false);
  const handleReloadEvents = (value) => {
    setReloadEvents(value);
  };
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
    <Layout reloadEvents={handleReloadEvents}>
      <div className="space-y-2">
        <h1 className="text-4xl pb-2">Your events</h1>
        <EventOverview
          reloadEvents={reloadEvents}
          setReloadEvents={handleReloadEvents}
        />
      </div>
    </Layout>
  );
};

export default MainView;
