import { getNewTabUrlSetting } from '../../../shared/storage/localStorageApi';

export const createTabPromise = (windowId) => 
  new Promise(resolve =>
    getNewTabUrlSetting()
      .then((newTabUrl) => {
        console.log('newTabUrl:',newTabUrl);
        chrome.tabs.create({ windowId: windowId, active: false, url: newTabUrl }, 
          (newTab) => resolve(newTab)
        );}
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

export const removeTabPromise = (tabId) => 
  new Promise(resolve => 
    chrome.tabs.remove(tabId, () => resolve())
  );

export const moveTabPromise = (tabId, windowId, index) =>
  new Promise(resolve => 
    chrome.tabs.move(tabId, {windowId, index}, (tab) => resolve(tab))
  );

export const moveTabsPromise = (checkedTabs, windowId, index) =>
  new Promise(resolve => {
    const tabIdArr = checkedTabs.map(({id}) => id);
    chrome.tabs.move(tabIdArr, {windowId, index}, (tab) => resolve(tab));
  });