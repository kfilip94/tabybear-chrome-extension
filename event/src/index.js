import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import aliases from './aliases';
import rootReducer from './reducers/index';
import { wrapStore, alias } from 'react-chrome-redux';
import { createTab, removeTab, setTabActive, updateTab } from './reducers/tabs';
import { createWindow, removeWindow } from './reducers/windows';
import { updateTabsOrderRequest } from '../../popup/src/scripts/actions/windows';
import { attachTabRequest } from '../../popup/src/scripts/actions/tabs';
import { createLogger } from 'redux-logger';
import { restoreDefaultSettings } from '../../shared/storage/localStorageApi';

const initialState = {
  windows: [],
  checkedTabs: [],
  filters: {
    text: ''
  },
  drag: false
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

chrome.windows.onRemoved.addListener(windowId => {
  console.log('windows.onRemoved');
  store.dispatch(removeWindow({ windowId }));
});

chrome.windows.onCreated.addListener(newWindow => {
  console.log('windows.onCreated');
  store.dispatch(createWindow({ newWindow }));
});  

chrome.tabs.onCreated.addListener(tab => {
  console.log('tabs.onCreated');
  store.dispatch(createTab({ tab }));
  updateNumberOfTabsFromApi();
});

chrome.tabs.onRemoved.addListener(id => {
  console.log('tabs.onRemoved');
  store.dispatch(removeTab({ id }))
  updateNumberOfTabsFromApi();
});

chrome.tabs.onActivated.addListener(({ tabId, windowId }) => {
  console.log('tabs.onActivated:');
  store.dispatch(setTabActive({ id: tabId, windowId }));
});

chrome.tabs.onUpdated.addListener((id, updatedTab, tab) => {
  console.log('tabs.onUpdated');
  store.dispatch(updateTab({ id, updatedTab }));
});


chrome.tabs.onMoved.addListener((tabId, movedInfo) => {
  console.log('tabs.onMoved');
  store.dispatch(updateTabsOrderRequest(movedInfo.windowId));
});

chrome.tabs.onAttached.addListener((tabId, { newWindowId, newPosition }) => {
  console.log('tabs.onAttached');
  store.dispatch(attachTabRequest(tabId));
});

chrome.tabs.onDetached.addListener((tabId, { oldWindowId, oldPosition }) => {
  console.log('tabs.onDetached');
  store.dispatch(removeTab({ id: tabId }))
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

chrome.runtime.onInstalled.addListener(() => {
  restoreDefaultSettings();
});
