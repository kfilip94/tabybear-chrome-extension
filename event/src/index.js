import { createStore } from 'redux';
import rootReducer from './reducers';
import { wrapStore } from 'react-chrome-redux';
import { addWindow, removeTab, removeWindow } from '../../popup/src/scripts/actions/tabs';

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
  // store.dispatch(addTab(newWindow))
{}
);

chrome.tabs.onRemoved.addListener((tabId) => 
  store.dispatch(removeTab(tabId))
);
