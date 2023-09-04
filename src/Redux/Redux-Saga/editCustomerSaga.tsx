import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { updateCustomer } from "../customerSlice";
import { closeModal } from "../modalSlice";

function* editCustomerSaga(action: any): Generator<any, void, any> {
  try {
    const { name, surname, address, id } = action.payload;

    const editedCustomer = {
      name,
      surname,
      address,
    };

    const response = yield call(fetch, `http://localhost:8080/Facade/cust/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedCustomer),
    });

    if (response.ok) {
      const responseData = yield response.json();
      yield put(updateCustomer(responseData));
      yield put(closeModal());
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* watchEditCustomer() {
  yield takeEvery("EDIT_CUSTOMERS", editCustomerSaga);
}
