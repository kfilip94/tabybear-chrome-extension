const defaultFiltersState = {
  text: ''
};

export default (state = defaultFiltersState, action) => {
  switch(action.type){
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text};

    default:
      return state;
  }
};