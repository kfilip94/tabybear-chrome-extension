export const checkTab = (id, windowId) => ({
  type: 'CHECK_TAB',
  id,
  windowId
});

export const selectWindow = (windowId, tabIdArr, isChecked) => ({
  type: 'SELECT_WINDOW',
  windowId,
  tabIdArr,
  isChecked
});

export const uncheckTab = (id) => ({
  type: 'UNCHECK_TAB',
  id
});

export const uncheckTabs = (idArr) => ({
  type: 'UNCHECK_MULTIPLE',
  idArr
});

export const clearSelection = () => ({
  type: 'CLEAR'
});

export const updateWindowId = (id, windowId) => ({
  type: 'UPDATE_WINDOW_ID',
  id,
  windowId
});
