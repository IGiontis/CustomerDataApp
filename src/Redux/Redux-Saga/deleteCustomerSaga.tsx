import { call, put, takeLatest } from "redux-saga/effects";
import { deleteCustomer } from "../customerSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { startLoading, stopLoading } from "../loaderSlice";
import { setErrorMessage, toggleFetchError } from "../errorSlice";
import { setIsFetched } from "../isFetched";
import { DELETE_CUSTOMERS } from "./ActionTypes/ActionTypes";

function* deleteCustomerSaga(customerIdPayload: PayloadAction): Generator<any, void, any> {
  const customerId = customerIdPayload.payload;
  yield put(startLoading());
  try {
    const response = yield call(
      fetch,
      `http://localhost:8080/Facade/cust/deleteCustomer/${customerId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      yield put(deleteCustomer(customerId));
      yield put(toggleFetchError(false));
    }
  } catch (err) {
    const errorMessage = "Something went wrong while you were trying to delete";
    yield put(setErrorMessage(errorMessage));
    yield put(setIsFetched(false));
  } finally {
    yield put(stopLoading());
  }
}

export default function* watchDeleteCustomer() {
  yield takeLatest(DELETE_CUSTOMERS, deleteCustomerSaga);
}
