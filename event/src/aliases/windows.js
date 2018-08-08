import { setWindows, removeWindow } from '../../../popup/src/scripts/actions/windows';
import { getAllWindowsPromise, removeWindowPromise } from '../../../popup/src/scripts/chrome-services/windows';

//GET ALL WINDOWS
const setWindowsAlias = (originalAction) => {
  return (dispatch) => {
    return getAllWindowsPromise.then((windows) => {
      return dispatch(setWindows(windows)); 
    });
  };
};

//CLOSE WINDOW
const removeWindowAlias = (originalAction) => {
  return (dispatch) => {
    return removeWindowPromise(originalAction.id)
      .then(() => {
        return dispatch(removeWindow(originalAction.id)); 
      });
  };
};

export default {
  'SET_WINDOWS_REQUEST': setWindowsAlias,
  'REMOVE_WINDOW_REQUEST': removeWindowAlias
};
