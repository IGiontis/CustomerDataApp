import { createSlice } from "@reduxjs/toolkit";

interface ModalStateTypes {
  showModal: boolean;
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
    // toggleModal(state) {
    //   state.showModal = !state.showModal;
    // },
    openModal(state, action) {
      state.showModal = true;
      state.modalContent = action.payload;
      console.log("open worked");
    },
    closeModal(state) {
      state.showModal = false;
      state.modalContent = null;
      console.log("closed worked");
    },
    setModalContent(state, action) {
      state.modalContent = action.payload;
    },
  },
});

export const { setModalContent, openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
