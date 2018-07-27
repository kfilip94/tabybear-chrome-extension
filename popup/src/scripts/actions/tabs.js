export const removeTab = (id) => ({
  type: 'REMOVE_TAB',
  id
});

export const setWindows = ( { windows } ) => ({
  type: 'SET_ALL_WINDOWS',
  windows
});

export const removeWindow = (id) => ({
  type: 'REMOVE_WINDOW',
  id
});

export const addWindow = ( newWindow = {}) => ({
  type: 'ADD_WINDOW',
  newWindow
});

export const updateTab = (id, updatedTab) => ({
  type: 'UPDATE_TAB',
  id,
  updatedTab
});