import { createSlice } from "@reduxjs/toolkit";

interface ModalStateTypes {
  showModal: boolean;
  // this one change from null and then takes values edit and add
  modalContent: string | null;
}

const initialState: ModalStateTypes = {
  showModal: false,
  modalContent: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModal(state, action) {
      state.showModal = true;
      state.modalContent = action.payload;
    },
    closeModal(state) {
      state.showModal = false;
      state.modalContent = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
