import * as actions  from '../../../popup/src/scripts/actions/windows';
import * as promises from '../chrome-services/windows';

//CREATE WINDOW
const createWindowAlias = (originalAction) => {
  return (dispatch) => {
    return promises.createWindowPromise()
      .then((newWindow) => dispatch(actions.createWindow(newWindow)))
  };
};

//GET ALL WINDOWS
const setWindowsAlias = (originalAction) => {
  return (dispatch) => {
    return promises.getAllWindowsPromise()
      .then((windows) => dispatch(actions.setWindows(windows)) 
    );
  };
};

//UPDATE TAB ORDER IN WINDOW
const updateTabsOrderAlias = (originalAction) => {
  return (dispatch) => {
    return promises.getTabsOrderPromise(originalAction.windowId)
      .then((tabsIndexesArr) => dispatch(actions.updateTabsOrder(originalAction.windowId, tabsIndexesArr))
    );
  };
};

//REMOVE WINDOW
const removeWindowAlias = (originalAction) => {
  return (dispatch) => {
    return promises.removeWindowPromise(originalAction.id)
      .then(() => dispatch(actions.removeWindow(originalAction.id))
    );
  };
};

export default {
  'CREATE_WINDOW_REQUEST': createWindowAlias,
  'SET_WINDOWS_REQUEST': setWindowsAlias,
  'UPDATE_TABS_ORDER_REQUEST': updateTabsOrderAlias, 
  'REMOVE_WINDOW_REQUEST': removeWindowAlias
 
};
