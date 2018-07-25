import { createStore } from 'redux';
import rootReducer from './reducers';
import { wrapStore } from 'react-chrome-redux';
import { removeWindow } from '../../popup/src/scripts/actions/tabs';

const store = createStore(rootReducer, {});

wrapStore(store, {
  portName: 'tabsManageStore'
});

chrome.windows.onRemoved.addListener((windowId) => 
  store.dispatch(removeWindow(windowId))
);

