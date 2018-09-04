const defaultWindowsState = [];

export default (state = defaultWindowsState, action) => {
  switch(action.type){

    case 'CREATE_TAB':
      return state.map(window => {
        if(window.id === action.tab.windowId){
          if(window.tabs){
            if(window.tabs.every(({id}) => id !== action.tab.id))
              return {...window, tabs: [...window.tabs, action.tab]};
            else 
              return window;
           }
          else {
            return {...window, tabs: [action.tab]};
          }
        } else {
          return window;
        }
      });

    case 'UPDATE_TAB':
      return state.map(window => 
        Object.assign({}, window,{
          'tabs': window.tabs ? window.tabs.map((tab) => {
            if(tab.id === action.id) 
              return {...tab, ...action.updatedTab };
            else
              return tab;
          }) : []
        })
      );
      
    case 'MOVE_TAB':
      return state.map(window => {
        if(window.id === action.windowId)
          return {...window, tabs: window.tabs.filter((tab) => tab.id !== action.id)};
        else if(window.id === action.newWindowId)
          return {...window, tabs: [...window.tabs, action.tab]}
        else
          return window;
      });

    case 'SET_TAB_ACTIVE': 
      return state.map(window => 
        Object.assign({}, window,
          { 'tabs': window.id === action.windowId ? 
            window.tabs.map((tab) =>  ({...tab, 'active': tab.id === action.id })) : window.tabs
          })
      );      
    
    case 'UPDATE_MULTIPLE_TABS':
      return state.map(window => 
        Object.assign({}, window,{
          'tabs': window.tabs ? window.tabs.map((tab) => {
            // if(action.updatedTabIdArr.includes(tab.id))
              return  {...tab, ...action.updatedTab };
            // else
            //   return tab;
          }) : []
        })
      );

    case 'MOVE_TABS':
      const checkedTabsIdArr = action.checkedTabs.map(({id}) => id);
      const checkedWindowsIdArr = [...new Set(action.checkedTabs.map(({windowId}) => windowId))];

      const removedOldTabsState = state.map(window => {
        if(checkedWindowsIdArr.includes(window.id)) 
          return {...window, tabs: window.tabs.filter((tab) => !checkedTabsIdArr.includes(tab.id))};
         else 
          return window;
        });
      
      return removedOldTabsState.map(window => {
        if(window.id === action.newWindowId) 
          return {...window, tabs: [...window.tabs, ...action.tabArr]}
        else
          return window;
      });

    case 'UPDATE_TABS_ORDER':
      return state.map(window => {
        if(window.id === action.windowId) {
          const updatedTabs = window.tabs.map((tab) => {
            const updateInfo = action.indexArr.find(({id}) => tab.id === id);
            return {...tab, index: updateInfo.index }  
          });
          return {...window, tabs: updatedTabs};
        }
        else 
          return window;
      });

    case 'REMOVE_TAB':
      return state.map(window => 
        Object.assign({}, window, {
          'tabs': window.tabs.filter((tab) => tab.id !== action.id)
        })
      );

    case 'REMOVE_TABS':
      return state.map(window => 
        Object.assign({}, window,{
          'tabs': window.tabs.filter((tab) => !action.idArr.includes(tab.id))
        })
      );

    default:
      return state;
  };
};