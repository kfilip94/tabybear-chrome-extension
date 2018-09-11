import { createWindowPromise, removeWindowPromise } from 'chromeServices/windows';

// CREATE WINDOW
const createWindowAlias = () => 
  () => createWindowPromise();
  // STORE CHANGES HANDLED BY EVENT LISTENER

// REMOVE WINDOW
const removeWindowAlias = ({ id }) => 
  () => removeWindowPromise(id);
  // STORE CHANGES HANDLED BY EVENT LISTENER
  
export default {
  'CREATE_WINDOW_REQUEST': createWindowAlias,
  'REMOVE_WINDOW_REQUEST': removeWindowAlias
};
