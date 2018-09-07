import * as promises from '../chrome-services/bookmarks';
import { uncheckWindow } from '../reducers/checkedTabs';
import { CREATE_MULTIPLE_BOOKMARKS_REQUEST } from '../../../shared/consts';

const createMultipleBookmarksAlias = ({ windowId, bookmarkDataArr }) => {
  return dispatch => {
    const bookmarkPromises = bookmarkDataArr.map(({ title, url }) => promises.createBookmarkPromise(title, url));
    return Promise.all(bookmarkPromises)
      .then(() => dispatch(uncheckWindow({ windowId })))
  };
};

export default {
  CREATE_MULTIPLE_BOOKMARKS_REQUEST: createMultipleBookmarksAlias,
};