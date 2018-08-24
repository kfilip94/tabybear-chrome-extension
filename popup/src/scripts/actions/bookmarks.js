export const createBookmarkRequest = (title, url) => ({ 
  type: 'CREATE_BOOKMARK_REQUEST',
  title,
  url
});

export const createBookmark = (title, url) => ({ 
  type: 'CREATE_BOOKMARK',
  title,
  url
});

export const createMultipleBookmarksRequest = (bookmarkDataArr, windowId) => ({ 
  type: 'CREATE_MULTIPLE_BOOKMARKS_REQUEST',
  bookmarkDataArr,
  windowId
});
