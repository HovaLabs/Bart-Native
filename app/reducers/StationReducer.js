import { SELECT_STATION, STATION_INFO_UPDATED } from '../actions/types';
import stationList from '../stationList';

const INITIAL_STATE = {
  selectedStation: null,
  stationInfo: null,
  stationList: stationList.root.stations.station,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_STATION:
      return { ...state, stationInfo: null, selectedStation: action.payload };
    case STATION_INFO_UPDATED:
      return { ...state, stationInfo: action.payload };
    default:
      return state;
  }
};
