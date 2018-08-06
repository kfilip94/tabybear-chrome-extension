export const checkTab = (id, windowId) => ({
  type: 'CHECK_TAB',
  id,
  windowId
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
