import { getNewTabUrlSetting } from '../../../shared/storage/localStorageApi';

const omitTab = ({ active, favIconUrl, id, index, mutedInfo, pinned, title, url, windowId }) => 
  ({ active, favIconUrl, id, index, muted: mutedInfo.muted, pinned, title, url, windowId });

const omitTabs = tabs => 
  tabs.map(tab => omitTab(tab));

export const createTabPromise = (windowId) => 
  new Promise(resolve =>
    getNewTabUrlSetting()
      .then((newTabUrl) => 
        chrome.tabs.create({ windowId, active: false, url: newTabUrl }, (newTab) => resolve(omitTab(newTab)))
    )
  );

export const muteTabPromise = (tabId, muted) =>
  new Promise(resolve => {
    const mutedInfo = { muted };
    chrome.tabs.update(tabId, mutedInfo, ({ muted: isMuted }) => resolve(isMuted))
  });

export const pinTabPromise = (tabId, pinned) => 
  new Promise(resolve => 
    chrome.tabs.update(tabId, { pinned }, (updatedTab) => resolve(updatedTab))
  );

export const setTabActivePromise = (tabId) => 
  new Promise(resolve => 
    chrome.tabs.update(tabId, { active: true }, (updatedTab) => resolve(updatedTab))
  );

export const getAllTabs = () => 
  new Promise(resolve =>
    chrome.tabs.query({}, (tabs) => resolve(omitTabs(tabs)))
  )

export const removeTabPromise = (tabId) => 
  new Promise(resolve => 
    chrome.tabs.remove(tabId, () => resolve())
  );

export const moveTabPromise = (tabId, windowId, index) =>
  new Promise(resolve => 
    chrome.tabs.move(tabId, {windowId, index}, (tab) => resolve(omitTab(tab)))
  );

export const moveTabsPromise = (tabIdArr, windowId, index) =>
  new Promise(resolve => {
    chrome.tabs.move(tabIdArr, {windowId, index}, (tabArr) => resolve(omitTabs(tabArr)));
  });

export const getTabPromise = (tabId) =>
  new Promise(resolve => 
    chrome.tabs.get(tabId, (tab) => resolve(omitTab(tab)))
  );

export const getTabsOrderPromise = (windowId) => new Promise(resolve =>
  chrome.tabs.query(({ windowId }), (tabs) => {
    const indexArr = tabs.map(({ id, index }) => ({ id,  index }));
    resolve(indexArr);
  })
);

