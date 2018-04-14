import { Actions } from 'react-native-router-flux';

import { UPDATE_LOCATION } from './types';

export const updateLocation = json => ({
  type: UPDATE_LOCATION,
  payload: json,
});
