import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

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

export const pingStation = station => ({
  type: PING_STATION,
  payload: station,
});

export const updateDeviceLocation = json => ({
  type: UPDATE_DEVICE_LOCATION,
  payload: json,
});

export const loadSavedState = json => ({
  type: LOAD_SAVED_STATE,
  payload: json,
});

export const updateSavedState = json => ({
  type: UPDATE_SAVED_STATE,
  payload: json,
});

export const selectStation = payload => ({
  type: SELECT_STATION,
  payload,
});

export const updateStationEtds = json => ({
  type: UPDATE_STATION_ETDS,
  payload: json,
});

export const updateStationDirection = (abbr, direction) => ({
  type: UPDATE_STATION_DIRECTION,
  payload: {
    abbr,
    direction,
  },
});

export const updateStationListFilter = filter => ({
  type: UPDATE_STATION_LIST_FILTER,
  payload: filter,
});
