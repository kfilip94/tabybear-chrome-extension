import * as actions  from '../reducers/tabs';
import * as promises from '../chrome-services/windows';

//CREATE WINDOW
const createWindowAlias = () => {
  return dispatch => promises.createWindowPromise();
    // STORE CHANGES HANDLED BY EVENT LISTENER
};

//REMOVE WINDOW
const removeWindowAlias = ({ id }) => {
  return dispatch => promises.removeWindowPromise(id);
    // STORE CHANGES HANDLED BY EVENT LISTENER
};

export default {
  'CREATE_WINDOW_REQUEST': createWindowAlias,
  'REMOVE_WINDOW_REQUEST': removeWindowAlias
};
