import * as actions from '../../../popup/src/scripts/actions/tabs';
import * as actionsWindows from '../../../popup/src/scripts/actions/windows';
import * as promises from '../chrome-services/tabs';
import * as promisesWindows from '../chrome-services/windows';

import { updateWindowId, uncheckTab, uncheckTabs, clearSelection } from '../../../popup/src/scripts/actions/checkedTabs';

//CREATE TAB
const createTabAlias = (originalAction) => {
  return (dispatch) => {
    return promises.createTabPromise(originalAction.windowId)
      .then((tab) => dispatch(actions.createTab(tab)));
  };
};

//UPDATE TAB
const muteTabAlias = (originalAction) => {
  return (dispatch) => {
    return promises.muteTabPromise(originalAction.id, originalAction.muted)
      .then((updatedTab) => dispatch(actions.updateTab(originalAction.id, updatedTab))
    );
  };
};

const pinTabAlias = (originalAction) => {
  return (dispatch) => {
    return promises.pinTabPromise(originalAction.id, originalAction.pinned)
      .then((updatedTab) => {
        return dispatch(actions.updateTab(originalAction.id, updatedTab)); 
      });
  };
};

const pinMultipleTabsAlias = (originalAction) => {
  return (dispatch) => {
    const pinTabPromiseArr = originalAction.idArr.map(id => promises.pinTabPromise(id, originalAction.pinned));
    return Promise.all(pinTabPromiseArr)
      .then((values) => dispatch(actions.updateMultipleTabs(originalAction.idArr, { 'pinned': originalAction.pinned })));
  };
};

const setTabActiveAlias = (originalAction) => {
  return (dispatch) => {
    return promises.setTabActivePromise(originalAction.id)
      .then((updatedTab) => dispatch(actions.setTabActive(originalAction.id, originalAction.windowId)))
      .then(() => promisesWindows.setWindowActivePromise(originalAction.windowId))
      .then(({id}) => dispatch(actionsWindows.setWindowActive(id)));
    };
};

const moveTabAlias = (originalAction) => {
  return (dispatch) => {
    console.log('originalAction:',originalAction);
    if(originalAction.windowId !== originalAction.newWindowId){
      return promises.moveTabPromise(originalAction.id, originalAction.newWindowId, originalAction.index)
        .then((tab) => dispatch(actions.moveTab(tab.id, originalAction.windowId, originalAction.newWindowId, tab)))
        .then(() => dispatch(updateWindowId(originalAction.id, originalAction.newWindowId)))
        .then(() => promisesWindows.getTabsOrderPromise(originalAction.newWindowId))
        .then((tabsIndexesArr) => dispatch(actionsWindows.updateTabsOrder(originalAction.newWindowId, tabsIndexesArr)))
        .then(() => promisesWindows.getTabsOrderPromise(originalAction.windowId))
        .then((tabsIndexesArr) => dispatch(actionsWindows.updateTabsOrder(originalAction.windowId, tabsIndexesArr)))
    } else {
      return promises.moveTabPromise(originalAction.id, originalAction.newWindowId, originalAction.index)
        .then((tab) => promisesWindows.getTabsOrderPromise(originalAction.windowId))
        .then((tabsIndexesArr) => dispatch(actionsWindows.updateTabsOrder(originalAction.windowId, tabsIndexesArr)))
    }
  };
};

const moveTabsAlias = (originalAction) => {
  return (dispatch) => {
    const tabIdArr = originalAction.checkedTabs.map(({id}) => id);
    const moveTabPromises = tabIdArr.map((id) => promises.moveTabPromise(id, originalAction.newWindowId, originalAction.startIndex));
    if(originalAction.windowId !== originalAction.newWindowId){
      return Promise.all(moveTabPromises)
          .then((tabArr) => dispatch(actions.moveTabs(originalAction.checkedTabs, originalAction.newWindowId, tabArr.length === undefined ? [tabArr] : tabArr)))
          .then(() => dispatch(clearSelection(originalAction.newWindowId)))
          .then(() => promisesWindows.getTabsOrderPromise(originalAction.newWindowId))
          .then((tabsIndexesArr) => dispatch(actionsWindows.updateTabsOrder(originalAction.newWindowId, tabsIndexesArr)))
    } else {
      return Promise.all(moveTabPromises)
        .then(() => promisesWindows.getTabsOrderPromise(originalAction.newWindowId))
        .then((tabsIndexesArr) => dispatch(actionsWindows.updateTabsOrder(originalAction.newWindowId, tabsIndexesArr)));
    }
  };
};

//REMOVE TAB
const removeTabAlias = (originalAction) => {
  return (dispatch) => {
    return promises.removeTabPromise(originalAction.id)
      .then(() => dispatch(actions.removeTab(originalAction.id)))
      .then(() => dispatch(uncheckTab(originalAction.id)));
  };
};

const removeTabsAlias = (originalAction) => {
  return (dispatch) => {
    console.log(originalAction.idArr);
    return promises.removeTabPromise(originalAction.idArr)
      .then(() => dispatch(actions.removeTabs(originalAction.idArr)))
      .then(() => dispatch(uncheckTabs(originalAction.idArr)));
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
  'REMOVE_TAB_REQUEST': removeTabAlias,
  'REMOVE_TABS_REQUEST': removeTabsAlias,
};