import { put, call, takeLatest, delay } from 'redux-saga/effects';
import { getPlaylists } from '../getFunctions/getPlaylists';
import { fetchPlaylists, fetchTopArtists, fetchTopTracks, setPlaylists, setStatus, setTopArtists, setTopTracks } from '../../redux/librarySlice';
import { getTopArtists } from '../getFunctions/getTopArtists';
import { getTopTracks } from '../getFunctions/getTopTracks';

function* fetchPlaylistsHandler({ payload: accessToken }) {
	try {
		yield put(setStatus("loading"));
		const playlists = yield call(getPlaylists, accessToken);
		yield put(setPlaylists(playlists));
		yield delay(500);
		yield put(setStatus("success"));
	}
	catch (error) {
		yield put(setStatus("error"));
	}
}

function* fetchTopArtistsHandler({ payload: accessToken }) {
	try {
		yield put(setStatus("loading"));
		const topArtists = yield call(getTopArtists, accessToken);
		yield put(setTopArtists(topArtists));
		yield delay(500);
		yield put(setStatus("success"));
	}
	catch (error) {
		yield put(setStatus("error"));
	}
}

function* fetchTopTracksHandler({ payload: accessToken }) {
	try {
		yield delay(500);
		yield put(setStatus("loading"));
		const topTracks = yield call(getTopTracks, accessToken);
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
