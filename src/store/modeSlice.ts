import { createSlice } from "@reduxjs/toolkit";
import type { ThemeMode } from "antd-style";

export type Tthememode = {
  theme: ThemeMode;
};

const initialState: Tthememode = {
  theme: "light",
};

const modeSlice = createSlice({
  name: "mode",
  initialState: initialState,
  reducers: {
    setDarkMode(state) {
      state.theme = "dark";
    },
    setLightMode(state) {
      state.theme = initialState.theme;
    },
  },
});

export const { setDarkMode, setLightMode } = modeSlice.actions;

export default modeSlice.reducer;
