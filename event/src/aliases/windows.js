import * as promises from '../chrome-services/windows';

// CREATE WINDOW
const createWindowAlias = () => promises.createWindowPromise();
  // STORE CHANGES HANDLED BY EVENT LISTENER

// REMOVE WINDOW
const removeWindowAlias = ({ id }) => promises.removeWindowPromise(id);
  // STORE CHANGES HANDLED BY EVENT LISTENER
  
export default {
  'CREATE_WINDOW_REQUEST': createWindowAlias,
  'REMOVE_WINDOW_REQUEST': removeWindowAlias
};
