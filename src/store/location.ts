import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Tlocation = {
  location: string;
};

const initialState: Tlocation = {
  location: "/",
};

const locationSlice = createSlice({
  name: "location",
  initialState: initialState,
  reducers: {
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
