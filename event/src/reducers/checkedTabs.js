import { createAction, handleActions } from 'redux-actions';

const defaultCheckedTabsState = [];

export const checkTab = createAction('CHECK_TAB');
export const uncheckTab = createAction('UNCHECK_TAB');
export const uncheckTabs = createAction('UNCHECK_TABS');
export const checkWindow = createAction('CHECK_WINDOW');
export const uncheckWindow = createAction('UNCHECK_WINDOW');
export const uncheckAll = createAction('UNCHECK_ALL')
export const updateMultipleWindowId = createAction('UPDATE_MULTIPLE_WINDOW_ID');
export const updateWindowId = createAction('UPDATE_WINDOW_ID');
 
export default handleActions({
  [checkTab]: (state, { payload: { tabId, windowId } }) =>
    [ ...state, { id: tabId, windowId }],

  [uncheckTab]: (state, { payload: { tabId } }) =>
    state.filter(({ id }) => id !== tabId),

  [checkWindow]: (state, { payload: { windowId, tabIds } }) => {
    const checkedTabsArr = tabIds.map(id => ({ id, windowId }));
    const filteredState = state.filter(checkedTab => checkedTab.windowId !== windowId);
    return [ ...filteredState, ...checkedTabsArr ];
  },

  [uncheckWindow]: (state, { payload: { windowId: payloadWindowId }}) =>
    state.filter(({ windowId }) => windowId !== payloadWindowId),

  [uncheckTabs]: (state, { payload: { idArr } }) =>
    state.filter(({ id }) => !idArr.includes(id)),

  [uncheckAll]: () => [],

  [updateMultipleWindowId]: (state, { payload: { idArr, windowId } }) =>
    state.map(checkedTab =>
      idArr.includes(checkedTab.id) ? { id: checkedTab.id, windowId } : checkedTab
    ),

  [updateWindowId]: (state, { payload: { id, windowId } }) =>
    state.map(checkedTab =>
      checkedTab.id === id ? { id: checkedTab.id, windowId } : checkedTab
    ),

}, defaultCheckedTabsState);
