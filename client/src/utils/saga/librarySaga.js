import { put, call, takeLatest } from 'redux-saga/effects';
import { getPlaylists } from './getPlaylists';
import { fetchPlaylists, setPlaylists } from '../redux/librarySlice';

function* fetchPlaylistsHandler(accessToken) {
  try {
    const playlists = yield call(getPlaylists, accessToken.payload);
    yield put(setPlaylists(playlists));

  }
  catch (error) {
    yield call(alert, "Something went wrong!");
  }
}

export function* librarySaga() {
  yield takeLatest(fetchPlaylists.type, fetchPlaylistsHandler);
}
