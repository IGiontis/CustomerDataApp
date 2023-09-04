import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { setCustomers } from "../customerSlice";
import { startLoading, stopLoading } from "../loaderSlice";

function fetchData() {
  return fetch("http://localhost:8080/Facade/cust/getAll");
}

function* fetchCustomersSaga(): any {
  try {
    console.log("fetched");
    yield put(startLoading());
    const response = yield call(fetchData);
    const data = yield response.json();

    yield put(setCustomers(data));
    yield put(stopLoading());
    console.log("stopped fetching data and loading");
  } catch (error) {
    yield put(stopLoading());

    console.error("this is the error of saga");
  }
}

function* test(): any {
  yield console.log("test");
}

export function* watchFetchCustomers() {
  yield takeEvery("FETCH_CUSTOMERS", fetchCustomersSaga);
  yield takeEvery("testaki", test);
}
