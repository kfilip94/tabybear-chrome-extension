import { getBookmarsFolderSetting } from '../../../shared/storage/localStorageApi';

export const createBookmarkPromise = (title, url) => new Promise(resolve => 
    getBookmarsFolderSetting()
      .then((bookmarksFolderId) => {
        chrome.bookmarks.create({ parentId: bookmarksFolderId, title: title, url: url }, 
          (bookmarkTreeNode) => resolve(bookmarkTreeNode)
        );
      })
);