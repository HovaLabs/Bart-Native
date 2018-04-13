import { STATION_SELECTED, STATION_INFO_UPDATED } from '../actions/types';
import stationList from '../stationList';

const INITIAL_STATE = {
  selectedStation: null,
  stationInfo: null,
  stationList: stationList.root.stations.station,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STATION_SELECTED:
      return { ...state, selectedStation: action.payload };
    case STATION_INFO_UPDATED:
      return { ...state, stationInfo: action.payload };
    default:
      return state;
  }
};
