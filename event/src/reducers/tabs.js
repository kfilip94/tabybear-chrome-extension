import { createAction, handleActions } from 'redux-actions';

const defaultWindowsState = [];

export const createTab = createAction('CREATE_TAB');
export const updateTab = createAction('UPDATE_TAB');
export const updateTabs = createAction('UPDATE_TABS');
export const setTabActive = createAction('SET_TAB_ACTIVE');
export const moveTab = createAction('MOVE_TAB');
export const moveTabs = createAction('MOVE_TABS');
export const removeTab = createAction('REMOVE_TAB');
export const removeTabs = createAction('REMOVE_TABS');

export default handleActions({
  [createTab]: (state, { payload: { tab } }) => {
    return state.map(window => {
      if(window.id === tab.windowId){
        // if(window.tabs){
          if(window.tabs.every(({id}) => id !== tab.id))
            return {...window, tabs: [...window.tabs, tab]};
          else 
            return window;
        //   }
        // else {
        //   return { ...window, tabs: [tab] };
        // }
      } else {
        return window;
      }
    });
  },

  [updateTab]: (state, { payload: { id, updatedTab } }) => {
    return state.map(window => 
      Object.assign({}, window,{
        'tabs': window.tabs ? window.tabs.map((tab) => {
          if(tab.id === id) 
            return {...tab, ...updatedTab };
          else
            return tab;
        }) : []
      })
    );
  },

  [updateTabs]: (state, { payload: { idArr, updatedTab } }) => {
    return state.map(window => 
      Object.assign({}, window,{
        'tabs': window.tabs ? window.tabs.map((tab) => {
          if(idArr.includes(tab.id))
            return  { ...tab, ...updatedTab };
          else
            return tab;
        }) : []
      })
    );
  },

  [setTabActive]: (state, { payload: { id, windowId }}) => {
    return state.map(window => {
      if(window.id === windowId) {
        const tabs = window.tabs.map((tab) =>  ({ ...tab, 'active': tab.id === id }));
        return { ...window, tabs };
      } else {
        return window;
      }
    });  
  },

  [moveTab]: (state, { payload: { id, windowId, newWindowId, tab }}) => {
    return state.map(window => {
      if(window.id === windowId)
        return {...window, tabs: window.tabs.filter((tab) => tab.id !== id)};
      else if(window.id === newWindowId)
        return {...window, tabs: [...window.tabs, tab]}
      else
        return window;
    });
  },

  [moveTabs]: (state, { payload: { checkedTabs, newWindowId, tabArr }}) => {
    const checkedTabsIdArr = checkedTabs.map(({ id }) => id);
    const checkedWindowsIdArr = [...new Set(checkedTabs.map(({ windowId }) => windowId))];

    const removedOldTabsState = state.map(window => {
      if(checkedWindowsIdArr.includes(window.id)) 
        return {...window, tabs: window.tabs.filter((tab) => !checkedTabsIdArr.includes(tab.id))};
        else 
        return window;
      });
    
    return removedOldTabsState.map(window => {
      if(window.id === newWindowId) 
        return {...window, tabs: [...window.tabs, ...tabArr]}
      else
        return window;
    });
  },

  [removeTab]: (state, { payload: { id } }) => {
    return state.map(window => 
      Object.assign({}, window, {
        'tabs': window.tabs.filter((tab) => tab.id !== id)
      })
    );
  },

  [removeTabs]: (state, { payload: { idArr } }) => {
    return state.map(window => 
      Object.assign({}, window,{
        'tabs': window.tabs.filter((tab) => !idArr.includes(tab.id))
      })
    );
  }

}, defaultWindowsState);
