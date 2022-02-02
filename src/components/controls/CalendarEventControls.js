import { useState } from "react";
import CreateEventModal from "../events/CreateEventModal";
import Button from "./Button";

const CalendarEventControls = ({ reloadEvents }) => {
  const [createNewEventModalIsOpen, setCreateNewEventModalIsOpen] =
    useState(false);

  function openModal() {
    setCreateNewEventModalIsOpen(true);
  }

  function closeModal() {
    setCreateNewEventModalIsOpen(false);
  }
  return (
    <div className="space-x-4">
      <Button onClick={openModal} className="bg-blue-700" key="new-event-btn">
        Create new event
      </Button>
      <Button className="bg-blue-700" key="filter-events-btn">
        Filter events
      </Button>
      <CreateEventModal
        reloadEvents={reloadEvents}
        isOpen={createNewEventModalIsOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default CalendarEventControls;
