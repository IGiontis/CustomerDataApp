import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fetchErrorHandler: false,
  errorMessage: "",
};

const fetchError = createSlice({
  name: "fetchDataError",
  initialState: initialState,
  reducers: {
    toggleFetchError(state, action) {
      // state.fetchErrorHandler =
      //   action.payload !== undefined ? action.payload : !state.fetchErrorHandler;
      state.fetchErrorHandler = action.payload;
    },

    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
  },
});

export const { toggleFetchError, setErrorMessage } = fetchError.actions;
export default fetchError.reducer;
