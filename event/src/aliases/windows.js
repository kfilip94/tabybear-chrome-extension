import * as actions  from '../reducers/windows';
import * as promises from '../chrome-services/windows';

//CREATE WINDOW
const createWindowAlias = () => {
  return dispatch => {
    return promises.createWindowPromise()
      .then((newWindow) => dispatch(actions.createWindow({ newWindow })))
  };
};

//GET ALL WINDOWS
const setWindowsAlias = () => {
  return dispatch => {
    return promises.getAllWindowsPromise()
      .then((windows) => dispatch(actions.setWindows({ windows })) 
    );
  };
};

//UPDATE TAB ORDER IN WINDOW
const updateTabsOrderAlias = ({ windowId }) => {
  return dispatch => {
    return promises.getTabsOrderPromise(windowId)
      .then((tabsIndexesArr) => dispatch(actions.updateTabsOrder({ windowId, tabsIndexesArr }))
    );
  };
};

//REMOVE WINDOW
const removeWindowAlias = ({ id }) => {
  return dispatch => {
    return promises.removeWindowPromise(id)
      .then(() => dispatch(actions.removeWindow({ id }))
    );
  };
};

export default {
  'CREATE_WINDOW_REQUEST': createWindowAlias,
  'SET_WINDOWS_REQUEST': setWindowsAlias,
  'UPDATE_TABS_ORDER_REQUEST': updateTabsOrderAlias, 
  'REMOVE_WINDOW_REQUEST': removeWindowAlias
};
