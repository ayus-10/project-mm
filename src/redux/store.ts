import { configureStore } from "@reduxjs/toolkit";
import { authenticatedUserSlice } from "./slices/authenticatedUserSlice";

export const store = configureStore({
  reducer: {
    authenticatedUserSlice: authenticatedUserSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
