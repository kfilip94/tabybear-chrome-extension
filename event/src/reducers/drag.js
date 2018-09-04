import { createAction, handleActions } from 'redux-actions';

const defaultDragState = { drag: false };

export const startDragging = createAction('START_DRAGGING');
export const stopDragging = createAction('STOP_DRAGGING');

export default handleActions({
  [startDragging](state) {
    return true;
  },
  [stopDragging](state) {
    return false;
  },
}, defaultDragState);
