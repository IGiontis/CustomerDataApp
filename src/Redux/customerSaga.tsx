import { call, put, takeLatest } from "redux-saga/effects";
import { setCustomers } from "./customerSlice";

function fetchData() {
  return fetch("http://localhost:8080/Facade/cust/getAll");
}

export function* fetchCustomersSaga(): Generator<any, void, any> {
  try {
    const response = yield call(fetchData);
    const data = yield response.json();

    yield put(setCustomers(data));
  } catch (error) {
    console.error("this is the error of saga");
  }
}

export function* watchFetchCustomers() {
  yield takeLatest("customers/setCustomers", fetchCustomersSaga); // Replace "yourTriggerActionType" with the actual action type that triggers the saga.
}
