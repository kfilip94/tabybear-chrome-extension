import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import tabsReducer from './tabs';
import windowsReducer from './windows';
import filters from './filters';
import checkedTabs from './checkedTabs';
import drag from './drag';

const windows = reduceReducers(tabsReducer, windowsReducer);
export default combineReducers({ windows, filters, checkedTabs, drag });
