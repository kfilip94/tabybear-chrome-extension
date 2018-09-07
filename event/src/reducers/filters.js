import { createAction, handleActions } from 'redux-actions';

const defaultFiltersState = { text: '' };

export const setTextFilter = createAction('SET_TEXT_FILTER');

export default handleActions({
  [setTextFilter]: (state, { payload }) => {
    return { text: payload };
  },
}, defaultFiltersState);
