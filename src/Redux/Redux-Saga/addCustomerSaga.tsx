import { call, put, takeLatest } from "redux-saga/effects";
import { addCustomerSuccess } from "../customerSlice";
import { closeModal } from "../modalSlice";
import { setErrorMessage, toggleFetchError } from "../errorSlice";
import { startLoading, stopLoading } from "../loaderSlice";
import { ADD_CUSTOMER } from "./ActionTypes/ActionTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import CustomerType from "../../interfaces/customerTypes";
// import axios, { AxiosResponse } from "axios";

function* addCustomerSaga(customerData: PayloadAction<CustomerType>): Generator<any, void, any> {
  const customerDataSaga = customerData.payload;
  try {
    yield put(startLoading());

    // Create a new FormData object
    const formData = new FormData();

    // Append the serialized customerData as "customerData"
    formData.append("customerData", JSON.stringify(customerDataSaga));

    // Append the file as "file_0"

    if (customerDataSaga.content) {
      formData.append("file_0", customerDataSaga.content);
    }

    const response = yield call(fetch, "http://localhost:8080/Facade/cust/save", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const responseData = yield response.json();
      yield put(addCustomerSuccess(responseData));
      yield put(closeModal());
      yield put(toggleFetchError(false));
      //   navigate("/customers/list");
    } else {
      throw new Error(`Server responded with an error ${response.status}`);
    }
  } catch (error: any) {
    const errorMessage = "Failed to save customer data";
    yield put(setErrorMessage(errorMessage));
    yield put(toggleFetchError(true));
  } finally {
    yield put(stopLoading());
  }
}

export default function* watchAddCustomer() {
  yield takeLatest(ADD_CUSTOMER, addCustomerSaga);
}
