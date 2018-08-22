const defaultCheckedTabsState = [];

export default (state = defaultCheckedTabsState, action) => {
  switch(action.type){
    case 'CHECK_TAB':
      return [ ...state, { id: action.id, windowId: action.windowId }];
    
    case 'CHECK_MULTIPLE':
      return [ ...state, ...action.checkedTabs];

    case 'UNCHECK_MULTIPLE':
      return state.filter(({id}) => !action.idArr.includes(id));

    case 'UNCHECK_TAB':
      return state.filter(({id}) => id !== action.id);
    
    case 'CLEAR_WINDOW':
      return state.filter(({windowId}) => windowId !== action.windowId);

    case 'CLEAR':
      return [];
    
    case 'UPDATE_WINDOW_ID':
      return state.map((checkedTab) => {
        if(checkedTab.id === action.id)
          return {id: checkedTab.id, windowId: action.windowId}
        else
          return checkedTab; 
      });

    case 'SELECT_WINDOW':
      if(action.isChecked){
        const checkedTabsArr = action.tabIdArr.map(id => ({id: id, windowId: action.windowId}));
        const filteredState = state.filter(({windowId}) => windowId !== action.windowId);
        return [...filteredState, ...checkedTabsArr];
      }
      else {
        return state.filter(({id}) => !action.tabIdArr.includes(id));
      }
    
    default:
      return state;
  }
};