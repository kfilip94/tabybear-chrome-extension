import { createTab, removeTab, updateTab, clearActive, removeTabs } from '../../../popup/src/scripts/actions/tabs';
import { clearSelection } from '../../../popup/src/scripts/actions/checkedTabs';
import { createTabPromise, muteTabPromise, pinTabPromise, setTabActivePromise, removeTabPromise } from '../../../popup/src/scripts/chrome-services/tabs';

//CREATE TAB
const createTabAlias = (originalAction) => {
  return (dispatch) => {
    return createTabPromise(originalAction.windowId)
      .then((tab) => dispatch(createTab(tab)));
  };
};


//UPDATE TAB
const muteTabAlias = (originalAction) => {
  return (dispatch) => {
    return muteTabPromise(originalAction.id, originalAction.muted)
      .then((updatedTab) => {
        return dispatch(updateTab(originalAction.id, updatedTab)); 
      });
  };
};

const pinTabAlias = (originalAction) => {
  return (dispatch) => {
    return pinTabPromise(originalAction.id, originalAction.pinned)
      .then((updatedTab) => {
        return dispatch(updateTab(originalAction.id, updatedTab)); 
      });
  };
};

const setTabActiveAlias = (originalAction) => {
  return (dispatch) => {
    return setTabActivePromise(originalAction.id)
      .then((updatedTab) => dispatch(updateTab(originalAction.id, updatedTab))
    );
  };
};

//REMOVE TAB
const removeTabAlias = (originalAction) => {
  return (dispatch) => {
    return removeTabPromise(originalAction.id)
      .then(() => dispatch(removeTab(originalAction.id)));
  };
};

const removeTabsAlias = (originalAction) => {
  return (dispatch) => {
    return removeTabPromise(originalAction.idArr)
      .then(() => dispatch(removeTabs(originalAction.idArr)))
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