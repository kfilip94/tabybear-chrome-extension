export const newTabUrlSetting = () => new Promise(resolve =>
	chrome.storage.sync.get(["newTabUrl"], (items) => resolve(items.newTabUrl))
  );

export const bookmarsFolderSetting = () => new Promise(resolve =>
	chrome.storage.sync.get(["newBookmarkFolderId"], (items) => resolve(items.newBookmarkFolderId))
  );

export const setSettings = (newTabUrl, newBookmarkFolderId) => new Promise(resolve => {
  chrome.storage.sync.set({
    "newTabUrl": newTabUrl,
    "newBookmarkFolderId": newBookmarkFolderId
  }, () => resolve(newTabUrl, newBookmarkFolderId))
});
  
export const setNewTabUrlSetting = (newTabUrl) => new Promise(resolve => {
  chrome.storage.sync.set({
    "newTabUrl": newTabUrl,
  }, () => resolve(newTabUrl))
});
  
export const setBookmarksFolderId = (newBookmarkFolderId) => new Promise(resolve => 
  chrome.storage.sync.set({
    "newBookmarkFolderId": newBookmarkFolderId,
  }, () => resolve(newBookmarkFolderId))
);

export const restoreDefaultSettings = () => {
  const newTabUrl = "http://google.com";
  const newBookmarkFolderId = "1";
  setSettings(newTabUrl, newBookmarkFolderId);
};

export const getSettings = () => new Promise(resolve =>
  chrome.storage.sync.get(["newTabUrl","newBookmarkFolderId"], (settings) => resolve(settings))
);

export const getBookmarksTree = () => new Promise(resolve =>
  chrome.bookmarks.getTree((bookmarksTree) => {
    const bookmarksFolders = getFolders(bookmarksTree);
    console.log('bookmarksFolders:');
    console.log(bookmarksFolders);
    resolve(bookmarksFolders);
  })
);

export const getFolders = (childrens) => {
  return [].concat.apply([], childrens.filter((tree) => tree.children !== undefined)
    .map(({id, title, children}) => {
      return [{ id, title }, ...getFolders(children)];
    }
  ));
};

