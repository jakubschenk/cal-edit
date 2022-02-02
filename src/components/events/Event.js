import { useState } from "react";
import cn from "classnames";

const Event = ({ event, index, edit }) => {
  const [isOpen, setIsOpen] = useState(false);

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
  if (event) {
    return (
      <div
        key={event.summary + (event.start.date || event.start.dateTime)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {event.start.date
            ? event.start.date
            : parseDateToMakeSense(event.start.dateTime, event.end.dateTime)}
        </span>
        <div className="border-2 border-purple-500 rounded-md p-2 transition-all w-full cursor-pointer">
          <div className="flex flex-row pb-1 w-full justify-between">
            <span
              className={cn(
                "text-2xl",
                isOpen &&
                  (event.description || event.location) &&
                  "border-b-2 border-black"
              )}
            >
              {event.summary}
            </span>
            {isOpen && <button onClick={() => edit(index)}>Edit</button>}
          </div>
          {isOpen && (event.description || event.location) && (
            <div className="mt-2">
              <p>{event.description}</p>
              <p>{event.location}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Event;
