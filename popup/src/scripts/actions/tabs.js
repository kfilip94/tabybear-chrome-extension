export const createTabRequest = (windowId) => ({
  type: 'CREATE_TAB_REQUEST',
  windowId
});



export const pinTabRequest = (id, pinned) => ({
  type: 'PIN_TAB_REQUEST',
  id, 
  pinned
});

export const pinMultipleTabsRequest = (idArr, pinned) => ({
  type: 'PIN_MULTIPLE_TABS_REQUEST',
  idArr, 
  pinned
});

export const muteTabRequest = (id, muted) => ({
  type: 'MUTE_TAB_REQUEST',
  id,
  muted
});

export const setTabActiveRequest = (id, windowId) => ({
  type: 'SET_TAB_ACTIVE_REQUEST',
  id, windowId
});


export const moveTabRequest = (id, windowId, newWindowId, index) => ({
  type: 'MOVE_TAB_REQUEST',
  id, windowId, newWindowId, index
});

export const moveTabsRequest = (checkedTabs, newWindowId, startIndex) => ({
  type: 'MOVE_TABS_REQUEST',
  checkedTabs, newWindowId, startIndex
});



export const removeTabRequest = (id) => ({
  type: 'REMOVE_TAB_REQUEST',
  id
});

export const removeTabsRequest = (idArr) => ({
  type: 'REMOVE_TABS_REQUEST',
  idArr
});

export const attachTabRequest = (id) => ({
  type: 'ATTACH_TAB_REQUEST',
  id
});