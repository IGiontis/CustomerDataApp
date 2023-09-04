import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux"; // Import combineReducers

import customerReducer from "./customerSlice";
import modalReducer from "./modalSlice";
import toggleFetchErrorReducer from "./errorSlice";
import editReducer from "./editSlice";
import isFetchedReducer from "./isFetched";
import createSagaMiddleware from "@redux-saga/core";
import isLoadingReducer from "./loaderSlice";
import rootSaga from "./Redux-Saga/sagaStore";

// Combine all your reducers
const rootReducer = combineReducers({
  customers: customerReducer,
  modal: modalReducer,
  fetchDataError: toggleFetchErrorReducer,
  edit: editReducer,
  isFetched: isFetchedReducer,
  isLoading: isLoadingReducer,
});

const sagaMiddleWare = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleWare],
});

sagaMiddleWare.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
