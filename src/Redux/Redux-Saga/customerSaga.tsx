import { call, put, takeEvery } from "redux-saga/effects";
import { setCustomers } from "../customerSlice";
import { startLoading, stopLoading } from "../loaderSlice";
import { setErrorMessage, toggleFetchError } from "../errorSlice";
import { FETCH_CUSTOMERS } from "./ActionTypes/ActionTypes";

function fetchData() {
  return fetch("http://localhost:8080/Facade/cust/getAll");
}

function* fetchCustomersSaga(): any {
  try {
    yield put(startLoading());
    const response = yield call(fetchData);

    const data = yield response.json();
    yield put(setCustomers(data));
  } catch (error) {
    const customErrorMessage = "Fetch data failed, try again";
    yield put(setErrorMessage(customErrorMessage));
    yield put(toggleFetchError(true));
  } finally {
    yield put(stopLoading());
  }
}

export function* watchFetchCustomers() {
  yield takeEvery(FETCH_CUSTOMERS, fetchCustomersSaga);
}
