import { put, call, delay, takeLatest } from 'redux-saga/effects';
import { fetchSearchResults, setSearchResults, setStatus } from '../redux/searchSlice';
import { getSearchResults } from './getSearchResults';

function* fetchSearchResultsHandler({ payload }) {
  try {
    yield put(setStatus("loading"));
    yield delay(500);
    const searchResults = yield call(getSearchResults, payload.accessToken, payload.searchQuery, payload.category);
    yield put(setSearchResults(searchResults));
    yield put(setStatus("success"));
  }
  catch (error) {
    yield put(setStatus("error"));
  }
}

export function* searchSaga() {
  yield takeLatest(fetchSearchResults.type, fetchSearchResultsHandler);
}
