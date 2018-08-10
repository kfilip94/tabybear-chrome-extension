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
      console.log('filtered id: ',action.id ,' after close:',filteredWindows);
      return filteredWindows;


    case 'UPDATE_TAB': //OK
      console.log('UPDATE_TAB');
      const updatedWindows = state.map(chromeWindow => 
        Object.assign({}, chromeWindow,{
          'tabs': chromeWindow.tabs.map((tab) => {
            if(tab.id === action.id) 
              return {...tab, ...action.updatedTab };
            else
              return tab;
          })
        })
      );
      console.log('filtered id: ',action.id ,' after update:',updatedWindows);
      return updatedWindows;

    case 'ADD_WINDOW': //OK
      console.log('ADD_WINDOW:',[...state, action.newWindow]);
      return [...state, action.newWindow];

    case 'CREATE_TAB': //OK
      const updatedWindows3 = state.map(chromeWindow => {
        if(chromeWindow.id === action.tab.windowId){
          if(chromeWindow.tabs.every(({id}) => id !== action.tab.id)){
            return {...chromeWindow, tabs: [...chromeWindow.tabs, action.tab]};
          } else {
            return chromeWindow;
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