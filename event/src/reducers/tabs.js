const defaultWindowsState = [];

export default (state = defaultWindowsState, action) => {
  
  switch(action.type){
    case 'CREATE_TAB':
      return state.map(chromeWindow => {
        if(chromeWindow.id === action.tab.windowId){
          if(chromeWindow.tabs){
            if(chromeWindow.tabs.every(({id}) => id !== action.tab.id))
              return {...chromeWindow, tabs: [...chromeWindow.tabs, action.tab]};
            else 
              return chromeWindow;
          }
          else {
            return {...chromeWindow, tabs: [action.tab]};
          }
        } else {
          return chromeWindow;
        }
      });

    case 'UPDATE_TAB':
      return state.map(chromeWindow => 
        Object.assign({}, chromeWindow,{
          'tabs': chromeWindow.tabs ? chromeWindow.tabs.map((tab) => {
            if(tab.id === action.id) 
              return {...tab, ...action.updatedTab };
            else
              return tab;
          }) : []
        })
      );
      
    case 'MOVE_TAB':
      return state.map(chromeWindow => {
        if(chromeWindow.id === action.windowId)
          return {...chromeWindow, tabs: chromeWindow.tabs.filter((tab) => tab.id !== action.id)};

        else if(chromeWindow.id === action.newWindowId)
          return {...chromeWindow, tabs: [...chromeWindow.tabs, action.tab]}

        else
          return chromeWindow;
      });

    case 'SET_TAB_ACTIVE': 
      return state.map(chromeWindow => {
        if(chromeWindow.id === action.windowId) {
          const tabs = chromeWindow.tabs.map((tab) => {
              return {...tab, 'active': tab.id === action.id }
          });
          return {...chromeWindow, 'tabs': tabs};
        } else {
          return chromeWindow;
        }
      });
    
    case 'UPDATE_MULTIPLE_TABS':
      return  state.map(chromeWindow => 
        Object.assign({}, chromeWindow,{
          'tabs': chromeWindow.tabs ? chromeWindow.tabs.map((tab) => {
            if(action.updatedTabIdArr.includes(tab.id))
              return  {...tab, ...action.updatedTab };
            else
              return tab;
          }) : []
        })
      );

    case 'MOVE_TABS':
      const checkedTabsIdArr = action.checkedTabs.map(({id}) => id);
      const checkedWindowsIdArr = [...new Set(action.checkedTabs.map(({windowId}) => windowId))];

      const removedOldTabsState = state.map(chromeWindow => {
        if(checkedWindowsIdArr.includes(chromeWindow.id)) {
          return {...chromeWindow, tabs: chromeWindow.tabs.filter((tab) => !checkedTabsIdArr.includes(tab.id))};
        } else {
          return chromeWindow;
        }});
      
      return removedOldTabsState.map(chromeWindow => {
        if(chromeWindow.id === action.newWindowId) 
          return {...chromeWindow, tabs: [...chromeWindow.tabs, ...action.tabArr]}
        else
          return chromeWindow;
      });

   
    case 'CLEAR_ACTIVE':
      return state.map(chromeWindow => {
        if(chromeWindow.id === action.windowId)
          return {...chromeWindow, tabs: chromeWindow.tabs.map((tab) => { return {...tab, active: false };})};
        else
          return chromeWindow
      });
    

    case 'UPDATE_TABS_ORDER':
      return state.map(chromeWindow => {
            if(chromeWindow.id === action.windowId) {
              const updatedTabs = chromeWindow.tabs.map((tab) => {
                const updateInfo = action.indexArr.find(({id}) => tab.id === id);
                return {...tab, index: updateInfo.index }  
              });
              return {...chromeWindow, tabs: updatedTabs};
            }
            else 
              return chromeWindow;
      });

    case 'REMOVE_TAB':
      return state.map(chromeWindow => 
        Object.assign({}, chromeWindow, {
          'tabs': chromeWindow.tabs.filter((tab) => 
            tab.id !== action.id
          )
        })
      );


    case 'REMOVE_TABS':
      return state.map(chromeWindow => 
          Object.assign({}, chromeWindow,{
            'tabs': chromeWindow.tabs.filter((tab) => 
              !action.idArr.includes(tab.id)
            )
        })
      );

    default:
      return state;
  };
};


// case 'MOVE_TAB_STORE':
// let movedTab = state.find(({id}) => id === action.windowId).tabs.find(({id}) => id === action.id);
// movedTab = { ...movedTab, index: action.index, windowId: action.newWindowId }

// return state.map(chromeWindow => {
//   if(chromeWindow.id === action.windowId) {
//     return {...chromeWindow, tabs: chromeWindow.tabs.filter((tab) => tab.id !== action.id)};
//   } else if(chromeWindow.id === action.newWindowId) {
//     return {...chromeWindow, tabs: [...chromeWindow.tabs, movedTab]}
//   } else {
//     return chromeWindow;
//   }
// });