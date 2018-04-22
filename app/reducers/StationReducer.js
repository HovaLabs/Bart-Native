import { AsyncStorage } from 'react-native';
import { pick } from 'lodash';

import {
  LOAD_SAVED_STATE,
  SELECT_STATION,
  UPDATE_STATION_ETDS,
  UPDATE_STATION_LIST_FILTER,
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

function updateStationListFilter(originalStationList, order, persistentStations) {
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

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_SAVED_STATE: {
      const newState = {
        ...state,
        ...action.payload,
        stationList: updateStationListFilter(
          action.payload.stationList,
          action.payload.stationOrder,
        ),
      };
      return newState;
    }
    case UPDATE_SAVED_STATE: {
      const newState = {
        ...state,
        ...action.payload,
        stationList: updateStationListFilter(
          action.payload.stationList,
          action.payload.stationOrder,
        ),
      };
      return newState;
    }
    case UPDATE_STATION_ETDS: {
      const bigStation = Object.assign({}, action.payload);
      bigStation.root.station[0].etd = [
        ...bigStation.root.station[0].etd,
        ...bigStation.root.station[0].etd,
        ...bigStation.root.station[0].etd,
      ];

      return { ...state, stationInfo: bigStation };
    }
    case UPDATE_STATION_LIST_FILTER: {
      AsyncStorage.getItem('appData').then((persistentDataString) => {
        const persistentData = JSON.parse(persistentDataString);
        persistentData.stationOrder = action.payload;
        AsyncStorage.setItem('appData', JSON.stringify(persistentData));
      });

      return {
        ...state,
        stationOrder: action.payload,
        stationList: updateStationListFilter(state.stationList, action.payload),
      };
    }
    case SELECT_STATION: {
      return {
        ...state,
        selectedStation: action.payload,
        stationInfo: null,
      };
    }
    default: {
      return state;
    }
  }
};
