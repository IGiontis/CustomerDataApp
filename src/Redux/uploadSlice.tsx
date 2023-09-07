import { createSlice } from "@reduxjs/toolkit";

const initialState = { uploadedFiles: [] as File[], isClicked: false };

const testUpload = createSlice({
  name: "uploadTest",
  initialState: initialState,
  reducers: {
    setUpload(state, action) {
      state.uploadedFiles = action.payload;
    },

    setUploadClicked(state) {
      state.isClicked = true;
    },

    resetUploadClicked(state) {
      state.isClicked = false;
    },
  },
});

export const { setUpload, setUploadClicked, resetUploadClicked } = testUpload.actions;
export default testUpload.reducer;
