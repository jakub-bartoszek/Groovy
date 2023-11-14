import { put, call, takeLatest } from 'redux-saga/effects';
import { getPlaylists } from './getPlaylists';
import { fetchPlaylists, fetchTopArtists, fetchTopTracks, setPlaylists, setTopArtists, setTopTracks } from '../redux/librarySlice';
import { getTopArtists } from './getTopArtists';
import { getTopTracks } from './getTopTracks';

function* fetchPlaylistsHandler(accessToken) {
  try {
    const playlists = yield call(getPlaylists, accessToken.payload);
    yield put(setPlaylists(playlists));
  }
  catch (error) {
    yield call(alert, "Something went wrong!");
  }
}

function* fetchTopArtistsHandler(accessToken) {
  try {
    const topArtists = yield call(getTopArtists, accessToken.payload);
    yield put(setTopArtists(topArtists));
  }
  catch (error) {
    yield call(alert, "Something went wrong!");
  }
}

function* fetchTopTracksHandler(accessToken) {
  try {
    const topTracks = yield call(getTopTracks, accessToken.payload);
    yield put(setTopTracks(topTracks));
  }
  catch (error) {
    yield call(alert, "Something went wrong!");
  }
}

export function* librarySaga() {
  yield takeLatest(fetchPlaylists.type, fetchPlaylistsHandler);
  yield takeLatest(fetchTopArtists.type, fetchTopArtistsHandler);
  yield takeLatest(fetchTopTracks.type, fetchTopTracksHandler);
}
