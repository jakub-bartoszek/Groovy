import { all } from "redux-saga/effects";

import { librarySaga } from "./librarySaga";

export default function* rootSaga() {
  yield all([
    librarySaga(),
  ]);
}