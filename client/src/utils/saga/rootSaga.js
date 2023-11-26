import { all } from "redux-saga/effects";
import { librarySaga } from "./librarySaga";
import { homeSaga } from "./homeSaga";
import { playlistSaga } from "./playlistSaga";
import { searchSaga } from "./searchSaga";

export default function* rootSaga() {
	yield all([
		librarySaga(),
		homeSaga(),
		playlistSaga(),
		searchSaga(),
	]);
}