import { getBookmarsFolderSetting } from 'storage/localStorageApi';

export const createBookmarkPromise = (title, url) => new Promise(resolve => 
    getBookmarsFolderSetting()
      .then(bookmarksFolderId => {
        chrome.bookmarks.create({ parentId: bookmarksFolderId, title, url }, 
          bookmarkTreeNode => resolve(bookmarkTreeNode)
        );
      })
);