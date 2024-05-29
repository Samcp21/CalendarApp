import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
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
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [tempEvent],
    activeEvent: null,
  },
  reducers: {
    addEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onDeleteEvent: (state, { payload }) => {
      state.events = state.events.filter((event) => event._id !== payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) =>
        event.id === payload.id ? payload : event
      );
    },
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
  },
});
export const { addEvent, onDeleteEvent, onUpdateEvent, onSetActiveEvent } =
  calendarSlice.actions;
