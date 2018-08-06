const defaultCheckedTabsState = [];

export default (state = defaultCheckedTabsState, action) => {
  switch(action.type){
    case 'CHECK_TAB':
      return [ ...state, { id: action.id, windowId: action.windowId }];
    
    case 'CHECK_MULTIPLE':
      return [ ...state, ...action.checkedTabs];

    case 'UNCHECK_MULTIPLE':
      console.log('UNCHECK_MULTIPLE:',state);
      console.log('UNCHECK_MULTIPLE:',state.map((checkedTab) => { id: checkedTab.id}));

      return [];

    case 'UNCHECK_TAB':
      console.log('UNCHECK_TAB');
      return state.filter(({id}) => id !== action.id);
    
    case 'CLEAR':
      return [];

    default:
      return state;
  }
};