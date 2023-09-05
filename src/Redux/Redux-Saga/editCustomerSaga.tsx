import { call, put, takeLatest } from "redux-saga/effects";
import { updateCustomer } from "../customerSlice";
import { closeModal } from "../modalSlice";
import { startLoading, stopLoading } from "../loaderSlice";

function* editCustomerSaga(action: any): Generator<any, void, any> {
  try {
    yield put(startLoading());

    console.log(action);
    const { name, surname, address, id } = action.payload;

    const editedCustomer = {
      ...action.payload,
      name,
      surname,
      address,
    };

    console.log(editedCustomer);
    console.log(id);

    const response = yield call(fetch, `http://localhost:8080/Facade/cust/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedCustomer),
    });

    console.log(response);

    if (response.ok) {
      console.log("test");
      const responseData = yield response.json();
      yield put(updateCustomer(responseData));
      yield put(closeModal());
      yield put(stopLoading());
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* watchEditCustomer() {
  yield takeLatest("EDIT_CUSTOMERS", editCustomerSaga);
}
