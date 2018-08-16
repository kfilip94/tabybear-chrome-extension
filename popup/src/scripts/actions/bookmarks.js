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