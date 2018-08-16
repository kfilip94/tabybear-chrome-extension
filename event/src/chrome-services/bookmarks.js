export const createBookmarkPromise = (title, url) => new Promise(resolve => {
    chrome.bookmarks.create({ parentId: '430', title: title, url: url }, (bookmarkTreeNode) => {
      resolve(bookmarkTreeNode);
    })
  }
);