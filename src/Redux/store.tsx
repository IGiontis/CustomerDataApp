import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux"; // Import combineReducers

import customerReducer from "./customerSlice";
import modalReducer from "./modalSlice";
import toggleFetchErrorReducer from "./errorSlice";
import editReducer from "./editSlice";
import isFetchedReducer from "./isFetched";

// Combine all your reducers
const rootReducer = combineReducers({
  customers: customerReducer,
  modal: modalReducer,
  fetchDataError: toggleFetchErrorReducer,
  edit: editReducer,
  isFetched: isFetchedReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
