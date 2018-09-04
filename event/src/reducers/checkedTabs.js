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

// export const checkTab = (id, windowId) => ({
//     type: 'CHECK_TAB',
//     id,
//     windowId
//   });
  
//   export const uncheckTab = (id) => ({
//     type: 'UNCHECK_TAB',
//     id
//   });
  
//   export const selectWindow = (windowId, tabIdArr, isChecked) => ({
//     type: 'CHECK_WINDOW',
//     windowId,
//     tabIdArr,
//     isChecked
//   });
  
//   export const clearWindowSelection = (windowId) => ({
//     type: 'UNCHECK_WINDOW',
//     windowId
//   });
  
//   export const uncheckTabs = (idArr) => ({
//     type: 'UNCHECK_MULTIPLE',
//     idArr
//   });
  
//   export const clearSelection = () => ({
//     type: 'CLEAR'
//   });
  
//   export const updateWindowId = (id, windowId) => ({
//     type: 'UPDATE_WINDOW_ID',
//     id,
//     windowId
//   });
  
//   export const updateMultipleWindowId = (idArr, windowId) => ({
//     type: 'UPDATE_MULTIPLE_WINDOW_ID',
//     idArr,
//     windowId
//   });

  
// export default (state = defaultCheckedTabsState, action) => {
//   switch(action.type){
//     case 'CHECK_TAB':
//       return [ ...state, { id: action.id, windowId: action.windowId }];

//     case 'UNCHECK_TAB':
//       return state.filter(({id}) => id !== action.id);

//     case 'UNCHECK_MULTIPLE':
//       return state.filter(({id}) => !action.idArr.includes(id));
    
//     case 'CHECK_WINDOW':
//       if(action.isChecked){
//         const checkedTabsArr = action.tabIdArr.map(id => ({id: id, windowId: action.windowId}));
//         const filteredState = state.filter(({windowId}) => windowId !== action.windowId);
//         return [...filteredState, ...checkedTabsArr];
//       }
//       else {
//         return state.filter(({id}) => !action.tabIdArr.includes(id));
//       }

//     case 'UNCHECK_WINDOW':
//       return state.filter(({windowId}) => windowId !== action.windowId);

//     case 'CLEAR':
//       return [];
    
//     case 'UPDATE_MULTIPLE_WINDOW_ID':
//       return state.map((checkedTab) => {
//         if(action.idArr.includes(checkedTab.id))
//           return {id: checkedTab.id, windowId: action.windowId}
//         else
//           return checkedTab; 
//       });

//     case 'UPDATE_WINDOW_ID':
//       return state.map((checkedTab) => {
//         if(checkedTab.id === action.id)
//           return {id: checkedTab.id, windowId: action.windowId}
//         else
//           return checkedTab; 
//       });  
    
//     default:
//       return state;
//   }
// };