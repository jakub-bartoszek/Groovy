import { put, call, takeLatest } from 'redux-saga/effects';
import { fetchPlaylist, setPlaylist } from '../redux/playlistSlice';
import { getPlaylist } from './getPlaylist';

function* fetchPlaylistHandler(accessToken, id) {
  try {
    const playlist = yield call(getPlaylist, accessToken.payload.accessToken, accessToken.payload.id);
    yield put(setPlaylist(playlist));
  }
  catch (error) {
    yield call(alert, "Something went wrong!");
  }
}


export function* playlistSaga() {
  yield takeLatest(fetchPlaylist.type, fetchPlaylistHandler);

}
