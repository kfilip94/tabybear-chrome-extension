const openNewWindow = (callback) => {
  /*global chrome*/
  chrome.windows.create(null, (newWindow) =>
    chrome.windows.get(newWindow.id, { populate: true }, (newWindowComplete) => {
      console.log('newWindowComplete: ',newWindowComplete);
      callback(newWindowComplete);
    })
  );
};

const openSettingsPage = () => alert('Here will be settings page!');

const getAllWindows = (callback) => {
  /*global chrome*/
  chrome.windows.getAll({populate: true}, (windowsArr) => {
    callback(windowsArr);
  });
};

const closeWindow = (windowId, callback) => {
  chrome.windows.remove(windowId, () => callback());
}

export { openNewWindow, openSettingsPage, getAllWindows, closeWindow};
