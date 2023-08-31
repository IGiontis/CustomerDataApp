// isFetchedSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const isFetchedSlice = createSlice({
  name: "isFetched",
  initialState,
  reducers: {
    setIsFetched(state, action) {
      return action.payload;
    },
  },
});

export const { setIsFetched } = isFetchedSlice.actions;

export default isFetchedSlice.reducer;
