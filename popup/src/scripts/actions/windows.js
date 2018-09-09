export const createWindowRequest = () => ({
  type: 'CREATE_WINDOW_REQUEST'
});

export const setWindowsRequest = () => ({
  type: 'SET_WINDOWS_REQUEST',
});

export const removeWindowRequest = id => ({
  type: 'REMOVE_WINDOW_REQUEST',
  id
});
