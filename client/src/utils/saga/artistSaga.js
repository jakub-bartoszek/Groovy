import { put, call, takeLatest, delay } from 'redux-saga/effects';
import { fetchArtist, fetchArtistTracks, setArtist, setArtistTracks, setStatus } from '../redux/artistSlice';
import { getArtist } from './getArtist';
import { getArtistTracks } from './getArtistTracks';

function* fetchArtistHandler(accessToken, id) {
 try {
  yield put(setStatus("loading"));
  const artist = yield call(getArtist, accessToken.payload.accessToken, accessToken.payload.id);
  const tracks = yield call(getArtistTracks, accessToken.payload.accessToken, accessToken.payload.id);
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
