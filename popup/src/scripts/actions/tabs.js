export const createTabRequest = (windowId) => ({
  type: 'CREATE_TAB_REQUEST',
  windowId
});

export const pinTabRequest = (id, pinned) => ({
  type: 'PIN_TAB_REQUEST',
  id, 
  pinned
});

export const pinMultipleTabsRequest = (ids, pinned) => ({
  type: 'PIN_MULTIPLE_TABS_REQUEST',
  ids, 
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

export const setTabsRequest = () => ({
  type: 'SET_TABS_REQUEST'
});

export const moveTabRequest = (id, windowId, newWindowId, index) => ({
  type: 'MOVE_TAB_REQUEST',
  id, windowId, newWindowId, index
});

export const moveTabsRequest = (checkedTabs, windowId, newWindowId, index) => ({
  type: 'MOVE_TABS_REQUEST',
  checkedTabs, windowId, newWindowId, index
});

export const updateTabsOrderRequest = windowId => ({
  type: 'UPDATE_TABS_ORDER_REQUEST',
  windowId
});

export const removeTabRequest = (id) => ({
  type: 'REMOVE_TAB_REQUEST',
  id
});

export const removeTabsRequest = (ids) => ({
  type: 'REMOVE_TABS_REQUEST',
  ids
});
