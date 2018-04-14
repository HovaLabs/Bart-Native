import { Actions } from 'react-native-router-flux';

import {
  SELECT_STATION,
  STATION_INFO_UPDATED,
  UPDATE_STATION_ORDER,
  UPDATE_DEVICE_LOCATION,
} from './types';

export const selectStation = json => ({
  type: SELECT_STATION,
  payload: json,
});

export const stationInfoUpdated = json => ({
  type: STATION_INFO_UPDATED,
  payload: json,
});

export const updateStationOrder = order => ({
  type: UPDATE_STATION_ORDER,
  payload: order,
});

export const updateDeviceLocation = json => ({
  type: UPDATE_DEVICE_LOCATION,
  payload: json,
});
