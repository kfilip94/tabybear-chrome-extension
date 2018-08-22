const defaultWindowsState = [];

export default (state = defaultWindowsState, action) => {
  switch(action.type){
    case 'REMOVE_TAB': //OK
      const filteredWindows = state.map(chromeWindow => 
        Object.assign({}, chromeWindow,{
          'tabs': chromeWindow.tabs.filter((tab) => 
            tab.id !== action.id
          )
        })
      );
      return filteredWindows;


    case 'UPDATE_TAB': //OK
      console.log('UPDATE_TAB');
      const updatedWindows = state.map(chromeWindow => 
        Object.assign({}, chromeWindow,{
          'tabs': chromeWindow.tabs ? chromeWindow.tabs.map((tab) => {
            if(tab.id === action.id) 
              return {...tab, ...action.updatedTab };
            else
              return tab;
          }) : []
        })
      );
      return updatedWindows;

    case 'CREATE_WINDOW': //OK
      console.log('CREATE_WINDOW:',[...state, action.newWindow]);
      return [...state, action.newWindow];
      
    case 'MOVE_TAB':
      return state.map(chromeWindow => {
        if(chromeWindow.id === action.windowId) {
          return {...chromeWindow, tabs: chromeWindow.tabs.filter((tab) => tab.id !== action.id)};
        } else if(chromeWindow.id === action.newWindowId) {
          return {...chromeWindow, tabs: [...chromeWindow.tabs, action.tab]}
        } else {
          return chromeWindow;
        }
      });


    case 'MOVE_TABS':
      //1. remove old tabs by checkedTas state

      //tablica id windowsow bez powtorzen
      const checkedTabsIdArr = action.checkedTabs.map(({id}) => id);
      console.log('chekedTabsIdArr:',checkedTabsIdArr);

      const checkedWindowsIdArr = [...new Set(action.checkedTabs.map(({windowId}) => windowId))];
      console.log('checkedWindowsIdArr:',checkedWindowsIdArr);

      const removedOldTabsState = state.map(chromeWindow => {
        if(checkedWindowsIdArr.includes(chromeWindow.id)) {
          return {...chromeWindow, tabs: chromeWindow.tabs.filter((tab) => !checkedTabsIdArr.includes(tab.id))};
        } else {
          return chromeWindow;
        }});
      
      console.log('removedOldTabsState:',removedOldTabsState)

      //2. add moved tabs to widnows
      return removedOldTabsState.map(chromeWindow => {
        if(chromeWindow.id === action.newWindowId) {
          return {...chromeWindow, tabs: [...chromeWindow.tabs, ...action.tabArr]}
        } else {
          return chromeWindow;
        }
      });

    case 'CREATE_TAB': //OK 
      const updatedWindows3 = state.map(chromeWindow => {
        if(chromeWindow.id === action.tab.windowId){
          if(chromeWindow.tabs){
            if(chromeWindow.tabs.every(({id}) => id !== action.tab.id)){
              return {...chromeWindow, tabs: [...chromeWindow.tabs, action.tab]};
            } else {
              return chromeWindow;
            }
          }
          else {
            return {...chromeWindow, tabs: [action.tab]};
          }
        } else {
          return chromeWindow;
        }
      });
      console.log('after add tab:',updatedWindows3);
      return updatedWindows3;

    case 'CLEAR_ACTIVE':
      console.log('CLEAR_ACTIVE');
      return state.map(chromeWindow => {
        if(chromeWindow.id === action.windowId)
          return {...chromeWindow, tabs: chromeWindow.tabs.map((tab) => { return {...tab, active: false };})};
        else
          return chromeWindow
      });
    
    case 'SET_WINDOW_ACTIVE':
      return state.map(chromeWindow => {
        if(chromeWindow.id === action.id) {
          return {...chromeWindow, focused: true}  
        } else {
          return {...chromeWindow, focused: false}  
        }
      });

    case 'UPDATE_TABS_ORDER':
      console.log('UPDATE_TABS_ORDER');
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

    case 'SET_WINDOWS': //OK
      console.log('SET_WINDOWS');
      return action.windows;

    case 'REMOVE_WINDOW': //OK
      console.log('REMOVE_WINDOW');
      return state.filter(({id}) => id !== action.id);


    case 'REMOVE_TABS':
        const filteredWindows4 = state.map(chromeWindow => 
          Object.assign({}, chromeWindow,{
            'tabs': chromeWindow.tabs.filter((tab) => 
              !action.idArr.includes(tab.id)
            )
          })
        );
        console.log('REMOVE_TABS:',filteredWindows4);
        return filteredWindows4;

    default:
      console.log('DEFAULT'. state);
      return state;
  };
};

