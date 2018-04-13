import { Actions } from 'react-native-router-flux';

import { STATION_SELECTED, STATION_INFO_UPDATED } from './types';

export const stationSelected = text => ({
  type: STATION_SELECTED,
  payload: text,
});

export const stationInfoUpdated = json => ({
  type: STATION_INFO_UPDATED,
  payload: json,
});
