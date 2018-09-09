import { getNewTabUrlSetting } from '../../../shared/storage/localStorageApi';

export const createTabPromise = (windowId) => 
  new Promise(resolve =>
    getNewTabUrlSetting()
      .then((newTabUrl) => 
        chrome.tabs.create({ windowId: windowId, active: false, url: newTabUrl }, (newTab) => resolve(newTab))
      )
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

export const getAllTabs = () => 
  new Promise(resolve =>
    chrome.tabs.query({}, (tabs) => resolve(tabs))
  )

export const removeTabPromise = (tabId) => 
  new Promise(resolve => 
    chrome.tabs.remove(tabId, () => resolve())
  );

export const moveTabPromise = (tabId, windowId, index) =>
  new Promise(resolve => 
    chrome.tabs.move(tabId, {windowId, index}, (tab) => resolve(tab))
  );

export const moveTabsPromise = (tabIdArr, windowId, index) =>
  new Promise(resolve => {
    chrome.tabs.move(tabIdArr, {windowId, index}, (tabArr) => resolve(tabArr));
  });

export const getTabPromise = (tabId) =>
  new Promise(resolve => 
    chrome.tabs.get(tabId, (tab) => resolve(tab))
  );

export const getTabsOrderPromise = (windowId) => new Promise(resolve =>
  chrome.tabs.query(({ windowId }), (tabs) => {
    const indexArr = tabs.map(({ id, index }) => ({ id,  index }));
    resolve(indexArr);
  })
);