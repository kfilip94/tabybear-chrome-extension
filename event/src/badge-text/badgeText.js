const updateBadgeText = tabsLength => {
  tabsLength = tabsLength > 999 ? '999+' : `${tabsLength}`;
  chrome.browserAction.setBadgeText({ text: tabsLength });
};
  
export const updateTabsNumber = () => 
  chrome.tabs.query({}, (tabs) => updateBadgeText(tabs.length));

export const initBadgeText = () => {
  chrome.browserAction.setBadgeBackgroundColor({ color: [41, 62, 82, 1] });
  updateTabsNumber();
};