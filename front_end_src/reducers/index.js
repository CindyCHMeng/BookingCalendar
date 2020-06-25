import { combineReducers } from 'redux';
// import { connectRouter } from 'connected-react-router';

import infoReducer from './infoReducer';

export default rootReducer => combineReducers({
  info: infoReducer,
  // router: connectRouter(todoApp),
});
