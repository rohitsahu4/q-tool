import { configureStore } from "@reduxjs/toolkit";
import querySlice from "./querries/querySlice";
import tabslice from "./tabs/tabslice";
import historySlice from "./history/historySlice";
import savedSlice from "./saved/savedSlice";

export default configureStore({
  reducer: {
    query: querySlice,
    history: historySlice,
    tabs: tabslice,
    saved: savedSlice,
  },
});
