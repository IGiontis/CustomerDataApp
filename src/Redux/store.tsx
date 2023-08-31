import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customerSlice"; // i can name it whatever i want
import modalReducer from "./modalSlice";
import toggleFetchErrorReducer from "./errorSlice";
import editReducer from "./editSlice";
import isFetchedReducer from "./isFetched";

const store = configureStore({
  reducer: {
    customers: customerReducer,
    modal: modalReducer,
    fetchDataError: toggleFetchErrorReducer,
    edit: editReducer,
    isFetched: isFetchedReducer,
  },
});

export default store;

// This helps me for autocomplete variables also infers to the types of the redux so i don't need to use any
export type RootState = ReturnType<typeof store.getState>;
