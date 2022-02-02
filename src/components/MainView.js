import React, { useState } from "react";
import { useAuth } from "../hook/AuthContext";
import "./MainView.css";
import Layout from "./layout/Layout";
import EventOverview from "./events/EventOverview";

const MainView = () => {
  const { user, signIn } = useAuth();
  const [reloadEvents, setReloadEvents] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleReloadEvents = (value) => {
    setReloadEvents(value);
  };

  const handleFilter = (value) => {
    setFilterOpen(value);
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
    <Layout
      reloadEvents={handleReloadEvents}
      toggleFilter={handleFilter}
      filterOpen={filterOpen}
    >
      <div className="space-y-2">
        <EventOverview
          reloadEvents={reloadEvents}
          setReloadEvents={handleReloadEvents}
          isFilterOpen={filterOpen}
        />
      </div>
    </Layout>
  );
};

export default MainView;
