import { AsyncStorage } from 'react-native';
import { delay } from 'redux-saga';
import { put, takeEvery, takeLatest, all, call } from 'redux-saga/effects';

import distance from 'gps-distance';

import {
  UPDATE_DEVICE_LOCATION,
  UPDATE_SAVED_STATE,
  SELECT_STATION,
  UPDATE_STATION_ETDS,
  UPDATE_STATION_DIRECTION,
  PING_STATION,
} from './types';

function setDistance(station, userLocation) {
  const distanceFromDevice = Number(distance(
    Number(station.latitude),
    Number(station.longitude),
    userLocation.coords.latitude,
    userLocation.coords.longitude,
  )).toFixed(1);

  return { ...station, distanceFromDevice };
}

function* pingStation(action) {
  try {
    const stationUrl = `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${
      action.payload
    }&key=MW9S-E7SL-26DU-VV8V&json=y`;
    const body = yield fetch(stationUrl);
    const stationInfo = yield body.json();
    const payload = stationInfo.root.station[0].etd;
    yield put({ type: UPDATE_STATION_ETDS, payload });
  } catch (ex) {
    console.log('nope', ex);
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
  savedState.stationList = savedState.stationList.map((station) => {
    if (station.abbr === action.payload.abbr) {
      return { ...station, visits: station.visits + 1 };
    }
    return station;
  });

  yield AsyncStorage.setItem('appData', JSON.stringify(savedState));
  yield call(delay, 500); // Hide new favorite until new page animation is complete
  yield put({ type: UPDATE_SAVED_STATE, payload: savedState });
}

function* watchSelectStation() {
  yield takeEvery(SELECT_STATION, selectStation);
}

function* updateDeviceLocation(action) {
  const savedStateString = yield AsyncStorage.getItem('appData');
  const savedState = JSON.parse(savedStateString);

  savedState.stationList = savedState.stationList.map(station =>
    setDistance(station, action.payload));

  yield AsyncStorage.setItem('appData', JSON.stringify(savedState));
  yield put({ type: UPDATE_SAVED_STATE, payload: savedState });
}

function* watchUpdateDeviceLocation() {
  yield takeEvery(UPDATE_DEVICE_LOCATION, updateDeviceLocation);
}

function* updateStationDirection(action) {
  const { abbr, direction } = action.payload;

  const savedStateString = yield AsyncStorage.getItem('appData');
  const savedState = JSON.parse(savedStateString);

  let updated = false;
  savedState.stationList = savedState.stationList.map((station) => {
    if (station.abbr === abbr) {
      if (station.direction !== direction) {
        updated = true;
      }
      return { ...station, direction };
    }
    return station;
  });

  if (updated) {
    yield AsyncStorage.setItem('appData', JSON.stringify(savedState));
    yield put({ type: UPDATE_SAVED_STATE, payload: savedState });
  }
}

function* watchUpdateStationDirection() {
  yield takeEvery(UPDATE_STATION_DIRECTION, updateStationDirection);
}

export default function* rootSaga() {
  yield all([
    watchPingStation(),
    watchSelectStation(),
    watchUpdateDeviceLocation(),
    watchUpdateStationDirection(),
  ]);
}
