import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
  name: "edit",
  initialState: null,
  reducers: {
    selectCustomer(state, action) {
      return action.payload;
    },
  },
});

export const { selectCustomer } = editSlice.actions;

export default editSlice.reducer;
