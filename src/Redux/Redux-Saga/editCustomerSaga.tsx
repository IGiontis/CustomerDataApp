import { call, put, takeLatest } from "redux-saga/effects";
import { updateCustomer } from "../customerSlice";
import { closeModal } from "../modalSlice";
import { startLoading, stopLoading } from "../loaderSlice";
import { EDIT_CUSTOMERS } from "./ActionTypes/ActionTypes";
import { setErrorMessage } from "../errorSlice";

interface EditCustomerAction {
  type: typeof EDIT_CUSTOMERS;
  payload: {
    name: string;
    surname: string;
    address: string;
    id: number;
  };
}

function* editCustomerSaga(action: EditCustomerAction): Generator<any, void, any> {
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
      console.log(`here is the response data: ${responseData}`);
      console.log(responseData);
      // Here i send to the edit the hole object  of a single customer

      // !

      // Perform your manipulations on responseData here
      responseData.someNewProperty = "New Value";
      // !
      console.log(responseData);
      yield put(updateCustomer(responseData));
      yield put(closeModal());
    }
  } catch (error) {
    console.log(error);
    const errorMessage = "Something went wrong while updating customer, please try again";
    yield put(setErrorMessage(errorMessage));
  } finally {
    yield put(stopLoading());
  }
}

export default function* watchEditCustomer() {
  yield takeLatest(EDIT_CUSTOMERS, editCustomerSaga);
}
