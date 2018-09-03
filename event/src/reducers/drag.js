const defaultDraggingState = false;

export default (state = defaultDraggingState, action) => {
  switch(action.type){
    case 'START_DRAGGING':
      return true;

    case 'STOP_DRAGGING':
      return false;

    default:
      return state;
  }
};