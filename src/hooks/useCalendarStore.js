import { useDispatch, useSelector } from "react-redux";
import {
  addEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onDeleteEvent,
} from "../store";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();
  const setActiveEvent = (event) => dispatch(onSetActiveEvent(event));
  const startSavingEvent = async (calendarEvent) => {
    //Todo:llegar a la base de datos

    //todo bien
    if (calendarEvent._id) {
      //actualizar
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      dispatch(addEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };
  const startDeletingEvent = (id) => {
    dispatch(onDeleteEvent(id));
  };

  return {
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
