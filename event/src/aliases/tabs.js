import * as actions from 'reducers/tabs';
import * as promises from 'chromeServices/tabs';
import { setWindowActivePromise } from 'chromeServices/windows';
import { updateWindowId, uncheckAll, uncheckTab, uncheckTabs,  } from 'reducers/checkedTabs'
import { updateTabsOrderRequest } from '../../../popup/src/scripts/actions/tabs';

// CREATE TAB
const createTabAlias = ({ windowId }) => 
  () => promises.createTabPromise(windowId)
    // STORE CHANGES HANDLED BY EVENT LISTENER

// MUTE TAB
const muteTabAlias = ({ id, muted }) => 
  () => promises.muteTabPromise(id, muted);
    // STORE CHANGES HANDLED BY EVENT LISTENER

// PIN TAB
const pinTabAlias = ({ id, pinned }) => 
  () => promises.pinTabPromise(id, pinned)
    // STORE CHANGES HANDLED BY EVENT LISTENER


// PIN MULTPILE TABS
const pinMultipleTabsAlias = ({ ids, pinned }) => 
  () => {
    const pinTabPromises = ids.map(id => promises.pinTabPromise(id, pinned));
    return Promise.all(pinTabPromises)
    // STORE CHANGES HANDLED BY EVENT LISTENER
  };

// SET TAB ACTIVE
const setTabActiveAlias = ({ id, windowId }) => 
  dispatch => promises.setTabActivePromise(id)
    .then(() => dispatch(actions.setTabActive({ id })))
    .then(() => setWindowActivePromise(windowId))

// MOVE TAB
const moveTabAlias = ({ id, windowId, newWindowId, index }) =>
  dispatch =>
    windowId !== newWindowId ?
      promises.moveTabPromise(id, newWindowId, index)
        .then(() => dispatch(updateWindowId({ id, newWindowId })))
        .then(() => dispatch(updateTabsOrderRequest(windowId)))
      :
      promises.moveTabPromise(id, newWindowId, index)
        // STORE CHANGES HANDLED BY EVENT LISTENER

// MOVE MULTIPLE TABS
const moveTabsAlias = ({ checkedTabs, windowId, newWindowId, index}) =>
  dispatch => {
    const checkedTabsIds = checkedTabs.map(({ id }) => id);
    const moveTabPromises = checkedTabsIds.map(id => promises.moveTabPromise(id, newWindowId, index));
    return windowId !== newWindowId ?
      Promise.all(moveTabPromises)
        .then(() => dispatch(uncheckAll({ newWindowId })))
        .then(() => dispatch(updateTabsOrderRequest(windowId)))
      :
      Promise.all(moveTabPromises)
        // STORE CHANGES HANDLED BY EVENT LISTENER
    };

// UPDATE TAB ORDER IN WINDOW
const updateTabsOrderAlias = ({ windowId }) =>
  dispatch => promises.getTabsOrderPromise(windowId)
    .then(tabsOrder => dispatch(actions.updateTabsOrder({ windowId, tabsOrder })));

// SET TABS
const setTabsAlias = () =>
  dispatch => promises.getAllTabs()
    .then(tabs => dispatch(actions.setTabs({ tabs })));

// REMOVE TAB
const removeTabAlias = ({ id }) =>
  dispatch => promises.removeTabPromise(id)
    .then(() => dispatch(uncheckTab({ id })));

// REMOVE MULTIPLE TABS
const removeTabsAlias = ({ ids }) => 
  dispatch => promises.removeTabPromise(ids)
    .then(() => dispatch(uncheckTabs({ ids })));


export default {
  'CREATE_TAB_REQUEST': createTabAlias,
  'MUTE_TAB_REQUEST': muteTabAlias,
  'PIN_TAB_REQUEST': pinTabAlias,
  'PIN_MULTIPLE_TABS_REQUEST': pinMultipleTabsAlias,
  'SET_TAB_ACTIVE_REQUEST': setTabActiveAlias,
  'MOVE_TAB_REQUEST': moveTabAlias,
  'MOVE_TABS_REQUEST': moveTabsAlias,
  'UPDATE_TABS_ORDER_REQUEST': updateTabsOrderAlias, 
  'SET_TABS_REQUEST': setTabsAlias,
  'REMOVE_TAB_REQUEST': removeTabAlias,
  'REMOVE_TABS_REQUEST': removeTabsAlias,
};