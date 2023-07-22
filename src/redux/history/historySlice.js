import { createSlice } from "@reduxjs/toolkit";
import { savedQuery } from "../saved/savedSlice";

const getHistoryFromLocalStorage = () => {
  const storedHistory = window.localStorage.getItem("history");
  if (storedHistory) {
    return JSON.parse(storedHistory);
  }
  return [];
};
const historySlice = createSlice({
  name: "history",
  initialState: {
    history: getHistoryFromLocalStorage(),
  },
  reducers: {
    newQuery: (state, { payload }) => {
      state.history.unshift({
        ...payload,
        tabId: payload.id,
        id: payload.id + "-" + Math.random() * 100000,
        time: new Date().getTime(),
      });
      window.localStorage.setItem("history", JSON.stringify(state.history));
    },
  },
  extraReducers: {
    [savedQuery]: (state, { payload: { historyId, title } }) => {
      if (historyId) {
        const tabIndex = state.history.findIndex(({ id }) => id === historyId);
        state.history[tabIndex].title = title;
        window.localStorage.setItem("history", JSON.stringify(state.history));
      }
    },
  },
});
export const { newQuery } = historySlice.actions;
export const getHistory = (state) => state.history.history;

export default historySlice.reducer;
