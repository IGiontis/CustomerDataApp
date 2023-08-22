import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fetchErrorHandler: false,
};

const fetchError = createSlice({
  name: "fetchDataError",
  initialState: initialState,
  reducers: {
    toggleFetchError(state, action) {
      state.fetchErrorHandler =
        action.payload !== undefined ? action.payload : !state.fetchErrorHandler;
      console.log(state.fetchErrorHandler);
    },
  },
});

export const { toggleFetchError } = fetchError.actions;
export default fetchError.reducer;
