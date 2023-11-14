import { put, call, takeLatest } from 'redux-saga/effects';
import { fetchLikedSongs, fetchPlaylist, setLikedSongs, setPlaylist } from '../redux/playlistSlice';
import { getPlaylist } from './getPlaylist';
import { getLikedSongs } from './getLikedSongs';

function* fetchPlaylistHandler(accessToken, id) {
  try {
    const playlist = yield call(getPlaylist, accessToken.payload.accessToken, accessToken.payload.id);
    yield put(setPlaylist(playlist));
  }
  catch (error) {
    yield call(alert, "Something went wrong!");
  }
}

function* fetchLikedSongsHandler(accessToken) {
  try {
    const likedSongs = yield call(getLikedSongs, accessToken.payload);
    yield put(setLikedSongs(likedSongs));
  }
  catch (error) {
    yield call(alert, "Something went wrong!");
  }
}


export function* playlistSaga() {
  yield takeLatest(fetchPlaylist.type, fetchPlaylistHandler);
  yield takeLatest(fetchLikedSongs.type, fetchLikedSongsHandler);
}
