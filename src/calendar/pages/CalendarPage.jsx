import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from "../components";

import { localizer, getMessagesEs } from "../../helpers";
import { useEffect, useState } from "react";
import { useCalendarStore, useUiStore } from "../../hooks";
import { useAuthStore } from "../../hooks/useAuthStore";

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log("event", event);
    console.log(user);
    const isMyEvent =
      user.uuid === event.user._id || user.uuid === event.user.uuid;
    console.log("isMyEvent", isMyEvent);
    const style = {
      backgroundColor: isMyEvent ? "#367CF7" : "#465660",
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
    openDateModal();
  };
  const onSelect = (e) => {
    console.log({ click: e });
    setActiveEvent(e);
  };
  const onViewChanged = (e) => {
    console.log({ viewChanged: e });
    localStorage.setItem("lastView", e);
    setLastView(e);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

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
      <FabDelete />
      <FabAddNew />
    </div>
  );
};
