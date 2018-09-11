import { createTab, moveTab, removeTab, setTabActive, updateTab } from 'reducers/tabs';
import { updateTabsOrderRequest } from '../../../popup/src/scripts/actions/tabs';

const destructureMutedInfoTab = tab => 
  ({ ...tab, muted: tab.mutedInfo.muted });

export default (store, badgeText) => {
  chrome.tabs.onCreated.addListener(tab => {
    // console.log('tabs.onCreated');
    store.dispatch(createTab({ tab }));
    badgeText.updateTabsNumber();
  });

  chrome.tabs.onRemoved.addListener(tabId => {
    // console.log('tabs.onRemoved');
    store.dispatch(removeTab({ id: tabId }))
    badgeText.updateTabsNumber();
  });

  chrome.tabs.onActivated.addListener(({ tabId }) => {
    // console.log('tabs.onActivated:');
    store.dispatch(setTabActive({ id: tabId }));
  });


  chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    // console.log('tabs.onUpdated');
    const updatedTab = changeInfo.mutedInfo ? destructureMutedInfoTab(changeInfo) : changeInfo;
    store.dispatch(updateTab({ id: tabId, updatedTab }));
  });

  chrome.tabs.onMoved.addListener((tabId, movedInfo) => {
    // console.log('tabs.onMoved');
    store.dispatch(updateTabsOrderRequest(movedInfo.windowId));
  });

  chrome.tabs.onAttached.addListener((tabId, { newWindowId }) => {
    // console.log('tabs.onAttached');
    store.dispatch(moveTab({ id: tabId, windowId: newWindowId }));
    store.dispatch(updateTabsOrderRequest(newWindowId));
  });
}