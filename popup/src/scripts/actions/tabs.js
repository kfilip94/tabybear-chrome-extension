//CREATE TAB
export const createTabRequest = (windowId) => ({
  type: 'CREATE_TAB_REQUEST',
  windowId
});

export const createTab = (tab) => ({
  type: 'CREATE_TAB',
  tab
});


//UPDATE TAB
export const updateTab = (id, updatedTab) => ({
  type: 'UPDATE_TAB',
  id,
  updatedTab
});

export const pinTabRequest = (id, pinned) => ({
  type: 'PIN_TAB_REQUEST',
  id, 
  pinned
});

export const muteTabRequest = (id, muted) => ({
  type: 'MUTE_TAB_REQUEST',
  id,
  muted
});

export const setTabActiveRequest = (id) => ({
  type: 'SET_TAB_ACTIVE_REQUEST',
  id
});

export const clearActive = (windowId) => ({
  type: 'CLEAR_ACTIVE',
  windowId
});

export const moveTabRequest = (id, windowId, newWindowId, index) => ({
  type: 'MOVE_TAB_REQUEST',
  id, windowId, newWindowId, index
});

export const moveTabsRequest = (checkedTabs, newWindowId, startIndex) => ({
  type: 'MOVE_TABS_REQUEST',
  checkedTabs, newWindowId, startIndex
});

export const moveTab = (id, windowId, newWindowId, tab) => ({
  type: 'MOVE_TAB',
  id, windowId, newWindowId, tab
});

export const moveTabs = (checkedTabs, newWindowId, tabArr) => ({
  type: 'MOVE_TABS',
  checkedTabs, newWindowId, tabArr
});

//REMOVE TAB
export const removeTabRequest = (id) => ({
  type: 'REMOVE_TAB_REQUEST',
  id
});

export const removeTab = (id) => ({
  type: 'REMOVE_TAB',
  id
});

export const removeTabsRequest = (idArr) => ({
  type: 'REMOVE_TABS_REQUEST',
  idArr
});

export const removeTabs = (idArr) => ({
  type: 'REMOVE_TABS',
  idArr
});

