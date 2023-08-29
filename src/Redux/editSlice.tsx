import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
  name: "edit",
  initialState: null,
  reducers: {
    selectCustomer(state, action) {
      console.log(action.payload);
      return action.payload;
    },
    clearSelectedCustomer(state) {
      return null;
    },
  },
});

export const { selectCustomer, clearSelectedCustomer } = editSlice.actions;

export default editSlice.reducer;
