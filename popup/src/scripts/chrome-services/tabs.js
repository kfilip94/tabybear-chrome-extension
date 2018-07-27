const countTabsInWindow = (windowId, callback) => {
  /*global chrome*/
  chrome.tabs.getAllInWindow(windowId, (tabs) => {
    console.log('tabs.length: '.tabs.length);
    callback(tabs.length);
  });
};

const setTabActive = (tabId, callback) => {
  chrome.tabs.update(tabId, { active: true }, callback())
};

const pinTab = (tabId, pinned, callback) => {
  chrome.tabs.update(tabId, { pinned: !pinned }, (updatedTab) => callback(updatedTab));
};


export { countTabsInWindow, setTabActive, pinTab };
