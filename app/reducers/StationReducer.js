import distance from 'gps-distance';
import { AsyncStorage } from 'react-native';
import { pick } from 'lodash';

import {
  LOAD_SAVED_STATE,
  SELECT_STATION,
  UPDATE_STATION_ETDS,
  UPDATE_STATION_ORDER,
  UPDATE_DEVICE_LOCATION,
  UPDATE_STATION_DIRECTION,
  UPDATE_SAVED_STATE,
} from '../actions/types';

const INITIAL_STATE = {
  selectedStation: null,
  stationInfo: null,
  stationOrder: 'alphabetical',
  stationList: [],
};

function getPersistentDataFromState(state) {
  return pick(state, ['stationOrder', 'stationList']);
}

function updateStationOrder(originalStationList, order, persistentStations) {
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
      case 'favorites':
        return Number(a.visits) < Number(b.visits)
          ? 1
          : Number(a.visits) > Number(b.visits)
            ? -1
            : 0;
      default:
        return 0;
    }
  });

  return sortedStationList;
}

function setDistance(station, userLocation) {
  const distanceFromDevice = Number(distance(
    Number(station.latitude),
    Number(station.longitude),
    userLocation.coords.latitude,
    userLocation.coords.longitude,
  )).toFixed(1);

  return { ...station, distanceFromDevice };
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_SAVED_STATE: {
      const newState = {
        ...state,
        ...action.payload,
        stationList: updateStationOrder(action.payload.stationList, action.payload.stationOrder),
      };
      return newState;
    }
    case UPDATE_SAVED_STATE: {
      console.log(state.stationList[0]);
      const newState = {
        ...state,
        ...action.payload,
        stationList: updateStationOrder(action.payload.stationList, action.payload.stationOrder),
      };
      console.log(newState.stationList[0]);
      return newState;
    }
    case UPDATE_STATION_ETDS: {
      console.log('sweeee', action);
      return { ...state, stationInfo: action.payload };
    }
    case UPDATE_DEVICE_LOCATION: {
      const stationList = state.stationList.map(station => setDistance(station, action.payload));
      if (state.stationOrder === 'distance') {
        return {
          ...state,
          stationList: updateStationOrder(stationList, 'distance'),
        };
      }
      return {
        ...state,
        stationList,
      };
    }
    case UPDATE_STATION_ORDER: {
      AsyncStorage.getItem('appData').then((persistentDataString) => {
        const persistentData = JSON.parse(persistentDataString);
        persistentData.stationOrder = action.payload;
        AsyncStorage.setItem('appData', JSON.stringify(persistentData));
      });

      return {
        ...state,
        stationOrder: action.payload,
        stationList: updateStationOrder(state.stationList, action.payload),
      };
    }
    case SELECT_STATION: {
      return {
        ...state,
        selectedStation: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
