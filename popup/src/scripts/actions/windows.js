export const addWindowRequest = () => ({
  type: 'ADD_WINDOW_REQUEST'
});

export const addWindow = ( newWindow = {}) => ({
  type: 'ADD_WINDOW',
  newWindow
});

export const removeWindowRequest = () => ({
  type: 'REMOVE_WINDOW_REQUEST',
});

export const removeWindow = (id) => ({
  type: 'REMOVE_WINDOW',
  id
});

export const setWindowsRequest = () => ({
  type: 'SET_WINDOWS_REQUEST',
});

export const setWindows = (windows) => ({
  type: 'SET_WINDOWS',
  windows
});