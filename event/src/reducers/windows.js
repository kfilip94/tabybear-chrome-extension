import { closeTab } from '../../../popup/src/scripts/chrome-services/tabs';

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
    // case 'GET_ALL_WINDOWS':
    //   console.log('GET_ALL_WINDOWS');
    //   return action.windows;

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
    case 'PIN_TAB':
      // pinTab(action.id, action.pinned, (updatedTab) => {
      //   let newState = updateTab(state, action.id, updatedTab);
      //   return newState;
      // });
      console.log('PIN TAB IN REDUCER!');
      return state;

    case 'ADD_WINDOW': //OK
      console.log('ADD_WINDOW:',[...state, action.newWindow]);
      return [...state, action.newWindow];

    case 'ADD_TAB': //OK
      const updatedWindows3 = state.map(chromeWindow => {
        if(chromeWindow.id === action.tab.windowId){
          return {...chromeWindow, tabs: [...chromeWindow.tabs, action.tab]};
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
    
    case 'UPDATE_INDEXES':
      console.log('UPDATE_INDEXES');
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
      // console.log('UPDATE_INDEXES:',updatedWindow2);

    case 'SET_WINDOWS': //OK
      console.log('ADD_WINDOWS');
      return action.windows;

    case 'REMOVE_WINDOW': //OK
      console.log('REMOVE_WINDOW');
      return state.filter(({id}) => id !== action.id);


    case 'REMOVE_TABS':
      closeTab(action.idArr, () => {
        let filteredWindows = state.map(chromeWindow => 
          Object.assign({}, chromeWindow,{
            'tabs': chromeWindow.tabs.filter((tab) => 
              !action.idArr.includes(tab.id)
            )
          })
        );
        console.log('REMOVE_TABS:',filteredWindows);
        return filteredWindows;
      });

    default:
      console.log('DEFAULT'. state);
      return state;
  };
};