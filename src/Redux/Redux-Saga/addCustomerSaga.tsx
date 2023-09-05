import { call, put, takeLatest } from "redux-saga/effects";
import { addCustomerSuccess } from "../customerSlice";
import { closeModal } from "../modalSlice";
import { setErrorMessage, toggleFetchError } from "../errorSlice";
import { startLoading, stopLoading } from "../loaderSlice";
import { setIsFetched } from "../isFetched";
import { ADD_CUSTOMER } from "./ActionTypes/ActionTypes";

function* addCustomerSaga(customerData: any): Generator<any, void, any> {
  console.log(customerData);
  const customerDataSaga = customerData.payload;
  try {
    yield put(startLoading());
    // yield put(startLoading());
    const response = yield call(fetch, "http://localhost:8080/Facade/cust/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerDataSaga),
    });

    if (response.ok) {
      const responseData = yield response.json();
      yield put(addCustomerSuccess(responseData));
      yield put(closeModal());
      yield put(toggleFetchError(false));
      //   navigate("/customers/list");
    } else {
      console.error("Error saving customer data");
      throw new Error(`Server responded with an error ${response.status}`);
    }
  } catch (error: any) {
    const errorMessage = "Failed to save customer data";
    yield put(setErrorMessage(errorMessage));
    yield put(toggleFetchError(true));
    yield put(setIsFetched(false));
  } finally {
    yield put(stopLoading());
  }
}

export default function* watchAddCustomer() {
  yield takeLatest(ADD_CUSTOMER, addCustomerSaga);
}
