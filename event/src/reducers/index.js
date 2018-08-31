import { combineReducers } from 'redux';
import tabs from './tabs';
import windows from './windows';
import filters from './filters';
import checkedTabs from './checkedTabs';

export default combineReducers({
  tabs, windows, filters, checkedTabs
});
