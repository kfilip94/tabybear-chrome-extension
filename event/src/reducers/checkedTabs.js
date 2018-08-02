const defaultCheckedTabsState = {
  checkedTabs: []
};

export default (state = defaultCheckedTabsState, action) => {
  switch(action.type){
    case 'CHECK_TAB':
      return [ ...state, action.id];
    
    case 'CHECK_MULTIPLE':
      return [ ...state, ...action.checkedTabs];

    case 'UNCHECK_MULTIPLE':
      return state.filter(id => !action.uncheckedTabs.find(id));

    case 'UNCHECK_TAB':
      return state.filter(id => id !== action.id);
    
    case 'CLEAR':
      return [];

    default:
      return state;
  }
};