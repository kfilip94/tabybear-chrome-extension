import { createAction, handleActions } from 'redux-actions';

const defaultWindowsState = [];

export const createWindow = createAction('CREATE_WINDOW');
export const updateTabsOrder = createAction('UPDATE_TABS_ORDER');
export const setWindowActive = createAction('SET_WINDOW_ACTIVE');
export const setWindows = createAction('SET_WINDOWS');
export const removeWindow = createAction('REMOVE_WINDOW');


export default handleActions({
    [createWindow]: (state, { payload: { newWindow } }) => {
      const tabs = newWindow.tabs ? newWindow.tabs : [];
      return state.map(({ id }) => id).includes(newWindow.id) ? state : [...state, { ...newWindow, tabs }];
    },

    [setWindowActive]: (state, { payload: { id } }) => {
      return state.map(chromeWindow => {
        const focused = chromeWindow.id === id;
        return { ...chromeWindow, focused }  
      });
    },

    [updateTabsOrder]: (state, { payload: { windowId, tabsOrderArr } }) => {
      return state.map(window => {
        if(window.id === windowId) {
          const updatedTabs = window.tabs.map(tab => {
            const updateInfo = tabsOrderArr.find(({ id }) => tab.id === id);
            return {...tab, index: updateInfo.index }  
          });
          return {...window, tabs: updatedTabs};
        }
        else 
          return window;
      });
    },

    [setWindows]: (state, { payload: { windows } }) => {
      return windows;
    },

    [removeWindow]: (state, { payload: { id } }) => {
      return state.filter(({ id: filteredWindowId }) => filteredWindowId !== id);
    },
  }, defaultWindowsState);
