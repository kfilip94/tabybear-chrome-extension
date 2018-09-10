import { createAction, handleActions } from 'redux-actions';

const defaultWindowsState = [];

export const createTab = createAction('CREATE_TAB');
export const updateTab = createAction('UPDATE_TAB');
export const updateTabs = createAction('UPDATE_TABS');
export const updateTabsOrder = createAction('UPDATE_TABS_ORDER');
export const setTabActive = createAction('SET_TAB_ACTIVE');
export const moveTab = createAction('MOVE_TAB');
export const moveTabs = createAction('MOVE_TABS');
export const setTabs = createAction('SET_TABS');
export const removeTab = createAction('REMOVE_TAB');
export const removeTabs = createAction('REMOVE_TABS');

export const muteTabRequest = createAction('MUTE_TAB_REQUEST');

export default handleActions({
  [createTab]: (state, { payload: { tab } }) => 
    state.every(({ id }) => id !== tab.id) ? [ ...state, tab ] : state,

  [updateTab]: (state, { payload: { id, updatedTab } }) =>
    state.map(tab => tab.id === id ? { ...tab, ...updatedTab } : tab),

  [updateTabs]: (state, { payload: { idArr, updatedTab } }) =>
    state.map(tab => idArr.includes(tab.id) ? { ...tab, ...updatedTab } : tab),

  [updateTabsOrder]: (state, { payload: { windowId, tabsOrderArr } }) => {
    return state.map(tab => {
      if(tab.windowId === windowId) {
        const { index } = tabsOrderArr.find(({ id }) => tab.id === id);
        return { ...tab, index }  
      } else {
        return tab;
      }
    });
  },

  [setTabActive]: (state, { payload: { id }}) => 
    state.map(tab =>  ({ ...tab, 'active': tab.id === id })),

  [moveTab]: (state, { payload: { id, windowId }}) =>
    state.map(tab => tab.id === id ? { ...tab, windowId } : tab),

  [moveTabs]: (state, { payload: { checkedTabsIds, newWindowId }}) =>
    state.map(tab => checkedTabsIds.includes(tab.id) ? { ...tab, windowId: newWindowId } : tab),

  [setTabs]: (state, { payload: { tabs } }) => tabs,

  [removeTab]: (state, { payload: { id } }) => 
    state.filter(tab => tab.id !== id),

}, defaultWindowsState);
