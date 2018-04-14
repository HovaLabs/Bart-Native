import { UPDATE_LOCATION } from '../actions/types';
import stationList from '../defaultStationList';

const INITIAL_STATE = {
  location: null,
  locationLastUpdated: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return { ...state, location: action.payload, locationLastUpdated: new Date().getTime() };
    default:
      return state;
  }
};
