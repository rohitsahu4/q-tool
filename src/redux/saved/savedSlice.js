import { createSlice } from "@reduxjs/toolkit";

const getSavedFromLocalStorage = () => {
  const storedHistory = window.localStorage.getItem("saved");
  if (storedHistory) {
    return JSON.parse(storedHistory);
  }
  return [
    {
      query: "SELECT * FROM Products;",
      title: "Normal Query",
      id: 94359.0023263187,
    },
    {
      query: "SELECT * from Large_table;",
      title: "Query with large data",
      id: 51173.45928624022,
    },
    {
      query: "SELECT * from WRONG_TABLE;",
      title: "Query with error",
      id: 75582.0935343729,
    },
  ];
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
