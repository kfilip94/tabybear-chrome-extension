import { restoreDefaultSettings } from '../../../shared/storage/localStorageApi';

export default () =>
  chrome.runtime.onInstalled.addListener(() => restoreDefaultSettings());
