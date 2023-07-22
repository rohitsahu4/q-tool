import { parse } from "papaparse";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { newQuery } from "../history/historySlice";
import { newTabAdded } from "../tabs/tabslice";

const urls = {
  regular:
    "https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/csv/products.csv",
  large:
    "https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/csv/orders.csv",
};

const sendSQLRequestEffect = async (
  { isLarge, isError, id, query, title },
  thunkApi
) => {
  const start = window.performance.now();

  const url = urls[isLarge ? "large" : "regular"];
  const response = await fetch(url);
  const text = await response.text();
  const { data } = await parse(text);
  const end = window.performance.now();

  const timeTaken = end - start;
  const historyItem = { id, query, title, timeTaken };
  thunkApi.dispatch(newQuery(historyItem));
  if (isError) {
    return thunkApi.rejectWithValue({
      id,
      timeTaken: end - start,
      message:
        "THE OPERAND OF AN AGGREGATE FUNCTION INCLUDES AN AGGREGATE FUNCTION, AN OLAP SPECIFICATION, OR A SCALAR FULLSELECT",
    });
  } else {
    return thunkApi.fulfillWithValue({ id, timeTaken: end - start, data });
  }
};

export const sendSQLRequest = createAsyncThunk(
  "query/send",
  sendSQLRequestEffect
);

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    querries: {},
    isSidebarOpen: true,
  },
  reducers: {
    sidebarVisibilityChanged: (state, { payload }) => {
      state.isSidebarOpen = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      sendSQLRequest.pending,
      (
        state,
        {
          meta: {
            arg: { id },
          },
        }
      ) => {
        if (!state.querries[id]) state.querries[id] = {};
        state.querries[id].isLoading = true;
        state.querries[id].result = null;
        state.querries[id].error = null;
        state.querries[id].timeTaken = null;
      }
    );
    builder.addCase(
      sendSQLRequest.fulfilled,
      (
        state,
        {
          payload: { data, timeTaken },
          meta: {
            arg: { id },
          },
        }
      ) => {
        if (!state.querries[id]) state.querries[id] = {};
        state.querries[id].isLoading = false;
        state.querries[id].result = data;
        state.querries[id].timeTaken = timeTaken;
      }
    );
    builder.addCase(
      sendSQLRequest.rejected,
      (
        state,
        {
          payload: { message, timeTaken },
          meta: {
            arg: { id },
          },
        }
      ) => {
        if (!state.querries[id]) state.querries[id] = {};
        state.querries[id].isLoading = false;
        state.querries[id].error = message;
        state.querries[id].timeTaken = timeTaken;
      }
    );
  },
});

export const { sidebarVisibilityChanged } = counterSlice.actions;

export const openPreffiledTab =
  ({ title, query }) =>
  (dispatch) => {
    dispatch(newTabAdded({ title, query }));
  };

export default counterSlice.reducer;
export const getIsSidebarOpen = (state) => state.query.isSidebarOpen;
export const getResult = (state, id) => state.query.querries[id]?.result;
export const getIsLoading = (state, id) => state.query.querries[id]?.isLoading;
export const getTimeTaken = (state, id) => state.query.querries[id]?.timeTaken;
export const getError = (state, id) => state.query.querries[id]?.error;
export const getFormattedData = createSelector(getResult, (data) => {
  if (!data) return {};
  const [columnRow, ...dataRows] = data;
  const columns = columnRow.map((columnNames) => ({
    title: columnNames,
    dataIndex: columnNames,
    key: columnNames,
  }));
  const formattedRows = dataRows.map((dataRow) =>
    columnRow.reduce(
      (res, fieldName, index) => ({
        ...res,
        [fieldName]: dataRow[index],
        key: dataRow[0],
      }),
      {}
    )
  );
  return { columns, data: formattedRows };
});
