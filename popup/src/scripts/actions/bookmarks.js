import { CREATE_MULTIPLE_BOOKMARKS_REQUEST } from '../../../../shared/consts';

export const createMultipleBookmarksRequest = (bookmarkDataArr, windowId) => ({ 
  type: CREATE_MULTIPLE_BOOKMARKS_REQUEST,
  bookmarkDataArr,
  windowId
});
