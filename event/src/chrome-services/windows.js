export const removeWindowPromise = windowId => new Promise(resolve =>
  chrome.windows.remove(windowId, () => resolve())
);

export const createWindowPromise = () => new Promise(resolve =>
  chrome.windows.create({ focused: false }, newWindow => resolve(newWindow))
);

export const setWindowActivePromise = windowId => new Promise(resolve =>
  chrome.windows.update(windowId, { focused: true }, chromeWindow => resolve(chromeWindow))
);