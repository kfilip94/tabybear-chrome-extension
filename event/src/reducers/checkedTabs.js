import { createAction, handleActions } from 'redux-actions';

const defaultCheckedTabsState = [];

export const checkTab = createAction('CHECK_TAB');
export const uncheckTab = createAction('UNCHECK_TAB');
export const uncheckMultiple = createAction('UNCHECK_MULTIPLE');
export const checkWindow = createAction('CHECK_WINDOW');
export const uncheckWindow = createAction('UNCHECK_WINDOW');
export const uncheckAll = createAction('UNCHECK_ALL')
export const updateMultipleWindowId = createAction('UPDATE_MULTIPLE_WINDOW_ID');
export const updateWindowId = createAction('UPDATE_WINDOW_ID');
 
export default handleActions({
  [checkTab](state, { payload: { tabId, windowId } }) {
    return [ ...state, { id: tabId, windowId }];
  },

  [uncheckTab](state, { payload: { tabId } }) {
    return state.filter(({id}) => id !== tabId);
  },

  [checkWindow](state, { payload: { windowId, tabIdArr, isChecked } }) {
    if(isChecked){
      const checkedTabsArr = tabIdArr.map(id => ({ id, windowId }));
      const filteredState = state.filter(({ filteredWindowId }) => filteredWindowId !== windowId);
      return [...filteredState, ...checkedTabsArr];
    }
    else {
      return state.filter(({id}) => !tabIdArr.includes(id));
    }
  },

  [uncheckWindow](state, { payload: { windowId: payloadWindowId }}) {
    return state.filter(({ windowId }) => windowId !== payloadWindowId);
  },

  [uncheckMultiple](state, { payload: { idArr } }) {
    return state.filter(({id}) => !idArr.includes(id));
  },

  [uncheckAll](state) {
    return [];
  },

  [updateMultipleWindowId](state, { payload: { idArr, windowId } }) {
    return state.map((checkedTab) => {
      if(idArr.includes(checkedTab.id))
        return { id: checkedTab.id, windowId }
      else
        return checkedTab; 
    });
  },

  [updateWindowId](state, { payload: { id, windowId } }) {
    return state.map((checkedTab) => {
      if(checkedTab.id === id)
        return { id: checkedTab.id, windowId }
      else
        return checkedTab; 
    });  
  },

}, defaultCheckedTabsState);
