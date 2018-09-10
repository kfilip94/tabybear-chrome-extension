import * as actions from '../reducers/tabs';
import * as promises from '../chrome-services/tabs';
import * as promisesWindows from '../chrome-services/windows';
import * as actionsChecked from '../reducers/checkedTabs'
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
const pinMultipleTabsAlias = ({ idArr, pinned }) => 
  () => {
    const pinTabPromiseArr = idArr.map(id => promises.pinTabPromise(id, pinned));
    return Promise.all(pinTabPromiseArr)
    // STORE CHANGES HANDLED BY EVENT LISTENER
  };

// SET TAB ACTIVE
const setTabActiveAlias = ({ id, windowId }) => 
  dispatch => promises.setTabActivePromise(id)
    .then(() => dispatch(actions.setTabActive({ id })))
    .then(() => promisesWindows.setWindowActivePromise(windowId))

// MOVE TAB
const moveTabAlias = ({ id, windowId, newWindowId, index }) =>
  dispatch => {
    if(windowId !== newWindowId){
      return promises.moveTabPromise(id, newWindowId, index)
        .then(() => dispatch(actionsChecked.updateWindowId({ id, newWindowId })))
        .then(() => dispatch(updateTabsOrderRequest(windowId)))
    } else {
      return promises.moveTabPromise(id, newWindowId, index)
        // STORE CHANGES HANDLED BY EVENT LISTENER
    }
  };


// MOVE MULTIPLE TABS
const moveTabsAlias = ({ checkedTabs, windowId, newWindowId, index}) =>
  dispatch => {
    const checkedTabsIds = checkedTabs.map(({ id }) => id);
    const moveTabPromises = checkedTabsIds.map(id => promises.moveTabPromise(id, newWindowId, index));
    if(windowId !== newWindowId) {
      return Promise.all(moveTabPromises)
        .then(() => dispatch(actionsChecked.uncheckAll({ newWindowId })))
        .then(() => dispatch(updateTabsOrderRequest(windowId)))
    } else {
      return Promise.all(moveTabPromises)
        // STORE CHANGES HANDLED BY EVENT LISTENER
    }
  };

// UPDATE TAB ORDER IN WINDOW
const updateTabsOrderAlias = ({ windowId }) =>
  dispatch => promises.getTabsOrderPromise(windowId)
    .then(tabsOrderArr => dispatch(actions.updateTabsOrder({ windowId, tabsOrderArr })));

// SET TABS
const setTabsAlias = () =>
  dispatch => promises.getAllTabs()
    .then(tabs => dispatch(actions.setTabs({ tabs })));

// REMOVE TAB
const removeTabAlias = ({ id }) =>
  dispatch => promises.removeTabPromise(id)
    .then(() => dispatch(actionsChecked.uncheckTab({ id })));

// REMOVE MULTIPLE TABS
const removeTabsAlias = ({ idArr }) => 
  dispatch => promises.removeTabPromise(idArr)
    .then(() => dispatch(actionsChecked.uncheckTabs({ idArr })));


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