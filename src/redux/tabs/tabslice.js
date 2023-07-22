import { createSlice } from "@reduxjs/toolkit";
import { savedQuery } from "../saved/savedSlice";

const createNewTab = (state, { payload }) => {
  const randomKey = Math.random() * 100000;
  state.tabs.push({
    ...payload,
    title: payload?.title || "Query " + (state.currentTabIndex + 1),
    id: randomKey,
  });
  state.activeTabKey = randomKey;
  state.currentTabIndex = state.currentTabIndex + 1;
};

const setNewActiveTab = (state, tabIndex) => {
  const wasFirstTab = tabIndex === 0;
  const isNoTabsLeft = state.tabs.length === 0;
  if (wasFirstTab && isNoTabsLeft) {
    createNewTab(state, { payload: {} });
  } else if (wasFirstTab) {
    state.activeTabKey = state.tabs[0].id;
  } else {
    const prevTabKey = state.tabs[tabIndex - 1].id;
    state.activeTabKey = prevTabKey;
  }
};

export const tabslice = createSlice({
  name: "tabs",
  initialState: {
    tabs: [{ title: "Query 1", query: null, id: 1 }],
    activeTabKey: 1,
    currentTabIndex: 1,
    isSidebarOpen: true,
  },
  reducers: {
    newTabAdded: createNewTab,
    nextTab: (state) => {
      const currentIndex = state.tabs.findIndex(
        ({ id }) => id === state.activeTabKey
      );
      const nextIndex =
        currentIndex === state.tabs.length - 1 ? 0 : currentIndex + 1;
      state.activeTabKey = state.tabs[nextIndex].id;
    },
    previousTab: (state) => {
      const currentIndex = state.tabs.findIndex(
        ({ id }) => id === state.activeTabKey
      );
      const prevIndex =
        currentIndex === 0 ? state.tabs.length - 1 : currentIndex - 1;
      state.activeTabKey = state.tabs[prevIndex].id;
    },
    changedTab: (state, { payload }) => {
      state.activeTabKey = payload;
    },
    updateTab: (state, { payload }) => {
      const tabIndex = state.tabs.findIndex(({ id }) => id === payload.id);
      state.tabs[tabIndex] = { ...state.tabs[tabIndex], payload };
    },
    removedTab: (state, { payload }) => {
      const isActiveTab = payload === state.activeTabKey;
      let deletedIndex;

      state.tabs = state.tabs.filter(({ id }, index) => {
        const isToBeRemoved = id === payload;
        if (isToBeRemoved) {
          deletedIndex = index;
        }
        return !isToBeRemoved;
      });
      if (isActiveTab) {
        setNewActiveTab(state, deletedIndex);
      }
    },
  },
  extraReducers: {
    [savedQuery]: (state, { payload: { tabId, title } }) => {
      if (tabId) {
        const tabIndex = state.tabs.findIndex(({ id }) => id === tabId);
        state.tabs[tabIndex].title = title;
      }
    },
  },
});

export const {
  newTabAdded,
  changedTab,
  removedTab,
  updateTab,
  nextTab,
  previousTab,
} = tabslice.actions;

export default tabslice.reducer;

export const getAllTabs = (state) => state.tabs.tabs;
export const getActiveTabKey = (state) => state.tabs.activeTabKey;
