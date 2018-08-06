import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { aliases } from '../../popup/src/scripts/actions/aliases';
import rootReducer from './reducers';
import { wrapStore, alias } from 'react-chrome-redux';
import { addWindow, addTab, removeTab, removeWindow, clearActive, updateTab, updateAllIndexInWindow } from '../../popup/src/scripts/actions/tabs';
import { getAllIndexInWindow } from '../../popup/src/scripts/chrome-services/tabs';

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(alias(aliases), thunk)
);

wrapStore(store, {
  portName: 'tabsManageStore'
});

chrome.windows.onRemoved.addListener((windowId) => 
  store.dispatch(removeWindow(windowId))
);

chrome.windows.onCreated.addListener((newWindow) =>
  store.dispatch(addWindow(newWindow))
);  

// chrome.tabs.onCreated.addListener((newTab) =>
//   store.dispatch(addTab(newTab))
// );

chrome.tabs.onRemoved.addListener((tabId) => 
  store.dispatch(removeTab(tabId))
);

chrome.tabs.onActivated.addListener(({tabId, windowId}) => {
  store.dispatch(clearActive(windowId));
  store.dispatch(updateTab(tabId, {active: true}));
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  store.dispatch(updateTab(tabId, changeInfo)); 
});

chrome.tabs.onMoved.addListener((tabId, movedInfo) => {
  getAllIndexInWindow(movedInfo.windowId, (indexArr) => {
    store.dispatch(updateAllIndexInWindow(movedInfo.windowId, indexArr)); 
  });
});


// chrome.tabs.onReplaced.addListener((addedTabId, removedTabId) => {
//   console.log('tab:',addedTabId,' replaced!');
// });