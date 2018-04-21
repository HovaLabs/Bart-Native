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
  try {
    const stationUrl = `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${
      action.payload
    }&key=MW9S-E7SL-26DU-VV8V&json=y`;
    const body = yield fetch(stationUrl);
    const payload = yield body.json();
    yield put({ type: UPDATE_STATION_ETDS, payload });
  } catch (ex) {
    // If the request fails and there is no prior data
    // loading icon?
  }
}

function* watchPingStation() {
  yield takeLatest(PING_STATION, pingStation);
}

function* selectStation(action) {
  const savedStateString = yield AsyncStorage.getItem('appData');
  const savedState = JSON.parse(savedStateString);
  savedState.stationList.forEach((station) => {
    if (station.abbr === action.payload.abbr) {
      station.visits += 1;
    }
  });

  yield AsyncStorage.setItem('appData', JSON.stringify(savedState));
  yield put({ type: UPDATE_SAVED_STATE, payload: savedState });
}

function* watchSelectStation() {
  yield takeEvery(SELECT_STATION, selectStation);
}

export default function* rootSaga() {
  yield all([watchPingStation(), watchSelectStation()]);
}
