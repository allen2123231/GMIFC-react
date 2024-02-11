import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./modeSlice";
import sideBarStateSlice from "./sideBarStateSlice";
import moduleStateSlice from "./moduleStateSlice";
import locationSlice from "./location";

const store = configureStore({
  reducer: {
    thememode: modeSlice,
    sidebarstate: sideBarStateSlice,
    moduleState: moduleStateSlice,
    locationState: locationSlice,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export default store;
