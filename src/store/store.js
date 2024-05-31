import { configureStore } from "@reduxjs/toolkit";

import { authSlice, uiSlice, calendarSlice } from "./";

export const store = configureStore({
  reducer: {
    // Here we will add reducers
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
