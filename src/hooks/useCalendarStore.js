import { useDispatch, useSelector } from "react-redux";
import {
  addEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
} from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const setActiveEvent = (event) => dispatch(onSetActiveEvent(event));
  const startSavingEvent = async (calendarEvent) => {

    try {
      console.log("calendarEvent",calendarEvent);
      if (calendarEvent?.id) {
        //actualizar
        await calendarApi.put(`/event/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent }));
        return;
      }
      const { data } = await calendarApi.post("/event", calendarEvent);
      console.log("data",data);
      dispatch(addEvent({ ...calendarEvent, id: data.event.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };
  const startDeletingEvent = async (id) => {
    try {
      await calendarApi.delete(`/event/${activeEvent.id}`);
      dispatch(onDeleteEvent(id));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al borrar", error.response.data.msg, "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/event");
      const events = convertEventsToDateEvents(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
