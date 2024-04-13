import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ShowMenuState = {
  navigation: boolean;
  profileInfo: boolean;
};

const initialState: ShowMenuState = {
  navigation: true,
  profileInfo: false,
};

const showMenuSlice = createSlice({
  name: "showMenu",
  initialState,
  reducers: {
    toggleNavigation: (state) => {
      state.navigation = !state.navigation;
    },
    toggleProfileInfo: (state) => {
      state.profileInfo = !state.profileInfo;
    },
    setNavigation: (state, action: PayloadAction<boolean>) => {
      state.navigation = action.payload;
    },
    setProfileInfo: (state, action: PayloadAction<boolean>) => {
      state.profileInfo = action.payload;
    },
  },
});

export const {
  toggleNavigation,
  toggleProfileInfo,
  setNavigation,
  setProfileInfo,
} = showMenuSlice.actions;

export default showMenuSlice.reducer;
