import { call, put, takeEvery } from "redux-saga/effects";

function* testarious(): any {
  yield console.warn("my new test saga works");
}

export default function* watcherTest() {
  yield takeEvery("paok", testarious);
}
