import { all } from "redux-saga/effects";
import { watchFetchCustomers } from "./customerSaga";
import watchEditCustomer from "./editCustomerSaga";
import watchDeleteCustomer from "./deleteCustomerSaga";
import watchAddCustomer from "./addCustomerSaga";

function* rootSaga() {
  yield all([
    watchFetchCustomers(),
    watchEditCustomer(),
    watchDeleteCustomer(),
    watchAddCustomer(),
  ]);
}

export default rootSaga;
