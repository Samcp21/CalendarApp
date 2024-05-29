import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { addHours } from "date-fns";
import { CalendarEvent, CalendarModal, Navbar } from "../components";

import { localizer, getMessagesEs } from "../../helpers";
import { useState } from "react";

const events = [
  {
    _id: new Date().getTime(),
    title: "My event",
    notes: "This is my event",
    start: new Date(),
    end: addHours(new Date(), 1),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "Luis",
      lastName: "Perez",
    },
  },
];
export const CalendarPage = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };

  const onDoubleClick = (e) => {
    console.log({ onDoubleClick: e });
  };
  const onSelect = (e) => {
    console.log({ click: e });
  };
  const onViewChanged = (e) => {
    console.log({ viewChanged: e });
    localStorage.setItem("lastView", e);
    setLastView(e);
  };

  return (
    <div>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
    </div>
  );
};
