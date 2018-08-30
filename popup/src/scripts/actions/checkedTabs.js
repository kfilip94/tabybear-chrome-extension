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

export const clearWindowSelection = (windowId) => ({
  type: 'CLEAR_WINDOW',
  windowId
});


export const clearSelection = () => ({
  type: 'CLEAR'
});

export const updateWindowId = (id, windowId) => ({
  type: 'UPDATE_WINDOW_ID',
  id,
  windowId
});

export const updateMultipleWindowId = (idArr, windowId) => ({
  type: 'UPDATE_MULTIPLE_WINDOW_ID',
  idArr,
  windowId
});

export const filterCheckedTabs = (filterText) => ({
  type: 'FILTER_CHECKED_TABS',
  filterText
})