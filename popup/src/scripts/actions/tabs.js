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


export const clearActive = (windowId) => ({
  type: 'CLEAR_ACTIVE',
  windowId
});


