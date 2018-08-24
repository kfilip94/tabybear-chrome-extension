import * as promises from '../chrome-services/bookmarks';
import { clearWindowSelection } from '../../../popup/src/scripts/actions/checkedTabs';

// const createBookmarkAlias = (originalAction) => {
//   return (dispatch) => {
//     return promises.createBookmarkPromise(originalAction.title, originalAction.url)
//   };
// };

const createMultipleBookmarksAlias = (originalAction) => {
  return (dispatch) => {
    const bookmarkPromises = originalAction.bookmarkDataArr.map(({title, url}) => promises.createBookmarkPromise(title, url));
    return Promise.all(bookmarkPromises)
      .then(() => dispatch(clearWindowSelection(originalAction.windowId)))
  };
};

export default {
  // 'CREATE_BOOKMARK_REQUEST': createBookmarkAlias,
  'CREATE_MULTIPLE_BOOKMARKS_REQUEST': createMultipleBookmarksAlias,
};