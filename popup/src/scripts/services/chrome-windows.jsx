const openNewWindow = (callback) => {
  /*global chrome*/
  chrome.windows.create(null, (newWindow) => callback(newWindow));
};

const openSettingsPage = () => alert('Here will be settings page!');


const countTabsInWindow = (windowId, callback) => {
  /*global chrome*/
  chrome.tabs.getAllInWindow(windowId, (tabs) => {
    console.log('tabs.length: '.tabs.length);
    callback(tabs.length);
  });
};

const getAllWindows = (callback) => {
  /*global chrome*/
  chrome.windows.getAll({populate: true}, (windowsArr) => {
    callback(windowsArr);
  });
};

const closeWindow = (windowId, callback) => {
  chrome.windows.remove(windowId, () => callback());
}

export { openNewWindow, openSettingsPage, countTabsInWindow, getAllWindows, closeWindow };
