import { all } from "redux-saga/effects";
import { watchFetchCustomers } from "./customerSaga";
import watcherTest from "./testakiousSaga";
import watchEditCustomer from "./editCustomerSaga";

function* rootSaga() {
  yield all([watchFetchCustomers(), watcherTest(), watchEditCustomer()]);
}

export default rootSaga;
