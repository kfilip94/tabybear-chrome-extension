import { createStore, applyMiddleware } from 'redux';
import { wrapStore, alias } from 'react-chrome-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'
import aliases from './aliases/index';
import rootReducer from './reducers/index';
import addTabsEventListeners from './chrome-event-listeners/tabs';
import addRuntimeEventListeners from './chrome-event-listeners/runtime';
import * as badgeText from './badge-text/badgeText';

const initialState = {
  tabs: [],
  checkedTabs: [],
  filters: { text: '' },
  drag: false
};
const logger = createLogger({
  collapsed: true,
});

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(alias(aliases), thunk, logger)
);

wrapStore(store, {
  portName: 'tabsManageStore'
});

badgeText.initBadgeText();
addTabsEventListeners(store, badgeText);
addRuntimeEventListeners();
