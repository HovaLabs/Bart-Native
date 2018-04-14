import { combineReducers } from 'redux';
import StationReducer from './StationReducer';

export default combineReducers({
  stationInfo: StationReducer,
});
