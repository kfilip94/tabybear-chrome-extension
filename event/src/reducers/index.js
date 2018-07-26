import { combineReducers } from 'redux';
import windows from './windows';
import filters from './filters';

export default combineReducers({
  windows, filters
});
