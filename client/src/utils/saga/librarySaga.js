import { put, call, takeLatest, delay } from 'redux-saga/effects';
import { getPlaylists } from './getPlaylists';
import { fetchPlaylists, fetchTopArtists, fetchTopTracks, setPlaylists, setStatus, setTopArtists, setTopTracks } from '../redux/librarySlice';
import { getTopArtists } from './getTopArtists';
import { getTopTracks } from './getTopTracks';

function* fetchPlaylistsHandler(accessToken) {
	try {
		yield put(setStatus("loading"));
		const playlists = yield call(getPlaylists, accessToken.payload);
		yield put(setPlaylists(playlists));
		yield delay(500);
		yield put(setStatus("success"));
	}
	catch (error) {
		yield put(setStatus("error"));
	}
}

function* fetchTopArtistsHandler(accessToken) {
	try {
		yield put(setStatus("loading"));
		const topArtists = yield call(getTopArtists, accessToken.payload);
		yield put(setTopArtists(topArtists));
		yield delay(500);
		yield put(setStatus("success"));
	}
	catch (error) {
		yield put(setStatus("error"));
	}
}

function* fetchTopTracksHandler(accessToken) {
	try {
		yield delay(500);
		yield put(setStatus("loading"));
		const topTracks = yield call(getTopTracks, accessToken.payload);
		yield put(setTopTracks(topTracks));
		yield put(setStatus("success"));
	}
	catch (error) {
		yield put(setStatus("error"));
	}
}

export function* librarySaga() {
	yield takeLatest(fetchPlaylists.type, fetchPlaylistsHandler);
	yield takeLatest(fetchTopArtists.type, fetchTopArtistsHandler);
	yield takeLatest(fetchTopTracks.type, fetchTopTracksHandler);
}
