import { createSlice } from "@reduxjs/toolkit";

export type TsideBarState = {
  isCollapsed: boolean;
};

const initialState: TsideBarState = {
  isCollapsed: false,
};

const sideBarStateSlice = createSlice({
  name: "sideBarState",
  initialState: initialState,
  reducers: {
    setCollapsed(state) {
      state.isCollapsed = !state.isCollapsed;
    },
  },
});

export const { setCollapsed } = sideBarStateSlice.actions;
export default sideBarStateSlice.reducer;
