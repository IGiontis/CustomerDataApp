import { call, put, takeLatest } from "redux-saga/effects";
import { updateCustomer } from "../customerSlice";
import { closeModal } from "../modalSlice";
import { startLoading, stopLoading } from "../loaderSlice";
import { EDIT_CUSTOMERS, UPLOAD_FILE_CUSTOMER } from "./ActionTypes/ActionTypes";
import { setErrorMessage } from "../errorSlice";
import { setIsFetched } from "../isFetched";

interface EditCustomerAction {
  type: typeof EDIT_CUSTOMERS;
  payload: {
    name: string;
    surname: string;
    address: string;
    id: number;
    uploadFile?: File;
  };
}

function* uploadFileCustomerSaga(action: EditCustomerAction): Generator<any, void, any> {
  try {
    yield put(startLoading());
    const { name, surname, address, id, uploadFile } = action.payload;

    const editedCustomer = {
      ...action.payload,
      name,
      surname,
      address,
      uploadFile,
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
      // Here i send to the edit the hole object  of a single customer

      yield put(updateCustomer(responseData));
      yield put(closeModal());
    }
  } catch (error) {
    const errorMessage = "Something went wrong while updating customer, please try again";
    yield put(setErrorMessage(errorMessage));
    yield put(setIsFetched(false));
  } finally {
    yield put(stopLoading());
  }
}

export default function* watchEditCustomer() {
  yield takeLatest(UPLOAD_FILE_CUSTOMER, uploadFileCustomerSaga);
}
