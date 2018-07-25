const defaultWindowsState = [];

export default (state = defaultWindowsState, action) => {
  switch(action.type){
    case 'CLOSE_TAB':
      console.log('CLOSE_TAB',action.id);
      console.log(state.filter((chromeWindow) => 
        chromeWindow.tabs.some(({id}) => id !== action.id))
      );
      console.log('CLOSE_TAB end');

      return state.filter((chromeWindow) => 
        chromeWindow.tabs.some((tab) => tab.id !== action.id));
      // let filteredArray = state.filter((chromeWindow) => 
      //   chromeWindow.tabs.some((tab) => tab.id !== action.id))
      //   .map(tab => {
      //     let newWindow = Object.assign({}, chromeWindow); // copies element
      //     return newWindow.tabs.filter(tab => tab.id !== action.id);
      // });
      // console.log('CLOSE_TAB');
      // // chrome.tabs.remove(action.id, () => console.log('removed!'));
      // console.log(state.filter((chromeWindow, key) => {
      //   chromeWindow.tabs.filter(({ id }) => id !== action.id)
      // }));
      // return state.map((chromeWindow, key) => {
      //   chromeWindow.tabs.filter(({ id }) => id !== action.id)
      // });

    case 'ADD_WINDOW':
      console.log('ADD_WINDOW:',[...windows, action.newWindow]);
      return [...windows, action.newWindow];

    case 'SET_ALL_WINDOWS':
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