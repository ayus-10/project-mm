import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthenticatedUser } from "../../interfaces/IAuthenticatedUser";

const defaultState: IAuthenticatedUser = {
  email: undefined,
  fullName: undefined,
};

export const authenticatedUserSlice = createSlice({
  name: "authenticatedUserSlice",
  initialState: defaultState,
  reducers: {
    setAuthenticatedUser: (
      _state,
      action: PayloadAction<IAuthenticatedUser>,
    ) => {
      return action.payload;
    },
    unsetAuthenticatedUser: (state) => {
      state.email = null;
      state.fullName = null;
    },
  },
});

export const { setAuthenticatedUser, unsetAuthenticatedUser } =
  authenticatedUserSlice.actions;
