import { createStore } from 'redux';
import rootReducer from './reducers';
import { wrapStore } from 'react-chrome-redux';
import { addWindow, addTab, removeTab, removeWindow, clearActive, updateTab } from '../../popup/src/scripts/actions/tabs';

const store = createStore(rootReducer, {});

wrapStore(store, {
  portName: 'tabsManageStore'
});

chrome.windows.onRemoved.addListener((windowId) => 
  store.dispatch(removeWindow(windowId))
);

chrome.windows.onCreated.addListener((newWindow) =>
  store.dispatch(addWindow(newWindow))
);  

chrome.tabs.onCreated.addListener((newTab) =>
  store.dispatch(addTab(newTab))
);

chrome.tabs.onRemoved.addListener((tabId) => 
  store.dispatch(removeTab(tabId))
);

chrome.tabs.onActivated.addListener(({tabId, windowId}) => {
  store.dispatch(clearActive(windowId));
  store.dispatch(updateTab(tabId, {active: true}));
});

chrome.tabs.onUpdated.addListener((tabId, updates, tab) => {
  console.log('tabId:',tabId);
  console.log('updates:',updates);
  console.log('tab:',tab);
  store.dispatch(updateTab(tabId, updates)); 
})


chrome.tabs.onReplaced.addListener((addedTabId, removedTabId) => {
  console.log('tab:',addedTabId,' replaced!');
});