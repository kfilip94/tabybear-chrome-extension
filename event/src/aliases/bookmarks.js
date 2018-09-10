import * as promises from '../chrome-services/bookmarks';
import { uncheckWindow } from '../reducers/checkedTabs';

const createMultipleBookmarksAlias = ({ windowId, bookmarkDataArr }) => 
  dispatch => {
    const bookmarkPromises = bookmarkDataArr.map(({ title, url }) => promises.createBookmarkPromise(title, url));
    return Promise.all(bookmarkPromises)
      .then(() => dispatch(uncheckWindow({ windowId })))
  };

export default {
  'CREATE_MULTIPLE_BOOKMARKS_REQUEST': createMultipleBookmarksAlias,
};