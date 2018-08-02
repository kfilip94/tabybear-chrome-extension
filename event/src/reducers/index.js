import { combineReducers } from 'redux';
import windows from './windows';
import filters from './filters';
import checkedTabs from './checkedTabs';

export default combineReducers({
  windows, filters, checkedTabs
});
