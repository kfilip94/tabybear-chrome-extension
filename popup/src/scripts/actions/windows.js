export const createWindowRequest = () => ({
  type: 'CREATE_WINDOW_REQUEST'
});

export const createWindow = ( newWindow = {}) => ({
  type: 'CREATE_WINDOW',
  newWindow
});

export const removeWindowRequest = (id) => ({
  type: 'REMOVE_WINDOW_REQUEST',
  id
});

export const removeWindow = (id) => ({
  type: 'REMOVE_WINDOW',
  id
});

export const setWindowsRequest = () => ({
  type: 'SET_WINDOWS_REQUEST',
});

export const setWindows = (windows) => ({
  type: 'SET_WINDOWS',
  windows
});

export const updateTabsOrderRequest = (windowId) => ({
  type: 'UPDATE_TABS_ORDER_REQUEST',
  windowId
});

export const updateTabsOrder = (windowId, indexArr) => ({
  type: 'UPDATE_TABS_ORDER',
  windowId,
  indexArr
});