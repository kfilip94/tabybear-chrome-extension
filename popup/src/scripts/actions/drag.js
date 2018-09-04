import { createActions, handleActions, combineActions } from 'redux-actions';

const defaultState = { drag: false };
​

const { startDragging, stopDragging } = createActions({
  START_DRAGGING: () => ({ drag: true }),
  STOP_DRAGGING: () => ({ drag: false }),
});

const reducer = handleActions(
  {
    [combineActions(startDragging, stopDragging)]: (
      state,
      { payload: { drag } }
    ) => {
      return { ...state, drag: drag };
  }
}, defaultState);

export default reducer;

// export const startDragging = () => ({
//   type: 'START_DRAGGING'
// });

// export const stopDragging = () => ({
//   type: 'STOP_DRAGGING'
// });