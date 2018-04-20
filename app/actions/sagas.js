import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { delay } from 'redux-saga';
import { put, takeEvery, takeLatest, all, takeLeading, call } from 'redux-saga/effects';

import {
  UPDATE_DEVICE_LOCATION,
  LOAD_SAVED_STATE,
  UPDATE_SAVED_STATE,
  SELECT_STATION,
  UPDATE_STATION_ETDS,
  UPDATE_STATION_LIST_FILTER,
  UPDATE_STATION_DIRECTION,
  PING_STATION,
} from './types';

function* pingStation(action) {
  const stationUrl = `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${
    action.payload
  }&key=MW9S-E7SL-26DU-VV8V&json=y`;
  const body = yield fetch(stationUrl);
  console.log('two');
  const payload = yield body.json();
  console.log('three');
  yield put({ type: UPDATE_STATION_ETDS, payload });
}

function* watchPingStation() {
  console.log('watchin');
  yield takeLatest(PING_STATION, pingStation);
}

export default function* rootSaga() {
  yield all([watchPingStation()]);
}
