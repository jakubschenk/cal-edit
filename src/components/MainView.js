import React from "react";
import { useAuth } from "../hook/AuthContext";
import "./MainView.css";
import Layout from "./layout/Layout";
import EventOverview from "./events/EventOverview";

const MainView = () => {
  const { user, signIn } = useAuth();

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
    <Layout>
      <div className="space-y-2">
        <h1 className="text-4xl pb-2">Your events</h1>
        <EventOverview />
      </div>
    </Layout>
  );
};

export default MainView;
