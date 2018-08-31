const defaultWindowsState = [];

export default (state = defaultWindowsState, action) => {
  switch(action.type){
    case 'CREATE_WINDOW':
      if(state.map(({id}) => id).includes(action.newWindow.id))
        return state;
      else
        return [...state, action.newWindow];
      
    case 'SET_WINDOW_ACTIVE':
      return state.map(chromeWindow => {
        const focused = chromeWindow.id === action.id;
        return {...chromeWindow, focused: focused}  
      });

    case 'SET_WINDOWS':
      return action.windows;

    case 'REMOVE_WINDOW':
      return state.filter(({id}) => id !== action.id);

    default:
      return state;
  };
};

