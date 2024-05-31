import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    addEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onDeleteEvent: (state, { payload }) => {
      state.events = state.events.filter((event) => event.id !== payload);
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
    onLoadEvents: (state, { payload }) => {
      state.isLoadingEvents = false;
      payload.forEach((event) => {
        const exist = state.events.some((e) => e.id === event.id);
        if (!exist) state.events.push(event);
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});
export const {
  addEvent,
  onDeleteEvent,
  onUpdateEvent,
  onSetActiveEvent,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions;
