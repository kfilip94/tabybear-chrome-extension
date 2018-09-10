import { combineReducers } from 'redux';
import filters from './filters';
import checkedTabs from './checkedTabs';
import drag from './drag';
import tabs from './tabs';

export default combineReducers({ tabs, filters, checkedTabs, drag });
