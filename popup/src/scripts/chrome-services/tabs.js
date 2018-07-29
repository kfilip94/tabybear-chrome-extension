export const countTabsInWindow = (windowId, callback) => {
  /*global chrome*/
  chrome.tabs.getAllInWindow(windowId, (tabs) => callback(tabs.length));
};

export const setTabActive = (tabId, callback) => {
  chrome.tabs.update(tabId, { active: true }, callback())
};

export const pinTab = (tabId, pinned, callback) => {
  chrome.tabs.update(tabId, { pinned: !pinned }, (updatedTab) => callback(updatedTab));
};

export const closeTab = (tabId, callback) => {
  chrome.tabs.remove(tabId, () => callback());
};

export const openNewTab = (callback) => {
  chrome.tabs.create(null, (newTab) => callback(newTab))
};

