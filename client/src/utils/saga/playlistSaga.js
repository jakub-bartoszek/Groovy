import { put, call, takeLatest, delay } from 'redux-saga/effects';
import { fetchLikedSongs, fetchPlaylist, setLikedSongs, setPlaylist, setStatus } from '../redux/playlistSlice';
import { getPlaylist } from './getPlaylist';
import { getLikedSongs } from './getLikedSongs';

function* fetchPlaylistHandler(accessToken, id) {
	try {
		yield put(setStatus("loading"));
		const playlist = yield call(getPlaylist, accessToken.payload.accessToken, accessToken.payload.id);
		yield put(setPlaylist(playlist));
		yield delay(500);
		yield put(setStatus("success"));

	}
	catch (error) {
		yield put(setStatus("error"));
	}
}

function* fetchLikedSongsHandler(accessToken) {
	try {
		yield put(setStatus("loading"));
		const likedSongs = yield call(getLikedSongs, accessToken.payload);
		yield put(setLikedSongs(likedSongs));
		yield delay(500);
		yield put(setStatus("success"));
	}
	catch (error) {
		yield put(setStatus("error"));
	}
}


export function* playlistSaga() {
	yield takeLatest(fetchPlaylist.type, fetchPlaylistHandler);
	yield takeLatest(fetchLikedSongs.type, fetchLikedSongsHandler);
}
