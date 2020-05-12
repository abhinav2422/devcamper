import { combineReducers } from 'redux';

import bootcampReducer from './bootcampReducer';

export default combineReducers({
  bootcamps: bootcampReducer,
});
