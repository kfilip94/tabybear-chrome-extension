import * as actions from '../../../popup/src/scripts/actions/tabs';
import * as promises from '../chrome-services/tabs';
import { clearSelection } from '../../../popup/src/scripts/actions/checkedTabs';

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

const setTabActiveAlias = (originalAction) => {
  return (dispatch) => {
    return promises.setTabActivePromise(originalAction.id)
      .then((updatedTab) => dispatch(actions.updateTab(originalAction.id, updatedTab))
    );
  };
};

//REMOVE TAB
const removeTabAlias = (originalAction) => {
  return (dispatch) => {
    return promises.removeTabPromise(originalAction.id)
      .then(() => dispatch(actions.removeTab(originalAction.id)));
  };
};

const removeTabsAlias = (originalAction) => {
  return (dispatch) => {
    return promises.removeTabPromise(originalAction.idArr)
      .then(() => dispatch(actions.removeTabs(originalAction.idArr)))
      .then(() => dispatch(clearSelection()));
  };
};

export default {
  'CREATE_TAB_REQUEST': createTabAlias,
  'MUTE_TAB_REQUEST': muteTabAlias,
  'PIN_TAB_REQUEST': pinTabAlias,
  'SET_TAB_ACTIVE_REQUEST': setTabActiveAlias,
  'REMOVE_TAB_REQUEST': removeTabAlias,
  'REMOVE_TABS_REQUEST': removeTabsAlias,
};