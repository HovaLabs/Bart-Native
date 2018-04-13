import { Actions } from 'react-native-router-flux';

import { SELECT_STATION, STATION_INFO_UPDATED } from './types';

export const selectStation = json => ({
  type: SELECT_STATION,
  payload: json,
});

export const stationInfoUpdated = json => ({
  type: STATION_INFO_UPDATED,
  payload: json,
});
