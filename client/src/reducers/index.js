import { combineReducers } from 'redux';

import bootcampReducer from './bootcampReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import coursesReducer from './coursesReducer';

export default combineReducers({
  bootcamps: bootcampReducer,
  auth: authReducer,
  error: errorReducer,
  courses: coursesReducer,
});
