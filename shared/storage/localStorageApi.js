export const getNewTabUrlSetting = () => new Promise(resolve =>
	chrome.storage.sync.get(["newTabUrl"], (items) => resolve(items.newTabUrl))
  );

export const getBookmarsFolderSetting = () => new Promise(resolve =>
	chrome.storage.sync.get(["newBookmarkFolderId"], (items) => resolve(items.newBookmarkFolderId))
  );

export const setSettings = (newTabUrl, newBookmarkFolderId) => new Promise(resolve => {
  chrome.storage.sync.set({
    "newTabUrl": validateUrl(newTabUrl),
    "newBookmarkFolderId": newBookmarkFolderId
  }, () => resolve(validateUrl(newTabUrl), newBookmarkFolderId))
});
  
export const setNewTabUrlSetting = (newTabUrl) => new Promise(resolve => {
  chrome.storage.sync.set({
    "newTabUrl":  validateUrl(newTabUrl),
  }, () => resolve(validateUrl(newTabUrl)))
});
  
export const setBookmarksFolderId = (newBookmarkFolderId) => new Promise(resolve => 
  chrome.storage.sync.set({
    "newBookmarkFolderId": newBookmarkFolderId,
  }, () => resolve(newBookmarkFolderId))
);

export const restoreDefaultSettings = () => {
  const newTabUrl = "https://google.com";
  const newBookmarkFolderId = "1";
  return setSettings(newTabUrl, newBookmarkFolderId);
};

export const getSettings = () => new Promise(resolve =>
  chrome.storage.sync.get(["newTabUrl","newBookmarkFolderId"], (settings) => resolve(settings))
);

export const getBookmarksTree = () => new Promise(resolve =>
  chrome.bookmarks.getTree((bookmarksTree) => {
    const bookmarksFolders = getFolders(bookmarksTree).filter(({id}) => id !== "0");
    resolve(bookmarksFolders);
  })
);

export const getFolders = childrens => {
  return [].concat.apply([], childrens.filter((tree) => tree.children !== undefined)
    .map(({id, title, children}) => {
      return [{ id, title }, ...getFolders(children)];
    }
  ));
};

const validateUrl = url => {
  return url;
}