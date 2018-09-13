import { restoreDefaultSettings } from 'storage/localStorageApi';

export default () =>
  chrome.runtime.onInstalled.addListener(() => restoreDefaultSettings());
