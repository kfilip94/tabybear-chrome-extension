export const getAllWindowsPromise = () => new Promise(resolve =>
  chrome.windows.getAll({ populate: true }, (windows) => resolve(windows))
);
  
export const removeWindowPromise = (windowId) => new Promise(resolve =>
  chrome.windows.remove(windowId, () => resolve())
);

export const createWindowPromise = () => new Promise(resolve =>
  chrome.windows.create(null, (newWindow) => resolve(newWindow))
);

export const getWindowPromise = (windowId) => new Promise(resolve =>
  chrome.windows.get(windowId, { populate: true }, (requestedWindow) => resolve(requestedWindow))
);

export const getTabsOrderPromise = (windowId) => new Promise(resolve =>
  chrome.tabs.query(({ windowId }), (tabs) => {
    const indexArr = tabs.map(({id, index}) => ({ id,  index }));
    resolve(indexArr);
  })
);