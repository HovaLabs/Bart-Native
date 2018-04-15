import distance from 'gps-distance';
import { AsyncStorage } from 'react-native';

import {
  LOAD_SAVED_STATE,
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
    case LOAD_SAVED_STATE:
      if (action.payload.stationOrder !== state.stationOrder) {
        return {
          ...state,
          ...action.payload,
          stationList: updateStationListOrder(state.stationList, action.payload.stationOrder),
        };
      }
      return { ...state, ...action.payload };
    case SELECT_STATION:
      const stations = Object.assign({}, state.stations);
      stations[action.payload.abbr].visits += 1;
      AsyncStorage.setItem(
        'appState',
        JSON.stringify({ stationOrder: state.stationOrder, stations }),
      ).catch(err => console.error('Save fail', err));

      return {
        ...state, stationInfo: null, selectedStation: action.payload, stations,
      };
    case STATION_INFO_UPDATED:
      return { ...state, stationInfo: action.payload };
    case UPDATE_STATION_ORDER:
      AsyncStorage.setItem(
        'appState',
        JSON.stringify({ stationOrder: action.payload, stations: state.stations }),
      ).catch(err => console.error('Save fail', err));

      return {
        ...state,
        stationOrder: action.payload,
        stationList: updateStationListOrder(state.stationList, action.payload),
      };
    case UPDATE_DEVICE_LOCATION:
      const stationList = state.stationList.map(station => setDistance(station, action.payload));
      if (state.stationOrder === 'distance') {
        return {
          ...state,
          stationList: updateStationListOrder(stationList, 'distance'),
        };
      }
      return {
        ...state,
        stationList,
      };
    default:
      return state;
  }
};
