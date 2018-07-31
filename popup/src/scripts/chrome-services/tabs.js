export const countTabsInWindow = (windowId, callback) => {
  /*global chrome*/
  chrome.tabs.getAllInWindow(windowId, (tabs) => callback(tabs.length));
};

export const setTabActive = (tabId, callback) => {
  console.log('setTabActive')
  chrome.tabs.update(tabId, { active: true }, (updatedTab) => callback(updatedTab));
};

export const pinTab = (tabId, pinned, callback) => {
  chrome.tabs.update(tabId, { pinned: !pinned }, (updatedTab) => callback(updatedTab));
};

export const closeTab = (tabId, callback) => {
  chrome.tabs.remove(tabId, () => callback());
};

export const openNewTab = (windowId, callback) => {
  chrome.tabs.create({windowId: windowId, active: false}, (newTab) => callback(newTab));
};

