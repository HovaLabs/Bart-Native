import distance from 'gps-distance';

import {
  SELECT_STATION,
  STATION_INFO_UPDATED,
  UPDATE_STATION_ORDER,
  UPDATE_DEVICE_LOCATION,
} from '../actions/types';
import stationList from '../defaultStationList';

const INITIAL_STATE = {
  selectedStation: null,
  stationInfo: null,
  stationOrder: 'alphabetical',
  stationList: stationList.root.stations.station,
};

function updateStationListOrder(originalStationList, order) {
  const sortedStationList = Object.assign([], originalStationList);
  sortedStationList.sort((a, b) => {
    switch (order) {
      case 'alphabetical':
        return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
      case 'distance':
        return Number(a.distanceFromDevice) > Number(b.distanceFromDevice)
          ? 1
          : Number(a.distanceFromDevice) < Number(b.distanceFromDevice)
            ? -1
            : 0;
      default:
    }
  });

  console.log(sortedStationList);

  return sortedStationList;
}

function setDistance(station, userLocation) {
  const distanceFromDevice = Number(distance(
    Number(station.gtfs_latitude),
    Number(station.gtfs_longitude),
    userLocation.coords.latitude,
    userLocation.coords.longitude,
  )).toFixed(1);

  return { ...station, distanceFromDevice };
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_STATION:
      return { ...state, stationInfo: null, selectedStation: action.payload };
    case STATION_INFO_UPDATED:
      return { ...state, stationInfo: action.payload };
    case UPDATE_STATION_ORDER:
      return {
        ...state,
        stationOrder: action.payload,
        stationList: updateStationListOrder(state.stationList, action.payload),
      };
    case UPDATE_DEVICE_LOCATION:
      return {
        ...state,
        stationList: state.stationList.map(station => setDistance(station, action.payload)),
      };
    default:
      return state;
  }
};
