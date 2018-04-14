import { combineReducers } from 'redux';
import StationReducer from './StationReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  stationInfo: StationReducer,
  user: UserReducer,
});
