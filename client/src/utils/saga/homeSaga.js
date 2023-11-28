import { put, call, takeLatest, delay } from 'redux-saga/effects';
import { fetchRecentlyPlayed, setRecentlyPlayed, setStatus } from '../redux/homeSlice';
import { getRecentlyPlayed } from './getRecentlyPlayed';

function* fetchRecentlyPlayedHandler(accessToken) {
	try {
		yield put(setStatus("loading"));
		const recentlyPlayed = yield call(getRecentlyPlayed, accessToken.payload);
		yield put(setRecentlyPlayed(recentlyPlayed));
		yield delay(500);
		yield put(setStatus("success"));
	}
	catch (error) {
		yield put(setStatus("error"));
	}
}

export function* homeSaga() {
	yield takeLatest(fetchRecentlyPlayed.type, fetchRecentlyPlayedHandler);

}
