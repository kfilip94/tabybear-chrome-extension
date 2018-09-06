import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import filters from './filters';
import checkedTabs from './checkedTabs';
import drag from './drag';
import tabsReducer from './tabs';
import windowsReducer from './windows';
console.log('tabsReducer: ',tabsReducer);
console.log('windowsReducer: ',windowsReducer);

const windows = reduceReducers(tabsReducer, windowsReducer);
export default combineReducers({ windows, filters, checkedTabs, drag });
