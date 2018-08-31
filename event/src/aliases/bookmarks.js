import * as promises from '../chrome-services/bookmarks';
import { clearWindowSelection } from '../../../popup/src/scripts/actions/checkedTabs';

const createMultipleBookmarksAlias = (originalAction) => {
  return (dispatch) => {
    const bookmarkPromises = originalAction.bookmarkDataArr.map(({title, url}) => promises.createBookmarkPromise(title, url));
    return Promise.all(bookmarkPromises)
      .then(() => dispatch(clearWindowSelection(originalAction.windowId)))
  };
};

export default {
  'CREATE_MULTIPLE_BOOKMARKS_REQUEST': createMultipleBookmarksAlias,
};