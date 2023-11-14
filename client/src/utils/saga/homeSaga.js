import { put, call, takeLatest } from 'redux-saga/effects';
import { fetchRecentlyPlayed, setRecentlyPlayed } from '../redux/homeSlice';
import { getRecentlyPlayed } from './getRecentlyPlayed';

function* fetchRecentlyPlayedHandler(accessToken) {
  try {
    const recentlyPlayed = yield call(getRecentlyPlayed, accessToken.payload);
    yield put(setRecentlyPlayed(recentlyPlayed));
  }
  catch (error) {
    yield call(alert, "Something went wrong!");
  }
}

export function* homeSaga() {
  yield takeLatest(fetchRecentlyPlayed.type, fetchRecentlyPlayedHandler);

}
