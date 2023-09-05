import { call, put, takeLatest } from "redux-saga/effects";
import { deleteCustomer } from "../customerSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { startLoading, stopLoading } from "../loaderSlice";

function* deleteCustomerSaga(customerIdPayload: PayloadAction): Generator<any, void, any> {
  const customerId = customerIdPayload.payload;
  console.log(customerIdPayload);
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
    }
  } catch (err) {
    console.log(err);
    // !! here i need to add error
  } finally {
    yield put(stopLoading());
  }
}

export default function* watchDeleteCustomer() {
  yield takeLatest("DELETE_CUSTOMERS", deleteCustomerSaga);
}
