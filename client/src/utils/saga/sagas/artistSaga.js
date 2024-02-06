import { put, call, takeLatest, delay } from 'redux-saga/effects';
import { fetchArtist, setArtist, setArtistTracks, setStatus } from '../../redux/artistSlice';
import { getArtist } from '../getFunctions/getArtist';
import { getArtistTracks } from '../getFunctions/getArtistTracks';

function* fetchArtistHandler({ payload }) {
 try {
  yield put(setStatus("loading"));
  const artist = yield call(getArtist, payload.accessToken, payload.id);
  const tracks = yield call(getArtistTracks, payload.accessToken, payload.id);
  yield put(setArtist(artist));
  yield put(setArtistTracks(tracks));
  yield delay(500);
  yield put(setStatus("success"));

 }
 catch (error) {
  yield put(setStatus("error"));
 }
}



export function* artistSaga() {
 yield takeLatest(fetchArtist.type, fetchArtistHandler);
}
