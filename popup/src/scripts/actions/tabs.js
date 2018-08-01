export const addTab = (tab) => ({
  type: 'ADD_TAB',
  tab
});

export const updateTab = (id, updatedTab) => ({
  type: 'UPDATE_TAB',
  id,
  updatedTab
});

export const removeTab = (id) => ({
  type: 'REMOVE_TAB',
  id
});

export const addWindow = ( newWindow = {}) => ({
  type: 'ADD_WINDOW',
  newWindow
});

export const removeWindow = (id) => ({
  type: 'REMOVE_WINDOW',
  id
});

export const setWindows = ( { windows } ) => ({
  type: 'SET_ALL_WINDOWS',
  windows
});

export const clearActive = (windowId) => ({
  type: 'CLEAR_ACTIVE',
  windowId
});

export const updateAllIndexInWindow = (windowId, indexArr) => ({
  type: 'UPDATE_INDEXES',
  windowId,
  indexArr
});
