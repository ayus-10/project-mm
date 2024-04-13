import { configureStore } from "@reduxjs/toolkit";
import showMenuReducer from "./slices/showMenuSlice";

export const store = configureStore({
  reducer: {
    showMenu: showMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
