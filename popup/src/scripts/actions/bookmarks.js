export const createMultipleBookmarksRequest = (bookmarkDataArr, windowId) => ({ 
  type: 'CREATE_MULTIPLE_BOOKMARKS_REQUEST',
  bookmarkDataArr,
  windowId
});
