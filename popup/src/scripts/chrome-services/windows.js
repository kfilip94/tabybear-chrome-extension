const openNewWindow = (callback) => {
  /*global chrome*/
  console.log('HUJ');
  chrome.windows.create(null, (newWindow) => {
    chrome.tabs.query({ windowId: newWindow.id }, (tabsInWindow) => {
      // console.log('newWindow:',{...newWindow, tabs: tabsInWindow});
      // callback({...newWindow, tabs: tabsInWindow});
    });
  });
};

const openSettingsPage = () => alert('Here will be settings page!');

const getAllWindows = (callback) => {
  /*global chrome*/
  chrome.windows.getAll({populate: true}, (windowsArr) => {
    callback(windowsArr);
  });
};


const getAllWindowsPromise = () => new Promise((resolve, reject) => {
  chrome.windows.getAll({populate: true}, resolve);
});

const closeWindow = (windowId, callback) => {
  chrome.windows.remove(windowId, () => callback());
}

export { openNewWindow, openSettingsPage, getAllWindows, closeWindow, getAllWindowsPromise};
