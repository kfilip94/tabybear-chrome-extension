import { setWindows, removeWindow } from '../../../popup/src/scripts/actions/windows';
import { updateTabsOrder } from '../../../popup/src/scripts/actions/tabs';
import { getAllWindowsPromise, removeWindowPromise } from '../../../popup/src/scripts/chrome-services/windows';
import { getTabsOrderPromise } from '../../../popup/src/scripts/chrome-services/tabs';

//GET ALL WINDOWS
const setWindowsAlias = (originalAction) => {
  return (dispatch) => {
    return getAllWindowsPromise()
      .then((windows) => dispatch(setWindows(windows)) 
    );
  };
};

//UPDATE TAB ORDER IN WINDOW
const updateTabsOrderAlias = (originalAction) => {
  return (dispatch) => {
    return getTabsOrderPromise(originalAction.windowId)
      .then((tabsIndexesArr) => dispatch(updateTabsOrder(originalAction.windowId, tabsIndexesArr))
    );
  };
};

//CLOSE WINDOW
const removeWindowAlias = (originalAction) => {
  return (dispatch) => {
    return removeWindowPromise(originalAction.id)
      .then(() => dispatch(removeWindow(originalAction.id))
    );
  };
};

export default {
  'SET_WINDOWS_REQUEST': setWindowsAlias,
  'UPDATE_TABS_ORDER_REQUEST': updateTabsOrderAlias, 
  'REMOVE_WINDOW_REQUEST': removeWindowAlias
};
