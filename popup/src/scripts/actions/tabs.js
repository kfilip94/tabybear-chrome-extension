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

export const removeTabs = (idArr) => ({
  type: 'REMOVE_TABS',
  idArr
});


export const pinTabRequest = (id, pinned) => ({
  type: 'PIN_TAB_REQUEST',
  id, 
  pinned
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
