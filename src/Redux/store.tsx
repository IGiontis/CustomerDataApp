import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customerSlice"; // i can name it whatever i want
import modalReducer from "./modalSlice";
import toggleFetchErrorReducer from "./errorSlice";

const store = configureStore({
  reducer: {
    customers: customerReducer,
    modal: modalReducer,
    fetchDataError: toggleFetchErrorReducer,
  },
});

export default store;
