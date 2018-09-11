import * as promises from 'chromeServices/bookmarks';
import { uncheckWindow } from 'reducers/checkedTabs';

const createMultipleBookmarksAlias = ({ windowId, bookmarksData }) => 
  dispatch => {
    const bookmarkPromises = bookmarksData.map(({ title, url }) => promises.createBookmarkPromise(title, url));
    return Promise.all(bookmarkPromises)
      .then(() => dispatch(uncheckWindow({ windowId })))
  };

export default {
  'CREATE_MULTIPLE_BOOKMARKS_REQUEST': createMultipleBookmarksAlias,
};