import * as actions from '../reducers/tabs';
import * as actionsWindows from '../reducers/windows';
import * as promises from '../chrome-services/tabs';
import * as promisesWindows from '../chrome-services/windows';
import * as actionsChecked from '../reducers/checkedTabs'

//CREATE TAB
const createTabAlias = ({ windowId }) => {
  return dispatch => {
    return promises.createTabPromise(windowId)
      .then(tab => dispatch(actions.createTab({ tab })));
  };
};

//MUTE TAB
const muteTabAlias = ({ id, muted }) => {
  return dispatch => {
    return promises.muteTabPromise(id, muted)
      .then(updatedTab => dispatch(actions.updateTab({ id, updatedTab })));
  };
};

//PIN TAB
const pinTabAlias = ({ id, pinned }) => {
  return dispatch => {
    return promises.pinTabPromise(id, pinned)
      .then(updatedTab => dispatch(actions.updateTab({ id, updatedTab })));
  };
};

//PIN MULTPILE TABS
const pinMultipleTabsAlias = ({ idArr, pinned, windowId }) => {
  return dispatch => {
    const pinTabPromiseArr = idArr.map(id => promises.pinTabPromise(id, pinned));
    return Promise.all(pinTabPromiseArr)
      .then(() => {
        const updatedTab = { pinned };
        return dispatch(actions.updateTabs({ idArr, updatedTab }));
      })
  };
};

//SET TAB ACTIVE
const setTabActiveAlias = (originalAction) => {
  return dispatch => {
    return promises.setTabActivePromise(originalAction.id)
      .then(updatedTab => dispatch(actions.setTabActive({ id: originalAction.id, windowId: originalAction.windowId })))
      .then(() => promisesWindows.setWindowActivePromise(originalAction.windowId))
      .then(({ id }) => dispatch(actionsWindows.setWindowActive({ id })));
    };
};

//MOVE TAB
const moveTabAlias = ({ id, windowId, newWindowId, index }) => {
  return dispatch => {
    if(windowId !== newWindowId){
      return promises.moveTabPromise(id, newWindowId, index)
        .then(tab => dispatch(actions.moveTab({ id: tab.id, windowId, newWindowId, tab })))
        .then(() => dispatch(actionsChecked.updateWindowId({ id, newWindowId })))
        .then(() => promisesWindows.getTabsOrderPromise(newWindowId))
        .then(tabsOrderArr => dispatch(actionsWindows.updateTabsOrder({ newWindowId, tabsOrderArr })))
        .then(() => promisesWindows.getTabsOrderPromise(windowId))
        .then(tabsOrderArr => dispatch(actionsWindows.updateTabsOrder({ windowId, tabsOrderArr })))
    } else {
      return promises.moveTabPromise(id, newWindowId, index)
        .then(tab => promisesWindows.getTabsOrderPromise(windowId))
        .then(tabsOrderArr => dispatch(actionsWindows.updateTabsOrder({ windowId, tabsOrderArr })))
    }
  };
};

//MOVE MULTIPLE TABS
const moveTabsAlias = ({ checkedTabs, windowId, newWindowId, index}) => {
  return dispatch => {
    const tabIdArr = checkedTabs.map(({ id }) => id);
    const moveTabPromises = tabIdArr.map(id => promises.moveTabPromise(id, newWindowId, index));
   
    if(windowId !== newWindowId){
      return Promise.all(moveTabPromises)
        .then(tabArr => dispatch(actions.moveTabs({ checkedTabs, newWindowId, tabArr: tabArr.length === undefined ? [tabArr] : tabArr })))
        .then(() => dispatch(actionsChecked.uncheckAll({ newWindowId })))
        .then(() => promisesWindows.getTabsOrderPromise(newWindowId))
        .then(tabsOrderArr => dispatch(actionsWindows.updateTabsOrder({ newWindowId, tabsOrderArr })))
    } else {
      return Promise.all(moveTabPromises)
        .then(() => promisesWindows.getTabsOrderPromise(newWindowId))
        .then(tabsOrderArr => dispatch(actionsWindows.updateTabsOrder({ newWindowId, tabsOrderArr })))
    }
  };
};

//ATTACH TAB TO WINDOW
const attachTabAlias = ({ id }) => {
  return dispatch => {
    return promises.getTabPromise(id)
      .then(tab => dispatch(actions.createTab({ tab })));
  };
};


//REMOVE TAB
const removeTabAlias = ({ id }) => {
  return dispatch => {
    return promises.removeTabPromise(id)
      .then(() => dispatch(actions.removeTab({ id })))
      .then(() => dispatch(actionsChecked.uncheckTab({ id })));
  };
};

//REMOVE MULTIPLE TABS
const removeTabsAlias = ({ idArr }) => {
  return dispatch => {
    return promises.removeTabPromise(idArr)
      .then(() => dispatch(actions.removeTabs({ idArr })))
      .then(() => dispatch(actionsChecked.uncheckTabs({ idArr })));
  };
};

export default {
  'CREATE_TAB_REQUEST': createTabAlias,
  'MUTE_TAB_REQUEST': muteTabAlias,
  'PIN_TAB_REQUEST': pinTabAlias,
  'PIN_MULTIPLE_TABS_REQUEST': pinMultipleTabsAlias,
  'SET_TAB_ACTIVE_REQUEST': setTabActiveAlias,
  'MOVE_TAB_REQUEST': moveTabAlias,
  'MOVE_TABS_REQUEST': moveTabsAlias,
  'ATTACH_TAB_REQUEST': attachTabAlias,
  'REMOVE_TAB_REQUEST': removeTabAlias,
  'REMOVE_TABS_REQUEST': removeTabsAlias,
};