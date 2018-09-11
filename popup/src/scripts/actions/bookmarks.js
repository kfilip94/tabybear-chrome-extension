export default (bookmarksData, windowId) => ({ 
  type: 'CREATE_MULTIPLE_BOOKMARKS_REQUEST',
  bookmarksData,
  windowId
});
