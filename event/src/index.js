import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import aliases from './aliases';
import rootReducer from './reducers';
import { wrapStore, alias } from 'react-chrome-redux';
import { createTab, removeTab, setTabActive, updateTab } from '../../popup/src/scripts/actions/tabs';
import { createWindow, removeWindow, updateTabsOrderRequest } from '../../popup/src/scripts/actions/windows';

import { createLogger } from 'redux-logger';

const initialState = {
  windows: [],
  checkedTabs: [],
  filters: {
    text: ''
  }
};
const logger = createLogger({
  collapsed: true,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(alias(aliases), thunk, logger)
  )
);

wrapStore(store, {
  portName: 'tabsManageStore'
});

chrome.windows.onRemoved.addListener((windowId) => {
  console.log('windows.onRemoved');
  store.dispatch(removeWindow(windowId));
});

chrome.windows.onCreated.addListener((newWindow) => {
  console.log('windows.onCreated');
  store.dispatch(createWindow(newWindow));
});  

chrome.tabs.onCreated.addListener((newTab) => {
  console.log('tabs.onCreated');
  store.dispatch(createTab(newTab));
  updateNumberOfTabsFromApi();
});

chrome.tabs.onRemoved.addListener((tabId) => {
  console.log('tabs.onRemoved');
  store.dispatch(removeTab(tabId))
  updateNumberOfTabsFromApi();
});

chrome.tabs.onActivated.addListener(({tabId, windowId}) => {
  console.log('tabs.onActivated');
  store.dispatch(setTabActive(tabId, windowId));
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('tabs.onUpdated');
  store.dispatch(updateTab(tabId, changeInfo));
});

chrome.tabs.onMoved.addListener((tabId, movedInfo) => {
  console.log('tabs.onMoved');
  store.dispatch(updateTabsOrderRequest(movedInfo.windowId));
});

const updateBadgeText = (numberOfTabs) => {
  numberOfTabs = numberOfTabs > 999 ? '999+' : `${numberOfTabs}`;
  chrome.browserAction.setBadgeText({text: numberOfTabs });
}

const getNumberOfTabsFromStore = () => {
  return store.getState().windows.reduce((acc, windowTwo) => acc + windowTwo.tabs.length, 0);
}

const updateNumberOfTabsFromApi = () => {
  chrome.tabs.query({}, (tabs) => updateBadgeText(tabs.length))
}

chrome.browserAction.setBadgeBackgroundColor({ color: [41, 62, 82, 1] });
updateNumberOfTabsFromApi();