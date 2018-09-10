import { createAction, handleActions } from 'redux-actions';

const defaultFiltersState = { text: '' };

export const setTextFilter = createAction('SET_TEXT_FILTER');
export const clearTextFilter = createAction('CLEAR_TEXT_FILTER');

export default handleActions({
  [setTextFilter]: (state, { payload }) => ({ text: payload }),
  [clearTextFilter]: () => ({ text: '' }),
}, defaultFiltersState);
