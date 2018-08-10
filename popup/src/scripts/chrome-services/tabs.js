export const createTabPromise = (windowId) => 
  new Promise(resolve =>
    chrome.tabs.create({ windowId: windowId, active: false }, (newTab) => resolve(newTab))
  );

export const muteTabPromise = (tabId, muted) =>
  new Promise(resolve => 
    chrome.tabs.update(tabId, { muted: muted }, (updatedTab) => resolve(updatedTab))
  );

export const pinTabPromise = (tabId, pinned) => 
  new Promise(resolve => 
    chrome.tabs.update(tabId, { pinned: pinned }, (updatedTab) => resolve(updatedTab))
  );

export const setTabActivePromise = (tabId) => 
  new Promise(resolve => 
    chrome.tabs.update(tabId, { active: true }, (updatedTab) => resolve(updatedTab))
  );

export const removeTabPromise = (tabId) => 
  new Promise(resolve => 
    chrome.tabs.remove(tabId, () => resolve())
  );

export const getTabsOrderPromise = (windowId) => 
  new Promise(resolve =>
    chrome.tabs.query(({ windowId }), (tabs) => {
      const indexArr = tabs.map(({id, index}) => ({ id,  index }));
      resolve(indexArr);
    })
  );
