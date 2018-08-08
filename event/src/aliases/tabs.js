import { updateTab } from '../../../popup/src/scripts/actions/tabs';
import { pinTabPromise } from '../../../popup/src/scripts/chrome-services/tabs';

//PIN TAB
const pinTabAlias = (originalAction) => {
  return (dispatch) => {
    return pinTabPromise(originalAction.id, originalAction.pinned)
      .then((updatedTab) => {
        return dispatch(updateTab(originalAction.id, updatedTab)); 
      });
  };
};

export default {
  'PIN_TAB_REQUEST': pinTabAlias,
};