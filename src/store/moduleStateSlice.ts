import { createSlice } from "@reduxjs/toolkit";

export interface ImoduleState {
  isSlected: "Model" | "Fabrication" | "Schedule" | "none";
}

const initialState: ImoduleState = {
  isSlected: "Model",
};

const moduleStateSlice = createSlice({
  name: "moduleState",
  initialState: initialState,
  reducers: {
    setModelState(state) {
      state.isSlected = "Model";
    },
    setFabricationState(state) {
      state.isSlected = "Fabrication";
    },
    setScheduleState(state) {
      state.isSlected = "Schedule";
    },
    setNoneState(state) {
      state.isSlected = "none";
    },
  },
});

export const {
  setModelState,
  setFabricationState,
  setScheduleState,
  setNoneState,
} = moduleStateSlice.actions;
export default moduleStateSlice.reducer;
