import { pinTabPromise } from '../chrome-services/tabs';
import {  getAllWindowsPromise } from '../chrome-services/windows';
import { updateTab,getAllWindows } from './tabs';

const pinTabAlias = (id, pinned) => {
  console.log('alias fired')
  return dispatch => pinTabPromise(id, pinned)
    .then(updatedTab => dispatch(updateTab(id, updatedTab)));
};

export const getWindows = () => {
  console.log('making alias')

  return dispatch => getAllWindowsPromise()
    .then(windows => dispatch(getAllWindows(windows)));
};

export default {
  'GET_ALL_WINDOWS': getWindows
   // the action to proxy and the new action to call
};
