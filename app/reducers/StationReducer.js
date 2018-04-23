import { AsyncStorage } from 'react-native';

import {
  LOAD_SAVED_STATE,
  SELECT_STATION,
  UPDATE_STATION_ETDS,
  UPDATE_STATION_LIST_FILTER,
  UPDATE_SAVED_STATE,
} from '../actions/types';

const INITIAL_STATE = {
  selectedStation: null,
  stationInfo: null,
  stationOrder: 'alphabetical',
  stationList: [],
};

function updateStationListFilter(originalStationList, order) {
  const sortedStationList = Object.assign([], originalStationList);
  sortedStationList.sort((a, b) => {
    switch (order) {
      case 'alphabetical':
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        }
        return 0;
      case 'distance':
        if (Number(a.distanceFromDevice) > Number(b.distanceFromDevice)) {
          return 1;
        } else if (Number(a.distanceFromDevice) < Number(b.distanceFromDevice)) {
          return -1;
        }
        return 0;
      case 'favorites':
        if (Number(a.visits) < Number(b.visits)) {
          return 1;
        } else if (Number(a.visits) > Number(b.visits)) {
          return -1;
        }
        return 0;
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
      // TODO Remove "bigStation" before going to production
      let bigStation = Object.assign([], action.payload);
      bigStation = [...bigStation, ...bigStation, ...bigStation];

      return { ...state, stationInfo: action.payload };
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
