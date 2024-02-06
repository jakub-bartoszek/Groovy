import { put, call, takeLatest, delay } from 'redux-saga/effects';
import { fetchLikedSongs, fetchPlaylist, setLikedSongs, setPlaylist, setStatus } from '../../redux/playlistSlice';
import { getPlaylist } from '../getFunctions/getPlaylist';
import { getLikedSongs } from '../getFunctions/getLikedSongs';

function* fetchPlaylistHandler({ payload }) {
	try {
		yield put(setStatus("loading"));
		const playlist = yield call(getPlaylist, payload.accessToken, payload.id);
		yield put(setPlaylist(playlist));
		yield delay(500);
		yield put(setStatus("success"));

	}
	catch (error) {
		yield put(setStatus("error"));
	}
}

function* fetchLikedSongsHandler({ payload: accessToken }) {
	try {
		yield put(setStatus("loading"));
		const likedSongs = yield call(getLikedSongs, accessToken);
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
