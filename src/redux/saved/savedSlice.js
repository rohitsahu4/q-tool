import { createSlice } from "@reduxjs/toolkit";

const getSavedFromLocalStorage = () => {
  const storedHistory = window.localStorage.getItem("saved");
  if (storedHistory) {
    return JSON.parse(storedHistory);
  }
  return [];
};
const savedSlice = createSlice({
  name: "saved",
  initialState: {
    saved: getSavedFromLocalStorage(),
    saveModal: null,
  },
  reducers: {
    savedQuery: (state, { payload }) => {
      state.saved.unshift({
        ...payload,
        tabId: payload.id,
        id: Math.random() * 100000,
      });
      window.localStorage.setItem("saved", JSON.stringify(state.saved));
    },
    removedQuery: (state, { payload: { id: savedId } }) => {
      state.saved = state.saved.filter(({ id }) => id !== savedId);
      window.localStorage.setItem("saved", JSON.stringify(state.saved));
    },
    saveModalOpened: (state, { payload }) => {
      state.saveModal = payload;
    },
    saveModalClosed: (state) => {
      state.saveModal = null;
    },
  },
});
export const { savedQuery, saveModalOpened, saveModalClosed, removedQuery } =
  savedSlice.actions;
export const getSaved = (state) => state.saved.saved;
export const getSaveModal = (state) => state.saved.saveModal;

export default savedSlice.reducer;
