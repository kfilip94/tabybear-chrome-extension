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

    case 'ADD_WINDOW': //OK
      console.log('ADD_WINDOW:',[...windows, action.newWindow]);
      return [...windows, action.newWindow];

    case 'SET_ALL_WINDOWS': //OK
      console.log('ADD_WINDOWS');
      return action.windows;

    case 'REMOVE_WINDOW': //OK
      console.log('REMOVE_WINDOW');
      return state.filter(({id}) => id !== action.id);

    default:
      console.log('DEFAULT'. state);
      return state;
  };
};